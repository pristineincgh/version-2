import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MARK_NOTIFICATIONS_AS_READ } from './endpoints';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['mark-as-read'],
    mutationFn: MARK_NOTIFICATIONS_AS_READ,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-notifications'],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.detail);
      } else {
        const errorMessage =
          `An error occurred: ${error.message}` ||
          'An error occurred. Please try again.';
        toast.error(errorMessage);
      }
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-notification'],
    mutationFn: MARK_NOTIFICATIONS_AS_READ,
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ['my-notifications'],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.detail);
      } else {
        const errorMessage =
          `An error occurred: ${error.message}` ||
          'An error occurred. Please try again.';
        toast.error(errorMessage);
      }
    },
  });
};

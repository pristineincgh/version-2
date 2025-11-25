import { useMutation } from '@tanstack/react-query';
import {
  CREATE_USER,
  DELETE_USER_ACCOUNT,
  RESEND_VERIFICATION_EMAIL,
  UPDATE_USER_STATUS,
} from './endpoints';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useCreateNewUserMutation = () => {
  return useMutation({
    mutationKey: ['create-new-user'],
    mutationFn: CREATE_USER,
    onSuccess: (data) => {
      toast.success(data.message);
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

export const useResendEmailVerification = () => {
  return useMutation({
    mutationFn: RESEND_VERIFICATION_EMAIL,
    mutationKey: ['resend-verify-email'],
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      console.error('Email verification failed:', error);
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

export const useUpdateUserStatus = () => {
  return useMutation({
    mutationFn: UPDATE_USER_STATUS,
    mutationKey: ['update-user-status'],
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      console.error('User status update failed:', error);
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

export const useDeleteUserAccount = () => {
  return useMutation({
    mutationFn: DELETE_USER_ACCOUNT,
    mutationKey: ['delete-user-account'],
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      console.error('User account deletion failed:', error);
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

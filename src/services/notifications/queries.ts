import { useQuery } from '@tanstack/react-query';
import { GET_MY_NOTIFICATIONS } from './endpoints';

export const useGetMyNotifications = () => {
  return useQuery({
    queryKey: ['my-notifications'],
    queryFn: () => GET_MY_NOTIFICATIONS(),
  });
};

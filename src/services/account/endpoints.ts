import apiClient from '@/lib/api-client';

export const UPLOAD_USER_AVATAR = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<UploadUserAvatarResponse>(
    '/users/upload-photo',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const UPDATE_USER_PROFILE = async (data: UpdateProfileRequest) => {
  const response = await apiClient.put('/users/update', data);

  return response.data;
};

export const UPDATE_PASSWORD = async (data: UpdatePasswordRequest) => {
  const response = await apiClient.post('/users/change-password', data);

  return response.data;
};

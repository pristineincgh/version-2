export const publicRoutes = [
  '/auth',
  '/auth/reset-request',
  '/auth/check-email',
  '/auth/new-password',
  '/auth/verified',
  '/auth/verify-email',
  '/auth/success',
];

export const rolePaths = {
  student: ['/student'],
  tutor: ['/tutor'], // ['/tutor', '/moderator'],
  parent: ['/parent'],
  moderator: ['/moderator'], // ['/moderator', '/tutor'],
};

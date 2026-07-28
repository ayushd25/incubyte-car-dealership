export const buildAuthResponse = (
  user: {
    _id: unknown;
    name: string;
    email: string;
    role: string;
  },
  token: string,
  message: string
) => ({
  success: true,
  message,
  data: {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  },
});
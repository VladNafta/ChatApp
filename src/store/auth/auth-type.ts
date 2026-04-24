export type AuthUserType = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
};

export type AuthStateType = {
  user: AuthUserType | null;
  loading: boolean;
  error: string;
  verificationMessage: string;
};

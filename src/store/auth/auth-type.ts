import { UserType } from "../../types/types";

export type AuthUserType = {
  uid: string;
  emailVerified: boolean;
} & UserType;

export type AuthStateType = {
  user: AuthUserType | null;
  loading: boolean;
  error: string;
};

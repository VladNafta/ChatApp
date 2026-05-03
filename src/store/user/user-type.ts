import { UserType } from "../../types/dbTypes";

export type UserStateType = {
  user: UserType | null;
  loading: boolean;
  error: string;
};

import { UserType } from "../../types/types";

export type UserStateType = {
  user: UserType | null;
  loading: boolean;
  error: string;
};

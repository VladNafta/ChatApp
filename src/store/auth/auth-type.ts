import { User } from "firebase/auth";

export type authState = {
  // user: User | null;
  user: {uid: string} | null;
  loading: boolean;
  error: string;
};

import { atomWithStorage } from "jotai/utils";
import { User } from "./types";

export const userAtom = atomWithStorage<User>("user", {
  id: "",
  name: "",
  email: "",
  isActive: false,
  isDeleted: false,
});

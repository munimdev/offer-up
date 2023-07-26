import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms";

export const useSession = () => {
  const [user] = useAtom(userAtom);
  const isLoggedIn = !!user.id;
  return { user, isLoggedIn };
};

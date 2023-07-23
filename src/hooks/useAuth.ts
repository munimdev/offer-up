import { useMutation } from "@tanstack/react-query";
import * as Queries from "@/utils/queries";
import { LoginData, SignupData } from "@/utils/types";

export const useLogin = () => {
  const { mutateAsync, isError, error } = useMutation(async (data: LoginData) =>
    Queries.loginUser(data)
  );

  return { mutateAsync, error, isError };
};

export const useSignup = () => {
  const { mutateAsync, isError, error } = useMutation(
    async (data: SignupData) => Queries.signupUser(data)
  );

  return { mutateAsync, error, isError };
};

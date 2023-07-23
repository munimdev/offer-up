import { AxiosResponse } from "axios";
import { LoginData, SignupData } from "@/utils/types";
import { Result, User, Category } from "@/utils/types";
import instance from "./axios";

export const loginUser = (data: LoginData): Promise<Result<User>> =>
  instance.post("/auth/login", data);

export const signupUser = (data: SignupData): Promise<Result<User>> =>
  instance.post("/auth/signup", data);

export const getCategories = (): Promise<Result<Category[]>> =>
  instance.get("/Category/getCategories");

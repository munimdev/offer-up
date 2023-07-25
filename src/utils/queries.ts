import { LoginData, SignupData, SubCategory } from "@/utils/types";
import { Result, User, Category } from "@/utils/types";
import instance from "./axios";

export const loginUser = (data: LoginData): Promise<Result<User>> =>
  instance.post("/auth/login", data);

export const signupUser = (data: SignupData): Promise<Result<User>> =>
  instance.post("/auth/signup", data);

export const getCategories = (): Promise<Result<Category[]>> =>
  instance.get("/Category/getCategories");

export const getSubCategories = (id: number): Promise<Result<SubCategory[]>> =>
  instance.post("/Category/getSubCategories", { id });

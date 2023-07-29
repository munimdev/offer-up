import {
  CategoryAttribute,
  FetchAttributesDto,
  LoginData,
  SignupData,
  SubCategory,
  Result,
  User,
  Category,
  SaveItemDto,
} from "@/utils/types";
import instance from "./axios";

export const loginUser = (data: LoginData): Promise<Result<User>> =>
  instance.post("/auth/login", data);

export const signupUser = (data: SignupData): Promise<Result<User>> =>
  instance.post("/auth/signup", data);

export const getCategories = (): Promise<Result<Category[]>> =>
  instance.get("/Category/getCategories");

export const getSubCategories = (id: number): Promise<Result<SubCategory[]>> =>
  instance.post("/Category/getSubCategories", { id });

export const getCategoryAttributes = (
  data: FetchAttributesDto
): Promise<Result<CategoryAttribute[]>> =>
  instance.post("/Category/getCategoryAttributesFiltered", data);

export const saveItem = (data: SaveItemDto) =>
  instance.post("/Item/createitem", data);

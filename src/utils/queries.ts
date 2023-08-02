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
  UserProfile,
} from "@/utils/types";
import instance from "./axios";
import { FavoriteList, Item } from "@/types/types";

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

export const userDetails = (data: {
  id: string;
}): Promise<Result<UserProfile>> =>
  instance.post("/customer/getcustomerProfile", data);
export const userItems = (data: { id: string }): Promise<Result<Item>> =>
  instance.post("/Item/getItemsOfCurrentUser", data);

// Favorite List
export const getFavoriteList = (): Promise<Result<FavoriteList[]>> =>
  instance.post("/FavouriteList/getFavouriteList");

export const getFavoriteListById = (
  id: number
): Promise<Result<FavoriteList>> =>
  instance.post("/FavouriteList/getFavouriteListById", { id });

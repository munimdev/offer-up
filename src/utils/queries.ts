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
import {
  Customer,
  FavoriteList,
  Item,
  LookupList,
  ReportDto,
  ReportItemDto,
} from "@/types/types";

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

// Products
export const saveItem = (data: SaveItemDto) =>
  instance.post("/Item/createitem", data);

export const getItemById = (id: string): Promise<Result<any>> =>
  instance.post("/Item/getItemDetail", { id });

export const userDetails = (data: {
  id: string;
}): Promise<Result<UserProfile>> =>
  instance.post("/customer/getcustomerProfile", data);

export const userItems = (data: { id: string }): Promise<Result<Item>> =>
  instance.post("/Item/getItemsOfCustomer", data);

// Favorite List
export const getFavoriteList = (): Promise<Result<FavoriteList[]>> =>
  instance.post("/FavouriteList/getFavouriteList");

export const getFavoriteListById = (
  id: number
): Promise<Result<FavoriteList>> =>
  instance.post("/FavouriteList/getFavouriteListById", { id });

export const createFavoriteList = (data: {
  name: string;
}): Promise<Result<FavoriteList>> =>
  instance.post("/FavouriteList/createFavouriteList", data);

export const addItemToFavouriteList = (data: {
  itemId: string;
  favouriteListId: number;
}): Promise<Result<FavoriteList>> =>
  instance.post("/FavouriteList/addItemToFavouriteList", data);

export const removeItemFromFavouriteList = (data: {
  itemId: string;
  favouriteListId: number;
}): Promise<Result<FavoriteList>> =>
  instance.post("/FavouriteList/removeItemFromFavouriteList", data);

// Following
export const getCustomerFollowing = (id: string): Promise<Result<Customer[]>> =>
  instance.post("/customer/getCustomerFollowing", { userId: id });

export const getCustomerFollowers = (id: string): Promise<Result<Customer[]>> =>
  instance.post("/customer/getCustomerFollowers", { userId: id });

export const followCustomer = (userId: string): Promise<Result<any[]>> =>
  instance.post("/customer/followCustomer", { userId });

export const unFollowCustomer = (userId: string): Promise<Result<any[]>> =>
  instance.post("/customer/unFollowCustomer", { userId });

// Report
export const reportUser = (data: ReportDto) =>
  instance.post("/system/SaveCustomerReport", data);

export const reportItem = (data: ReportItemDto) =>
  instance.post("/system/SaveItemReport", data);

// Misc
export const getLookupList = (code: number): Promise<Result<LookupList[]>> =>
  instance.post(`/system/GetLookupByGroupCode`, { groupCode: code });

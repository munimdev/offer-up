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
  UpdateItemDto,
} from "@/utils/types";
import instance from "./axios";
import {
  Customer,
  FavoriteList,
  Item,
  LookupList,
  ReportDto,
  ReportItemDto,
  SearchQuery,
  SearchResult,
} from "@/types/types";
// auth
export const loginUser = (data: LoginData): Promise<Result<User>> =>
  instance.post("/auth/login", data);

export const signupUser = (data: SignupData): Promise<Result<User>> =>
  instance.post("/auth/signup", data);
 export const verifyEmailCode = (code:string): Promise<Result<any>> =>
   instance.post("/Auth/verifyEmailCode",{code:code})
 export const forgetPassword = (email:string): Promise<Result<any>> =>
   instance.post("/auth/ForgetPassword",{email:email})
export const resetPassword = (data: {
  key: string;
  password: string;
}): Promise<Result<any>> => instance.post("/auth/changePassword", data);
 export const resendEmailVerificationEmail = (): Promise<Result<any>> =>
   instance.post("/Auth/resendEmailVerificationEmail",{})
   export const deleteaccount = (): Promise<Result<any>> =>
   instance.post("/auth/deleteaccount",{})
 export const sendOtpForNumberChange = (data:any): Promise<Result<any>> =>
   instance.post("/auth/sendOtpForNumberChange",data)
 export const verifyOtpForNumberChange = (data:any): Promise<Result<any>> =>
   instance.post("/auth/verifyOtpForNumberChange",data)
// Categories
export const getCategories = (): Promise<Result<Category[]>> =>
  instance.get("/Category/getCategories");

export const getChildCategories = (id: number): Promise<Result<any[]>> =>
  instance.post(`/Category/getChildCategoriesByParent`, { id });

export const getSubCategories = (id: number): Promise<Result<SubCategory[]>> =>
  instance.post("/Category/getSubCategories", { id });

export const getCategoryAttributes = (
  data: FetchAttributesDto
): Promise<Result<CategoryAttribute[]>> =>
  instance.post("/Category/getCategoryAttributesFiltered", data);

// Products
export const searchItems = (
  query: SearchQuery
): Promise<Result<SearchResult>> =>
  instance.post("/Item/searchItems", { ...query });

export const saveItem = (data: SaveItemDto) =>
  instance.post("/Item/createitem", data);

export const getItemById = (id: string): Promise<Result<Item>> =>
  instance.post("/Item/getItemDetail", { id });
// Item/markItemSold
export const markItemSold = (id: string): Promise<Result<any>> =>
  instance.post("/Item/markItemSold", { id });
//Item/markItemArchived
export const markItemArchived = (id: string): Promise<Result<any>> =>
  instance.post("/Item/markItemArchived", { id });
// /Item/markItemUnArchived
export const markItemUnArchived = (id: string): Promise<Result<any>> =>
  instance.post("/Item/markItemUnArchived", { id });
// Update Item
export const updateItem = (data: UpdateItemDto): Promise<Result<any>> =>
  instance.post("/Item/updateitem", data);

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

// Profile
export const getCustomerProfile = (id: string): Promise<Result<Customer>> =>
  instance.post("/customer/getcustomerProfile", { id: id });

// export const getMyProfile = (): Promise<Result<UserProfile>> =>
  // instance.post("/customer/getMyProfile");
  export const getMyProfile = (data: {
    id: string;
  }): Promise<Result<UserProfile>> =>
    instance.post("/customer/getMyProfile", data);
export const updateProfileImage = (
  id: string,
  imagePath: string
): Promise<Result<any>> =>
  instance.post("/customer/updateCustomerProfileImage", { id, imagePath });

export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<Result<any>> => instance.post("/auth/changePassword", data);

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

export type SVG = {
  className: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accTypeLookupId: number;
  registeredFromPlatformLookupId: number;
  gmailId?: string;
  facebookId?: string;
  appleId?: string;
  microsoftId?: string;
  twitterId?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  token?: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type Category = {
  id: number;
  name: string;
  description: string;
  level: number;
  parentCategoryId: number;
  isActive: boolean;
  isDeleted: boolean;
};

export type SubCategory = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  isActive: boolean;
  isDeleted: boolean;
};

export type CategoryAttribute = {
  id: number;
  name: string;
  isForCategory: boolean;
  categoryId: number;
  isForSubCategory: boolean;
  subCategoryId: number;
  attributeType: string;
  options: string;
  lenght: number;
  isRequired: boolean;
  isActive: boolean;
  isDeleted: boolean;
};

export type FetchAttributesDto = {
  isForCategory: boolean;
  categoryId: number;
  isForSubCategory: boolean;
  subCategoryId: number;
};

export type Result<T> = {
  statusCode: string;
  message: string;
  messageCode: string;
  dataObject: T;
};

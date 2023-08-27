import { Item } from "@/components/item/Item";

export type Review = {
  comment: string;
  userImage: string;
};

export type Contact = {
  phone: string;
  email: string;
};

export type WorkHour = {
  day: string;
  start: string;
  end: string;
};

export type Images = {
  imageOrder: number;
  image: string;
};

export type ProductProps = React.ComponentPropsWithoutRef<typeof Item>;

export type SellerProps = {
  type: "individual" | "company";
  lastActice: Date;
  displayName: string;
  imageUrl: string;
  rating: number;
  reviews: Review[];
  products: ProductProps[];
};

export type SellerIndividualProps = SellerProps & {
  joinDate: Date;
  replyRate: number;
  emailVerified: boolean;
  bought: number; // Fixed typo
  sold: number;
  followers: number;
};

export type SellerCompanyProps = SellerProps & {
  address: string;
  website: string;
  workingHours: WorkHour[];
  contact: Contact;
  about: string;
};

export type SellerComponentProps = SellerCompanyProps | SellerIndividualProps;

export type ItemImages = {
  id: string;
  itemId: string;
  imageOrder: number;
  imagePath: string;
  imagePath250: string;
  image: string;
  isImageDeleted: boolean;
  isImageAdded: boolean;
  isActive: boolean;
  isDeleted: boolean;
};

export type Customer = {
  id: string;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  totalItems: number;
  totalFollowers: number;
  totalFollowing: number;
  totalRating: number;
  totalSold: number;
  totalBought: number;
  isEmailVerified: boolean;
  isNumberVerified: boolean;
  imagePath: string;
  imagePath250: string;
  registeredOn: string;
};

export type Attribute = {
  id: number;
  itemId: string;
  categoryAttributeId: number;
  categoryAttributeName: string;
  selectedValue: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type Item = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: ItemImages[];
  totalMessages: number;
  totalViews: number;
  totalFavorite: number;
  categoryId: number;
  categoryName: string;
  childCategoryId: number;
  childCategoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  conditionLookUpId: number;
  conditionLookUpName: string;
  conditionDescription: string;
  isPriceFixed: boolean;
  validUpto: string;
  isSold: boolean;
  isPromoted: boolean;
  customerId: number;
  customer: Customer;
  userId: string;
  isArchived: boolean;
  fullAddress?: string;
  shortAddress?: string;
  locationLat: number;
  locationLng: number;
  zipCode: string;
  attributes: Attribute[];
  isActive: boolean;
  isDeleted: boolean;
};

export type FavoriteListItem = {
  id: number;
  favouriteListId: number;
  favouriteListName: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  userId: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type FavoriteList = {
  id: number;
  totalItems: number;
  name: string;
  userId: string;
  userName: string;
  imagePath: string;
  lstFavouriteListItems: FavoriteListItem[];
  isActive: boolean;
  isDeleted: boolean;
};

export type Follow = {
  id: string;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  totalItems: number;
  totalFollowers: number;
  totalFollowing: number;
  totalRating: number;
  totalSold: number;
  totalBought: number;
  isEmailVerified: boolean;
  isNumberVerified: boolean;
  imagePath: string;
  imagePath250: string;
  registeredOn: string;
  isFollowing: boolean;
};

export type LookupList = {
  id: number;
  code: number;
  description: string;
  groupCode: number;
  groupDescription: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type ReportDto = {
  reportReasonLookupId: number;
  note: string;
};

export type ReportUserDto = {
  reportedCustomerId: string;
} & ReportDto;

export type ReportItemDto = {
  reportedItemId: string;
  reportedItemOwnerCustomerId: string;
} & ReportDto;

export type SearchQuery = {
  searchKeyword: string;
  categoryId?: number;
  childCategoryId?: number;
  subCategoryId?: number;
  distance?: number;
  locationLat?: number;
  locationLng?: number;
  conditionLookupId?: number;
  priceFrom?: number;
  priceTo?: number;
  sortByLookupId?: number;
  pageSize: number;
  pageIndex: number;
}

export type SearchResult = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: Item[];
}
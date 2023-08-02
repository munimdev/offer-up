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
  childCategoryId: number;
  subCategoryId: number;
  conditionLookUpId: number;
  conditionDescription: string;
  isPriceFixed: boolean;
  validUpto: string;
  isSold: boolean;
  isPromoted: boolean;
  customerId: number;
  userId: string;
  isArchived: boolean;
  locationLat: number;
  locationLng: number;
  zipCode: string;
  attributes: [];
  isActive: boolean;
  isDeleted: boolean;
};

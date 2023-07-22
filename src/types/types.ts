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

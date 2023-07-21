import React from "react";
import { Item } from "@/components/item/Item";

type Review = {
  comment: string;
  userImage: string;
};

type Contact = {
  phone: string;
  email: string;
};

type WorkHour = {
  day: string;
  start: string;
  end: string;
};

type ProductProps = React.ComponentPropsWithoutRef<typeof Item>;

type SellerProps = {
  type: "individual" | "company";
  displayName: string;
  imageUrl: string;
  rating: number;
  reviews: Review[];
  products: ProductProps[];
};

type SellerIndividualProps = SellerProps & {
  joinDate: Date;
  replyRate: number;
  emailVerified: boolean;
  bought: number; // Fixed typo
  sold: number;
  followers: number;
};

type SellerCompanyProps = SellerProps & {
  address: string;
  website: string;
  workingHours: WorkHour[];
  contact: Contact;
  about: string;
};

type SellerComponentProps = SellerCompanyProps | SellerIndividualProps;

const Seller = (props: SellerComponentProps) => {
  const {
    type,
    displayName,
    imageUrl,
    rating,
    reviews,
    products,
    ...otherProps
  } = props;

  // Determine the type of seller and render the appropriate component
  if (type === "individual") {
    const { joinDate, replyRate, emailVerified, bought, sold, followers } =
      otherProps as SellerIndividualProps;
  } else if (type === "company") {
    const { address, website, workingHours, contact, about } =
      otherProps as SellerCompanyProps;
  }

  return <div>I am a seller</div>;
};

export default Seller;

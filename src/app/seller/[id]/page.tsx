"use client";

import React from "react";
import {
  SellerCompanyProps,
  SellerIndividualProps,
  SellerComponentProps,
} from "@/types/types";
import IndividualSeller from "../components/IndividualSeller";
import CompanySeller from "../components/CompanySeller";
import { useFetchCategories, useFetch } from "@/hooks";
import * as Queries from "@/utils/queries";

function isIndividualSeller(
  seller: SellerComponentProps
): seller is SellerIndividualProps {
  return seller.type === "individual";
}

function isCompanySeller(
  seller: SellerComponentProps
): seller is SellerCompanyProps {
  return seller.type === "company";
}

// const individualSeller: SellerIndividualProps = {
//   type: "individual",
//   lastActice: new Date("2023-07-21 01:15:00"), // Last active date
//   displayName: "John Doe",
//   imageUrl: "https://placehold.co/500x500",
//   rating: 4.5,
//   reviews: [
//     {
//       comment:
//         "ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
//       userImage: "https://placehold.co/500x500",
//     },
//     {
//       comment:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, voluptatum. Recusandae impedit quisquam laborum molestias maxime incidunt nulla et voluptatem possimus, aliquid ipsam, cupiditate eveniet. Ea laborum porro accusamus veritatis?",
//       userImage: "https://placehold.co/500x500",
//     },
//     {
//       comment:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quibusdam. Recusandae impedit quisquam laborum molestias maxime",
//       userImage: "https://placehold.co/500x500",
//     },
//   ],
//   products: [
//     {
//       name: "Product 1",
//       price: 100,
//       imageUrl: "https://placehold.co/500x500",
//       navigateTo: "/",
//       location: "San Francisco, CA",
//     },
//     {
//       name: "Product 1",
//       price: 100,
//       imageUrl: "https://placehold.co/500x500",
//       navigateTo: "/",
//       location: "San Francisco, CA",
//     },
//     {
//       name: "Product 1",
//       price: 100,
//       imageUrl: "https://placehold.co/500x500",
//       navigateTo: "/",
//       location: "San Francisco, CA",
//     },
//     {
//       name: "Product 1",
//       price: 100,
//       imageUrl: "https://placehold.co/500x500",
//       navigateTo: "/",
//       location: "San Francisco, CA",
//     },
//   ],
//   joinDate: new Date("2022-11-27 03:48:22"),
//   replyRate: 100,
//   emailVerified: true,
//   bought: 10,
//   sold: 51,
//   followers: 14,
// };

// const companySeller: SellerCompanyProps = {
//   type: "company",
//   displayName: "John Doe",
//   imageUrl: "https://placehold.co/500x500",
//   rating: 4.7,
//   reviews: [
//     {
//       comment: "This is a review",
//       userImage: "https://placehold.co/500x500",
//     },
//     {
//       comment: "This is a review",
//       userImage: "https://placehold.co/500x500",
//     },
//     {
//       comment: "This is a review",
//       userImage: "https://placehold.co/500x500",
//     },
//   ],
//   products: [
//     {
//       name: "Product 1",
//       price: 100,
//       imageUrl: "https://placehold.co/500x500",
//       navigateTo: "/",
//       location: "San Francisco, CA",
//     },
//     {
//       name: "Product 1",
//       price: 100,
//       imageUrl: "https://placehold.co/500x500",
//       navigateTo: "/",
//       location: "San Francisco, CA",
//     },
//     {
//       name: "Product 1",
//       price: 100,
//       imageUrl: "https://placehold.co/500x500",
//       navigateTo: "/",
//       location: "San Francisco, CA",
//     },
//     {
//       name: "Product 1",
//       price: 100,
//       imageUrl: "https://placehold.co/500x500",
//       navigateTo: "/",
//       location: "San Francisco, CA",
//     },
//   ],
//   address: "123 Main St, San Francisco, CA",
//   website: "https://www.google.com",
//   workingHours: [
//     {
//       day: "Monday",
//       start: "9:00 AM",
//       end: "5:00 PM",
//     },
//     {
//       day: "Tuesday",
//       start: "9:00 AM",
//       end: "5:00 PM",
//     },
//     {
//       day: "Wednesday",
//       start: "9:00 AM",
//       end: "5:00 PM",
//     },
//     {
//       day: "Thursday",
//       start: "9:00 AM",
//       end: "5:00 PM",
//     },
//     {
//       day: "Friday",
//       start: "9:00 AM",
//       end: "5:00 PM",
//     },
//     {
//       day: "Saturday",
//       start: "9:00 AM",
//       end: "5:00 PM",
//     },
//     {
//       day: "Sunday",
//       start: "9:00 AM",
//       end: "5:00 PM",
//     },
//   ],
//   contact: {
//     phone: "123-456-7890",
//     email: "company@company.com",
//   },
//   about:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam ultrices, nisl velit ultrices nunc, quis aliquam diam nisl eu nunc. Sed euismod, diam id aliquam ultrices, nisl velit ultrices nunc, quis aliquam diam nisl eu nunc.",
// };

const SellerSection = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { data: sellerData } = useFetch({
    key: ["query-sellerData"],
    fn: () => Queries.userDetails({ id: id }),
    options: {
      enabled: true,
    },
  });

  const { data: sellerItems } = useFetch({
    key: ["query-sellerItems"],
    fn: () => Queries.userItems({ id: id }),
    options: {
      enabled: true,
    },
  });

  // return "hello"
  return (
    <IndividualSeller
      profile={sellerData?.dataObject}
      items={sellerItems?.dataObject}
    />
  );

  //  else if (isCompanySeller(props)) {
  //   return <CompanySeller {...props} />;
  // }

  // default return for unexpected cases.
  return null;
};

export default SellerSection;

import React from "react";
import { Item, ItemProps } from "@/components/item/Item";
import { SellerCompanyProps } from "@/types/types";
import { ItemList } from "@/components/item-list/ItemList";
import Review from "@/components/review/Review";

const CompanySeller = (props: SellerCompanyProps) => {
  const {
    displayName,
    imageUrl,
    rating,
    reviews,
    products,
    address,
    website,
    workingHours,
    contact,
    about,
  } = props;

  return (
    <div>
      <h2>{displayName}</h2>
      <img src={imageUrl} alt={displayName} />
      <p>Rating: {rating}</p>
      {reviews.map(({ comment, userImage }, index) => (
        <Review comment={comment} userImage={userImage} key={index} />
      ))}
      <h3>Products</h3>
      <ItemList itemsList={products} />
      <p>{address}</p>
      <a href={website}>Visit our website</a>
      <h3>Working hours:</h3>
      {workingHours.map((workHour, index) => (
        <div key={index}>
          <p>
            {workHour.day} - {workHour.start} to {workHour.end}
          </p>
        </div>
      ))}
      <p>
        Contact: {contact.phone}, {contact.email}
      </p>
      <p>{about}</p>
    </div>
  );
};

export default CompanySeller;

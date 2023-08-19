import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ItemAtom, User } from "./types";
import { Item } from "@/types/types";

export const userAtom = atomWithStorage<User | null>("user", {
  id: "",
  name: "",
  email: "",
  isActive: false,
  isDeleted: false,
});

export const itemFormDataAtom = atom<ItemAtom>({
  name: "",
  attributes: [],
  category: {
    id: 0,
    name: "",
    description: "",
    level: 0,
    parentCategoryId: 0,
    isActive: false,
    isDeleted: false,
  },
  subCategory: {
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
    isActive: false,
    isDeleted: false,
  },
  conditionLookUpId: 0,
  price: 0,
  isPriceFixed: true,
  validUpto: "2023-07-27",
  fullAddress: "",
  shortAddress: "",
  zipcode: "",
  locationLat: 111.111,
  locationLng: 222.222,
  images: [],
});

export const updateItemFormDataAtom = atom<Item | null>(null);

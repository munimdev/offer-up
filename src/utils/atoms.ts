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
  locationLat: 39.8283,
  locationLng: 98.5795,
  images: [],
});

export const updateItemFormDataAtom = atom<Item | null>(null);
export const zipCodeAtom = atom<string>("");
export const locationAtom = atom<{ lat: number; lng: number }>({
  lat: 39.8283,
  lng: 98.5795,
});
export const locationNameAtom = atom<string>("");
export const preferredDistanceAtom = atom<number[]>([20]);
export const categoryAtom = atom<{ id: number; name: string }>({
  id: 0,
  name: "",
});
export const subCategoryAtom = atom<{ id: number; name: string }>({
  id: 0,
  name: "",
});
export const conditionAtom = atom<{ id: number; name: string }>({
  id: 0,
  name: "",
});
export const searchQueryAtom = atom<{ query: string; location: string }>({
  query: "",
  location: "",
});
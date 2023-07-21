import { Axios, AxiosResponse } from "axios";
import instance from "./axios";

export const getCategories = (): Promise<AxiosResponse<any>> =>
  instance.get("/Category/getCategories");

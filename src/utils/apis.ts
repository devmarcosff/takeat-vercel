import axios from "axios";

export const api_delivery = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_categories_delivery = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CATEGORIES_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_Club = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_CLUB,
  headers: {
    "Content-Type": "application/json",
  },
});
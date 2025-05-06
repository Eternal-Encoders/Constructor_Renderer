import { USER_LOCALSTORAGE_KEY } from "./localstorage";

export const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''}` }
};
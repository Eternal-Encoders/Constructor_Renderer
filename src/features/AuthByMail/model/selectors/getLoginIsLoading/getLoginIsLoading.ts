import { createSelector } from "@reduxjs/toolkit";
import { LoginSchema } from "../../types/loginSchema";
import { getLogin } from "../getLogin/getLogin";

export const getLoginIsLoading = createSelector(getLogin, (form?: LoginSchema) => form?.isLoading || false); 
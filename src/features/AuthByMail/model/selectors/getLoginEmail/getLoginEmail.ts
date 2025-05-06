import { createSelector } from "@reduxjs/toolkit";
import { LoginSchema } from "../../types/loginSchema";
import { getLogin } from "../getLogin/getLogin";

export const getLoginEmail = createSelector(getLogin, (form?: LoginSchema) => form?.email || ''); 
import { createSelector } from "@reduxjs/toolkit";
import { LoginSchema } from "../../types/loginSchema";
import { getLogin } from "../getLogin/getLogin";

export const getLoginPassword = createSelector(getLogin, (form?: LoginSchema) => form?.password || ''); 
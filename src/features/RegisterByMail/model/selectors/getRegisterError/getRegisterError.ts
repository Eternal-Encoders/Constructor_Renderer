import { createSelector } from "@reduxjs/toolkit";
import { RegisterSchema } from "../../types/registerSchema";
import { getRegister } from "../getRegister/getRegister";

export const getRegisterError = createSelector(getRegister, (form?: RegisterSchema) => form?.error || ''); 
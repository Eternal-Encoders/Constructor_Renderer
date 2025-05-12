import { createSelector } from "@reduxjs/toolkit";
import { RegisterSchema } from "../../types/registerSchema";
import { getRegister } from "../getRegister/getRegister";

export const getRegisterIsLoading = createSelector(getRegister, (form?: RegisterSchema) => form?.isLoading || false); 
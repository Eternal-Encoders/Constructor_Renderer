import { createSelector } from "@reduxjs/toolkit";
import { RegisterSchema } from "../../types/registerSchema";
import { getRegister } from "../getRegister/getRegister";

export const getRegisterEmail = createSelector(getRegister, (form?: RegisterSchema) => form?.email || ''); 
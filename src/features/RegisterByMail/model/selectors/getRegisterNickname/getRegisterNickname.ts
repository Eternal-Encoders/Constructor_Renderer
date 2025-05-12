import { createSelector } from "@reduxjs/toolkit";
import { RegisterSchema } from "../../types/registerSchema";
import { getRegister } from "../getRegister/getRegister";

export const getRegisterNickname = createSelector(getRegister, (form?: RegisterSchema) => form?.nickname || ''); 
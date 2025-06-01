import { createSelector } from "@reduxjs/toolkit";
import { getUser } from "../getUser/getUser";

export const getUserAuthData = createSelector(getUser, (user) => user.authData);
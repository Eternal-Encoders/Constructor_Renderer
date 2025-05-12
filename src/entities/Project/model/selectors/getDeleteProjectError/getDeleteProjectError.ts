import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getDeleteProjectError = createSelector(getProject, (project) => project.patchError);
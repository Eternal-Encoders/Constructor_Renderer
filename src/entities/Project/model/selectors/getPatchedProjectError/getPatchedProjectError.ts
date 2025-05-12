import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getPatchedProjectError = createSelector(getProject, (project) => project.patchError);
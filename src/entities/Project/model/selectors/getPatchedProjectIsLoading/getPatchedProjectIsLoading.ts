import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getPatchedProjectIsLoading = createSelector(getProject, (project) => project.patchIsLoading);
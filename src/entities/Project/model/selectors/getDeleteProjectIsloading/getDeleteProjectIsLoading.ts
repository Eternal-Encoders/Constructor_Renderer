import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getDeleteProjectIsLoading = createSelector(getProject, (project) => project.patchIsLoading);
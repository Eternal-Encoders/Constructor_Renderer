import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getProjectIsLoading = createSelector(getProject, (project) => project.isLoading);
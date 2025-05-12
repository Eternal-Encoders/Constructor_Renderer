import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getProjectName = createSelector(getProject, (project) => project.name);
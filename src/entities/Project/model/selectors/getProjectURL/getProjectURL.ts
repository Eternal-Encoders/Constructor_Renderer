import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getProjectURL = createSelector(getProject, (project) => project.url);
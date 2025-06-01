import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getProjectIcon = createSelector(getProject, (project) => project.icon);
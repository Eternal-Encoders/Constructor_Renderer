import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getProjectDescription = createSelector(getProject, (project) => project.description);
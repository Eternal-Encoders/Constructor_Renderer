import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getProjectId = createSelector(getProject, (project) => project.id);
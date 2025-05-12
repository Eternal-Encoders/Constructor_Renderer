import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getProjectUpdatedAt = createSelector(getProject, (project) => project.updated_at);
import { createSelector } from "@reduxjs/toolkit";
import { getProject } from "../getProject/getProject";

export const getProjectCreatedAt = createSelector(getProject, (project) => project.created_at);
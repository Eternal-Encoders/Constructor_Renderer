import { createSelector } from "@reduxjs/toolkit";
import { AddProjectSchema } from "../../types/addProjectSchema";
import { getAddProject } from "../getAddProject/getAddProject";

export const getAddProjectError = createSelector(getAddProject, (form?: AddProjectSchema) => form?.error || ''); 
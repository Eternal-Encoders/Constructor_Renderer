import { createSelector } from "@reduxjs/toolkit";
import { AddProjectSchema } from "../../types/addProjectSchema";
import { getAddProject } from "../getAddProject/getAddProject";

// eslint-disable-next-line @stylistic/js/max-len
export const getAddProjectDescription = createSelector(getAddProject, (form?: AddProjectSchema) => form?.description || ''); 
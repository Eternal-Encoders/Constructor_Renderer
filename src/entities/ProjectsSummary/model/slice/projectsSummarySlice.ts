import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProjectsSummary } from "entities/ProjectsSummary/api/fetchProjectsSummary/fetchProjectsSummary";
import { ProjectSummary, ProjectSummarySchema } from "../types/projectsSummary";

const initialState: ProjectSummarySchema = {
  isLoading: false,
}

const projectsSummarySlice = createSlice({
  name: 'projectsSummary',
  initialState,
  reducers: {
    initProjects: (state, action: PayloadAction<ProjectSummary[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<ProjectSummary>) => {
      state.projects?.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      const index = state.projects!.map(project => {
        return project.id;
      }).indexOf(action.payload);

      state.projects?.splice(index, 1);
    },
    clearProjects: (state) => {
      state.projects?.splice(0, state.projects?.length);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsSummary.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(fetchProjectsSummary.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProjectsSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: projectsSummaryActions } = projectsSummarySlice;
export const { reducer: projectsSummaryReducer } = projectsSummarySlice;
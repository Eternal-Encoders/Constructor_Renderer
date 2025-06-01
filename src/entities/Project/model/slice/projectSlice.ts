import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteProject } from "../../api/deleteProject/deleteProject";
import { fetchProject } from "../../api/fetchProject/fetchProject";
import { patchProject } from "../../api/patchProject/patchProject";
import { Icon } from "../types/icon";
import { Project, ProjectSchema } from "../types/project";

const initialState: ProjectSchema = {
  id: '',
  name: '',
  url: '',
  status: false,
  description: '',
  icon: Icon.CROSS,
  buildingIds: [],
  customGraphPointTypes: [],
  imageId: null,
  created_at: new Date(),
  updated_at: new Date(),
  isLoading: false,
  patchIsLoading: false,
  deleteIsLoading: false,
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => { 
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => { 
      state.name = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => { 
      state.status = action.payload;
    },
    setURL: (state, action: PayloadAction<string>) => { 
      state.url = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => { 
      state.id = action.payload;
    },
    setIcon: (state, action: PayloadAction<Icon>) => { 
      state.icon = action.payload;
    },
    setCreatedAt: (state, action: PayloadAction<Date>) => { 
      state.created_at = action.payload;
    },
    setUpdatedAt: (state, action: PayloadAction<Date>) => { 
      state.updated_at = action.payload;
    },
    initProject: (state, action: PayloadAction<Project>) => { 
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.icon = action.payload.icon;
      state.url = action.payload.url;
      state.buildingIds = action.payload.buildingIds;
      state.customGraphPointTypes = action.payload.customGraphPointTypes;
      state.imageId = action.payload.imageId;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
    },
    clearProject: (state) => { 
      state.id = '';
      state.name = '';
      state.description = '';
      state.icon = Icon.CROSS;
      state.url = '';
      state.buildingIds = [];
      state.customGraphPointTypes = [];
      state.imageId = null;
      state.created_at = new Date();
      state.updated_at = new Date();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(fetchProject.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(patchProject.pending, (state) => {
      state.patchError = undefined;
      state.patchIsLoading = true;
    })
      .addCase(patchProject.fulfilled, (state) => {
        state.patchIsLoading = false;
      })
      .addCase(patchProject.rejected, (state, action) => {
        state.patchIsLoading = false;
        state.patchError = action.payload;
      });
    builder.addCase(deleteProject.pending, (state) => {
      state.deleteError = undefined;
      state.deleteIsLoading = true;
    })
      .addCase(deleteProject.fulfilled, (state) => {
        state.deleteIsLoading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.deleteIsLoading = false;
        state.deleteError = action.payload;
      });
  },
})

export const { actions: projectActions } = projectSlice;
export const { reducer: projectReducer } = projectSlice;
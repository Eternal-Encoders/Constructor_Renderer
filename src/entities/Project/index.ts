export { fetchProject } from './api/fetchProject/fetchProject';
export { getDeleteProjectError } from './model/selectors/getDeleteProjectError/getDeleteProjectError';
export { getDeleteProjectIsLoading } from './model/selectors/getDeleteProjectIsloading/getDeleteProjectIsLoading';
export { getPatchedProjectError } from './model/selectors/getPatchedProjectError/getPatchedProjectError';
export { getPatchedProjectIsLoading } from './model/selectors/getPatchedProjectIsLoading/getPatchedProjectIsLoading';
export { getProject } from './model/selectors/getProject/getProject';
export { getProjectCreatedAt } from './model/selectors/getProjectCreatedAt/getProjectCreatedAt';
export { getProjectDescription } from './model/selectors/getProjectDescription/getProjectDescription';
export { getProjectError } from './model/selectors/getProjectError/getProjectError';
export { getProjectIcon } from './model/selectors/getProjectIcon/getProjectIcon';
export { getProjectId } from './model/selectors/getProjectId/getProjectId';
export { getProjectIsLoading } from './model/selectors/getProjectIsLoading/getProjectIsLoading';
export { getProjectName } from './model/selectors/getProjectName/getProjectName';
export { getProjectUpdatedAt } from './model/selectors/getProjectUpdatedAt/getProjectUpdatedAt';
export { getProjectURL } from './model/selectors/getProjectURL/getProjectURL';
export { projectActions, projectReducer } from './model/slice/projectSlice';
export { Icon } from './model/types/icon';
export type { Project, ProjectSchema } from './model/types/project';


import { Building } from "entities/Building/ui/Building/Building";
import { AuthPage } from "pages/AuthPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { ProjectPage } from "pages/ProjectPage";
import { ReviewPage } from "pages/ReviewPage";
import { RouteProps } from "react-router";
import { Constructor } from "shared/ui/Constructor/Constructor";

export enum AppRoutes {
  AUTH  = 'auth',
  PROJECT_SELECTION = 'project_selection',
  REVIEW = 'review',
  ANALYTICS = 'analytics',
  MODULES = 'modules',
  CONSTRUCTOR = 'constructor',
  PRIVILEGES = 'privileges',
  BUILDING_SELECTION = 'building_selection',
  NOT_FOUND = 'not_found',
  PROFILE = 'profile'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.PROJECT_SELECTION]: '/projectSelection',
  [AppRoutes.REVIEW]: '/review',
  [AppRoutes.ANALYTICS]: '/analytics',
  [AppRoutes.MODULES]: '/modules',
  [AppRoutes.CONSTRUCTOR]: '/constructor',
  [AppRoutes.PRIVILEGES]: '/privileges',
  [AppRoutes.BUILDING_SELECTION]: '/buildingSelection',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.AUTH]: {
    path: RoutePath.auth,
    element: <AuthPage />
  },
  [AppRoutes.PROJECT_SELECTION]: {
    path: RoutePath.project_selection,
    element: <ProjectPage />
  },
  [AppRoutes.REVIEW]: {
    path: RoutePath.review,
    element: <ReviewPage />
  },
  [AppRoutes.ANALYTICS]: {
    path: RoutePath.analytics,
    element: <ProfilePage />
  },
  [AppRoutes.MODULES]: {
    path: RoutePath.modules,
    element: <ProfilePage />
  },
  [AppRoutes.CONSTRUCTOR]: {
    path: RoutePath.constructor,
    element: <Constructor />
  },
  [AppRoutes.PRIVILEGES]: {
    path: RoutePath.privileges,
    element: <ProfilePage />
  },
  [AppRoutes.BUILDING_SELECTION]: {
    path: RoutePath.building_selection,
    element: <Building />
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  },
};
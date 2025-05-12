export enum ENavigationCategory {
  Review = 'Обзор',
  Analytics = 'Аналитика',
  Modules = 'Модули',
  Constructor = 'Конструктор',
  Privileges = 'Привелегии',
  ProjectSelection = 'Выбор проекта',
  BuildingSelection = 'Конструктор - выбор здания',
  None = ''
}

export interface NavigationSchema {
  selectedCategory: ENavigationCategory.Review | 
  ENavigationCategory.Analytics | 
  ENavigationCategory.Modules | 
  ENavigationCategory.Constructor | 
  ENavigationCategory.Privileges | 
  ENavigationCategory.ProjectSelection |
  ENavigationCategory.BuildingSelection |
  ENavigationCategory.None;
}
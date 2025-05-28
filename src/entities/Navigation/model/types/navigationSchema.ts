export enum ENavigationCategory {
  Analytics = 'Аналитика',
  Modules = 'Модули',
  Constructor = 'Конструктор',
  Privileges = 'Привелегии',
  ProjectSelection = 'Выбор проекта',
  BuildingSelection = 'Конструктор - выбор здания',
  None = ''
}

export interface NavigationSchema {
  selectedCategory:
  ENavigationCategory.Analytics | 
  ENavigationCategory.Modules | 
  ENavigationCategory.Constructor | 
  ENavigationCategory.Privileges | 
  ENavigationCategory.ProjectSelection |
  ENavigationCategory.BuildingSelection |
  ENavigationCategory.None;
}
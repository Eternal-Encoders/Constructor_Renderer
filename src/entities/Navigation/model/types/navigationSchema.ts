export enum ENavigationCategory {
  Review = 'Обзор',
  Analytics = 'Аналитика',
  Modules = 'Модули',
  Constructor = 'Конструктор',
  Privileges = 'Привелегии',
  None = ''
}

export enum ENavigationSubCategory {
  ProjectSelection = 'Выбор проекта',
  None = ''
}

export interface NavigationSchema {
  selectedCategory: ENavigationCategory.Review | 
  ENavigationCategory.Analytics | 
  ENavigationCategory.Modules | 
  ENavigationCategory.Constructor | 
  ENavigationCategory.Privileges | 
  ENavigationCategory.None;

  selectedSubCategory: ENavigationSubCategory.ProjectSelection | ENavigationSubCategory.None;
}
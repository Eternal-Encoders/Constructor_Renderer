import Settings from 'assets/Settings.svg?react';
import classNames from 'classnames';
import { ECategoryModule } from 'pages/ReviewPage';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig.';
import { ButtonText } from 'shared/ui/ButtonText/ButtonText';
import { CardCommercial } from 'shared/ui/CardCommercial/CardCommercial';
import { Input } from 'shared/ui/Input/Input';
import { TextTheme } from 'shared/ui/Text/Text';
import { Toggle } from 'shared/ui/Toggle/Toggle';
import cls from './ModulesPage.module.scss';

const ModulesPage = () => {
  const navigate = useNavigate();

  return (
    <div className={cls.ModulesPage}>
      <ul role='list' className={cls.ModulesPage__list}>
        <div className={classNames(cls.ModulesPage__leftBlock)}>
          <ButtonText 
            onClick={() => navigate(RoutePath.modules)}
            size='medium' 
            type='fill' 
            theme={TextTheme.INVERTED} 
            iconLeft={<Settings fill="white"/>} 
            style={{
              width: '100%', 
              flexShrink: 0,
              marginBottom: 16, 
              boxShadow: '0px 0px 10px 0px rgba(50, 69, 100, 0.10)'
            }}
          >
            Управление модулями
          </ButtonText>
          <div className={cls.search}>
            <Input 
              autoFocus
              placeholder='Поиск'
              size='small'
              iconRight={'🔍'}
              borderRadius={'4px'}
            />
          </div>
          <div
            className={classNames(cls.FilterAndCategory)}
          >
            <section 
              className={classNames(cls.Filter)}
            >
              <h6 className={classNames(cls.Filter__title)}>
                Фильтр
              </h6>
              <Toggle color='blue' text='Купленные' className={cls.CategoryToggle}/>
              <Toggle color='blue' text='Рекомендуемые' className={cls.CategoryToggle}/>
              <Toggle color='blue' text='Со скидкой' className={cls.CategoryToggle}/>
            </section>
            <section
              className={classNames(cls.Category)}
            >
              <h6 className={classNames(cls.Category__title)}>
                Категория
              </h6>
              <Toggle color='blue' text='Техническое' className={cls.CategoryToggle}/>
              <Toggle color='blue' text='Конструктор' className={cls.CategoryToggle}/>
              <Toggle color='blue' text='ИИ-инструменты' className={cls.CategoryToggle}/>
              <Toggle color='blue' text='Типографика' className={cls.CategoryToggle}/>
            </section>
          </div>
          <ButtonText
            onClick={() => navigate(RoutePath.analytics)}
            size='medium' 
            type='default' 
            theme={TextTheme.PRIMARY} 
            style={{
              width: '100%', 
              flexShrink: 0,
              marginBottom: 16, 
              boxShadow: '0px 0px 10px 0px rgba(50, 69, 100, 0.10)'
            }}
          >
            Применить
          </ButtonText>
          <ButtonText
            onClick={() => navigate(RoutePath.analytics)}
            size='medium' 
            type='default' 
            theme={TextTheme.PRIMARY} 
            style={{
              width: '100%', 
              flexShrink: 0,
              marginBottom: 16, 
              boxShadow: '0px 0px 10px 0px rgba(50, 69, 100, 0.10)'
            }}
          >
            Сбросить
          </ButtonText>
        </div>
        <div className={classNames(cls.ModulesPage__rightBlock)}>
          <li className={cls.ModulesPage__item} style={{marginBottom: 12, marginRight: 12}}>
            <CardCommercial 
              category={ECategoryModule.AI} 
              title="Распознавание чертежей" 
              description="Автоматическое распознавание чертежей&nbsp;БТИ " 
              priceValue={8000}
              color={'#3974AA'}
              background={'rgba(57, 116, 170, 0.20)'}
              imgSrc={'/scheme.png'}
            />
          </li>
          <li className={cls.ModulesPage__item} style={{marginBottom: 12, marginRight: 12}}>
            <CardCommercial 
              category={ECategoryModule.TYPOGRAPHY} 
              title="Экспорт карты в изображение" 
              description="Экспорт карт из «Конструктора» в&nbsp;форматы SVG, PNG, JPEG" 
              priceValue={3200}
              color={'#E88F00'}
              background={'rgba(232, 143, 0, 0.20)'}
              imgSrc={'/loupe.png'}
            />
          </li>
          <li className={cls.ModulesPage__item} style={{marginBottom: 12, marginRight: 12}}>
            <CardCommercial 
              category={ECategoryModule.TECHNICAL} 
              title="Доступ к API" 
              description="Доступ к API сервиса" 
              priceValue={3000}
              color={'#549800'}
              background={'rgba(84, 152, 0, 0.20)'}
              imgSrc={'/settings.png'}
            />
          </li>
          <li className={cls.ModulesPage__item} style={{marginBottom: 12, marginRight: 12}}>
            <CardCommercial 
              category={ECategoryModule.AI} 
              title="Автопостроение графов" 
              description="Автоматическое построение маршрутных&nbsp;графов" 
              priceValue={5000}
              color={'#3974AA'}
              background={'rgba(57, 116, 170, 0.20)'}
              imgSrc={'/scheme.png'}
            />
          </li>
          <li className={cls.ModulesPage__item} style={{marginBottom: 12, marginRight: 12}}>
            <CardCommercial 
              category={ECategoryModule.CONSTRUCTOR} 
              title="Неограниченное количество зданий" 
              description="Снятие ограничения на количество зданий" 
              priceValue={3200}
              color={'#FF5B60'}
              background={'rgba(255, 77, 80, 0.20)'}
              imgSrc={'/map.png'}
            />
          </li>
          <li className={cls.ModulesPage__item} style={{marginBottom: 12, marginRight: 12}}>
            <CardCommercial 
              category={ECategoryModule.CONSTRUCTOR} 
              title="Неограниченное количество этажей" 
              description="Снятие ограничения на количество этажей" 
              priceValue={3000}
              color={'#FF5B60'}
              background={'rgba(255, 77, 80, 0.20)'}
              imgSrc={'/map.png'}
            />
          </li>
          <li className={cls.ModulesPage__item} style={{marginBottom: 12, marginRight: 12}}>
            <CardCommercial 
              category={ECategoryModule.CONSTRUCTOR} 
              title="Расширенная кастомизация" 
              description="Добавление собственных иконок" 
              priceValue={5000}
              color={'#FF5B60'}
              background={'rgba(255, 77, 80, 0.20)'}
              imgSrc={'/map.png'}
            />
          </li>
        </div>
      </ul>
    </div>
  );     
};
      
export default ModulesPage;
import Settings from 'assets/Settings.svg?react';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig.';
import { ButtonText } from 'shared/ui/ButtonText/ButtonText';
import { CardCommercial } from 'shared/ui/CardCommercial/CardCommercial';
import { CardWide } from 'shared/ui/CardWide/CardWide';
import { TextTheme } from 'shared/ui/Text/Text';
import { ECategoryModule } from '../types/ECategoryModule';
import cls from './ReviewPage.module.scss';

const ReviewPage = () => {

  const navigate = useNavigate();

  const constructorIcon = () => <div style={{color: 'white'}}>🔧</div>;

  return (
    <div className={cls.ReviewPage}>
      <ul role='list' className={cls.ReviewPage__list} style={{marginRight: 16}}>
        <ButtonText 
          onClick={() => navigate(RoutePath.building_selection)}
          size='small' 
          type='fill' 
          theme={TextTheme.INVERTED} 
          iconLeft={constructorIcon()} 
          style={{
            width: '100%', 
            marginBottom: 12, 
            boxShadow: '0px 0px 10px 0px rgba(50, 69, 100, 0.10)'
          }}
        >
          В конструктор
        </ButtonText>
        <li className={classNames(cls.Continuework)} style={{marginBottom: 16}}>
          <h5 className={classNames(cls.Continuework__title, cls.title)}>Продолжить работу со зданием &#9432;</h5>
          <ul role='list' className={cls.microCard}>
            <li className={cls.microCard__item} style={{marginRight: 8}}>
              <h6 className={cls.microCard__title}>ИРИТ-РТФ</h6>
              <span className={cls.microCard__description}>15 апр. 14:12</span>
            </li>
            <li className={cls.microCard__item} style={{marginRight: 8}}>
              <h6 className={cls.microCard__title}>ГУК</h6>
              <span className={cls.microCard__description}><div>8 апр. 10:57</div></span>
            </li>
            <li className={cls.microCard__item}>
              <h6 className={cls.microCard__title}>ФТИ</h6>
              <span className={cls.microCard__description}>8 апр. 09:34</span>
            </li>
          </ul>
        </li>
        <li className={classNames(cls.Status)}>
          <h5 className={classNames(cls.Status__title, cls.title)}>Статус</h5>
          <ul role='list' className={cls.Status__list}>
            <li className={cls.Status__item} style={{marginBottom: 8}}>
              <h6 className={cls.Status__itemTitle}>ИРИТ-РТФ</h6>
              <aside className={cls.Status__aside}>
                <span className={cls.Status__mode}>Активно</span>
                <div className={cls.circle_green}></div>
              </aside>
            </li>
            <li className={cls.Status__item} style={{marginBottom: 8}}>
              <h6 className={cls.Status__itemTitle}>ГУК</h6>
              <span className={cls.Status__description}>
                <aside className={cls.Status__aside}>
                  <span className={cls.Status__mode}>Отключено</span>
                  <div className={cls.circle_red}></div>
                </aside>
              </span>
            </li>
            <li className={cls.Status__item} style={{marginBottom: 8}}>
              <h6 className={cls.Status__itemTitle}>ФТИ</h6>
              <span className={cls.Status__description}>
                <aside className={cls.Status__aside}>
                  <span className={cls.Status__mode}>Отключено</span>
                  <div className={cls.circle_red}></div>
                </aside>
              </span>
            </li>
            <li className={cls.Status__item} style={{marginBottom: 8}}>
              <h6 className={cls.Status__itemTitle}>ХТИ</h6>
              <span className={cls.Status__description}>
                <aside className={cls.Status__aside}>
                  <span className={cls.Status__mode}>Отключено</span>
                  <div className={cls.circle_red}></div>
                </aside>
              </span>
            </li>
            <li className={cls.Status__item}>
              <h6 className={cls.Status__itemTitle}>ИНМТ</h6>
              <span className={cls.Status__description}>
                <aside className={cls.Status__aside}>
                  <span className={cls.Status__mode}>Активно</span>
                  <div className={cls.circle_green}></div>
                </aside>
              </span>
            </li>
          </ul>
        </li>
      </ul>
      <ul role='list' className={cls.ReviewPage__list} style={{marginRight: 16}}>
        <li style={{marginBottom: 12}}>
          <CardWide
            date={new Date()} 
            isGreen={true} 
            stonksValue={300}
            numberValue={998} 
            percentValue={30} 
            title="Просмотры"/>
        </li>
        <li>
          <CardWide
            date={new Date()} 
            isGreen={true} 
            stonksValue={20}
            numberValue={599} 
            percentValue={11} 
            title="Новые клиенты"/>
        </li>
      </ul>
      <ul role='list' className={cls.ReviewPage__list} style={{marginRight: 16}}> 
        <li style={{marginBottom: 12}}>
          <CardWide
            date={new Date()} 
            isGreen={true} 
            stonksValue={20}
            numberValue={1300} 
            percentValue={50} 
            title="Посетители"/>
        </li>
        <li>
          <CardWide
            date={new Date()} 
            isGreen={false} 
            stonksValue={24}
            numberValue={501} 
            percentValue={12} 
            title="Старые клиенты"/>
        </li> 
      </ul>
      <ul role='list' className={cls.ReviewPage__list}>
        <ButtonText 
          onClick={() => navigate(RoutePath.analytics)}
          size='small' 
          type='fill' 
          theme={TextTheme.INVERTED} 
          iconLeft={<Settings fill="white"/>} 
          style={{
            width: '100%', 
            marginBottom: 12, 
            boxShadow: '0px 0px 10px 0px rgba(50, 69, 100, 0.10)'
          }}
        >
          Управление модулями
        </ButtonText>
        <li style={{marginBottom: 12}}>
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
        <li style={{marginBottom: 12}}>
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
        <li style={{marginBottom: 12}}>
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
        <li>
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
      </ul>
    </div>
  );     
};
      
export default ReviewPage;
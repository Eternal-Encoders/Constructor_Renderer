import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { CardWide } from 'shared/ui/CardWide/CardWide';
import { ReactChart } from 'shared/ui/Chart/Chart';
import { Loader } from 'shared/ui/Loader/Loader';
import { Toggle } from 'shared/ui/Toggle/Toggle';
import cls from './AnalyticsPage.module.scss';

const AnalyticsPage = () => {
  const [isVisibility, setIsVisibility] = useState(false);

  const onSuccess = useCallback(() => {
    setIsVisibility(true);
  }, []);

  return (
    <div className={cls.AnalyticsPage}>
      <div className={cls.AnalyticsPage__wrapper}>
        <div className={cls.AnalyticsPage__chartWrapper} style={{marginRight: 16}}>
          <h5 className={classNames(cls.ChartWrapper__title, cls.title)}>
            Старые и новые клиенты
          </h5>
          <div className={cls.AnalyticsPage__chart}>
            {!isVisibility && <Loader/>}
            <ReactChart onSuccess={onSuccess}/>
          </div>
          <div className={classNames(cls.ChartWrapper__aside, cls.Toggle)}>
            <Toggle text='Новые&nbsp;клиенты' className={cls.toggle}/> 
            <Toggle text='Старые&nbsp;клиенты' color='red' className={classNames(cls.toggle, cls.oldClients)}/>
          </div>
        </div>
        <ul role='list' className={cls.AnalyticsPage__list} style={{marginRight: 16}}>
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
        <ul role='list' className={cls.AnalyticsPage__list}> 
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
      </div>
      <div className={classNames(cls.AnalyticsPage__table, cls.Table)}>
        <div className={cls.Table__header}>
          <h5 className={classNames(cls.Table__title)}>
            Детализация посещений
          </h5>
          <span className={classNames(cls.Table__subtitle)}>
            последние 10
          </span>
        </div>
        <div className={cls.Table__body}>
          <table className={cls.table}>
            <thead>
              <tr>
                <th>Посетитель</th>
                <th>Первый визит</th>
                <th>Последний визит</th>
                <th>Авторизован</th>
                <th>Глубина</th>
                <th>Общее время на сайте</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Иван Иванов (студент)</td>
                <td>12.04.2025</td>
                <td>12.04.2025</td>
                <td>—</td>
                <td>1</td>
                <td>1:12</td>
              </tr>
              <tr>
                <td>Григорий Григорьев (студент)</td>
                <td>04.03.2025</td>
                <td>04.03.2025</td>
                <td>12/07/1983</td>
                <td>2</td>
                <td>55:12</td>
              </tr>
              <tr>
                <td>Неизвестный пользователь (109.111.128.0)</td>
                <td>04.03.2025</td>
                <td>04.03.2025</td>
                <td>—</td>
                <td>1</td>
                <td>0:00</td>
              </tr>
              <tr>
                <td>Евгений Евгеньев (персонал)</td>
                <td>11.04.2025</td>
                <td>11.04.2025</td>
                <td>4</td>
                <td>9</td>
                <td>0:15</td>
              </tr>
              <tr>
                <td>Неизвестный пользователь (195.248.248.0)</td>
                <td>04.03.2025</td>
                <td>04.03.2025</td>
                <td>—</td>
                <td>1</td>
                <td>12:14</td>
              </tr>
              <tr>
                <td>Неизвестный пользователь (83.169.192.0)</td>
                <td>04.03.2025</td>
                <td>04.03.2025</td>
                <td>—</td>
                <td>2</td>
                <td>6:24</td>
              </tr>
              <tr>
                <td>Тимур Тимуров (персонал)</td>
                <td>08.04.2025</td>
                <td>08.04.2025</td>
                <td>02/17/1980</td>
                <td>6</td>
                <td>2:10</td>
              </tr>
              <tr>
                <td>Неизвестный пользователь (83.169.192.0)</td>
                <td>04.03.2025</td>
                <td>04.03.2025</td>
                <td>12/13/1981</td>
                <td>5</td>
                <td>0:15</td>
              </tr>
              <tr>
                <td>Тимур Тимуров (персонал)</td>
                <td>08.04.2025</td>
                <td>08.04.2025</td>
                <td>—</td>
                <td>01/20/1985</td>
                <td>12:14</td>
              </tr>
              <tr>
                <td>Неизвестный пользователь (83.169.192.0)</td>
                <td>04.03.2025</td>
                <td>04.03.2025</td>
                <td>—</td>
                <td>4</td>
                <td>6:24</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );     
};
      
export default AnalyticsPage;
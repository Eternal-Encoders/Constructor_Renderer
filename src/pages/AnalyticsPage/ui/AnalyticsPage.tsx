import { CardWide } from 'shared/ui/CardWide/CardWide';
import cls from './AnalyticsPage.module.scss';

const AnalyticsPage = () => {

  return (
    <div className={cls.AnalyticsPage}>
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
  );     
};
      
export default AnalyticsPage;
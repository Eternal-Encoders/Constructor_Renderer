import classNames from "classnames";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import cls from "./Information.module.scss";

interface IInformationProps {
  className?: string;
}

export const Information = ({ className }: IInformationProps) => {

  const getInformationTitle = () => {
    const isObject = false;
    const isBuilding = true;

    if (isObject) {
      return 'Информация об объекте';
    }
    if (isBuilding) {
      return 'Информация о здании';
    } else {
      return 'Инфмормация о чём-то...';
    }
  }

  return (
    <div className={classNames(cls.Information, {}, [className])}>
      <header className={classNames(cls.Information__header)} style={{ marginBottom: '8px' }}>
        <h4 className={classNames(cls.Information__title)}>
          {getInformationTitle()}
        </h4>
      </header>
      <div className={classNames(cls.Information__content)}>
        {/* <section className={classNames(cls.Section, cls.Information__button)} style={{ marginBottom: '8px' }}>
          <Toggle text="Активно"/>
        </section> */}
        <section className={classNames(cls.Section, cls.Information__section, cls.Information__name)} 
          style={{ marginBottom: '8px' }}>
          <h5 className={classNames(cls.Section__title)} 
            style={{ marginBottom: '8px' }}>
            Название
          </h5>
          <Input className={classNames(cls.Information__input)}/>
        </section>
        <section className={classNames(cls.Section, cls.Information__section, cls.Information__description)} 
          style={{ marginBottom: '8px' }}>
          <h5 className={classNames(cls.Section__title)} 
            style={{ marginBottom: '8px' }}>
            Описание
          </h5>
          <TextArea className={classNames(cls.Information__textarea)} rows={3} ></TextArea>
        </section>
        <section className={classNames(cls.Section, cls.Information__section, cls.Information__synonyms)} >
          <h5 className={classNames(cls.Section__title)} 
            style={{ marginBottom: '8px' }}>
            Синонимы
          </h5>
          <TextArea className={classNames(cls.Information__textarea)} rows={3} ></TextArea>
        </section>
      </div>
    </div>
  );
};

import classNames from "classnames";
import { FigureType, Polygon, Rectangle } from "entities/Figure";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import cls from "./Information.module.scss";

interface IInformationProps {
  className?: string;
  figure: (Polygon | Rectangle);
  selectedId: string | null;
  selectedFigure: FigureType;
  setSelectedFigure: (figure: FigureType) => void;
}

export const Information = ({ 
  className, 
  selectedId, 
  figure,
}: IInformationProps) => {

  return (
    <div className={classNames(cls.Information, {}, [className])}>
      <header className={classNames(cls.Information__header)} style={{ marginBottom: '8px' }}>
        <h4 className={classNames(cls.Information__title)}>
          {selectedId ? 'Информация об объекте' : 'Настройки холста'}
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
          <Input 
            className={classNames(cls.Information__input)} 
            placeholder="Название объекта"
            value={figure?.name || ''}
          />
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

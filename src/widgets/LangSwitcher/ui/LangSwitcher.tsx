import { useTranslation } from "react-i18next";

interface ILangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: ILangSwitcherProps) => {

  const {t, i18n} = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div>
      <button onClick={toggle}>{t('Переключить перевод')}</button>
    </div>
  );
};

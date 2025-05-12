import LogoIcon from 'assets/LogoIcon.svg?react';
import LogoText from 'assets/LogoText.svg?react';
import classNames from 'classnames';
import cls from "./Logo.module.scss";

interface ILogo {
  topLeft?: boolean;
  center?: boolean;
  className?: string;
}

export const Logo = (props: ILogo) => {

  const {
    topLeft = true,
    center = false,
    className,
  } = props;

  const mods = {
    [cls.topLeft]: topLeft,
    [cls.center]: center
  };

  return (
    <div className={classNames(cls.Logo, mods, [className])}>
      <LogoIcon style={{marginRight: 10}}/>
      <LogoText fill="#262626"/>
    </div>
  );
};

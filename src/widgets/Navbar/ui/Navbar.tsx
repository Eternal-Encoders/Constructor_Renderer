import LogoIcon from 'assets/LogoIcon.svg?react';
import LogoText from 'assets/LogoText.svg?react';
import classNames from "classnames";
import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/AuthByMail";
import { RegisterModal } from "features/RegisterByMail";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import cls from "./Navbar.module.scss";

interface INavbarProps {
  className?: string;
}

export const Navbar = ({ className }: INavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onRegisterCloseModal = useCallback(() => {
    setIsRegisterModal(false);
  }, []);

  const onShowAuthModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onShowRegisterModal = useCallback(() => {
    setIsRegisterModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={classNames(cls.Navbar__content)}>
          <div className={classNames(cls.Logo)}>
            <LogoIcon style={{marginRight: 10}}/>
            <LogoText fill="#262626"/>
          </div>
          <div className={classNames(cls.links)}>
            <ButtonText 
              onClick={onShowRegisterModal}
              className={classNames(cls.registerLink)} 
            >
              Зарегистрироваться
            </ButtonText>
            <RegisterModal 
              isOpen={isRegisterModal}
              onClose={onRegisterCloseModal}
            />
            <ButtonText 
              onClick={onLogout} 
            >
              Выйти
            </ButtonText>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={classNames(cls.Navbar__content)}>
        <div className={classNames(cls.Logo)}>
          <LogoIcon style={{marginRight: 10}}/>
          <LogoText fill="#262626"/>
        </div>
        <div className={classNames(cls.links)}>
          <ButtonText 
            onClick={onShowRegisterModal}
            className={classNames(cls.registerLink)} 
          >
            Зарегистрироваться
          </ButtonText>
          <RegisterModal 
            isOpen={isRegisterModal}
            onClose={onRegisterCloseModal}
          />
          <ButtonText 
            onClick={onShowAuthModal} 
          >
            Войти
          </ButtonText>
          {isAuthModal && <LoginModal 
            isOpen={isAuthModal}
            onClose={onCloseModal}
          />}
        </div>
      </div>
    </div>
  );
};

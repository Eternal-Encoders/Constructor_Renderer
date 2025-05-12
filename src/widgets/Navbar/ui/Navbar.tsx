import classNames from "classnames";
import { navigationActions } from 'entities/Navigation/model/slice/navigationSlice';
import { ENavigationCategory } from 'entities/Navigation/model/types/navigationSchema';
import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/AuthByMail";
import { RegisterModal } from "features/RegisterByMail";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Logo } from "shared/ui/Logo/Logo";
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
          <Logo/>
          <div className={classNames(cls.links)}>
            <div style={{display: 'flex', gap: 16, marginRight: 28}}>
              <ButtonText 
                size='medium' 
                type='link' 
                className={classNames({[cls.selected] : true})}
                onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.ProjectSelection ))}
              >
                Проекты
              </ButtonText>
              <ButtonText 
                size='medium' 
                type='link' 
                className={classNames({[cls.selected] : false})}
              >
                Документация
              </ButtonText>
              <ButtonText 
                size='medium' 
                type='link' 
                className={classNames({[cls.selected] : false})}
              >
                Поддержка
              </ButtonText>
            </div>
            <ButtonText 
              size='medium' 
              type='link'
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
              size='medium' 
              type='link' 
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
        <Logo/>
        <div className={classNames(cls.links)}>
          <div style={{display: 'flex', gap: 16, marginRight: 28}}>
            <ButtonText 
              size='medium' 
              type='link' 
              className={classNames({[cls.selected] : true})}
              onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.ProjectSelection ))}
            >
              Проекты
            </ButtonText>
            <ButtonText 
              size='medium' 
              type='link' 
              className={classNames({[cls.selected] : false})}
            >
              Документация
            </ButtonText>
            <ButtonText 
              size='medium' 
              type='link' 
              className={classNames({[cls.selected] : false})}
            >
              Поддержка
            </ButtonText>
          </div>
          <ButtonText 
            size='medium' 
            type='default'
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
            size='medium' 
            type='default' 
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

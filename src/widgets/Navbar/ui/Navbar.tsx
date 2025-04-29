import classNames from "classnames";
import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/AuthByUsername";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import cls from "./Navbar.module.scss";

interface INavbarProps {
  className?: string;
}

export const Navbar = ({ className }: INavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <ButtonText 
          onClick={onLogout} 
          className={classNames(cls.links, {}, [className])}>
          Выйти
        </ButtonText>
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <ButtonText 
        onClick={onShowModal} 
        className={classNames(cls.links, {}, [className])}>
        Войти
      </ButtonText>
      {isAuthModal && <LoginModal 
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />}
    </div>
  );
};

import classNames from "classnames";
import { LoginModal } from "features/AuthByUsername";
import { useCallback, useState } from "react";
import cls from "./Navbar.module.scss";

interface INavbarProps {
  className?: string;
}

export const Navbar = ({ className }: INavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <button 
        onClick={onShowModal} 
        className={classNames(cls.links, {}, [className])}>
        Войти
      </button>
      <LoginModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </div>
  );
};

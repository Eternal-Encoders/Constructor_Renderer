import classNames from "classnames";
import { Suspense } from "react";
import { Loader } from "shared/ui/Loader/Loader";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";

interface ILoginModalProps { 
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = (props: ILoginModalProps) => {
  const {className, isOpen, onClose} = props;

  return (
    <Modal 
      className={classNames([className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader/>}>
        <LoginFormAsync onSuccess={onClose}/> 
      </Suspense>
    </Modal>
  );
};

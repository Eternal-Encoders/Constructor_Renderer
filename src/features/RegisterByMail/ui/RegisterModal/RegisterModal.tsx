import classNames from "classnames";
import { Suspense } from "react";
import { Loader } from "shared/ui/Loader/Loader";
import { Modal } from "shared/ui/Modal/Modal";
import { RegisterFormAsync } from "../RegisterForm/RegisterForm.async";

interface IRegisterModalProps { 
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal = (props: IRegisterModalProps) => {
  const {className, isOpen, onClose} = props;

  return (
    <Modal 
      className={classNames([className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader/>}>
        <RegisterFormAsync onSuccess={onClose}/> 
      </Suspense>
    </Modal>
  );
};

import classNames from "classnames";
import { Suspense } from "react";
import { Loader } from "shared/ui/Loader/Loader";
import { Modal } from "shared/ui/Modal/Modal";
import { AddFloorFormAsync } from "../AddFloorForm/AddFloorForm.async";

interface IAddFloorModalProps { 
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddFloorModal = (props: IAddFloorModalProps) => {
  const {className, isOpen, onClose} = props;

  return (
    <Modal 
      className={classNames([className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader/>}>
        <AddFloorFormAsync onSuccess={onClose}/> 
      </Suspense>
    </Modal>
  );
};

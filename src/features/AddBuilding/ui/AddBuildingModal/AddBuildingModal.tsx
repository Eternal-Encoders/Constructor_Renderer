import classNames from "classnames";
import { Suspense } from "react";
import { Loader } from "shared/ui/Loader/Loader";
import { Modal } from "shared/ui/Modal/Modal";
import { AddBuildingFormAsync } from "../AddBuildingForm/AddBuildingForm.async";

interface IAddBuildingModalProps { 
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddBuildingModal = (props: IAddBuildingModalProps) => {
  const {className, isOpen, onClose} = props;

  return (
    <Modal 
      className={classNames([className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader/>}>
        <AddBuildingFormAsync onSuccess={onClose}/> 
      </Suspense>
    </Modal>
  );
};

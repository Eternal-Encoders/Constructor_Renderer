import classNames from "classnames";
import { Suspense } from "react";
import { Loader } from "shared/ui/Loader/Loader";
import { Modal } from "shared/ui/Modal/Modal";
import { EditFloorFormAsync } from "../EditFloorForm/EditFloorForm.async";

interface IEditFloorModalProps { 
  className?: string;
  isOpen: boolean;
  selectedFloorId: string;
  onClose: () => void;
}

export const EditFloorModal = (props: IEditFloorModalProps) => {
  const {className, isOpen, onClose, selectedFloorId} = props;

  return (
    <Modal 
      className={classNames([className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader/>}>
        <EditFloorFormAsync onSuccess={onClose} selectedFloorId={selectedFloorId}/> 
      </Suspense>
    </Modal>
  );
};

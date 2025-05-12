import classNames from "classnames";
import { Suspense } from "react";
import { Loader } from "shared/ui/Loader/Loader";
import { Modal } from "shared/ui/Modal/Modal";
import { AddProjectFormAsync } from "../AddProjectForm/AddProjectForm.async";

interface IAddProjectModalProps { 
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddProjectModal = (props: IAddProjectModalProps) => {
  const {className, isOpen, onClose} = props;

  return (
    <Modal 
      className={classNames([className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader/>}>
        <AddProjectFormAsync onSuccess={onClose}/> 
      </Suspense>
    </Modal>
  );
};

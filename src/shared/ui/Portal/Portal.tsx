import { createPortal } from "react-dom";

interface IPortalProps {
  children: React.ReactNode;
  element?: HTMLElement;
}

export const Portal = ({ children, element }: IPortalProps) => {
  return createPortal(children, element || document.body);
};

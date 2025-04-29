import { useDispatch } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import { fillActions } from '../model/slice/fillSlice';

interface IFillUploader {
  className?: string
  children?: React.ReactNode
}

export const FillUploader = ({className, children}: IFillUploader) => {
  const dispatch = useDispatch();
  
  const handleFillChange = (fillHEXCode: string) => {
    dispatch(fillActions.setFillVisibility(true));
    dispatch(fillActions.setFillHEXCode(fillHEXCode));
  };

  return <Input 
    className={className}
    children={children}
    type="color"
    onChange={(e) => handleFillChange(e as string)} />;
};
import { useDispatch } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import { backgroundActions } from '../model/slice/backgroundSlice';

interface IBackgroundUploader {
  className?: string
  children?: React.ReactNode
}

export const BackgroundUploader = ({className, children}: IBackgroundUploader) => {
  const dispatch = useDispatch();
  
  const handleBackgroundChange = (backgroundHEXCode: string) => {
    dispatch(backgroundActions.setBackgroundVisibility(true));
    dispatch(backgroundActions.setBackgroundHEXCode(backgroundHEXCode));
  };

  return <Input 
    className={className}
    children={children}
    type="color"
    onChange={(e) => handleBackgroundChange(e as string)} />;
};
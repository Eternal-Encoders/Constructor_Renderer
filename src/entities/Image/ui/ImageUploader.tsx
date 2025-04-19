import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import { imageActions } from '../model/slice/imageSlice';

interface IImageUploader {
  className?: string
  children?: React.ReactNode
}

export const ImageUploader = ({className, children}: IImageUploader) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File | string) => {
    if (typeof file === 'string') return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      dispatch(imageActions.setImageSrc(base64));
      dispatch(imageActions.setImageVisibility(true));
      dispatch(imageActions.setImageName(file.name));

      // Сброс значения input, чтобы можно было повторно загрузить тот же файл
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  return <Input 
    ref={inputRef}
    className={className}
    children={children}
    type="file" 
    accept="image/*" 
    onChange={(e) => handleFileChange(e)} />;
};
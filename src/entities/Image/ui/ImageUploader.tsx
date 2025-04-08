import { useDispatch } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import { imageActions } from '../model/slice/imageSlice';

interface IImageUploader {
  className?: string
}

export const ImageUploader = ({className}: IImageUploader) => {
  const dispatch = useDispatch();

  const handleFileChange = (file: File | string) => {
    if (typeof file === 'string') return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      dispatch(imageActions.setImageSrc(base64));
    };
    reader.readAsDataURL(file);
  };

  return <Input 
    className={className}
    type="file" 
    accept="image/*" 
    onChange={(e) => handleFileChange(e)} />;
};
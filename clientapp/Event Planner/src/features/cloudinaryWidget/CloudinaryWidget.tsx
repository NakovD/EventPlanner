import { ICloudinary } from 'features/cloudinaryWidget/models/cloudinary';
import { Button } from 'features/common/button/Button';

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;

declare global {
  interface Window {
    cloudinary: ICloudinary;
  }
}

interface ICloudinaryWidgetProps {
  onError: VoidFunction;
  onSuccess: (url: string) => void;
}

export const CloudinaryWidget = ({ onError, onSuccess }: ICloudinaryWidgetProps) => {
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: CLOUDINARY_CLOUD_NAME,
      uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      clientAllowedFormats: ['jpeg', 'jpg', 'png'],
    },
    (error, result) => {
      if (error) return onError();
      if (result.event === 'success') onSuccess(result.info.secure_url);
    },
  );
  return (
    <>
      <Button label="Select Image" onClick={() => myWidget.open()} />
    </>
  );
};

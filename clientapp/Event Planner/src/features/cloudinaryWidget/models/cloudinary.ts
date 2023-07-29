import { ICloudinaryError } from 'features/cloudinaryWidget/models/cloudinaryError';
import { ICloudinaryResult } from 'features/cloudinaryWidget/models/cloudinaryResult';
import { ICloudinarySetupOptions } from 'features/cloudinaryWidget/models/cloudinarySetupOptions';
import { CloudinaryWidget } from 'features/cloudinaryWidget/models/cloudinaryWidget';

type CloudinaryWidgetCallback = (
  error: ICloudinaryError,
  result: ICloudinaryResult,
) => void;

export interface ICloudinary {
  createUploadWidget: (
    options: ICloudinarySetupOptions,
    callback: CloudinaryWidgetCallback,
  ) => CloudinaryWidget;
}

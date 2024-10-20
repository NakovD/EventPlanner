import { toast, ToastContent, ToastOptions } from 'react-toastify';

export const toaster = {
  showSuccess: <T>(content: ToastContent<T> = 'Success', options?: ToastOptions<T>) =>
    toast(content, options),
  showError: <T>(
    content: ToastContent<T> = 'Something went wrong!',
    options?: ToastOptions<T>,
  ) => toast(content, options),
  showInfo: <T>(content: ToastContent<T>, options?: ToastOptions<T>) =>
    toast(content, options),
  showWarning: <T>(
    content: ToastContent<T> = 'Something bad might have happened!',
    options?: ToastOptions<T>,
  ) => toast(content, options),
} as const;

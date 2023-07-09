import { IOption } from 'features/common/form/models/option';

export interface IEventForm {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: IOption<number>;
  image: string;
}

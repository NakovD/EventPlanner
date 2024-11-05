import { useParams } from 'react-router-dom';

interface IUseValidIdParam {
  errorMessage?: string;
}

export const useValidIdParam = (
  { errorMessage }: IUseValidIdParam = {
    errorMessage: 'No valid id parameter was found!',
  },
) => {
  const { id } = useParams();

  if (!id) throw new Error(errorMessage);

  return id;
};

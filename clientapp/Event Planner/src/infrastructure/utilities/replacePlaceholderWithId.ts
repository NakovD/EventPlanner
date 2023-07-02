import { constants } from 'infrastructure/constants';

export const replacePlaceholderWithId = (routePath: string, id: string | number) =>
  routePath.replace(constants.idPlaceholder, id?.toString());

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { AdministrationCategory } from 'features/administration/categories/components/AdministrationCategory';
import { AdministrationCategoryForm } from 'features/administration/categories/components/AdministrationCategoryForm';
import { ICategory } from 'features/events/form/models/category';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { useState } from 'react';

export const AdministrationCategories = () => {
  const { data, isLoading } = useReadQuery<ICategory[]>({
    endpoint: getRequestsOptions.GetAllCategories.endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });

  const hasCategories = data?.length !== 0;

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const hideAddForm = () => setIsAddFormVisible(false);

  const toggleAddForm = () => setIsAddFormVisible(true);

  return (
    <div>
      {!hasCategories && !isLoading && <p>No categories added yet.</p>}
      {isLoading && <p>Loading, please wait</p>}
      {data?.map((c) => (
        <AdministrationCategory key={c.id} category={c} />
      ))}
      {isAddFormVisible && (
        <div className="max-w-screen-sm flex">
          <AdministrationCategoryForm onSubmitCallback={hideAddForm} />
          <button className="ml-6" onClick={hideAddForm}>
            <CancelIcon />
          </button>
        </div>
      )}
      {!isAddFormVisible && (
        <button onClick={toggleAddForm}>
          <AddCircleIcon />
        </button>
      )}
    </div>
  );
};

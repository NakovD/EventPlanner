import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { AdministrationCategory } from 'features/administration/categories/components/AdministrationCategory';
import { AdministrationCategoryForm } from 'features/administration/categories/components/AdministrationCategoryForm';
import { useAdministrationCategories } from 'features/administration/categories/hooks/useAdministrationCategories';

export const AdministrationCategories = () => {
  const {
    hasCategories,
    isLoading,
    isAddFormVisible,
    categories,
    hideAddForm,
    toggleAddForm,
  } = useAdministrationCategories();

  return (
    <div>
      {!hasCategories && !isLoading && <p>No categories added yet.</p>}
      {isLoading && <p>Loading, please wait</p>}
      {categories?.map((c) => (
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
          Add Category <AddCircleIcon />
        </button>
      )}
    </div>
  );
};

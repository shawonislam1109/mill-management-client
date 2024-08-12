import PropTypes from "prop-types";
import * as yup from "yup";
import useFormHook from "../../../../hooks/useHookForm";
import FormInput from "../../../../reuse-component/InputComponent/FormInput";
import useAuth from "../../../../hooks/useAuth";

const CategoryFrom = ({
  updateCategory,
  createCategory,
  dialogOpen,
  dialogClose,
  defaultValues,
  isLoading,
  isUpdate,
}) => {
  // AUTH USE
  const { user } = useAuth();

  // VALIDATION
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
  });
  // HANDLE USE HOOKS FORM
  const { handleSubmit, control, setError, reset } = useFormHook({
    validationSchema,
    defaultValuesProp: defaultValues,
  });

  // modal reset form
  const modalResetAndDialogClose = () => {
    reset();
    dialogClose();
  };

  //   FORM SUBMIT HANDLER
  const formSubmit = (data) => {
    console.log(data);
    if (!isUpdate) {
      createCategory({
        data,
        merchant: user?.merchant,
        handleCloseDialog: dialogClose,
        setError,
        reset,
      });
    } else {
      updateCategory({
        data,
        merchant: user?.merchant,
        handleCloseDialog: dialogClose,
        setError,
        reset,
      });
    }
  };

  //   FORM DATA
  const formData = [
    {
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "name",
    },
    {
      type: "textarea",
      name: "remarks",
      label: "Remarks",
      placeholder: "remarks",
      required: false,
      size: "small",
      visibility: true,
      disabled: false,
      id: "remarks",
      column: {
        xs: 1,
        sm: 1,
        md: 1,
      },
    },
  ];

  const column = {
    xs: 1,
    sm: 1,
    md: 1,
  };

  return (
    <>
      <FormInput
        {...{
          openDialog: dialogOpen,
          formTitle: "Category",
          formId: "Category",
          formType: "dialog",
          control,
          handleSubmit,
          formSubmit,
          handleCloseDialog: modalResetAndDialogClose,
          reset,
          formData,
          isLoading,
          isUpdate,
          dialogSize: "sm",
          column,
        }}
      />
    </>
  );
};

CategoryFrom.propTypes = {
  dialogOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  isUpdate: PropTypes.bool,
  dialogClose: PropTypes.func,
  updateCategory: PropTypes.func,
  createCategory: PropTypes.func,
  defaultValues: PropTypes.object,
};

export default CategoryFrom;

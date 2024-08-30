import PropTypes from "prop-types";

import * as yup from "yup";
import useFormHook from "../../hooks/useHookForm";
import FormInput from "../../reuse-component/InputComponent/FormInput";
import {
  useCreateBuaMutation,
  useUpdateBuaMutation,
} from "../../api/service/bua.service";
import useAuth from "../../hooks/useAuth";

const BuaForm = ({ dialogOpen, dialogClose, defaultValues, isUpdate }) => {
  const { user } = useAuth();
  // VALIDATION
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    status: yup
      .string()
      .oneOf(["ACTIVE", "INACTIVE"], "Status must be either active or inactive")
      .required("Status is required"),
  });
  // HANDLE USE HOOKS FORM
  const { handleSubmit, control, reset } = useFormHook({
    validationSchema,
    defaultValuesProp: defaultValues,
  });

  //    =================||RTK QUERY MUTATION ||===================
  const [createBua, { isLoading: createIsLoading }] = useCreateBuaMutation();
  const [updateBua, { isLoading: updateIsLoading }] = useUpdateBuaMutation();

  // modal reset form
  const modalResetAndDialogClose = () => {
    reset();
    dialogClose();
  };

  //   FORM SUBMIT HANDLER
  const formSubmit = (data) => {
    if (!isUpdate) {
      createBua({
        data: data,
        merchant: user?._id,
        handleCloseDialog: dialogClose,
      });
    } else {
      updateBua({
        data: data,
        merchant: user?._id,
        buaId: defaultValues?._id,
        handleCloseDialog: dialogClose,
      });
    }
  };

  //   FORM DATA
  const formData = [
    {
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Enter Name",
      required: false,
      size: "small",
      visibility: true,
      disabled: false,
      id: "name",
    },
    {
      type: "single-select",
      name: "status",
      label: "Status",
      placeholder: "status",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "status",
      options: [
        { label: "Active", value: "ACTIVE" },
        { label: "Inactive", value: "INACTIVE" },
      ],
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
          formTitle: isUpdate ? "Bua Update" : "Bua Create",
          formId: "Bua",
          formType: "dialog",
          control,
          handleSubmit,
          formSubmit,
          handleCloseDialog: modalResetAndDialogClose,
          reset,
          formData,
          isLoading: createIsLoading || updateIsLoading,
          isUpdate,
          dialogSize: "sm",
          column,
        }}
      />
    </>
  );
};

BuaForm.propTypes = {
  dialogOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  isUpdate: PropTypes.bool,
  dialogClose: PropTypes.func,
  updateBorderList: PropTypes.func,
  createBorderList: PropTypes.func,
  defaultValues: PropTypes.object,
  allUserObject: PropTypes.object,
  allUser: PropTypes.array,
};

export default BuaForm;

import PropTypes from "prop-types";

import * as yup from "yup";
import useAuth from "../../hooks/useAuth";
import useFormHook from "../../hooks/useHookForm";
import FormInput from "../../reuse-component/InputComponent/FormInput";

const BorderListFrom = ({
  updateBorderList,
  createBorderList,
  allUser,
  dialogOpen,
  dialogClose,
  defaultValues,
  isLoading,
  isUpdate,
  allUserObject,
}) => {
  // AUTH USE
  const { user } = useAuth();

  // VALIDATION
  const validationSchema = yup.object().shape({
    totalBalance: yup
      .number()
      .typeError("Total Balance is required")
      .required("Total Balance is required"),
    totalMill: yup
      .number()
      .typeError("Total Mill is required")
      .required("Total Mill is required"),
    totalCost: yup
      .number()
      .typeError("totalCost is required")
      .required("totalCost is required"),

    status: yup
      .string()
      .oneOf(["ACTIVE", "INACTIVE"], "Status must be either active or inactive")
      .required("Status is required"),
    border: yup.string().required("Border is required"),
  });
  // HANDLE USE HOOKS FORM
  const { handleSubmit, control, setError, reset, watch } = useFormHook({
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
    data.name = allUserObject?.[watch("border")]?.firstName;
    data.phone = allUserObject?.[watch("border")]?.phoneNumber;
    if (!isUpdate) {
      createBorderList({
        data,
        merchant: user?._id,
        handleCloseDialog: dialogClose,
        setError,
        reset,
      });
    } else {
      updateBorderList({
        data,
        merchant: user?._id,
        handleCloseDialog: dialogClose,
        setError,
        reset,
      });
    }
  };

  //   FORM DATA
  const formData = [
    {
      type: "single-select",
      name: "border",
      label: "Border",
      placeholder: "Border Select",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "border",
      options: allUser || [],
    },
    {
      type: "number",
      name: "totalBalance",
      label: "Total Balance",
      placeholder: "Total Balance",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "totalBalance",
    },
    {
      type: "number",
      name: "totalMill",
      label: "Total MIll",
      placeholder: "Total MIll",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "totalMill",
    },
    {
      type: "number",
      name: "totalCost",
      label: "Total Cost",
      placeholder: "Total Cost",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "totalCost",
    },
    {
      type: "number",
      name: "dueBalance",
      label: "Total Due",
      placeholder: "Total Due",
      required: false,
      size: "small",
      visibility: true,
      disabled: false,
      id: "dueBalance",
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
    sm: 2,
    md: 3,
  };

  return (
    <>
      <FormInput
        {...{
          openDialog: dialogOpen,
          formTitle: "BorderList",
          formId: "BorderList",
          formType: "dialog",
          control,
          handleSubmit,
          formSubmit,
          handleCloseDialog: modalResetAndDialogClose,
          reset,
          formData,
          isLoading,
          isUpdate,
          dialogSize: "lg",
          column,
        }}
      />
    </>
  );
};

BorderListFrom.propTypes = {
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

export default BorderListFrom;

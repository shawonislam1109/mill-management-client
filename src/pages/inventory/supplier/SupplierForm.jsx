import PropTypes from "prop-types";
import useFormHook from "../../../hooks/useHookForm";
import * as yup from "yup";
import FormInput from "../../../reuse-component/InputComponent/FormInput";
import useAuth from "../../../hooks/useAuth";

const SupplierForm = ({
  updateSupplier,
  createSupplier,
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
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNumber: yup
      .string()
      .matches(/^\d{11}$/, "Contact number must be exactly 11 digits")
      .required("Contact number is required"),
    emergencyContactNumber: yup
      .string()
      .matches(
        /^\d{11}$/,
        "Emergency contact number must be exactly 11 digits"
      ),

    tradeNumber: yup
      .string()
      .required("Trade number is required")
      .min(13, "Trade number must be at least 13 characters"),
    presentAddress: yup.string().required("Present address is required"),
    permanentAddress: yup.string(),
    location: yup.string().required("Location is required"),
    status: yup
      .string()
      .oneOf(["ACTIVE", "INACTIVE"], "Status must be either active or inactive")
      .required("Status is required"),
  });
  // HANDLE USE HOOKS FORM
  const { handleSubmit, control, formState, watch, setError, setValue, reset } =
    useFormHook({
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
      createSupplier({
        data,
        merchant: user?.merchant,
        handleCloseDialog: dialogClose,
        setError,
        reset,
      });
    } else {
      updateSupplier({
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
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "email",
    },
    {
      type: "text",
      name: "contactNumber",
      label: "Contact Number",
      placeholder: "Contact Number",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "contactNumber",
    },
    {
      type: "text",
      name: "emergencyContactNumber",
      label: "Emergency contactNumber",
      placeholder: "emergency contactNumber",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "emergencyContactNumber",
    },
    {
      type: "text",
      name: "tradeNumber",
      label: "Trade Number",
      placeholder: "TradeNumber",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "tradeNumber",
    },
    {
      type: "text",
      name: "presentAddress",
      label: "Present Address",
      placeholder: "presentAddress",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "presentAddress",
    },
    {
      type: "text",
      name: "permanentAddress",
      label: "Permanent Address",
      placeholder: "permanentAddress",
      required: false,
      size: "small",
      visibility: true,
      disabled: false,
      id: "permanentAddress",
    },
    {
      type: "text",
      name: "location",
      label: "Location",
      placeholder: "location",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "location",
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
          formTitle: "Supplier",
          formId: "supplier",
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

SupplierForm.propTypes = {
  dialogOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  isUpdate: PropTypes.bool,
  dialogClose: PropTypes.func,
  updateSupplier: PropTypes.func,
  createSupplier: PropTypes.func,
  defaultValues: PropTypes.object,
};

export default SupplierForm;

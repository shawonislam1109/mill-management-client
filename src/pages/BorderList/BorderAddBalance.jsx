import PropTypes from "prop-types";

import * as yup from "yup";
import useAuth from "../../hooks/useAuth";
import useFormHook from "../../hooks/useHookForm";
import FormInput from "../../reuse-component/InputComponent/FormInput";
import { useBalanceAddMutation } from "../../api/service/borderList.service";

const BorderAddBalance = ({ dialogOpen, dialogClose, defaultValues }) => {
  // AUTH USE
  const { user } = useAuth();

  // ===============|| RTK QUERY BALANCE ADD MUTATION ||===============
  const [balanceAdd, { isLoading }] = useBalanceAddMutation();

  // VALIDATION
  const validationSchema = yup.object().shape({
    balanceAdd: yup
      .number()
      .typeError(" Balance Add is required")
      .required(" Balance Add is required"),
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
    balanceAdd({
      data,
      merchant: user?._id,
      handleCloseDialog: modalResetAndDialogClose,
      setError,
      reset,
    });
  };

  //   FORM DATA
  const formData = [
    {
      type: "number",
      name: "dueBalance",
      label: "Total Due",
      placeholder: "Total Due",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      readOnly: true,
      id: "dueBalance",
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
      readOnly: true,
      id: "totalBalance",
    },
    {
      type: "number",
      name: "provideBalance",
      label: "Provide Balance",
      placeholder: "Provide Balance",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      readOnly: true,
      id: "provideBalance",
    },
    {
      type: "number",
      name: "balanceAdd",
      label: "Balance Add",
      placeholder: "Balance Add",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "balanceAdd",
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
          formTitle: "Balance Update",
          formId: "Balance Update",
          formType: "dialog",
          control,
          handleSubmit,
          formSubmit,
          handleCloseDialog: modalResetAndDialogClose,
          reset,
          formData,
          isLoading,
          dialogSize: "sm",
          column,
        }}
      />
    </>
  );
};

BorderAddBalance.propTypes = {
  dialogOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  dialogClose: PropTypes.func,
  defaultValues: PropTypes.object,
  allUserObject: PropTypes.object,
  allUser: PropTypes.array,
};

export default BorderAddBalance;

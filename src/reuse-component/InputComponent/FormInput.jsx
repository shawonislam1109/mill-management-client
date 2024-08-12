import FormDialog from "./FormDialog";
import FormPage from "./FormPage";
import PropTypes from "prop-types";

const FormInput = ({ formType, ...formInputProps }) => {
  if (formType === "dialog") {
    return <FormDialog {...formInputProps} />;
  } else {
    return <FormPage {...formInputProps} />;
  }
};

FormInput.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default FormInput;

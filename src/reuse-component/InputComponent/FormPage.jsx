import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import InputField from "./Input";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FormPage = ({
  formTitle,
  formId,
  formData,
  column,
  formSubmit,
  isUpdate,
  isLoading,
  control,
  children,
  handleSubmit,
  reset,
}) => {
  return (
    <>
      <Card>
        <CardHeader>{formTitle}</CardHeader>
        <CardContent>
          <Grid
            container
            spacing={3.5}
            component={"form"}
            onSubmit={handleSubmit(formSubmit)}
            id={formId}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputField formData={formData} column={column} control={control}>
                {children}
              </InputField>
            </LocalizationProvider>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
              >
                <Button
                  disabled={isLoading}
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  onClick={reset}
                >
                  Reset
                </Button>

                <LoadingButton
                  size="small"
                  endIcon={<SendIcon />}
                  loading={isLoading}
                  loadingPosition="end"
                  variant="contained"
                  type="submit"
                >
                  {isUpdate ? "Update" : "Submit"}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

FormPage.propTypes = {
  formTitle: PropTypes.string,
  formId: PropTypes.string,
  formData: PropTypes.array,
  column: PropTypes.object,
  validationSchema: PropTypes.object,
  defaultValuesProp: PropTypes.object,
  formSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  defaultValues: PropTypes.object,
  control: PropTypes.object,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  formState: PropTypes.object,
  setError: PropTypes.func,
  theme: PropTypes.object,
  commonInputTypes: PropTypes.array,
  children: PropTypes.node,
};

export default FormPage;

import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { object, string } from "yup";
import { useLoginMutation } from "../../api/service/auth.service";
import useFormHook from "../../hooks/useHookForm";
import InputField from "../../reuse-component/InputComponent/Input";
import { useEffect } from "react";
import { Paper, Stack } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const DEFAULT_VALUE = {
  phoneNumber: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  // login mutation query
  const [login, { isSuccess, isLoading }] = useLoginMutation();

  const column = {
    md: 2,
    lg: 2,
  };

  const formInputData = [
    {
      type: "text",
      name: "phoneNumber",
      label: "Phone",
      placeholder: "Phone or email",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "phoneNumber",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "password",
    },
  ];

  // validation schema
  let userSchema = object().shape({
    phoneNumber:
      string()
        .matches(/^01[3-9]\d{8}$/, 'Phone number is not valid')
        .min(11, 'Phone number must be at list 11 digit')
        .max(15, 'Phone number must be at most 15 Digit')
        .required('Phone Number is Required'),
    password: string().required('Password is required'),
  });

  // useForm
  const { control, handleSubmit, reset } = useFormHook({
    validationSchema: userSchema,
    defaultValues: { ...DEFAULT_VALUE },
  });

  // const
  const formSubmitData = (data) => {
    login({ data, reset });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  return (

    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      component={Stack}
      justifyContent='center'
      alignItems='center'
      mt={{ xs: 4, sm: 8 }}
      spacing={2}
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: 4,
          width: { xs: '100%', sm: '35rem' },
          pb: 10,
          mx: { xs: 2, sm: 0 },
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: { xs: 4, sm: 8 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: { md: 3 }
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(formSubmitData)}
              sx={{ mt: 1 }}
            >
              <InputField
                formData={formInputData}
                control={control}
                column={column}
              />
              <Stack
                gap={3}
                my={3}
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <LoadingButton
                  size="small"
                  component="button"
                  type="submit"
                  endIcon={<SendIcon />}
                  loading={isLoading}
                  loadingPosition="end"
                  variant="contained"
                >
                  Login
                </LoadingButton>
              </Stack>
              <Stack direction="row" spacing={3} justifyContent="space-between">
                <Grid item xs>
                  <Link variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/auth/signUp">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Paper>
    </Stack>

  );
}

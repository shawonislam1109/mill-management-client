import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom/dist";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import InputField from "../../reuse-component/InputComponent/Input";
import { Paper, Stack } from "@mui/material";
import { useSignUpMutation } from "../../api/service/auth.service";
import { useEffect } from "react";

const DEFAULT_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
};

export default function SignUp() {
  const navigate = useNavigate();
  // const rtk query
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  // validation schema
  let userSchema = object().shape({
    firstName: string().required("First Name is required"),
    phoneNumber: string()
      .matches(/^01[3-9]\d{8}$/, "Phone number is not valid")
      .min(11, "Phone number must be at list 11 digit")
      .max(15, "Phone number must be at most 15 Digit")
      .required("Phone Number is Required"),
    lastName: string("Last name is required"),
    email: string().email(),
    password: string().required("Password is required"),
    address: string().required(),
  });

  // useForm
  const { control, handleSubmit, reset, setError } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: { ...DEFAULT_VALUE },
  });

  // const
  const formSubmitData = (data) => {
    signUp({ data: data, reset, setError });
  };

  // formData
  const formData = [
    {
      type: "text",
      name: "firstName",
      label: "FirstName",
      placeholder: "Enter your firstName",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "firstName",
    },
    {
      type: "text",
      name: "lastName",
      label: "LastName",
      placeholder: "Enter your lastName",
      required: false,
      size: "small",
      visibility: true,
      disabled: false,
      id: "lastName",
    },
    {
      type: "text",
      name: "phoneNumber",
      label: "Phone",
      placeholder: "phoneNumber",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "phoneNumber",
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Email or mobile",
      required: false,
      size: "small",
      visibility: true,
      disabled: false,
      id: "email",
    },
    {
      type: "text",
      name: "address",
      label: "address",
      placeholder: "address ",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "address",
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
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Enter your confirmPassword",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "confirmPassword",
    },
  ];

  const column = {
    md: 2,
    lg: 2,
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/login");
    }
  }, [isSuccess]);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      component={Stack}
      justifyContent="center"
      alignItems="center"
      mt={{ xs: 4, sm: 8 }}
      spacing={2}
    >
      <Paper
        elevation={4}
        sx={{ borderRadius: 4, py: 5, width: { md: "40rem" } }}
      >
        <Container component="main" maxWidth="sm">
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmitData)}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3 }}
              spacing={2}
            >
              <InputField
                formData={formData}
                control={control}
                column={column}
              />
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              spacing={2}
              mt={2}
            >
              <LoadingButton
                size="small"
                component="button"
                type="submit"
                endIcon={<SendIcon />}
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
              >
                signUp
              </LoadingButton>
              <Button onClick={() => reset()} variant="outlined">
                reset
              </Button>
            </Stack>
            <Grid container justifyContent="flex-end" mt={2}>
              <Grid item>
                <Link to="/auth/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </Paper>
    </Stack>
  );
}

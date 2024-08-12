import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useFormHook from "../../hooks/useHookForm";
import useAuth from "../../hooks/useAuth";
import FormInput from "../../reuse-component/InputComponent/FormInput";
import { useActiveMillCountMutation } from "../../api/service/auth.service";

// DEFAULT_VALUES
const DEFAULT_VALUE = {
  fullMill: true,
  schedule: [],
  millOff: false,
};

const MillCount = () => {
  // AUTH USE
  const { user } = useAuth();
  //@LOCAL STATE
  const [defaultValues, setDefaultValues] = useState({ ...DEFAULT_VALUE });
  const [fullMIll, setFullMill] = useState(true);

  // RTK QUERY MUTATION
  const [activeMillCount, { isLoading: activeMillCountIsLoading }] =
    useActiveMillCountMutation();

  // VALIDATION
  const validationSchema = yup.object().shape({
    fullMill: yup.boolean(),
    schedule: yup.array(),
  });

  // HANDLE USE HOOKS FORM
  const { handleSubmit, control, watch, setError, reset } = useFormHook({
    validationSchema,
    defaultValuesProp: defaultValues,
  });

  //   FORM SUBMIT HANDLER
  const formSubmit = (data) => {
    activeMillCount({ data, user, setError, reset });
  };

  //   FORM DATA
  const formData = [
    {
      type: "single-checkbox",
      name: "millOff",
      label: "Mill Of",
      required: true,
      size: "small",
      visibility: true,
      disabled: watch("fullMill") || watch("schedule")?.length > 0,
      id: "millOff",
    },
    {
      type: "single-checkbox",
      name: "fullMill",
      label: "Full Mill",
      required: true,
      size: "small",
      visibility: true,
      disabled: watch("schedule")?.length > 0 || watch("millOff"),
      id: "fullMill",
    },
    {
      type: "multiple-select",
      name: "schedule",
      label: "Mill Schedule",
      placeholder: "Enter mill Schedule",
      required: true,
      size: "small",
      visibility: true,
      disabled: watch("fullMill") || watch("millOff"),
      id: "schedule",
      options: [
        { label: "Breakfast", value: "BREAKFAST" },
        { label: "lunch", value: "LUNCH" },
        { label: "Dinner", value: "DINNER" },
      ],
    },
  ];

  const column = {
    xs: 1,
    sm: 1,
    md: 1,
  };

  useEffect(() => {
    setFullMill(watch("fullMill"));
  }, [watch()]);

  // for default value set
  useEffect(() => {
    setDefaultValues({
      fullMill: user?.fullMill,
      millOff: user?.millOff,
      schedule: user?.schedule,
    });
  }, [user]);

  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <TableContainer sx={{ width: "20rem" }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ background: "#3a3f4f" }}>
              <TableRow>
                <TableCell sx={{ color: "#8697db" }} align="left">
                  Breakfast
                </TableCell>
                <TableCell sx={{ color: "#8697db" }} align="left">
                  Lunch
                </TableCell>
                <TableCell sx={{ color: "#8697db" }} align="left">
                  Dinner
                </TableCell>
                <TableCell sx={{ color: "#8697db" }} align="left">
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align="left">10</TableCell>
              <TableCell align="left">40</TableCell>
              <TableCell align="left">40</TableCell>
              <TableCell sx={{ color: "green" }} align="left">
                90
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: "20rem",
            mt: 3,
          }}
        >
          <FormInput
            {...{
              formTitle: "Mill Count",
              formId: "Mill Count",
              control,
              handleSubmit,
              formSubmit,
              reset,
              formData,
              dialogSize: "lg",
              column,
            }}
          />
        </Box>
      </Stack>
    </>
  );
};

export default MillCount;

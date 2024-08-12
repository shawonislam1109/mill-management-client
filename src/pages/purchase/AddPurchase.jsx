import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import useAuth from "../../hooks/useAuth";
import { convertToLabel } from "../../utils/convertToLabel";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormHelperText,
} from "@mui/material";

import { useGetProductQuery } from "../../api/service/product.service";
import useFormHook from "../../hooks/useHookForm";
import MainCard from "../../reuse-component/card/MainCard";
import { Checkbox, Grid, Stack, TextField } from "@mui/material";
import InputField from "../../reuse-component/InputComponent/Input";
import { useGetSupplierQuery } from "../../api/service/supplier.service";
import { paymentMethod, paymentStatus } from "../../utils/enums";
import DiscountAndTax from "./DiscountAndTax";
import ProductDetails from "./ProductDetails";
import { Fragment } from "react";
import { usePurchaseProductMutation } from "../../api/service/Purchase.service";
import dayjs from "dayjs";

const DEFAULT_VALUES = {
  productType: "",
  productName: "",
  supplier: "",
  unit: "",
  productQuantity: {},
  purchasePrice: {},
  salePrice: {},
  totalPrice: 0,
  wholeSalePrice: 0,
};

const ProductPurchase = () => {
  // AUTH USE
  const { user } = useAuth();

  // REACT ROUTER DOM HOOKS
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // use searchParams
  const isUpdate = searchParams.get("isUpdate") === "true";

  // LOCAL STATE
  const [defaultValues, setDefaultVales] = useState({ ...DEFAULT_VALUES });

  // Custom  function for unit
  const selectedUnit = (value) => {
    switch (value) {
      case "carton":
        return ["carton", "box", "pies", "pageUnit"];
      case "box":
        return ["box", "pies", "pageUnit"];
      case "pies":
        return ["pies", "pageUnit"];
      case "pageUnit":
        return ["pageUnit"];

      default:
        return [];
    }
  };

  // use supplier hooks
  const { supplier } = useGetSupplierQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { supplier: convertToLabel(data, "name", "_id"), ...rest };
    },
  });

  // ===================|| PRODUCTS QUERY  ||=====================
  const { data: products } = useGetProductQuery(
    { pageIndex: 0, pageSize: 10 },
    {
      skip: !user,
    }
  );

  // ===================|| RTK HOOKS MUTATION ||=====================
  const [
    purchaseProduct,
    {
      isLoading: purchaseProductIsLoading,
      // isSuccess: purchaseProductIsSuccess,
    },
  ] = usePurchaseProductMutation();

  // VALIDATION
  const validationSchema = Yup.object().shape({
    date: Yup.string().required(),
    memoNo: Yup.string().required(),
    supplier: Yup.string().required("supplier is required"),
    paymentMethod: Yup.string().required(),
    paymentStatus: Yup.string().required(),
    productsId: Yup.array().required().min(1),
    wholeSalePrice: Yup.number()
      .required("Wholesale price is required")
      .min(0, "Wholesale price must be non-negative"),
  });

  // HANDLE USE HOOKS FORM
  const { handleSubmit, control, watch, setError, setValue, reset } =
    useFormHook({
      validationSchema,
      defaultValuesProp: defaultValues,
    });

  // console.log(formState.errors);

  //   FORM SUBMIT HANDLER
  const formSubmit = async ({ productsId, ...rest }) => {
    // const emptyCheckObject =
    const productId = productsId?.map((item) => item._id);
    rest.productsId = productId;
    rest.provideBalance = 400;
    rest.totalDiscount = 100;
    rest.totalPrice = 500;
    purchaseProduct({
      data: { ...rest },
      setError,
      reset,
      merchantId: user?.merchant,
      navigate,
    });
  };

  //   FORM DATA
  const formData = [
    {
      type: "date-picker",
      name: "date",
      label: "Date ",
      placeholder: "Enter Date",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "date",
    },
    {
      type: "text",
      name: "memoNo",
      label: "Memo No",
      placeholder: "Enter Product Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "productName",
    },
    {
      type: "single-select",
      name: "paymentMethod",
      label: "paymentMethod",
      placeholder: "Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "paymentMethod",
      options: paymentMethod,
    },
    {
      type: "single-select",
      name: "paymentStatus",
      label: "paymentStatus",
      placeholder: "Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "paymentStatus",
      options: paymentStatus,
    },

    {
      type: "single-select",
      name: "supplier",
      label: "supplier",
      placeholder: "Enter supplier",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "supplier",
      options: supplier || [],
    },

    {
      type: "number",
      name: "wholeSalePrice",
      label: "Whole SalePrice",
      placeholder: "Enter WholeSalePrice",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "wholeSalePrice",
    },
  ];

  const column = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
  };

  return (
    <>
      <MainCard title="Product Purchase">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack component={"form"} onSubmit={handleSubmit(formSubmit)}>
            <Grid container spacing={3}>
              <InputField
                formData={formData}
                column={column}
                control={control}
              />
              <Grid item xs={12} md={12} lg={12}>
                <Controller
                  name="productsId"
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Autocomplete
                        {...field}
                        multiple
                        value={field.value}
                        onChange={(event, newValue) => {
                          field.onChange(newValue);
                        }}
                        size="medium"
                        id="productsId-tags-demo"
                        options={products?.data || []}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.productName}
                        renderOption={(props, option, { selected }) => {
                          const { key, ...optionProps } = props;
                          return (
                            <li key={key} {...optionProps}>
                              <Checkbox
                                icon={
                                  <CheckBoxOutlineBlankIcon fontSize="small" />
                                }
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.productName}
                            </li>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Product"
                            placeholder="Select "
                            error={error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            {/* PRODUCT MULTI-SELECTED */}

            {watch("productsId")?.length > 0 && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Unit</TableCell>
                      <TableCell align="center">Tax</TableCell>
                      <TableCell align="center">Discount</TableCell>
                      <TableCell align="center">
                        Each Product Quantity
                      </TableCell>
                      <TableCell align="center">Product Quantity</TableCell>
                      <TableCell align="center">Purchase Price</TableCell>
                      <TableCell align="center"> Sale Price</TableCell>
                      <TableCell align="center"> ExpireDate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {watch("productsId")?.map((row, index) => {
                      setValue(`products[${index}].unit`, row.unit);
                      setValue(`products[${index}].product`, row._id);
                      return (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {row.productName}
                          </TableCell>
                          <TableCell align="center">{row.unit}</TableCell>
                          <TableCell align="center">
                            <DiscountAndTax
                              {...{
                                control,
                                name1: `products[${index}].tax.amount`,
                                name2: `products[${index}].tax.percentage`,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <DiscountAndTax
                              {...{
                                control,
                                name1: `products[${index}].discount.amount`,
                                name2: `products[${index}].discount.percentage`,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Grid
                              container
                              spacing={1}
                              gap={1}
                              justifyContent="start"
                              alignItems="center"
                            >
                              {selectedUnit(row.unit).map((item, unitIndex) => {
                                return (
                                  <Fragment key={unitIndex}>
                                    <ProductDetails
                                      {...{
                                        name: `products[${index}].eachProductQuantity.${[
                                          item,
                                        ]}`,
                                        control,
                                        index,
                                        item,
                                      }}
                                    />
                                  </Fragment>
                                );
                              })}
                            </Grid>
                          </TableCell>
                          <TableCell align="center">
                            <Grid
                              container
                              spacing={1}
                              gap={1}
                              justifyContent="start"
                              alignItems="center"
                            >
                              {selectedUnit(row.unit).map((item, unitIndex) => {
                                return (
                                  <Fragment key={unitIndex}>
                                    <ProductDetails
                                      {...{
                                        name: `products[${index}].productQuantity.${[
                                          item,
                                        ]}`,
                                        control,
                                        index,
                                        item,
                                      }}
                                    />
                                  </Fragment>
                                );
                              })}
                            </Grid>
                          </TableCell>
                          <TableCell align="center">
                            <Grid
                              container
                              spacing={1}
                              gap={1}
                              justifyContent="start"
                              alignItems="center"
                            >
                              {selectedUnit(row.unit).map((item, unitIndex) => {
                                return (
                                  <Fragment key={unitIndex}>
                                    <ProductDetails
                                      {...{
                                        name: `products[${index}].purchasePrice.[${[
                                          item,
                                        ]}]`,
                                        control,
                                        index,
                                        item,
                                      }}
                                    />
                                  </Fragment>
                                );
                              })}
                            </Grid>
                          </TableCell>
                          <TableCell align="center">
                            <Grid
                              container
                              spacing={1}
                              gap={1}
                              justifyContent="start"
                              alignItems="center"
                            >
                              {selectedUnit(row.unit).map((item, unitIndex) => {
                                return (
                                  <Fragment key={unitIndex}>
                                    <ProductDetails
                                      {...{
                                        name: `products[${index}].salePrice.${[
                                          item,
                                        ]}`,
                                        control,
                                        index,
                                        item,
                                      }}
                                    />
                                  </Fragment>
                                );
                              })}
                            </Grid>
                          </TableCell>

                          <TableCell align="center">
                            <Controller
                              name={`products[${index}].expDate`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <DatePicker
                                    format={"MMMM DD, YYYY"}
                                    value={dayjs(field.value)}
                                    inputRef={field.ref}
                                    onChange={(date) =>
                                      field.onChange(dayjs(date).toISOString())
                                    }
                                    slotProps={{
                                      textField: {
                                        sx: { width: "9rem" },
                                        error: Boolean(error),
                                        size: "small",
                                      },
                                    }}
                                  />
                                  {Boolean(error) && (
                                    <FormHelperText error>
                                      {error?.message}
                                    </FormHelperText>
                                  )}
                                </>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* SUBMIT BUTTON  */}
            <Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
                mt={4}
              >
                <LoadingButton
                  size="small"
                  endIcon={<SendIcon />}
                  loading={purchaseProductIsLoading}
                  loadingPosition="end"
                  variant="contained"
                  type="submit"
                >
                  {isUpdate ? "Update" : "Submit"}
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        </LocalizationProvider>
      </MainCard>
    </>
  );
};

ProductPurchase.propTypes = {};

export default ProductPurchase;

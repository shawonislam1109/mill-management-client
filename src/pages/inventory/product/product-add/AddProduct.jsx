import * as Yup from "yup";
import { useGetCategoryQuery } from "../../../../api/service/category.service";
import { convertToLabel } from "../../../../utils/convertToLabel";
import { Grid, InputLabel, Stack, TextField } from "@mui/material";
import InputField from "../../../../reuse-component/InputComponent/Input";
import useAuth from "../../../../hooks/useAuth";
import useFormHook from "../../../../hooks/useHookForm";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import MainCard from "../../../../reuse-component/card/MainCard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Controller } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../api/service/product.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DEFAULT_VALUES = {
  productType: "",
  productName: "",
  category: "",
  unit: "",
  productQuantity: {},
  purchasePrice: {},
  salePrice: {},
  totalPrice: 0,
  wholeSalePrice: 0,
};

const ProductAddAndUpdate = () => {
  // AUTH USE
  const { user } = useAuth();

  // REACT ROUTER DOM HOOKS
  const location = useLocation();
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const { productId } = useParams();

  // use searchParams
  const isUpdate = searchParams.get("isUpdate") === "true";

  // SEARCH QUERY
  const queryParams = () => {
    const params = new URLSearchParams(location.search);
    const queryObject = {};

    params.forEach((value, key) => {
      if (key == "pageSize" || key === "pageIndex") {
        queryObject[key] = parseInt(value);
      }
    });
    return queryObject;
  };

  // LOCAL STATE
  const [defaultValues, setDefaultVales] = useState({ ...DEFAULT_VALUES });
  const [unitState, setUnitState] = useState("");

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

  // use category hooks
  const { category } = useGetCategoryQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { category: convertToLabel(data, "name", "_id"), ...rest };
    },
  });

  // ===================|| RTK HOOKS MUTATION ||=====================
  const [
    createProduct,
    { isLoading: createProductIsLoading, isSuccess: createProductIsSuccess },
  ] = useCreateProductMutation();
  const [
    updateProduct,
    { isLoading: updateProductIsLoading, isSuccess: updateProductIsSuccess },
  ] = useUpdateProductMutation();

  // => SINGLE PRODUCT GET BY ID
  const { data: singleProduct } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  // VALIDATION
  const validationSchema = Yup.object().shape({
    productType: Yup.string().required("Product type is required"),
    productName: Yup.string().required("Product name is required"),
    category: Yup.string().required("Category is required"),
    unit: Yup.string().required("Unit is required"),
    expDate: Yup.date()
      .nullable()
      .test(
        "is-required-if-medicine",
        "Expiration date is required for medicine",
        function (value) {
          const { productType } = this.parent;
          if (productType === "medicine") {
            return value != null;
          }
          return true;
        }
      ),
    gantry: Yup.date()
      .nullable()
      .test(
        "is-required-if-electronics",
        "Gantry date is required for electronics",
        function (value) {
          const { productType } = this.parent;
          if (productType === "electronics") {
            return value != null;
          }
          return true;
        }
      ),
    warranty: Yup.date()
      .nullable()
      .test(
        "is-required-if-electronics",
        "Warranty date is required for electronics",
        function (value) {
          const { productType } = this.parent;
          if (productType === "electronics") {
            return value != null;
          }
          return true;
        }
      ),
    productQuantity: Yup.object().shape(unitState),
    eachProductQuantity: Yup.object().shape(unitState),
    purchasePrice: Yup.object().shape(unitState),
    salePrice: Yup.object().shape(unitState),
    totalPrice: Yup.number()
      .required("Total price is required")
      .min(0, "Total price must be non-negative"),
    wholeSalePrice: Yup.number()
      .required("Wholesale price is required")
      .min(0, "Wholesale price must be non-negative"),
  });

  // HANDLE USE HOOKS FORM
  const { handleSubmit, control, formState, watch, setError, setValue, reset } =
    useFormHook({
      validationSchema,
      defaultValuesProp: defaultValues,
    });

  //   FORM SUBMIT HANDLER
  const formSubmit = (data) => {
    if (!isUpdate) {
      createProduct({ data, merchant: queryParams(), setError, reset });
    } else if (isUpdate) {
      updateProduct({ data, merchant: queryParams(), setError, reset });
    }
  };

  //   FORM DATA
  const formData = [
    {
      type: "single-select",
      name: "productType",
      label: "ProductType",
      placeholder: "Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "productType",
      options: [
        { label: "Medicine", value: "medicine" },
        { label: "Clothes", value: "clothes" },
        { label: "Electronics", value: "electronics" },
        { label: "Supper Shop", value: "supper_shop" },
      ],
    },
    {
      type: "text",
      name: "productName",
      label: "Product Name",
      placeholder: "Enter Product Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "productName",
    },
    {
      type: "single-select",
      name: "category",
      label: "Category",
      placeholder: "Enter Category",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "category",
      options: category || [],
    },
    {
      type: "single-select",
      name: "unit",
      label: "Unit",
      placeholder: "Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "unit",
      options: [
        { label: "Carton", value: "carton" },
        { label: "Box", value: "box" },
        { label: "Page", value: "page" },
        { label: "Pies", value: "pies" },
        { label: "Page Unit", value: "pageUnit" },
        { label: "Ton", value: "ton" },
        { label: "Gram", value: "gram" },
        { label: "Kilogram", value: "kg" },
        { label: "Hali", value: "hali" },
        { label: "Dazan", value: "dazan" },
      ],
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
    {
      type: "date-picker",
      name: "expDate",
      label: "Exp Date ",
      placeholder: "Enter exp Date",
      required: true,
      size: "small",
      visibility: watch("productType") === "medicine",
      disabled: false,
      id: "expDate",
    },
    {
      type: "date-picker",
      name: "warranty",
      label: "Warranty ",
      placeholder: "Enter warranty",
      required: true,
      size: "small",
      visibility: watch("productType") === "electronics",
      disabled: false,
      id: "warranty",
    },
    {
      type: "date-picker",
      name: "gantry",
      label: "Gantry ",
      placeholder: "Enter Gantry",
      required: true,
      size: "small",
      visibility: watch("productType") === "electronics",
      disabled: false,
      id: "gantry",
    },
    {
      type: "number",
      name: "totalPrice",
      label: "Total Price",
      placeholder: "Total Price",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "totalPrice",
    },
  ];

  const column = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
  };

  // PRODUCT USE_EFFECT
  useEffect(() => {
    if (createProductIsSuccess || updateProductIsSuccess) {
      navigation("/products");
    }
  }, [createProductIsSuccess, updateProductIsSuccess]);

  // PRODUCT USE_EFFECT
  useEffect(() => {
    if (singleProduct) {
      setDefaultVales({ ...singleProduct });
    }
  }, [singleProduct]);

  // => THIS USE EFFECT USE FOR UNIT VALIDATION
  useEffect(() => {
    const schemaFields = selectedUnit(watch("unit")).reduce((acc, curr) => {
      if (curr) {
        acc[curr] = Yup.string().required(`${curr} is a required field`);
      }
      return acc;
    }, {});
    setUnitState(schemaFields);
  }, [watch("unit")]);

  return (
    <>
      <MainCard title={`${isUpdate ? "Product Update " : "Product Add"}`}>
        <Stack component={"form"} onSubmit={handleSubmit(formSubmit)}>
          <Grid container spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputField
                formData={formData}
                column={column}
                control={control}
              />
            </LocalizationProvider>
          </Grid>

          {/*EACH PRODUCT QUANTITY   */}
          {selectedUnit(watch("unit")).length > 0 && (
            <MainCard title={"Each Product Quantity"}>
              <Grid container spacing={2}>
                {selectedUnit(watch("unit")).map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <InputLabel
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item}
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </InputLabel>

                      <Controller
                        control={control}
                        name={`eachProductQuantity.${item}`}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            size="small"
                            inputRef={field.ref}
                            type="number"
                            placeholder={`Enter Product Quantity ${item}`}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(error)}
                            helperText={error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
          )}
          {/* PRODUCT QUANTITY   */}
          {selectedUnit(watch("unit")).length > 0 && (
            <MainCard title={"Product Quantity"}>
              <Grid container spacing={2}>
                {selectedUnit(watch("unit")).map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <InputLabel
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item}
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </InputLabel>

                      <Controller
                        control={control}
                        name={`productQuantity.${item}`}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            size="small"
                            inputRef={field.ref}
                            type="number"
                            placeholder={`Enter Product Quantity ${item}`}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(error)}
                            helperText={error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
          )}
          {/* PRODUCT PURCHASE PRICE   */}
          {selectedUnit(watch("unit")).length > 0 && (
            <MainCard title={"Product Purchase Price"}>
              <Grid container spacing={2}>
                {selectedUnit(watch("unit")).map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <InputLabel
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item}
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </InputLabel>

                      <Controller
                        control={control}
                        name={`purchasePrice.${item}`}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            size="small"
                            inputRef={field.ref}
                            type="number"
                            placeholder={`Enter Purchase Price ${item}`}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(error)}
                            helperText={error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
          )}
          {/* PRODUCT SALE PRICE   */}
          {selectedUnit(watch("unit")).length > 0 && (
            <MainCard title={"Product Sale Price"}>
              <Grid container spacing={2}>
                {selectedUnit(watch("unit")).map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <InputLabel
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item}
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </InputLabel>

                      <Controller
                        control={control}
                        name={`salePrice.${item}`}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            size="small"
                            inputRef={field.ref}
                            type="number"
                            placeholder={`Enter Sale Price ${item}`}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(error)}
                            helperText={error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
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
                loading={createProductIsLoading || updateProductIsLoading}
                loadingPosition="end"
                variant="contained"
                type="submit"
              >
                {isUpdate ? "Update" : "Submit"}
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
};

ProductAddAndUpdate.propTypes = {};

export default ProductAddAndUpdate;

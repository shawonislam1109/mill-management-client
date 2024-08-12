import { useRef } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  IconButton,
  Chip,
  FormControl,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  Skeleton,
  Avatar,
} from "@mui/material";

// third-party
import ReactToPrint from "react-to-print";

// project import

// assets
import { PrinterFilled } from "@ant-design/icons";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import {
  useGetProductSinglePurchaseInvoiceQuery,
  useGetProductSinglePurchaseQuery,
} from "../../../api/service/Purchase.service";
import MainCard from "../../../reuse-component/card/MainCard";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

// ==============================|| INVOICE - DETAILS ||============================== //

const Invoice = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const { purchaseId } = useParams();

  // >======================= || RTK HOOKS || =======================<
  // @GET INVOICE
  // RTK QUERY MUTATION PURCHASE PRODUCT
  const { data, isLoading, isFetching } = useGetProductSinglePurchaseQuery(
    purchaseId,
    {
      skip: !purchaseId,
    }
  );
  // RTK QUERY MUTATION PURCHASE PRODUCT
  const {
    data: invoiceData,
    isLoading: invoiceIsLoading,
    isFetching: invoiceisFetching,
  } = useGetProductSinglePurchaseInvoiceQuery(purchaseId, {
    skip: !purchaseId,
  });

  // Create the reducer function with useCallback
  const reduceProductDetails = useCallback(
    (acc, curr) => {
      if (curr) {
        acc = { ...acc, [curr["product"]]: curr };
      }
      return acc;
    },
    [data]
  ); // empty dependency array means this function is memoized and won't change

  // CONST PRODUCT DETAILS
  // Use the memoized reduce function
  const ProductDetails = data?.productDetails?.reduce(reduceProductDetails, {});

  const componentRef = useRef(null);

  // object to render as jsx
  const objectRender = (data) => {
    return (
      <div>
        {Object.entries(data).map(([key, value]) => {
          if (key === "percentage") {
            return <Typography key={key}>{`${key}: ${value} %`}</Typography>;
          }
          if (key !== "_id") {
            return <Typography key={key}>{`${key}: ${value}`}</Typography>;
          }
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Stack gap={2}>
        <Skeleton variant="rounded" width="100%" height={80} />
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Skeleton variant="rounded" width="50%" height={100} />
          <Skeleton variant="rounded" width="50%" height={100} />
        </Stack>
        <Stack gap={1}>
          <Skeleton variant="rounded" width="100%" height={30}></Skeleton>
          <Skeleton variant="rounded" width="100%" height={30}></Skeleton>
          <Skeleton variant="rounded" width="100%" height={30}></Skeleton>
        </Stack>
        <Stack gap={1} alignItems="end">
          <Skeleton variant="rounded" width="50%" height={30}></Skeleton>
          <Skeleton variant="rounded" width="50%" height={30}></Skeleton>
          <Skeleton variant="rounded" width="50%" height={30}></Skeleton>
        </Stack>
      </Stack>
    );
  }

  return (
    <MainCard content={false}>
      <Stack spacing={2.5}>
        <Box sx={{ p: 2.5, pb: 0 }}>
          <MainCard
            content={false}
            sx={{
              p: 1.25,
              bgcolor: "primary.lighter",
              borderColor: theme.palette.primary[100],
            }}
          >
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              {/* <PDFDownloadLink
                document={<ExportPDFView data={{ data, user }} />}
                fileName={`${data?._id}-${data?.client}.pdf`}
              >
                <IconButton>
                  <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton>
              </PDFDownloadLink> */}
              <ReactToPrint
                trigger={() => (
                  <IconButton>
                    <PrinterFilled style={{ color: theme.palette.grey[900] }} />
                  </IconButton>
                )}
                content={() => componentRef.current}
              />
            </Stack>
          </MainCard>
        </Box>

        <Box displayPrint={true} sx={{ p: 2.5 }} id="print" ref={componentRef}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                    gap={1}
                  >
                    <Chip
                      colo="light"
                      avatar={
                        <Avatar variant="rounded" alt={user?.companyName} />
                      }
                      label={user?.companyName}
                    />

                    <Chip
                      label={data?.paymentStatus}
                      variant="light"
                      color={
                        data?.paymentStatus === "UNPAID" ? "error" : "success"
                      }
                    />
                  </Stack>
                </Box>
                <Box>
                  <Stack alignItems="end">
                    <Stack direction="row" gap={1}>
                      <Typography
                        sx={{ overflow: "hidden" }}
                        variant="subtitle1"
                      >
                        Date:
                      </Typography>
                      <Typography color="secondary">
                        {data?.createdAt
                          ? format(new Date(data.createdAt), "yyyy-MM-dd")
                          : "N/A"}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={1}>
                      <Typography
                        sx={{ overflow: "hidden" }}
                        variant="subtitle1"
                      >
                        Invoice Id:
                      </Typography>
                      <Typography color="secondary">{data?._id}</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">Merchant:</Typography>

                  <FormControl sx={{ width: "100%" }}>
                    <Typography color="secondary">
                      Name : {user?.name}
                    </Typography>
                    <Typography color="secondary">
                      Company : {user?.companyName}
                    </Typography>
                    <Typography color="secondary">
                      Phone : {user?.mobile || "N/A"}
                    </Typography>
                    <Typography color="secondary">
                      Address: {user?.address || "N/A"}
                    </Typography>
                  </FormControl>
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">Supplier:</Typography>

                  {/* {data?.client && ( */}
                  <FormControl sx={{ width: "100%" }}>
                    <Typography color="secondary">
                      Name : {data?.name}
                    </Typography>
                    <Typography color="secondary">
                      Client ID : {data?.clientId}
                    </Typography>
                    <Typography color="secondary">
                      Phone : {data?.mobile || "N/A"}
                    </Typography>
                    <Typography color="secondary">
                      Address: {data?.address || "N/A"}
                    </Typography>
                  </FormControl>
                  {/* )} */}
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>ProductType</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Tax</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.productsId?.map((row, index) => {
                      return (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.productName}</TableCell>
                          <TableCell>{row.productType}</TableCell>
                          <TableCell>
                            {objectRender(
                              ProductDetails[row?._id]?.productQuantity
                            )}
                          </TableCell>
                          <TableCell>
                            {objectRender(ProductDetails[row?._id]?.salePrice)}
                          </TableCell>
                          <TableCell>
                            {ProductDetails[row?._id]?.totalTax}
                          </TableCell>
                          <TableCell>
                            {ProductDetails[row?._id]?.totalDiscount}
                          </TableCell>
                          <TableCell>
                            {ProductDetails[row?._id]?.totalPrice}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ borderWidth: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={8}></Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color={theme.palette.grey[500]}>
                    Sub Total:
                  </Typography>
                  <Typography>{invoiceData?.totalPrice} Tk</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color={theme.palette.warning.main}>
                    Discount:
                  </Typography>
                  <Typography variant="h6" color={theme.palette.warning.main}>
                    {invoiceData?.totalDiscount} Tk
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color={theme.palette.success.main}>
                    Tax:
                  </Typography>
                  <Typography variant="h6" color={theme.palette.success.main}>
                    {invoiceData?.tax} Tk
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography color={theme.palette.success.main}>
                    Provide
                  </Typography>
                  <Typography color={theme.palette.success.main}>
                    {invoiceData?.provideBalance} Tk
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography color={theme.palette.error.main}>Due</Typography>
                  <Typography color={theme.palette.error.main}>
                    {invoiceData?.due} Tk
                  </Typography>
                </Stack>

                <Divider sx={{ borderWidth: 1 }} />
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="primary" variant="subtitle1">
                    Grand Total:
                  </Typography>
                  <Typography color="primary" variant="subtitle1">
                    {invoiceData?.grandTotal}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Typography color="secondary">Notes: </Typography>
                <Typography>
                  It was a pleasure working with you and your team. We hope you
                  will keep us in mind for future freelance projects. Thank You!
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ p: 2.5, a: { textDecoration: "none", color: "inherit" } }}
        >
          {/* <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`}>
            <Button variant="contained" color="primary">
              Download
            </Button>
          </PDFDownloadLink> */}
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default Invoice;

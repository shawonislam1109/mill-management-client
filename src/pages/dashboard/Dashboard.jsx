import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import useAuth from "../../hooks/useAuth";
import {
  useGetDashboardQuery,
  useLazyGetDashboardMonthlyFilterQuery,
} from "../../api/service/dashboard.service";
import DatePickerViews from "../../utils/MonthePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { RefreshTwoTone } from "@mui/icons-material";

const Dashboard = () => {
  // auth user
  const { user } = useAuth();
  const [month, setMonth] = useState(new Date());
  const [tableData, setTableData] = useState([]);

  //   get DASHBOARD QUERY
  const { data, isLoading, refetch } = useGetDashboardQuery(user?._id, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });

  const [filter, { isLoading: filterIsLoading }] =
    useLazyGetDashboardMonthlyFilterQuery();

  if (isLoading || filterIsLoading) {
    <Grid container spacing={3}>
      {Array(3)
        .fill({})
        .map((item, index) => {
          return <Grid key={index}></Grid>;
        })}
    </Grid>;
  }

  // filter function
  const filterFunction = async (date) => {
    setMonth(dayjs(date).toISOString());
    const res = await filter({ month: dayjs(date).toISOString() });
    if (res?.data) {
      setTableData(res?.data);
    } else {
      setTableData({});
    }
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <>
      <Typography mb={2} variant="h4">
        DASHBOARD
      </Typography>

      <Stack
        direction="row"
        gap={2}
        my={2}
        justifyContent="center"
        alignItems="center"
      >
        <LoadingButton
          loading={filterIsLoading}
          onClick={refetch}
          variant="outlined"
        >
          <RefreshTwoTone />
        </LoadingButton>
        <DatePickerViews {...{ month, filterFunction }} />
      </Stack>

      {/* DASH BOARD CHARD */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            component={Stack}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            elevation={4}
            sx={{ background: "#0ccfb1", height: "10rem", borderRadius: 4 }}
          >
            <AccountBalanceWalletRoundedIcon
              style={{ fontSize: "55px", color: "#0c9c0c" }}
            />

            <Box component={Stack} justifyContent="end" alignItems="end">
              <Typography variant="h4" color="white">
                All Deposit Balance
              </Typography>
              <Chip
                color={tableData?.provideBalance > 0 ? "success" : "error"}
                variant="filled"
                label={`${tableData?.provideBalance} Taka` || 0}
                style={{ fontSize: "15px" }}
              ></Chip>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            component={Stack}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            elevation={4}
            sx={{ background: "#0ccfb1", height: "10rem", borderRadius: 4 }}
          >
            <AccountBalanceWalletRoundedIcon
              style={{ fontSize: "55px", color: "#0c9c0c" }}
            />

            <Box component={Stack} justifyContent="end" alignItems="end">
              <Typography variant="h4" color="white">
                Total Balance
              </Typography>
              <Chip
                color={tableData?.totalBalance > 0 ? "primary" : "error"}
                variant="filled"
                label={`${tableData?.totalBalance} Taka` || 0}
                style={{ fontSize: "15px" }}
              ></Chip>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            component={Stack}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            elevation={4}
            sx={{ background: "#11ed39", height: "10rem", borderRadius: 4 }}
          >
            <VerifiedUserOutlinedIcon
              style={{ fontSize: "55px", color: "#4e17cf" }}
            />

            <Box component={Stack} justifyContent="end" alignItems="end">
              <Typography variant="h4" color="white">
                Total Due
              </Typography>
              <Chip
                color={"error"}
                variant="filled"
                label={`${tableData?.totalDue} Taka` || 0}
                style={{ fontSize: "15px" }}
              ></Chip>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            component={Stack}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            elevation={4}
            sx={{ background: "#bf0a64", height: "10rem", borderRadius: 4 }}
          >
            <VerifiedUserOutlinedIcon
              style={{ fontSize: "55px", color: "#4e17cf" }}
            />

            <Box component={Stack} justifyContent="end" alignItems="end">
              <Typography variant="h4" color="white">
                Bua Bill
              </Typography>
              <Chip
                color="warning"
                label={tableData?.buaBill || 0}
                style={{ fontSize: "15px" }}
              ></Chip>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            component={Stack}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            elevation={4}
            sx={{ background: "#7738eb", height: "10rem", borderRadius: 4 }}
          >
            <VerifiedUserOutlinedIcon
              style={{ fontSize: "55px", color: "#4e17cf" }}
            />

            <Box component={Stack} justifyContent="end" alignItems="end">
              <Typography variant="h4" color="white">
                Total Cost
              </Typography>
              <Chip
                color={"error"}
                variant="filled"
                label={`${tableData?.totalCost} Taka` || 0}
                style={{ fontSize: "15px" }}
              ></Chip>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            component={Stack}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            elevation={4}
            sx={{ background: "#773833", height: "10rem", borderRadius: 4 }}
          >
            <VerifiedUserOutlinedIcon
              style={{ fontSize: "55px", color: "#4e17cf" }}
            />

            <Box component={Stack} justifyContent="end" alignItems="end">
              <Typography variant="h4" color="white">
                Total Mill
              </Typography>
              <Chip
                color={"info"}
                variant="filled"
                label={`${tableData?.totalMill}` || 0}
                style={{ fontSize: "15px" }}
              ></Chip>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

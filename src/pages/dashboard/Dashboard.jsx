import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import useAuth from "../../hooks/useAuth";
import { useGetDashboardQuery } from "../../api/service/dashboard.service";

const Dashboard = () => {
  // auth user
  const { user } = useAuth();

  //   get DASHBOARD QUERY
  const { data, isLoading } = useGetDashboardQuery(user?._id, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    <Grid container spacing={3}>
      {Array(3)
        .fill({})
        .map((item, index) => {
          return <Grid key={index}></Grid>;
        })}
    </Grid>;
  }

  return (
    <>
      <Typography mb={2} variant="h4">
        DASHBOARD
      </Typography>

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
                color={data?.provideBalance > 0 ? "success" : "error"}
                variant="filled"
                label={`${data?.provideBalance} Taka` || 0}
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
                color={data?.totalBalance > 0 ? "primary" : "error"}
                variant="filled"
                label={`${data?.totalBalance} Taka` || 0}
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
                label={`${data?.totalDue} Taka` || 0}
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
                label={data?.buaBill || 0}
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
                label={`${data?.totalCost} Taka` || 0}
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
                label={`${data?.totalMill}` || 0}
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

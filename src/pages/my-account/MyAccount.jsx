import { Grid, Paper } from "@mui/material";

import ProfileInfo from "./ProfileInfo";
import ProfileSideMenu from "./ProfileSideMenu";

const MyAccount = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={3}>
          <ProfileSideMenu />
        </Grid>
        <Grid item xs={12} md={12} lg={9}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 4 }}>
            <ProfileInfo />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default MyAccount;

// material-ui
import { Grid, List, ListItem, Stack, Typography } from "@mui/material";

// project import

// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { useState } from "react";
import { UserSwitchOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import CustomTab from "../../utils/tabs/CustomTab";
import CustomTabBody from "../../utils/tabs/CustomBody";
import MainCard from "../../reuse-component/card/MainCard";
import MillCount from "../mill-count/MillCount";

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const ProfileInfo = () => {
  // authUser
  const { user } = useAuth();

  // local state
  const [tabIndex, setTabIndex] = useState(0);

  // -> Tab list title data
  const tabData = [
    { menuTitle: "Profile Details" },
    { menuTitle: "Mill count" },
  ];

  return (
    <>
      <CustomTab
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        tabMenus={tabData}
      >
        <CustomTabBody tabIndex={tabIndex} index={0}>
          <List sx={{ py: 0 }}>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle1">Full Name</Typography>
                    <Typography>{user?.name || "N/A"}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle1">Mobile</Typography>
                    <Typography>{user?.mobile || "N/A"} </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle1">Client ID</Typography>
                    <Typography>{user?.clientId || "N/A"}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <MainCard sx={{ mt: 2 }} title="Reference">
            <List sx={{ py: 0 }}>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1">Name</Typography>
                      <Typography>
                        {UserSwitchOutlined?.reference?.name || "N/A"}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1">Mobile</Typography>
                      <Typography>
                        {user?.reference?.mobile || "N/A"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </MainCard>
        </CustomTabBody>

        <CustomTabBody tabIndex={tabIndex} index={1}>
          <MillCount />
        </CustomTabBody>
      </CustomTab>
    </>
  );
};

export default ProfileInfo;

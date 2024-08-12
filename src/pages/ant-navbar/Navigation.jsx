import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd";
import { items } from "./menuItem/IndexMeuItem";
import "./navigation.css";
import { Box, Chip, Stack, Typography, useMediaQuery } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Navigation = () => {
  // -> USE DISPATCH AND LOCATION HOOK
  const navigate = useNavigate();
  const location = useLocation();

  // SLEETED MENU
  const selectedPath = location.pathname.split("/")[1];

  // MEDIA DEVICE WITH RESPONSIVE
  const matches = useMediaQuery("(min-width:767px)");

  // => USE AUTH HOOK
  const { user } = useAuth();

  // => COLLAPSED FOR USE STATE
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // navigate route
  const handleMenuClick = (event) => {
    navigate(`/${event.key}`);
  };

  return (
    <>
      <Layout>
        {/* SIDE BAR */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={matches ? "17rem" : "0rem"}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            zIndex: 60,
            bottom: 0,
          }}
          className={"sider-scrollbar "}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={`${selectedPath}`}
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          {/* HEADER */}
          <Header
            style={{
              padding: 0,
              background: "#e4e3e8",
              overflow: "auto",
              position: "sticky",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              left: 0,
              zIndex: "100",
              top: 0,
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              {matches && (
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "20px",
                    width: 50,
                    height: 50,
                  }}
                />
              )}

              {!matches && (
                <Button onClick={showDrawer}>
                  <MenuUnfoldOutlined />
                </Button>
              )}

              <Typography>
                <Chip
                  size="medium"
                  sx={{ ml: 2 }}
                  color="info"
                  label={user?.role}
                ></Chip>
              </Typography>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent="center" // Use center to align items horizontally
              alignItems="center" // Use center to align items vertically
              mr={2}
              spacing={2} // Add spacing between elements
            >
              <Box>
                <Typography color="GrayText" variant="h5">
                  {user?.name}
                </Typography>
                <Typography textAlign="end" variant="subtitle1">
                  {user?.clientId}
                </Typography>
              </Box>
              <ProfileMenu />
            </Stack>
          </Header>

          {/* CONTENT PAGE */}
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              marginLeft: matches ? "3rem" : "0.7rem",
            }}
            className={"sider-scrollbar "}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* DRAWER MENU WHEN MEDIA QUERY WILL BE MAX 768PX THEN DRAWER WILL BE OPEN */}
      {!matches && (
        <Drawer
          title="Menu"
          placement={"left"}
          closable={true}
          onClose={onClose}
          open={open}
          key={"let"}
          style={{ width: "16rem", backgroundColor: "#F0F0F0" }}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={`${selectedPath}`}
            items={items}
            onClick={handleMenuClick}
          />
        </Drawer>
      )}
    </>
  );
};

export default Navigation;

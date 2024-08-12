import PropTypes from "prop-types";
import { forwardRef } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

// project import
import { Link } from "react-router-dom";

// header style
const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      navigateRoute,
      sx = {},
      title,
      codeHighlight = false,
      modal = false,
      endHeaderContent,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    // boxShadow =
    //   theme.palette.mode === ThemeMode.DARK ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          position: "relative",
          borderRadius: 1,
          // borderColor:
          //   theme.palette.mode === ThemeMode.DARK
          //     ? theme.palette.divider
          //     : theme.palette.grey.A800,
          // boxShadow:
          //   boxShadow && (!border || theme.palette.mode === ThemeMode.DARK)
          //     ? shadow || theme.customShadows.z1
          //     : "inherit",
          // ":hover": {
          //   boxShadow: boxShadow ? shadow || theme.customShadows.z1 : "inherit",
          // },
          ...(codeHighlight && {
            "& pre": {
              m: 0,
              p: "12px !important",
              fontFamily: theme.typography.fontFamily,
              fontSize: "0.75rem",
            },
          }),
          ...(modal && {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: `calc( 100% - 50px)`, sm: "auto" },
            "& .MuiCardContent-root": {
              overflowY: "auto",
              minHeight: "auto",
              maxHeight: `calc(90vh - 200px)`,
            },
          }),
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <Stack
            flexDirection="row"
            gap={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <CardHeader
              sx={headerSX}
              titleTypographyProps={{
                variant: "h5",
                fontWeight: "bold",
                color: "gray",
              }}
              title={title}
              action={secondary}
              subheader={subheader}
            />

            {navigateRoute && (
              <Link to={navigateRoute.route}>
                <Button sx={{ mr: 3 }} size="small" variant="contained">
                  {navigateRoute.name}
                </Button>
              </Link>
            )}
            {endHeaderContent && <Box paddingRight={2}>{endHeaderContent}</Box>}
          </Stack>
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
            component={<Button>Demo Button</Button>}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  subheader: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  modal: PropTypes.bool,
  codeHighlight: PropTypes.bool,
  codeString: PropTypes.string,
  navigateRoute: PropTypes.object,
  endHeaderContent: PropTypes.node,
};

MainCard.displayName = "MainCard";

export default MainCard;

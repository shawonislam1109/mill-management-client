import { ApartmentOutlined, LocationOnOutlined } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const PrintHeader = () => {
  const { user } = useAuth();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        mb: 5,
        borderBottom: "1px solid rgba(0,0,0, .2)",
        paddingBottom: "1rem",
        textTransform: "capitalize",
        color: "#000",
      }}
    >
      <Avatar
        alt={user?.name?.[0]}
        variant="rounded"
        src={
          user?.logo?.url
            ? import.meta.env.VITE_APP_FILE_SERVER_URL + user?.logo?.url
            : ""
        }
        sx={{ width: 120, height: 120 }}
      >
        {!user?.logo?.url && <ApartmentOutlined />}
      </Avatar>
      <Stack mb={5} alignItems="end">
        <Typography
          component="div"
          textAlign="center"
          sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}
          variant="h3"
        >
          {user?.companyName} <ApartmentOutlined />
        </Typography>
        {user?.address && (
          <Typography
            component="div"
            textAlign="right"
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}
          >
            {user?.address} <LocationOnOutlined />
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default PrintHeader;

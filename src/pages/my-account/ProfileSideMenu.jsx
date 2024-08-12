import {
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { EditOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import { convertToObject } from "../../utils/convertToObject";
import { useGetBorderListQuery } from "../../api/service/borderList.service";

const ProfileSideMenu = () => {
  // USE AUTH
  const { user } = useAuth();

  //   SUPPLIER  DATA FROM QUERY
  const { allBorderObject } = useGetBorderListQuery(user?._id, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return {
        allBorderObject: convertToObject(data, "border", [
          "totalBalance",
          "dueBalance",
        ]),
        ...rest,
      };
    },
  });

  // => IMAGE UPLOAD AND SHOW IMAGE CUSTOMIZE START
  const HoverAvatar = styled("div")({
    width: 100,
    height: 100,
    cursor: "pointer",
    borderRadius: "50%",
    position: "relative",
    "&:hover .avatar-img": {
      filter: "blur(4px)",
    },
    "&:hover .icon": {
      opacity: 1,
    },
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  });

  const AvatarImg = styled("img")({
    width: 100,
    height: 100,
    position: "absolute",
    borderRadius: "50%",
    top: 0,
    left: 0,
    transition: "filter 0.3s ease-in-out",
  });

  const IconOverlay = styled(EditOutlined)({
    width: 100,
    height: 100,
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
    fontSize: 40,
    color: "#000", // Adjust the color as needed
  });
  // => IMAGE UPLOAD AND SHOW IMAGE CUSTOMIZE START

  console.log(allBorderObject);
  console.log(user);

  // List data
  let listData = [
    { title: "Balance", value: allBorderObject?.[user?._id]?.totalBalance },
    { title: "Due", value: allBorderObject?.[user?._id]?.dueBalance },
  ];

  //   => LIST OF PACKAGE CHIP
  const selectedChipColor = (value) => {
    switch (value) {
      case "Monthly Fee":
        return "info";
      case "Package":
        return "primary";
      case "Balance":
        return "success";
      case "Due":
        return "error";
      default:
        return "";
    }
  };

  return (
    <>
      <Paper elevation={4} sx={{ p: 2, borderRadius: 4 }}>
        <Stack justifyContent="center" alignItems="center">
          <HoverAvatar>
            <AvatarImg
              className="avatar-img"
              alt={user?.name}
              src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
            />
            <IconOverlay className="icon" />
          </HoverAvatar>
          <Chip
            sx={{ ml: 2, mt: 1 }}
            size="medium"
            label={user?.status || "Inactive"}
            color={user?.status == "ACTIVE" ? "success" : "warning"}
            variant="filled"
          />
          <Stack justifyContent="center" alignItems="center" mt={3}>
            <Typography variant="h4">{user?.firstName}</Typography>
          </Stack>

          <Stack justifyContent="start" alignItems="start" mt={3}>
            <List>
              {listData.map((item, index) => (
                <ListItem key={index} sx={{ mr: 3 }}>
                  <ListItemText>
                    <Typography variant="subtitle1">{item.title} : </Typography>
                  </ListItemText>
                  <ListItemAvatar>
                    <Chip
                      label={item.value}
                      color={selectedChipColor(item.title)}
                    />
                  </ListItemAvatar>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default ProfileSideMenu;

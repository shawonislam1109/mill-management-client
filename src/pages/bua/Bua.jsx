import {
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useGetBuaQuery } from "../../api/service/bua.service";
import useDialog from "../../hooks/useDialog";
import BuaForm from "./BuaForm";
import { useEffect, useState } from "react";
import { Card } from "antd";

// DEFAULT VALUES
const DEFAULT_VALUES = {
  name: "",
  status: "",
};

const Bua = () => {
  // useAuth
  const { user } = useAuth();
  const { open, handleDialogClose, handleDialogOpen } = useDialog();

  //   const local Stats
  const [isUpdate, setIsUpdate] = useState(false);
  const [defaultValues, setDefaultValues] = useState({ ...DEFAULT_VALUES });

  // \=============|| RTK QUERY MUTATION ||==============
  const { data, isLoading } = useGetBuaQuery(user?._id, {
    skip: !user,
  });

  useEffect(() => {
    if (data) {
      setDefaultValues({
        name: data?.[0]?.name,
        status: data?.[0]?.status,
        _id: data?.[0]?._id,
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <Skeleton width={200} height={400} variant="text" />
      </>
    );
  }

  //   update handler
  const updateHandler = () => {
    handleDialogOpen();
    setIsUpdate(true);
  };

  if (data?.length <= 0) {
    return (
      <>
        <Typography textAlign="center">Bua List </Typography>

        {user?.role === "manager" && (
          <Button
            textAlign="center"
            onClick={() => handleDialogOpen()}
            variant="outlined"
            color="success"
          >
            Create Bua
          </Button>
        )}

        <BuaForm
          {...{
            dialogOpen: open,
            dialogClose: handleDialogClose,
            isUpdate,
            defaultValues,
          }}
        />
      </>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="center" alignItems="center">

        <Paper elevation={4} sx={{ borderRadius: 3 }}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Dua Details
              </Typography>
              <Typography variant="h5" component="div">
                name: {data?.[0]?.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                status :
                <Chip
                  label={data?.[0]?.status}
                  color={data?.[0]?.status == "ACTIVE" ? "success" : "error"}
                ></Chip>
              </Typography>
            </CardContent>
            <CardActions>
              {user?.role === "manager" && (
                <Button onClick={updateHandler}>Update</Button>
              )}
            </CardActions>
          </Card>
        </Paper>

        <BuaForm
          {...{
            dialogOpen: open,
            dialogClose: handleDialogClose,
            isUpdate,
            defaultValues,
          }}
        />
      </Stack>
    </Box>
  );
};

export default Bua;

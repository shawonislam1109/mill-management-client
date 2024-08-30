import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { useAllBorderQuery } from "../../api/service/auth.service";
import { convertToObject } from "../../utils/convertToObject";
import { RefreshTwoTone } from "@mui/icons-material";
import DatePickerViews from "../../utils/MonthePicker";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useGetBorderEachBorderTransitionHistoryQuery, useLazyGetBorderEachBorderTransitionHistoryFilterQuery } from "../../api/service/borderList.service";

const TransitionHistory = () => {
  // GET PARAMS ID
  const { borderId } = useParams();
  const { user } = useAuth();

  // LOCAL STATE 
  const [month, setMonth] = useState(new Date())
  const [dataMap, setData] = useState([])



  //   USE GET MILL HISTORY GET API
  const { data, isLoading, refetch } = useGetBorderEachBorderTransitionHistoryQuery(
    borderId,
    {
      skip: !borderId,
    }
  );

  //   All Border  DATA FROM QUERY
  const { allUserObject } = useAllBorderQuery(user?._id, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return {
        allUserObject: convertToObject(data, "_id", data),
        ...rest,
      };
    },
  });


  // FILTER MUTATION 
  const [filter, { isLoading: filterIsLoading }] = useLazyGetBorderEachBorderTransitionHistoryFilterQuery()

  // filter function 
  const filterFunction = async (date) => {
    setMonth(dayjs(date).toISOString())
    const res = await filter({ borderId, month: dayjs(date).toISOString() })
    if (res?.data) {
      setData(res?.data)
    }

  }

  // useEffect use for setData
  useEffect(() => {
    if (data) {
      setData(data)
    }
  }, [data])

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array(8)
          .fill({})
          .map((item, index) => {
            return (
              <Grid key={index} item xs={12} md={4} lg={4}>
                <Skeleton variant="text" height={300} />
              </Grid>
            );
          })}
      </Grid>
    );
  }

  if (!data?.length) {
    return (
      <>
        <Typography variant="h3"> Transition History </Typography>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          No Data Found
        </Typography>
      </>
    );
  }





  return (
    <>
      <Typography variant="h3"> Transition History </Typography>
      <Stack direction='row' spacing={2}>
        <LoadingButton loading={isLoading} onClick={refetch} variant="outlined"> <RefreshTwoTone /></LoadingButton>
        <DatePickerViews {...{ filterFunction, month }} />
      </Stack>
      <Grid container spacing={4} my={3}>
        {dataMap?.length > 0 ? (
          dataMap?.map((item, index) => {
            return (
              <Grid key={index} item xs={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 20 }}
                      color="text.main"
                      gutterBottom
                    >
                      name : {allUserObject?.[item?.border]?.firstName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.main">
                      Phone : {allUserObject?.[item?.border]?.phoneNumber}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.main">
                      pay : {item?.payAmount}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.main">
                      Total Balance : {item?.totalBalance}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.main">
                      Due Balance : {item?.dueBalance}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.main">
                      Date :
                      {dayjs(item.createdAt).format("MMMM D, YYYY hh:mm A")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <>
            <Typography variant="h1"> No Data Found </Typography>
          </>
        )}
      </Grid>
    </>
  );
};

export default TransitionHistory;

import { Box, Chip, Typography } from "@mui/material";
import { DeleteFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import BorderListFrom from "./BorderListFrom";
import {
  useCreateBorderListMutation,
  useDeleteBorderListMutation,
  useGetBorderListQuery,
  useLazyGetBorderListFilterQuery,
  useUpdateBorderListMutation,
} from "../../api/service/borderList.service";
import useAuth from "../../hooks/useAuth";
import useDialog from "../../hooks/useDialog";
import ActionCell from "../../reuse-component/TableComponent/ActionCell";
import TableComponent from "../../reuse-component/TableComponent/Table";
import DeletionAlert from "../../maintenance/DeleteAlart";
import { useAllBorderQuery } from "../../api/service/auth.service";
import { convertToObject } from "../../utils/convertToObject";
import { convertToLabel } from "../../utils/convertToLabel";
import dayjs from "dayjs";
import { ListAltOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PaymentsIcon from "@mui/icons-material/Payments";
import BorderAddBalance from "./BorderAddBalance";
import DatePickerViews from "../../utils/MonthePicker";

const DEFAULT_VALUE = {
  totalBalance: 0,
  status: "",
  totalMill: 0,
  totalCost: 0,
  dueBalance: 0,
  buaBill: 0,
  border: "",
};

const BorderList = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();
  const navigate = useNavigate();

  // USE DIALOG HOOKS

  const {
    open,
    handleDialogClose,
    handleDialogOpen,
    deleteOpen,
    handleDeleteDialogClose,
    handleDeleteDialogOpen,
  } = useDialog();

  const {
    open: addBalanceOpen,
    handleDialogClose: handleAddBalanceDialogClose,
    handleDialogOpen: handleAddBalanceDialogOpen,
  } = useDialog();

  // LOCAL STATE
  const [isUpdate, setUpdate] = useState(false);
  const [defaultValues, setDefaultValues] = useState({ ...DEFAULT_VALUE });
  const [singleData, setSingleData] = useState({});
  const [month, setMonth] = useState(new Date());
  const [tableData, setTableData] = useState([]);

  //   SUPPLIER  DATA FROM QUERY
  const {
    data: BorderList,
    isLoading: BorderListIsLoading,
    refetch,
    isFetching,
  } = useGetBorderListQuery(user?._id, {
    skip: !user,
  });
  //   All Border  DATA FROM QUERY
  const { allUser, allUserObject } = useAllBorderQuery(user?._id, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return {
        allUser: convertToLabel(data, "firstName", "_id"),
        allUserObject: convertToObject(data, "_id", data),
        ...rest,
      };
    },
  });

  const [createBorderList, { isLoading: createIsLoading }] =
    useCreateBorderListMutation();

  const [updateBorderList, { isLoading: updateIsLoading }] =
    useUpdateBorderListMutation();

  // Filter Border
  const [filter, { data: filterMonthData, isLoading: filterIsLoading }] =
    useLazyGetBorderListFilterQuery();

  // delete handler
  const [deleteBorderList, { isLoading: deleteIsLoading }] =
    useDeleteBorderListMutation();

  // HANDLE ADD BUTTON
  const handleAddButton = () => {
    setUpdate(false);
    setDefaultValues({ ...DEFAULT_VALUE });
    handleDialogOpen();
  };

  // UPDATE BorderList HANDLER
  const updateBorderListHandler = (data) => {
    setUpdate(true);
    setDefaultValues({ ...data });
    handleDialogOpen();
  };

  // DELETE BorderList HANDLER
  const deleteBorderListHandler = (data) => {
    handleDeleteDialogOpen();
    setSingleData(data._id);
  };
  // MILL HISTORY HANDLER
  const millHistoryHandler = (data) => {
    navigate(`/mill-history/${data?.border}`);
  };
  // TRANSITION HISTORY HANDLER
  const transitionHistoryHandler = (data) => {
    navigate(`/transition-history/${data?.border}`);
  };
  // TRANSITION HISTORY HANDLER
  const millCount = (data) => {
    navigate(`/mill-count/${data?.border}`);
  };
  // MILL HISTORY HANDLER
  const balanceAddHandler = (data) => {
    setSingleData(data);
    setDefaultValues({ ...data });
    handleAddBalanceDialogOpen();
  };

  const deleteHandleSubmission = () => {
    deleteBorderList({
      BorderListId: singleData,
      handleCloseDialog: handleDeleteDialogClose,
      merchant: user?._id,
    });
  };

  // filter function
  const filterFunction = async (date) => {
    setMonth(dayjs(date).toISOString());
    const res = await filter({ month: dayjs(date).toISOString() });
    console.log(res);
    if (res?.data) {
      setTableData(res?.data);
    }
  };

  useEffect(() => {
    setTableData(BorderList);
  }, [BorderList]);

  // Table columns
  const tableColumns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Mill",
      accessorKey: "",
      cell: ({ row }) => {
        if (row?.original?.fullMill) {
          return "FULL";
        } else if (row?.original?.millOff) {
          return "OFF";
        } else {
          return (
            <>
              <Typography>{row?.original?.schedule[0]}</Typography>
              <Typography>{row?.original?.schedule[1]}</Typography>
              <Typography>{row?.original?.schedule[3]}</Typography>
            </>
          );
        }
      },
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Role",
      accessorKey: "Role",
      globalFilterFn: "fuzzy",
      cell: ({ row }) => {
        return (
          <Chip
            label={allUserObject?.[row?.original?.border]?.role}
            color={
              allUserObject?.[row?.original?.border]?.role === "manager"
                ? "success"
                : "info"
            }
          />
        );
      },
      filterFn: (row, columnId, filterValue) => {
        const phone = allUserObject?.[row?.original?.border]?.role;
        return phone?.includes(filterValue);
      },
    },
    {
      header: "Bua Mill",
      accessorKey: "buaBill",
    },
    {
      header: "Mill Count",
      accessorKey: "totalMill",
    },

    {
      header: "Total Cost",
      accessorKey: "totalCost",
    },
    {
      header: "Total Balance",
      accessorKey: "totalBalance",
    },
    {
      header: "Provide Balance",
      accessorKey: "provideBalance",
    },
    {
      header: "Due Balance",
      accessorKey: "dueBalance",
    },
    {
      header: "Create Date",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        return dayjs(row?.original?.createdAt).format("MMMM D, YYYY h:mm A");
      },
    },
    {
      header: "status",
      accessorKey: "status",
      cell: ({ row }) => {
        return (
          <Chip
            label={row?.original?.status || ""}
            color={row?.original?.status === "ACTIVE" ? "success" : "error"}
            size={"small"}
          />
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        return (
          <>
            <ActionCell
              ellipsis={true}
              hasEditButton={user?.role === "manager"}
              row={row}
              isExpandable={false}
              setOpen={(data) => updateBorderListHandler(data)}
              permissionKey="BorderList"
              menuItems={[
                {
                  ...(user?.role === "manager" && {
                    title: "Delete",
                    icon: <DeleteFilled />,
                    handleClick: deleteBorderListHandler,
                  }),
                },
                {
                  title: "Mill-History",
                  icon: <ListAltOutlined />,
                  handleClick: millHistoryHandler,
                },
                {
                  ...(user?.role === "manager" && {
                    title: "Balance Add",
                    icon: <PaymentsIcon />,
                    handleClick: balanceAddHandler,
                  }),
                },
                {
                  ...(user?.role === "manager" && {
                    title: "Mill Status update",
                    icon: <PaymentsIcon />,
                    handleClick: millCount,
                  }),
                },
                {
                  title: "Transition History",
                  icon: <ListAltOutlined />,
                  handleClick: transitionHistoryHandler,
                },
              ]}
            />
          </>
        );
      },
    },
  ];

  return (
    <Box>
      <TableComponent
        {...{
          title: "BorderList",
          subheader: "BorderList of list",
          tableColumns,
          tableData: tableData || [],
          isLoading: BorderListIsLoading || isFetching || filterIsLoading,
          handleAddButton,
          addBtnLabel: user?.role === "manager",
          tableDependency: [allUserObject],
          refetch,
          extraHeader: <DatePickerViews {...{ month, filterFunction }} />,
        }}
      />

      {/* Dialog component */}
      <BorderListFrom
        {...{
          updateBorderList,
          allUser,
          createBorderList,
          isLoading: createIsLoading || updateIsLoading,
          isUpdate,
          allUserObject,
          defaultValues,
          dialogOpen: open,
          dialogClose: handleDialogClose,
        }}
      />

      {/* Balance update dialog */}
      <BorderAddBalance
        {...{
          defaultValues,
          dialogOpen: addBalanceOpen,
          dialogClose: handleAddBalanceDialogClose,
        }}
      />
      {/* delete dialog handler */}

      {/* <DeleteAl */}
      <DeletionAlert
        {...{
          title: "Border List",
          open: deleteOpen,
          handleClose: handleDeleteDialogClose,
          isLoading: deleteIsLoading,
          handleSubmission: deleteHandleSubmission,
        }}
      />
    </Box>
  );
};

export default BorderList;

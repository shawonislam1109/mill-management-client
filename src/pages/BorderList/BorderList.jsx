import { Box, Chip } from "@mui/material";
import { DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import BorderListFrom from "./BorderListFrom";
import {
  useCreateBorderListMutation,
  useDeleteBorderListMutation,
  useGetBorderListQuery,
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

const DEFAULT_VALUE = {
  totalBalance: "",
  status: "",
  totalMill: "",
  totalCost: "",
  dueBalance: "",
  border: "",
};

const BorderList = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();

  // USE DIALOG HOOKS

  const {
    open,
    handleDialogClose,
    handleDialogOpen,
    deleteOpen,
    handleDeleteDialogClose,
    handleDeleteDialogOpen,
  } = useDialog();

  // LOCAL STATE
  const [isUpdate, setUpdate] = useState(false);
  const [defaultValues, setDefaultValues] = useState({ ...DEFAULT_VALUE });
  const [singleData, setSingleData] = useState({});

  //   SUPPLIER  DATA FROM QUERY
  const { data: BorderList, isLoading: BorderListIsLoading } =
    useGetBorderListQuery(user?._id, {
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

  const deleteHandleSubmission = () => {
    deleteBorderList({
      BorderListId: singleData,
      handleCloseDialog: handleDeleteDialogClose,
      merchant: user?._id,
    });
  };

  // Table columns
  const tableColumns = [
    {
      header: "Name",
      accessorKey: "name",
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
      header: "Total Mill",
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
                  title: "Delete",
                  icon: <DeleteFilled />,
                  handleClick: deleteBorderListHandler,
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
          tableData: BorderList || [],
          isLoading: BorderListIsLoading,
          handleAddButton,
          addBtnLabel: user?.role === "manager",
          tableDependency: [allUserObject],
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

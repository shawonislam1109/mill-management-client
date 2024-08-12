import { Box, IconButton } from "@mui/material";
import TableComponent from "../../reuse-component/TableComponent/Table";
import useAuth from "../../hooks/useAuth";
import useDialog from "../../hooks/useDialog";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import RestoreAlert from "../../maintenance/RestoreAlert";
import { useState } from "react";
import {
  useGetCategoryTrashQuery,
  useRestoreCategoryMutation,
} from "../../api/service/category.service";

const CategoryTrash = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();

  // USE DIALOG HOOKS

  const { open, handleDialogClose, handleDialogOpen } = useDialog();

  //   Category  DATA FROM QUERY
  const { data: categoryTrash, isLoading: categoryTrashIsLoading } =
    useGetCategoryTrashQuery(user?.merchant, {
      skip: !user,
    });

  // Category MUTATION DATA
  const [restoreCategory, { isLoading: restoreIsLoading }] =
    useRestoreCategoryMutation();

  // LOCAL STATE

  const [singleData, setSingleData] = useState({});

  // RESTORE Category HANDLER
  const restoreCategoryHandler = (data) => {
    handleDialogOpen();
    setSingleData(data);
  };

  const restoreHandleSubmission = () => {
    restoreCategory({
      categoryId: singleData,
      handleCloseDialog: handleDialogClose,
      merchant: user?.merchant,
    });
  };

  // Table columns
  const tableColumns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "remarks",
      accessorKey: "remarks",
    },

    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => {
        return (
          <IconButton
            onClick={() => restoreCategoryHandler(row?.original?._id)}
          >
            <RestoreOutlinedIcon sx={{ color: "green" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <TableComponent
        {...{
          title: "Category Trash",
          subheader: "Category Trash of list",
          tableColumns,
          tableData: categoryTrash,
          isLoading: categoryTrashIsLoading,
          addBtnLabel: false,
        }}
      />

      {/* RESTORE ITEM DIALOG  COMPONENT  */}
      <RestoreAlert
        {...{
          open: open,
          handleClose: handleDialogClose,
          isLoading: restoreIsLoading,
          handleSubmission: restoreHandleSubmission,
        }}
      />
    </Box>
  );
};

export default CategoryTrash;

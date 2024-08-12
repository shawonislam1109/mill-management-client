import { Box, IconButton } from "@mui/material";

import {
  useGetSupplierTrashQuery,
  useRestoreSupplierMutation,
} from "../../api/service/supplier.service";
import ShowStatus from "../../reuse-component/TableComponent/ShowStatus";
import TableComponent from "../../reuse-component/TableComponent/Table";
import useAuth from "../../hooks/useAuth";
import useDialog from "../../hooks/useDialog";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import RestoreAlert from "../../maintenance/RestoreAlert";
import { useState } from "react";

const SupplierTrash = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();

  // USE DIALOG HOOKS

  const { open, handleDialogClose, handleDialogOpen } = useDialog();

  //   SUPPLIER  DATA FROM QUERY
  const { data: supplierTrash, isLoading: supplierTrashIsLoading } =
    useGetSupplierTrashQuery(user?.merchant, {
      skip: !user,
    });

  // SUPPLIER MUTATION DATA
  const [restoreSupplier, { isLoading: restoreIsLoading }] =
    useRestoreSupplierMutation();

  // LOCAL STATE

  const [singleData, setSingleData] = useState({});

  // RESTORE SUPPLIER HANDLER
  const restoreSupplierHandler = (data) => {
    handleDialogOpen();
    setSingleData(data);
  };

  const restoreHandleSubmission = () => {
    restoreSupplier({
      supplierId: singleData,
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
      header: "contactNumber",
      accessorKey: "contactNumber",
    },
    {
      header: "tradeNumber",
      accessorKey: "tradeNumber",
    },
    {
      header: "presentAddress",
      accessorKey: "presentAddress",
    },
    {
      header: "status",
      accessorKey: "status",
      cell: ({ row }) => {
        return (
          <ShowStatus value={row?.original?.status || ""} size={"small"} />
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => {
        return (
          <IconButton
            onClick={() => restoreSupplierHandler(row?.original?._id)}
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
          title: "Supplier Trash",
          subheader: "supplier Trash of list",
          tableColumns,
          tableData: supplierTrash,
          isLoading: supplierTrashIsLoading,
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

export default SupplierTrash;

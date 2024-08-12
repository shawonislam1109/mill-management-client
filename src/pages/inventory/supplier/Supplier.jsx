import { Box } from "@mui/material";
import ShowStatus from "../../../reuse-component/TableComponent/ShowStatus";
import ActionCell from "../../../reuse-component/TableComponent/ActionCell";
import { DeleteFilled } from "@ant-design/icons";
import TableComponent from "../../../reuse-component/TableComponent/Table";
import useAuth from "../../../hooks/useAuth";
import {
  useCreateSupplierMutation,
  useDeleteAndRestoreSupplierMutation,
  useGetSupplierQuery,
  useUpdateSupplierMutation,
} from "../../../api/service/supplier.service";
import useDialog from "../../../hooks/useDialog";
import { useState } from "react";
import SupplierForm from "./SupplierForm";
import DeletionAlert from "../../../maintenance/DeleteAlart";

const DEFAULT_VALUE = {
  name: "",
  email: "",
  contactNumber: "",
  emergencyContactNumber: "",
  tradeNumber: "",
  presentAddress: "",
  permanentAddress: "",
  location: "",
  status: "",
};

const Supplier = () => {
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
  const { data: supplier, isLoading: supplierIsLoading } = useGetSupplierQuery(
    user?.merchant,
    {
      skip: !user,
    }
  );

  const [createSupplier, { isLoading: createIsLoading }] =
    useCreateSupplierMutation();
  const [updateSupplier, { isLoading: updateIsLoading }] =
    useUpdateSupplierMutation();

  // delete handler
  const [deleteSupplier, { isLoading: deleteIsLoading }] =
    useDeleteAndRestoreSupplierMutation();

  // HANDLE ADD BUTTON
  const handleAddButton = () => {
    setUpdate(false);
    setDefaultValues({ ...DEFAULT_VALUE });
    handleDialogOpen();
  };

  // UPDATE SUPPLIER HANDLER
  const updateSupplierHandler = (data) => {
    setUpdate(true);
    setDefaultValues({ ...data });
    handleDialogOpen();
  };

  // DELETE SUPPLIER HANDLER
  const deleteSupplierHandler = (data) => {
    handleDeleteDialogOpen();
    setSingleData(data._id);
  };

  const deleteHandleSubmission = () => {
    deleteSupplier({
      supplierId: singleData,
      handleCloseDialog: handleDeleteDialogClose,
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
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        return (
          <>
            <ActionCell
              ellipsis={true}
              row={row}
              isExpandable={false}
              setOpen={(data) => updateSupplierHandler(data)}
              permissionKey="supplier"
              menuItems={[
                {
                  title: "Delete",
                  icon: <DeleteFilled />,
                  handleClick: deleteSupplierHandler,
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
          title: "Supplier",
          subheader: "supplier of list",
          tableColumns,
          tableData: supplier,
          isLoading: supplierIsLoading,
          handleAddButton,
          addBtnLabel: true,
        }}
      />

      {/* Dialog component */}
      <SupplierForm
        {...{
          updateSupplier,
          createSupplier,
          isLoading: createIsLoading || updateIsLoading,
          isUpdate,
          defaultValues,
          dialogOpen: open,
          dialogClose: handleDialogClose,
        }}
      />

      {/* delete dialog handler */}

      {/* <DeleteAl */}

      <DeletionAlert
        {...{
          title: "DELETE SUPPLIER",
          open: deleteOpen,
          handleClose: handleDeleteDialogClose,
          isLoading: deleteIsLoading,
          handleSubmission: deleteHandleSubmission,
        }}
      />
    </Box>
  );
};

export default Supplier;

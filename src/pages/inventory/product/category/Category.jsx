import { Box } from "@mui/material";
import { DeleteFilled } from "@ant-design/icons";

import { useState } from "react";
import CategoryForm from "./CategoryForm";
import useAuth from "../../../../hooks/useAuth";
import useDialog from "../../../../hooks/useDialog";
import ActionCell from "../../../../reuse-component/TableComponent/ActionCell";
import TableComponent from "../../../../reuse-component/TableComponent/Table";
import DeletionAlert from "../../../../maintenance/DeleteAlart";
import {
  useCreateCategoryMutation,
  useDeleteAndRestoreCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../api/service/category.service";

const DEFAULT_VALUE = {
  name: "",
};

const Category = () => {
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

  //   //   Category  DATA FROM QUERY
  const { data: category, isLoading: categoryIsLoading } = useGetCategoryQuery(
    user?.merchant,
    {
      skip: !user,
    }
  );

  const [createCategory, { isLoading: createIsLoading }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: updateIsLoading }] =
    useUpdateCategoryMutation();

  //   // delete handler
  const [deleteCategory, { isLoading: deleteIsLoading }] =
    useDeleteAndRestoreCategoryMutation();

  // HANDLE ADD BUTTON
  const handleAddButton = () => {
    setUpdate(false);
    setDefaultValues({ ...DEFAULT_VALUE });
    handleDialogOpen();
  };

  // UPDATE Category HANDLER
  const updateCategoryHandler = (data) => {
    setUpdate(true);
    setDefaultValues({ ...data });
    handleDialogOpen();
  };

  // DELETE Category HANDLER
  const deleteCategoryHandler = ({ _id }) => {
    handleDeleteDialogOpen();
    setSingleData(_id);
  };

  const deleteHandleSubmission = () => {
    deleteCategory({
      categoryId: singleData,
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
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        return (
          <>
            <ActionCell
              ellipsis={true}
              row={row}
              isExpandable={false}
              setOpen={(data) => updateCategoryHandler(data)}
              permissionKey="Category"
              menuItems={[
                {
                  title: "Delete",
                  icon: <DeleteFilled />,
                  handleClick: deleteCategoryHandler,
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
          title: "Category",
          subheader: "Category of list",
          tableColumns,
          tableData: category || [],
          isLoading: categoryIsLoading,
          handleAddButton,
          addBtnLabel: true,
        }}
      />

      {/* Dialog component */}
      <CategoryForm
        {...{
          updateCategory,
          createCategory,
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
          title: "DELETE Category",
          open: deleteOpen,
          handleClose: handleDeleteDialogClose,
          isLoading: deleteIsLoading,
          handleSubmission: deleteHandleSubmission,
        }}
      />
    </Box>
  );
};

export default Category;

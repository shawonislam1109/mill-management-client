import { Box } from "@mui/material";
import ActionCell from "../../../reuse-component/TableComponent/ActionCell";
import { DeleteFilled } from "@ant-design/icons";
import TableComponent from "../../../reuse-component/TableComponent/Table";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useDialog from "../../../hooks/useDialog";
import DeletionAlert from "../../../maintenance/DeleteAlart";
import { useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../../api/service/product.service";
import { useGetCategoryQuery } from "../../../api/service/category.service";
import { convertToObject } from "../../../utils/convertToObject";

const Product = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();

  // navigate router
  const navigate = useNavigate();

  // LOCAL STATE FOR PAGINATION
  const [productPagination, setProductPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ===================|| RTK HOOKS MUTATION ||=====================
  const {
    data: products,
    isLoading: productIsLoading,
    isSuccess: productIsSuccess,
  } = useGetProductQuery(productPagination, {
    skip: !user,
  });

  //   //   Category  DATA FROM QUERY
  const { category, isLoading: categoryIsLoading } = useGetCategoryQuery(
    user?.merchant,
    {
      skip: !user,
      selectFromResult: ({ data, ...rest }) => {
        return { category: convertToObject(data, "_id"), ...rest };
      },
    }
  );

  // USE DIALOG HOOKS
  const { deleteOpen, handleDeleteDialogClose, handleDeleteDialogOpen } =
    useDialog();

  // LOCAL STATE
  const [isUpdate, setUpdate] = useState(false);
  const [product, setProduct] = useState({});

  // HANDLE ADD BUTTON
  const handleAddButton = () => {
    navigate(
      `/products/addAndUpdate?isUpdate=false&pageIndex=${productPagination.pageIndex}&pageSize=${productPagination.pageSize}`
    );
  };

  // UPDATE Product HANDLER
  const updateProductHandler = (data) => {
    navigate(
      `/products/addAndUpdate/${data?._id}?isUpdate=true&pageIndex=${productPagination.pageIndex}&pageSize=${productPagination.pageSize}`
    );
  };

  // DELETE Product HANDLER
  const deleteProductHandler = (data) => {
    handleDeleteDialogOpen();
    setProduct(data);
  };

  const deleteHandleSubmission = () => {};

  // Table columns
  const tableColumns = [
    {
      header: "Product Name",
      accessorKey: "productType",
    },
    {
      header: "Product Name",
      accessorKey: "productName",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => {
        return category && category[row?.original?.category]?.name;
      },
    },
    {
      header: "Unit",
      accessorKey: "unit",
    },
    {
      header: "Whole Sale Price",
      accessorKey: "wholeSalePrice",
    },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
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
              setOpen={(data) => updateProductHandler(data)}
              permissionKey="Product"
              menuItems={[
                {
                  title: "Delete",
                  icon: <DeleteFilled />,
                  handleClick: deleteProductHandler,
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
          title: "Product",
          subheader: "Product of list",
          tableColumns,
          tableData: products?.data || [],
          isLoading: productIsLoading,
          handleAddButton,
          allDataCount: products?.totalDocument,
          totalPages: products?.totalPages,
          currentPage: products?.currentPage,
          serverPaginationPageIndex: productPagination,
          SetServerPaginationPageIndex: setProductPagination,
          isServerPagination: true,
          addBtnLabel: true,
          tableDependency: [category],
        }}
      />

      {/* delete dialog handler */}

      {/* <DeleteAl */}

      <DeletionAlert
        {...{
          title: "DELETE Product",
          open: deleteOpen,
          handleClose: handleDeleteDialogClose,
          isLoading: false,
          handleSubmission: deleteHandleSubmission,
        }}
      />
    </Box>
  );
};

export default Product;

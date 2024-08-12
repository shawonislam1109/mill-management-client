import { Box, Typography } from "@mui/material";
import TableComponent from "../../reuse-component/TableComponent/Table";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useGetStockQuery } from "../../api/service/stock.service";
import { useGetCategoryQuery } from "../../api/service/category.service";
import { convertToObject } from "../../utils/convertToObject";

const Stock = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();

  // LOCAL STATE FOR PAGINATION
  const [productPagination, setProductPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //   STOKES  DATA FROM QUERY
  const { data: stocks, isLoading: stocksIsLoading } = useGetStockQuery(
    productPagination,
    {
      skip: !user,
    }
  );

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

  // LOCAL STATE
  const [singleData, setSingleData] = useState({});

  // Table columns
  const tableColumns = [
    {
      header: "Product Type",
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
      header: "Quantity",
      accessorKey: "product",
      cell: ({ row }) => {
        return (
          <>
            {Object.keys(row?.original?.productQuantity).map((item) => {
              if (item !== "_id") {
                return (
                  <Typography key={item}>
                    {item} : {row?.original?.productQuantity[item]}
                  </Typography>
                );
              }
            })}
          </>
        );
      },
    },
    {
      header: "PurchasePrice",
      accessorKey: "PurchasePrice",
      cell: ({ row }) => {
        return (
          <>
            {Object.keys(row?.original?.product?.purchasePrice).map((item) => {
              if (item !== "_id") {
                return (
                  <Typography key={item}>
                    {item} : {row?.original?.product?.purchasePrice[item]}
                  </Typography>
                );
              }
            })}
          </>
        );
      },
    },
    {
      header: "salePrice",
      accessorKey: "salePrice",
      cell: ({ row }) => {
        return (
          <>
            {Object.keys(row?.original?.product?.salePrice).map((item) => {
              if (item !== "_id") {
                return (
                  <Typography key={item}>
                    {item} : {row?.original?.product?.salePrice[item]}
                  </Typography>
                );
              }
            })}
          </>
        );
      },
    },
    {
      header: "Whole Sale Price",
      accessorKey: "wholeSalePrice",
      cell: ({ row }) => {
        return row?.original?.product?.wholeSalePrice;
      },
    },
  ];

  return (
    <Box>
      <TableComponent
        {...{
          title: "Stocks",
          subheader: "Stocks of list",
          tableColumns,
          tableData: stocks?.data || [],
          isLoading: stocksIsLoading,
          addBtnLabel: false,
          allDataCount: stocks?.totalDocument,
          totalPages: stocks?.totalPages,
          currentPage: stocks?.currentPage,
          serverPaginationPageIndex: productPagination,
          SetServerPaginationPageIndex: setProductPagination,
          isServerPagination: true,
          tableDependency: [category],
        }}
      />
    </Box>
  );
};

export default Stock;

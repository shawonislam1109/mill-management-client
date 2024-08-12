import { Box, Button } from "@mui/material";

import { DeleteFilled } from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import useDialog from "../../../hooks/useDialog";
import { useState } from "react";
import { useGetProductPurchaseQuery } from "../../../api/service/Purchase.service";
import TableComponent from "../../../reuse-component/TableComponent/Table";
import ActionCell from "../../../reuse-component/TableComponent/ActionCell";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";

const PurchaseList = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();
  const navigate = useNavigate();

  // LOCAL STATE FOR PAGINATION
  const [productPurchasePagination, setProductPurchasePagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // USE DIALOG HOOKS

  const { handleDialogOpen, handleDeleteDialogOpen } = useDialog();

  // LOCAL STATE
  const [isUpdate, setUpdate] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [singleData, setSingleData] = useState({});

  //   productPurchase  DATA FROM QUERY
  const { data: productPurchase, isLoading: productPurchaseIsLoading } =
    useGetProductPurchaseQuery(
      { productPurchasePagination },
      {
        skip: !user,
      }
    );

  // HANDLE ADD BUTTON
  const handleAddButton = () => {
    setUpdate(false);
    setDefaultValues();
    handleDialogOpen();
  };

  // INVOICE HANDLER
  const invoiceHandler = (purchase) => {
    console.log("sdlfdl");
    navigate(`/purchase/${purchase?._id}/invoice`);
  };

  //   const deleteHandleSubmission = () => {};

  const downloadZip = () => {
    fetch("http://localhost:9191/products/purchase/file", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "download.zip");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => console.error("Error while downloading zip:", err));
  };

  const ExtraHeader = ({ downloadZip }) => {
    return (
      <Button
        onClick={downloadZip}
        variant="outlined"
        color="success"
        startIcon={<CloudDownloadOutlinedIcon />}
      >
        Client hotspot file
      </Button>
    );
  };

  ExtraHeader.propTypes = {
    downloadZip: PropTypes.func,
  };

  // Table columns
  const tableColumns = [
    {
      header: "wholeSalePrice",
      accessorKey: "wholeSalePrice",
    },
    {
      header: "payment Method",
      accessorKey: "paymentMethod",
    },
    {
      header: "paymentStatus",
      accessorKey: "paymentStatus",
    },
    {
      header: "memoNo",
      accessorKey: "memoNo",
    },
    {
      header: "totalDiscount",
      accessorKey: "totalDiscount",
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
              hasEditButton={false}
              permissionKey="Product"
              menuItems={[
                {
                  title: "Delete",
                  icon: <DeleteFilled />,
                },
                {
                  title: "Invoice",
                  icon: <ReceiptOutlinedIcon />,
                  handleClick: invoiceHandler,
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
          title: "Product Purchase",
          subheader: "Product Purchase of list",
          tableColumns,
          tableData: productPurchase?.data || [],
          isLoading: productPurchaseIsLoading,
          handleAddButton,
          addBtnLabel: true,
          allDataCount: productPurchase?.totalDocument,
          totalPages: productPurchase?.totalPages,
          currentPage: productPurchase?.currentPage,
          serverPaginationPageIndex: productPurchasePagination,
          SetServerPaginationPageIndex: setProductPurchasePagination,
          isServerPagination: true,
          extraHeader: <ExtraHeader downloadZip={downloadZip} />,
        }}
      />

      {/* delete dialog handler */}
    </Box>
  );
};

export default PurchaseList;

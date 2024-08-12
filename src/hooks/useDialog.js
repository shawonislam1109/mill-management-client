import React from "react";

function useDialog() {
  const [title, setTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // print DropDown handle
  const [printMenu, setPrintMenu] = React.useState(null);

  // Print dropdownMenu
  const openPrintMenu = Boolean(printMenu);

  //  print handleClick
  const handleClickPrintMenu = (event) => {
    setPrintMenu(event.currentTarget);
  };
  // Print handleClose
  const handleClosePrintMenu = () => {
    setPrintMenu(null);
  };

  const handleDialogOpen = () => {
    setOpen(true);
    setTitle("");
  };

  const handleDialogClose = () => {
    setOpen(false);
    setTitle("");
  };

  const handleDeleteDialogOpen = () => {
    setDeleteOpen(true);
    setTitle("");
  };

  const handleDeleteDialogClose = () => {
    setDeleteOpen(false);
    setTitle("");
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return {
    title,
    open,
    deleteOpen,
    openPrintMenu,
    printMenu,
    handleClickPrintMenu,
    handleClosePrintMenu,
    handleDialogClose,
    handleDialogOpen,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    handleDrawerOpen,
    handleDrawerClose,
    drawerOpen,
  };
}

export default useDialog;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import { SaveFilled } from "@ant-design/icons";

import PropTypes from "prop-types";

import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// create a js docs
/**
 * @description
 * A custom form dialog component

 * @param {boolean} isUpdate - The form update status
 * @param {boolean} isLoading - The form loading status
 * @param {object} control - The form control
 * @param {string} dialogSize - The dialog size
 * @param {function} handleCloseDialog - The close dialog handler
 * @param {boolean} openDialog - The dialog open status
 * @param {string} dialogContent - The dialog content
 * @param {node} children - The children component
 * @returns
 */

function DialogComponent({
  isLoading,
  dialogSize,
  handleCloseDialog,
  openDialog,
  dialogContent,
  additionalHeaderContent,
  isUpdate,
  buttonType,
  hasAction,
  children,
  simpleAction,
  handleSubmission,
}) {
  return (
    <Dialog
      maxWidth={dialogSize || "sm"}
      keepMounted
      fullWidth
      onClose={handleCloseDialog}
      open={openDialog}
      sx={{ "& .MuiDialog-paper": { p: 0 }, transition: "transform 225ms" }}
      aria-describedby="alert-dialog-slide-description"
    >
      {/* =================== DIALOG HEADER =================== */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* DIALOG TITLE */}
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        ></DialogTitle>

        {/* DIALOG HEADER ADDITIONAL CONTENT */}
        {!!additionalHeaderContent && (
          <Stack direction="row" gap={1} marginRight={10}>
            {additionalHeaderContent}
          </Stack>
        )}

        {/* DIALOG CHILDREN */}
        <DialogContent>{children}</DialogContent>

        {/* DIALOG HEADER CLOSE ICON */}
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </Stack>

      {/* =================== DIALOG CONTENT =================== */}
      <DialogContent>
        {/* INPUT_FILED COMPONENT */}
        <DialogContentText sx={{ paddingY: 1 }}>
          {dialogContent}
        </DialogContentText>
      </DialogContent>

      {/* =================== DIALOG ACTIONS =================== */}
      <DialogActions>
        <Button
          disabled={isLoading}
          variant="outlined"
          color="secondary"
          type="reset"
          onClick={handleCloseDialog}
        >
          Cancel
        </Button>
        {hasAction && (
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            variant="contained"
            loadingPosition="end"
            endIcon={<SaveFilled />}
            type="submit"
          >
            {isUpdate ? "Update" : "Submit"}
          </LoadingButton>
        )}
        {simpleAction && (
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            variant="contained"
            loadingPosition="end"
            onClick={handleSubmission}
          >
            {buttonType || "submit"}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

DialogComponent.propTypes = {
  isUpdate: PropTypes.bool,
  isLoading: PropTypes.bool,
  control: PropTypes.object,
  dialogSize: PropTypes.string,
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  additionalHeaderContent: PropTypes.string,
  dialogContent: PropTypes.string,
  children: PropTypes.node,
  buttonType: PropTypes.string,
  hasAction: PropTypes.bool,
  simpleAction: PropTypes.bool,
  handleSubmission: PropTypes.func,
};

export default DialogComponent;

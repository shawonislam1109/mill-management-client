import { Chip } from "@mui/material";
import PropTypes from "prop-types";

const ShowStatus = ({ value, size }) => {
  switch (value) {
    case "INACTIVE":
      return (
        <Chip
          color="warning"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "EXPIRED":
      return (
        <Chip
          color="error"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "ACTIVE":
      return (
        <Chip
          color="success"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "PAID":
      return (
        <Chip
          color="success"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "sent":
      return (
        <Chip
          sx={{ textTransform: "capitalize" }}
          color="success"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "bill":
      return (
        <Chip
          sx={{ textTransform: "capitalize" }}
          color="primary"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "auth":
      return (
        <Chip
          sx={{ textTransform: "capitalize" }}
          color="info"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "other":
      return (
        <Chip
          sx={{ textTransform: "capitalize" }}
          color="info"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "alert":
      return (
        <Chip
          sx={{ textTransform: "capitalize" }}
          color="warning"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "bulk":
      return (
        <Chip
          sx={{ textTransform: "capitalize" }}
          color="primary"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "UNPAID":
      return (
        <Chip
          color="warning"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "OVERDUE":
      return (
        <Chip
          color="error"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "PENDING":
      return (
        <Chip
          color="warning"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    case "REJECTED":
      return (
        <Chip
          color="error"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
    default:
      return (
        <Chip
          color="info"
          label={value.toLowerCase()}
          size={size}
          variant="filled"
        />
      );
  }
};

ShowStatus.propTypes = {
  value: PropTypes.string,
  size: PropTypes.string,
};

export default ShowStatus;

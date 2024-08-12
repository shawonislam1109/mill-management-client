import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import {
  Box,
  Checkbox,
  FormControl,
  ListItemText,
  useTheme,
} from "@mui/material";

import { useEffect } from "react";

export const PrintHidingSelect = ({
  hiddenColumns,
  setHiddenColumns,
  allColumns,
}) => {
  const handleChange = (columnId) => {
    const isHidden = hiddenColumns.includes(columnId);

    if (isHidden) {
      setHiddenColumns(hiddenColumns.filter((id) => id !== columnId));
    } else {
      setHiddenColumns([...hiddenColumns, columnId]);
    }
  };

  useEffect(() => {
    setHiddenColumns(["action"]);
  }, []);

  const theme = useTheme();

  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {allColumns.map((column, index) => {
        if (
          column?.Header !== "Actions" &&
          typeof column?.Header !== "function"
        ) {
          const isHidden = hiddenColumns.includes(column.id);

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",

                alignItems: "center",
                px: "5px",
                margin: "5px", // Adjust the margin as needed
                bgcolor: "success.lighter",
                "&.Mui-selected": { bgcolor: "background.paper" },
              }}
            >
              <Checkbox
                checked={!isHidden}
                color="success"
                onChange={() => handleChange(column.id)}
                checkedIcon={
                  <Box
                    className="icon"
                    sx={{
                      border: "1px solid",
                      borderColor: "inherit",
                      borderRadius: 0.25,
                      position: "relative",
                      backgroundColor: theme.palette.success.main,
                    }}
                  >
                    <CheckOutlined
                      className="filled"
                      style={{
                        position: "absolute",
                        color: theme.palette.common.white,
                      }}
                    />
                  </Box>
                }
              />

              <ListItemText
                primary={
                  typeof column.Header === "string"
                    ? column.Header
                    : column?.title
                }
              />
            </Box>
          );
        }
      })}
    </FormControl>
  );
};

PrintHidingSelect.propTypes = {
  setHiddenColumns: PropTypes.func,
  hiddenColumns: PropTypes.array,
  allColumns: PropTypes.array,
};

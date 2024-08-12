import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

import * as React from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

// TablePagination
export const TablePagination = ({
  gotoPage,
  isServerPagination,
  setPageSize,
  pageSize,
  pageIndex,
  setPageIndex,
  rows,
  totalPage,
}) => {
  // ====================== PACKAGE HOOKS ======================
  const [open, setOpen] = useState(false);

  // -> GET URL PARAMS FROM HOOK
  const [params, setParams] = useSearchParams();

  // ====================== VARIABLES ======================
  const { page, limit, ...restParams } = getAllQueryParams(params);

  // ====================== FUNCTION HANDLER ======================
  // -> HANDLE CLOSE SELECT
  const handleClose = () => {
    setOpen(false);
  };

  // -> HANDLE OPEN SELECT
  const handleOpen = () => {
    setOpen(true);
  };

  // -> HANDLE CHANGE PAGINATION
  const handleChangePagination = (event, value) => {
    if (isServerPagination) {
      setParams({ ...restParams, page: value, limit });
    } else {
      setPageIndex(value);
      gotoPage(value - 1);
    }
  };

  // -> HANDLE GOTO PAGE
  const handleGotoPage = (pageValue) => {
    if (isServerPagination) {
      // send request on 300ms letter and the input max value should be total page count
      setTimeout(() => {
        setParams({ ...restParams, page: Number(pageValue), limit });
      }, 300);
    } else {
      setPageIndex(pageValue);
      gotoPage(pageValue - 1);
    }
  };

  // -> HANDLE CHANGE PAGE SIZE
  const handleChangePageSize = (event) => {
    if (isServerPagination) {
      setPageSize(Number(event.target.value));
      setParams({ ...restParams, page, limit: Number(event.target.value) });
    } else {
      setPageIndex(1);
      setPageSize(+event.target.value);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "auto" }}
    >
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Row per page
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={(isServerPagination ? limit : pageSize) || 100}
                onChange={handleChangePageSize}
                size="small"
                sx={{ "& .MuiSelect-select": { py: 0.75, px: 1.25 } }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>200</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={5000}>5000</MenuItem>
                <MenuItem value={10000}>10000</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Typography variant="caption" color="secondary">
            Go to
          </Typography>
          <TextField
            size="small"
            type="number"
            // eslint-disable-next-line react/prop-types
            inputProps={{
              min: 1,
              max: isServerPagination
                ? totalPage
                : Math.ceil(rows.length / pageSize),
            }}
            value={isServerPagination ? Number(page) : pageIndex}
            onChange={(e) => {
              handleGotoPage(
                Number(e.target.value) === 0 ? 1 : Number(e.target.value)
              );
            }}
            sx={{
              "& .MuiOutlinedInput-input": { py: 0.75, px: 1.25, width: 36 },
            }}
          />
        </Stack>
      </Grid>
      <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          // eslint-disable-next-line react/prop-types
          count={
            isServerPagination ? totalPage : Math.ceil(rows.length / pageSize)
          }
          page={isServerPagination ? Number(page) : pageIndex}
          onChange={handleChangePagination}
          color="primary"
          variant="combined"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  );
};

TablePagination.propTypes = {
  setPageSize: PropTypes.func,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  totalPage: PropTypes.number,
  setPageIndex: PropTypes.func,
  setData: PropTypes.func,
  getDataQueryParams: PropTypes.object,
  gotoPage: PropTypes.func,
  isServerPagination: PropTypes.bool,
  rows: PropTypes.array,
  filterParams: PropTypes.object,
};

// Define a default UI for filtering
export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows?.length;

  return (
    <span>
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}
GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.func,
  globalFilter: PropTypes.array,
  setGlobalFilter: PropTypes.func,
};

export function ColumnVisibilityCom({ getAllColumns }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        visibility
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            height: 300,
            overflow: "scroll",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
              border: "3px solid #f1f1f1",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f1f1f1",
          }}
        >
          {getAllColumns().map((column) => {
            return (
              <MenuItem key={column.id}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={column.getIsVisible()}
                        disabled={!column.getCanHide()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                    }
                    label={column.id}
                  />
                </FormGroup>
              </MenuItem>
            );
          })}
        </Box>
      </Menu>
    </Stack>
  );
}

ColumnVisibilityCom.propTypes = {
  getAllColumns: PropTypes.func,
};

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  options,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={`Search of ${options.data.length} resource`}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
      }}
      sx={{ borderRadius: "5px" }}
    />
  );
}

DebouncedInput.propTypes = {
  value: PropTypes.object,
  options: PropTypes.object,
  onChange: PropTypes.func,
  debounce: PropTypes.number,
};

export function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();
  return (
    <DebouncedInput
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
    />
  );
}

Filter.propTypes = {
  column: PropTypes.object,
};

export function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return (
    <Checkbox ref={ref} className={className + " cursor-pointer"} {...rest} />
  );
}

IndeterminateCheckbox.propTypes = {
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
};

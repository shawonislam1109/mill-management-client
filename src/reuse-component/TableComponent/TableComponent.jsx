import PropTypes from "prop-types";

import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";

import { flexRender } from "@tanstack/react-table";
import {
  FastBackwardOutlined,
  FastForwardOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";

function RenderRowAndColumn({
  getHeaderGroups,
  getRowModel,
  getState,
  setPageSize,
  getCanPreviousPage,
  firstPage,
  previousPage,
  getCanNextPage,
  nextPage,
  getPageCount,
  lastPage,
  setPageIndex,
  isLoading,
  getAllColumns,
}) {
  // LOADING FUNCTION
  const loadingFuncForSkelton = Array(getAllColumns().length).fill({});

  return (
    <Box>
      {/* <ScrollX> */}
      <TableContainer
        sx={{
          height: "65vh",
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
          scrollbarColor: "#888 #f1f1f1", // For Firefox
        }}
      >
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 500,
              overflow: "hidden",
            }}
          >
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    align="center"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        typeof header.column.columnDef.header === "string" ? (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                            }}
                          >
                            {header.column.columnDef.header.toUpperCase()}
                          </Typography>
                        ) : (
                          header.column.columnDef.header
                        ),
                        header.getContext()
                      )}
                      {{ asc: " 🔼", desc: " 🔽" }[
                        header.column.getIsSorted()
                      ] ?? null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {!isLoading
              ? getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: "white",
                        "&:nth-of-type(even)": {
                          backgroundColor: "#dfe8e5",
                        },
                        "&:hover": {
                          backgroundColor: "#dfe8e5",
                          transition: "background-color 0.3s ease",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} align="center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              : loadingFuncForSkelton.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      {loadingFuncForSkelton.map((item2, index2) => {
                        return (
                          <TableCell key={index2}>
                            <Skeleton
                              sx={{ borderRadius: "0.3rem" }}
                              variant="text"
                              height={"2rem"}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </ScrollX> */}
      <Stack
        direction="row"
        gap={2}
        mt={2}
        pb={2}
        justifyContent="end"
        alignItems="center"
      >
        <Box width={"5rem"}>
          <FormControl variant="outlined" size="small">
            <InputLabel>Show</InputLabel>
            <Select
              value={getState().pagination.pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              label="Show"
            >
              {[1, 10, 20, 30, 40, 50, 100].map((pageSize) => (
                <MenuItem key={pageSize} value={pageSize}>
                  {pageSize}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* pagination */}

        <Stack direction="row" justifyContent="center" alignItems="center">
          <IconButton
            variant="outlined"
            onClick={() => firstPage()}
            disabled={!getCanPreviousPage()}
            aria-label="delete"
          >
            <FastBackwardOutlined />
          </IconButton>

          <IconButton
            variant="outlined"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            <StepBackwardOutlined />
          </IconButton>

          <IconButton
            variant="outlined"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            <StepForwardOutlined />
          </IconButton>

          <IconButton
            variant="outlined"
            onClick={() => lastPage()}
            disabled={!getCanNextPage()}
          >
            <FastForwardOutlined />
          </IconButton>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mx={2}
          >
            <Box>Page</Box>
            <Box>
              {getState().pagination.pageIndex + 1} of{" "}
              {getPageCount().toLocaleString()}
            </Box>
          </Stack>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
            mx={2}
          >
            | Go to page:
            <TextField
              type="number"
              sx={{ width: "5rem" }}
              defaultValue={getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPageIndex(page);
              }}
              variant="outlined"
              size="small"
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

RenderRowAndColumn.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  getHeaderGroups: PropTypes.func,
  getRowModel: PropTypes.func,
  getState: PropTypes.func,
  setPageSize: PropTypes.func,
  getCanPreviousPage: PropTypes.func,
  firstPage: PropTypes.number,
  previousPage: PropTypes.func,
  getCanNextPage: PropTypes.func,
  nextPage: PropTypes.number,
  getPageCount: PropTypes.func,
  lastPage: PropTypes.number,
  setPageIndex: PropTypes.func,
  getAllColumns: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default RenderRowAndColumn;

import * as React from "react";
// const { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone, EllipsisOutlined } = require('@ant-design/icons');
import {
  CloseOutlined,
  EyeTwoTone,
  EditTwoTone,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Stack,
  Tooltip,
  IconButton,
  useTheme,
  Box,
  Fade,
  MenuItem,
  Menu,
  ListItemIcon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

function LongMenu({ menuItems, row }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      >
        <Box sx={{ fontWeight: 900, fontSize: "1.5rem" }}>
          <EllipsisOutlined />
        </Box>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuItems.map((item) => {
          // eslint-disable-next-line no-extra-boolean-cast
          if (!!Object.keys(item).length) {
            return (
              <MenuItem
                key={item.title}
                onClick={(e) => {
                  e.stopPropagation();
                  item?.handleClick(row?.original);
                  handleClose();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography variant="inherit">{item.title}</Typography>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </div>
  );
}

LongMenu.propTypes = {
  children: PropTypes.node,

  openProps: PropTypes.bool,
  menuItems: PropTypes.array,
  row: PropTypes.object,
};

const ActionCell = ({
  row,
  ellipsis,
  isExpandable,
  menuItems,
  showAllIcon,
  handleDelete = () => {}, //default value,
  setOpen = () => {}, //default value
  isLoading,

  hasEditButton = true,
  setExpandableData = () => {},
}) => {
  const theme = useTheme();

  const collapseIcon = row.isExpanded ? (
    <CloseOutlined style={{ color: theme.palette.error.main }} />
  ) : (
    <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
  );
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0}
    >
      {isExpandable && (
        <Tooltip title="View">
          <IconButton
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              row.toggleRowExpanded();
              setExpandableData(row.original);
            }}
          >
            {collapseIcon}
          </IconButton>
        </Tooltip>
      )}
      {hasEditButton && (
        <Tooltip title="Edit">
          <IconButton
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(row.original);
            }}
            size="small"
          >
            <EditTwoTone />
          </IconButton>
        </Tooltip>
      )}
      {ellipsis ? (
        <LongMenu menuItems={menuItems} row={row}></LongMenu>
      ) : (
        <>
          {showAllIcon
            ? menuItems.map((item) => {
                return (
                  <Tooltip key={item.title} title={item.title}>
                    <IconButton
                      disabled={isLoading}
                      color={item.color ? item.color : "primary"}
                      onClick={(e) => {
                        e.stopPropagation();
                        item.handleClick(row.original);
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                );
              })
            : "N/A"}
        </>
      )}
    </Stack>
  );
};

ActionCell.propTypes = {
  row: PropTypes.object,
  ellipsis: PropTypes.bool,
  isExpandable: PropTypes.bool,
  menuItems: PropTypes.array,
  showAllIcon: PropTypes.bool,
  handleDelete: PropTypes.func,
  setOpen: PropTypes.func,
  isLoading: PropTypes.bool,
  permissionKey: PropTypes.string,
  hasEditButton: PropTypes.bool,
  setExpandableData: PropTypes.func,
};

export default ActionCell;

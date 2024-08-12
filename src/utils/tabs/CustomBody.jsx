import { Box } from "@mui/material";
import PropTypes from "prop-types";

//create a js docs
/**
 * @typedef {object} props
 * @property {node} children - children of the tab body component
 * @property {number} tabIndex - current state variable of useState() hook
 * @property {number} index - index of the tab
 * @property {string} orientation - tab orientation
 * @param {props} props
 * @returns {React.Component}
 * @example

 * */
function CustomTabBody({
  children,
  tabIndex: tabIndexState,
  index,
  orientation,
  ...other
}) {
  return (
    <Box
      role="tabpanel"
      hidden={tabIndexState !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={orientation === "vertical" ? { px: 1.5, width: "90%" } : { py: 1.5 }}
    >
      {tabIndexState === index && <Box>{children}</Box>}
    </Box>
  );
}

// CustomTabBody propTypes validation
CustomTabBody.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
};

export default CustomTabBody;

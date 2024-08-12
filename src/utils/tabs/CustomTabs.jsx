import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Stack } from "@mui/material";

// Helper function for accessibility properties
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const CustomTabs = ({ tabsItems, tabPanels }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      direction="row"
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        height: "80vh",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", mt: 2, width: "12rem" }}
      >
        {tabsItems.map((item, index) => (
          <Tab key={index} label={item} {...a11yProps(index)} />
        ))}
      </Tabs>

      <Box
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          m: 2,
          width: "100%",
          scrollbarWidth: "none" /* Hides the scrollbar in Firefox */,
          "-ms-overflow-style":
            "none" /* Hides the scrollbar in Internet Explorer/Edge */,
        }}
      >
        {tabPanels.map((panel, index) => (
          <TabPanel key={index} value={value} index={index}>
            {panel.component}
          </TabPanel>
        ))}
      </Box>
    </Stack>
  );
};

CustomTabs.propTypes = {
  tabsItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabPanels: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default CustomTabs;

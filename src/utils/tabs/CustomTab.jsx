import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import MainCard from "../../reuse-component/card/MainCard";

const CustomTab = ({
  children,
  tabMenus,
  variant,
  componentTitle,
  tabIndex: tabValueIndex,
  setTabIndex: setTabValueIndex,
  orientation,
  height,
  endHeaderContent,
  tabColor,
}) => {
  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleTabNavigate = (event, newValue) => {
    setTabValueIndex(newValue);
  };

  return (
    <MainCard title={componentTitle} endHeaderContent={endHeaderContent}>
      <Box
        sx={
          orientation === "vertical"
            ? { display: "flex", flexGrow: 1, bgcolor: "background.paper" }
            : {}
        }
      >
        <Tabs
          orientation={orientation || "horizontal"}
          value={tabValueIndex}
          variant={variant || "scrollable"}
          onChange={handleTabNavigate}
          aria-label="basic tabs"
          TabIndicatorProps={
            tabColor ? { style: { backgroundColor: tabColor } } : {}
          }
          sx={
            orientation === "vertical"
              ? {
                  borderRight: 1,
                  borderColor: "divider",
                  height: height || 350,
                  "& .MuiButtonBase-root": {
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 0.5,
                    flexDirection: "row",
                    textAlign: "left",
                  },
                  "& .MuiTabScrollButton-root": {
                    justifyContent: "center",
                  },
                }
              : {
                  borderBottom: 1,
                  borderColor: "divider",
                }
          }
        >
          {tabMenus.map((item, i) => (
            <Tab
              key={i}
              label={item.menuTitle}
              icon={item.menuIcon}
              iconPosition={item.iconPosition || "end"}
              {...tabProps(i)}
              sx={{
                color: item.tabColor || "", // Text color
                "&.Mui-selected": {
                  color: item.tabColor || "", // Text color when selected
                },
                "&& .MuiTab-root": {
                  alignItems: "start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  width: "100%",
                },
              }}
            />
          ))}
        </Tabs>
        {children}
      </Box>
    </MainCard>
  );
};

CustomTab.propTypes = {
  children: PropTypes.node,
  tabMenus: PropTypes.array.isRequired,
  variant: PropTypes.string,
  componentTitle: PropTypes.string,
  tabIndex: PropTypes.number.isRequired,
  setTabIndex: PropTypes.func.isRequired,
  orientation: PropTypes.string,
  height: PropTypes.number,
  endHeaderContent: PropTypes.node,
  tabColor: PropTypes.string,
};

export default CustomTab;

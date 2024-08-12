import PropTypes from "prop-types";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const MenuItemComponent = ({ items, defaultOpen }) => {
  return (
    <>
      {items?.map((item, index) => {
        return (
          <Box key={index}>
            <Accordion defaultExpanded={defaultOpen} elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Stack direction="row" gap={2}>
                  <Typography>{item?.icons}</Typography>
                  <Typography>{item.name}</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {item?.children?.map((childrenItem, index) => {
                  if (childrenItem?.children) {
                    return (
                      <Accordion key={index} elevation={0}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}
                        >
                          <Stack direction="row" gap={2}>
                            <Typography>{item?.icons}</Typography>
                            <Typography>{item.name}</Typography>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          {childrenItem?.children?.map((item2, index2) => (
                            <Stack
                              key={index2}
                              direction="row"
                              gap={2}
                              ml={1}
                              component={Link}
                              to={item2?.url}
                              sx={{ textDecoration: "none", color: "grey" }}
                            >
                              <Typography>{item2?.icons}</Typography>
                              <Typography>{item2.name}</Typography>
                            </Stack>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      gap={2}
                      ml={1}
                      component={Link}
                      to={childrenItem?.url}
                      sx={{ textDecoration: "none", color: "grey" }}
                    >
                      <Typography>{item?.icons}</Typography>
                      <Typography>{item.name}</Typography>
                    </Stack>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </>
  );
};

MenuItemComponent.propTypes = {
  items: PropTypes.array.isRequired,
  defaultOpen: PropTypes.bool,
};

export default MenuItemComponent;

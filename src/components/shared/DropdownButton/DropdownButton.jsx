//Mui
import { Button, Menu, MenuItem } from "@mui/material";
//Icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//Styled
import { styled } from "@mui/material/styles";
//React
import React, { useState } from "react";
import { useEffect } from "react";

const DropdownButton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Added state to keep track of selected item

  useEffect(() => {
    typeof props.setItem === "function" && props.setItem(selectedItem); // Call handleChange function from parent component
  }, [selectedItem, props]);

  useEffect(() => {
    Array.isArray(props.data) && setSelectedItem(props.data[0]);
    // typeof props.setItem === 'function' && props.setItem(props?.data[0]); // Call handleChange function from parent component
  }, []);

  const open = Boolean(anchorEl);
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "&. MuiButton-root": {
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
    },
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: "#ffffff",
        },
      },
    },
  }));

  const handleBatchSelect = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemSelect = (item) => {
    // Added function to handle item selection
    setSelectedItem(item);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleBatchSelect}
        sx={{
          bgcolor: "transparent",
          color: "#1B3B7B",
          border: "1px solid #1B3B7B",
          textTransform: "capitalize",
          fontWeight: 600,
          padding: "0.5rem 2rem",
          borderRadius: "7px",
          width: {
            xs: 'auto',
            md: '220px',
          },
          display: 'flex',
          justifyContent: 'space-between'
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedItem ? selectedItem : props?.data[0]}{" "}
        {/* Display selected item name or default button name */}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {props.data.map((item) => (
          <MenuItem
            key={item}
            onClick={() => handleItemSelect(item)} // Call handleItemSelect when an item is clicked
          >
            {item}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};
export default DropdownButton;

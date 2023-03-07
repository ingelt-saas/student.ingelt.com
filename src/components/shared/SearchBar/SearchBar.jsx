import { Search } from "@mui/icons-material";
import { Box, Input } from "@mui/material";
import React from "react";
// Data

const SearchBar = () => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Box className="rounded-full px-2 py-1 bg-white flex items-center shadow-md">
        <Search sx={{ fontSize: "1.2rem", mr: 1 }} />
        <Input
          sx={{ fontSize: ".9rem", border: "none", py: 0, width: "15vw" }}
          disableUnderline={true}
          placeholder="Search for"
        />
      </Box>
    </form>
  );
};

export default SearchBar;

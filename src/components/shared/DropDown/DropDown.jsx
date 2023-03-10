import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const styles = {
  formControl: {
    margin: "8px",
    minWidth: "120px",
  },
};

const Dropdown = ({
  label,
  options,
  selectedOption,
  onSelectedOptionChange,
}) => {
  const handleChange = (event) => {
    onSelectedOptionChange(event.target.value);
  };

  return (
    <FormControl style={styles.formControl}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={label}
        value={selectedOption}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;

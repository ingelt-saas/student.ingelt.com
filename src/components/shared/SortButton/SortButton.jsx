import { Sort } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const SortButton = () => {
  return (
    <Button
            variant="text"
            sx={{
              fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: 2,
              color: "#00000085",
              backgroundColor: "#F4F4F4",
            }}
          >
            Sort
            <Sort sx={{ ml: 0.4 }} />
          </Button>
  )
}

export default SortButton
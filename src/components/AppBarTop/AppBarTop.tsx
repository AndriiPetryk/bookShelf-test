import * as React from 'react'
import { createPortal } from 'react-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import CustomizedBreadcrumbs from '../BreadCrumbs/BreadCrumbs'
import Button from '@mui/material/Button'
import { BookCreateNew } from '../BookCreateNew/BookCreateNew'

export default function AppBarTop() {
  const [isOpen, handleOpen] = React.useState(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <CustomizedBreadcrumbs />
          <Button onClick={() => handleOpen(true)} variant='contained' size='medium'>
            Add book
          </Button>
          {isOpen &&
            createPortal(
              <BookCreateNew handleClose={() => handleOpen(false)} isOpen={isOpen} />,
              document.body,
            )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

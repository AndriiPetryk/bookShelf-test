import React, { FC, useEffect } from 'react'
import { useGetBooksQuery } from '../../services/BookService'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { IBook } from '../../models/IBook'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Main from '../Main/Main'
import BookItem from '../BookItem/BookItem'
import CircularIndeterminate from '../Progress/Progress'
import { AlertComponent } from '../Error/Error'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const BookContainer: FC = () => {
  const { data: books = [], isLoading, error } = useGetBooksQuery()
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (books?.length === 0 && !isLoading) {
      handleClick()
    }
  }, [books])
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  if (error) {
    return <AlertComponent />
  }

  if (isLoading) {
    return <CircularIndeterminate />
  }

  return (
    <Main>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {books?.map((bookData: IBook) => (
            <Grid xs={2} sm={4} md={4} key={bookData.id}>
              <BookItem book={bookData} isSingleItem={false} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          No books information!!!
        </Alert>
      </Snackbar>
    </Main>
  )
}

export default BookContainer

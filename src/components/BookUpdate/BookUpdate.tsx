import * as React from 'react'
import { useUpdateBookMutation, useGetBookQuery } from '../../services/BookService'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

type BookUpdate = {
  id: string
  handleClose: any
  isOpen: boolean
}

export const BookUpdate: React.FC<BookUpdate> = ({ id, handleClose, isOpen }) => {
  const { data: bookData } = useGetBookQuery(id)
  const initialValue = {
    name: bookData?.name,
    price: bookData?.price,
    category: bookData?.category,
    description: bookData?.description,
  }
  const [book, setBook] = React.useState(initialValue)
  const [updateBook] = useUpdateBookMutation()

  React.useEffect(() => {
    setBook(initialValue)
  }, [bookData])

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleUpdateBook = async (
    name: string,
    category: string,
    price: string,
    description: string,
  ) => {
    try {
      await updateBook({ id, name, category, price, description }).unwrap()
    } catch (e) {
      console.error(e)
    } finally {
      handleClose()
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Update book information</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            name='name'
            type='text'
            fullWidth
            variant='standard'
            value={book.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='category'
            label='Category'
            name='category'
            type='text'
            fullWidth
            variant='standard'
            value={book.category}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='price'
            label='Price'
            name='price'
            type='text'
            fullWidth
            variant='standard'
            value={book.price}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Description'
            name='description'
            type='text'
            fullWidth
            variant='standard'
            value={book.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              handleUpdateBook(book.name!, book.category!, book.price!, book.description!)
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

import * as React from 'react'
import { useAddBookMutation } from '../../services/BookService'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import SendIcon from '@mui/icons-material/Send'

type BookCreateNew = {
  handleClose: () => void
  isOpen: boolean
}

export const BookCreateNew: React.FC<BookCreateNew> = ({ handleClose, isOpen }) => {
  const initialValue = { name: '', price: '0', category: '', description: '' }
  const [book, setBook] = React.useState(initialValue)
  const [addBook] = useAddBookMutation()

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleAddBook = async () => {
    try {
      await addBook(book).unwrap()
      setBook(initialValue)
    } catch (e) {
      console.error(e)
    } finally {
      handleClose()
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Add new book information</DialogTitle>
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
          <Button onClick={handleAddBook} endIcon={<SendIcon />}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Modal*/}
      {/*  open={isOpen}*/}
      {/*  onClose={handleClose}*/}
      {/*  aria-labelledby='modal-modal-title'*/}
      {/*  aria-describedby='modal-modal-description'*/}
      {/* >*/}
      {/*  <Box component='form' sx={style} noValidate autoComplete='off'>*/}
      {/*    <FormControl>*/}
      {/*      <InputLabel htmlFor='my-input'>Name</InputLabel>*/}
      {/*      <Input*/}
      {/*        id='name'*/}
      {/*        aria-describedby='Name'*/}
      {/*        name='name'*/}
      {/*        value={book.name}*/}
      {/*        onChange={handleChange}*/}
      {/*      />*/}
      {/*    </FormControl>*/}
      {/*    <FormControl>*/}
      {/*      <InputLabel htmlFor='my-input'>Category</InputLabel>*/}
      {/*      <Input*/}
      {/*        id='category'*/}
      {/*        aria-describedby='Category'*/}
      {/*        name='category'*/}
      {/*        value={book.category}*/}
      {/*        onChange={handleChange}*/}
      {/*      />*/}
      {/*    </FormControl>*/}
      {/*    <FormControl>*/}
      {/*      <InputLabel htmlFor='my-input'>Price</InputLabel>*/}
      {/*      <Input*/}
      {/*        id='price'*/}
      {/*        aria-describedby='price'*/}
      {/*        name='price'*/}
      {/*        value={book.price}*/}
      {/*        onChange={handleChange}*/}
      {/*      />*/}
      {/*    </FormControl>*/}
      {/*    <FormControl>*/}
      {/*      <InputLabel htmlFor='my-input'>Description</InputLabel>*/}
      {/*      <Input*/}
      {/*        id='description'*/}
      {/*        aria-describedby='description'*/}
      {/*        name='description'*/}
      {/*        value={book.description}*/}
      {/*        onChange={handleChange}*/}
      {/*      />*/}
      {/*    </FormControl>*/}
      {/*    <div>*/}
      {/*      <Button onClick={handleAddBook}>Add book</Button>*/}
      {/*    </div>*/}
      {/*  </Box>*/}
      {/* </Modal>*/}
    </div>
  )
}

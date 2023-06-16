import React, { FC, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import { BookUpdate } from '../BookUpdate/BookUpdate'

import { IBook } from '../../models/IBook'
import { useDeleteBookMutation } from '../../services/BookService'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './BookItem.module.css'

type BookItemProps = {
  book: IBook
  isSingleItem: boolean
}

const BookItem: FC<BookItemProps> = ({
  book: { id, name, price, category, description },
  isSingleItem,
}) => {
  const [isOpen, setOpen] = useState(false)
  const [deleteBook] = useDeleteBookMutation()
  const maxWidth = !isSingleItem ? 100 + '%' : 33 + '%'
  const synopsStyle = !isSingleItem ? styles.detail_info : ''

  const handleOpen = () => setOpen(true)
  const handleClose = (event: any) => {
    event && event.stopPropagation()
    setOpen(false)
  }

  const handleDeleteBook = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation()
    deleteBook(id)
  }

  return (
    <Card sx={{ maxWidth: maxWidth }} onClick={handleOpen} className={styles.bookCardBlock}>
      <CardHeader className={styles.header} title={name} />
      <CardContent className={styles.bookCardBlockContent}>
        <Typography variant='body2' color='text.secondary' className={synopsStyle}>
          {category}
        </Typography>
        <Typography variant='body2' color='text.secondary' className={synopsStyle}>
          {description}
        </Typography>
        <Typography component='span' variant='inherit' color='text.secondary'>
          Price: {price}$
        </Typography>
      </CardContent>
      <CardActions>
        <div>
          <Button variant='outlined' onClick={handleDeleteBook} startIcon={<DeleteIcon />}>
            Delete book
          </Button>
        </div>
      </CardActions>
      <BookUpdate handleClose={handleClose} isOpen={isOpen} id={id} />
    </Card>
  )
}

export default BookItem

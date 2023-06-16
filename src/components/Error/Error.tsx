import React, { FC } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'
import Main from '../Main/Main';
import { BoxItemWrapper } from '../BoxItemWrapper';

export const AlertComponent: FC = () => {
  return (
    <Main>
      <BoxItemWrapper>
        <Stack sx={{ width: '50%' }} spacing={2}>
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            Something went wrong
          </Alert>
        </Stack>
      </BoxItemWrapper>
    </Main>
  )
}

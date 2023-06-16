import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import Main from '../Main/Main';
import { BoxItemWrapper } from '../BoxItemWrapper';

export default function CircularIndeterminate() {
  return (
    <Main>
      <BoxItemWrapper>
        <CircularProgress />
      </BoxItemWrapper>
    </Main>
  )
}

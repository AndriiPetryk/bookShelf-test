import React, { FC } from 'react';
import Box from '@mui/material/Box';

export const BoxItemWrapper: FC<React.PropsWithChildren> = ({children}) => {
  return <Box
    component="div"
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="90vh"
  >
    {children}
  </Box>
}

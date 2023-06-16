import React, { FC } from 'react'
import AppBarTop from '../AppBarTop/AppBarTop'

const Main: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBarTop />
      {children}
    </>
  )
}

export default Main

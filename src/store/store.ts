// import { configureStore } from '@reduxjs/toolkit'
// // import { bookAPI } from '../services/BookService'
// import booksReducer from '../services/BookService'
//
// // const rootReducer = combineReducers({
// //   [bookAPI.reducerPath]: bookAPI.reducer,
// // })
//
// export const setupStore = () => {
//   return configureStore({
//     reducer: booksReducer,
//     // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookAPI.middleware),
//   })
// }

import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from '../services/BookService'

export const setupStore = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
})

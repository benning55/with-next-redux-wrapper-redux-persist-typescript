import { createStore, configureStore, ThunkAction, Action, combineReducers, applyMiddleware } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'

const combinedReducer = combineReducers({
  counter: counterReducer
})

export function makeStore() {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    const store = configureStore({
      reducer: combinedReducer
    })

    return { store, persistor: null }
  }
  else {

    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist")
    const storage = require("redux-persist/lib/storage").default

    const persistConfig = {
      key: "root",
      whitelist: ["counter"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    }

    const persistedReducer = persistReducer(persistConfig, combinedReducer) // Create a new reducer with our existing reducer

    const store = configureStore({
      reducer: persistedReducer
    })

    const persistor = persistStore(store)
    return { store, persistor }
  }
}

const { store, persistor } = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
export { persistor }

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './slice/cartSlice';
import filterSlice from './slice/filterSlice';
import pizzaSlice from './slice/pizzaSlice';



export const store = configureStore({
	reducer: {
		filterSlice,
		cartSlice,
		pizzaSlice
	},
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
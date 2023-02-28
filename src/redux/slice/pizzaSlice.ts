import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, pageCount } = params;
		const { data } = await axios.get<Pizza[]>(
			`http://localhost:3002/pizzas?_page=${pageCount}&_limit=4${category}&_sort=${sortBy}&_order=${order}${search}`,
		);
		return data;
	},
);

type Pizza = {
	id: string;
	imageUrl: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzasSliceState {
	items: Pizza[];
	status: Status;
}

const initialState: PizzasSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.items = [];
			state.status = Status.LOADING;
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.items = [];
			state.status = Status.ERROR;
		});
	},
	
});
export const selectPizzaData = (state: RootState) => state.pizzaSlice;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;



// extraReducers: {
	// 	[fetchPizzas.pending]:(state)=>{
	// 		state.items = []
	// 		state.status = 'loading';
	// 	},
	// 	[fetchPizzas.fulfilled]:(state,action)=>{
	// 		state.items = action.payload;
	// 		state.status = 'success';
	// 	},
	// 	[fetchPizzas.rejected]:(state,action)=>{
	// 		state.items = []
	// 		state.status = 'error';
	// 	}
	// }
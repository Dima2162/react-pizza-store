import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
	
}
export type Sort = {
	name: string;
	sortPropety: SortPropertyEnum.RATING_DESC;
};

interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	pageCount: number;
	sort: Sort;
}
const initialState:FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	pageCount: 1,
	sort: {
		name: 'популярности',
		sortPropety: SortPropertyEnum.RATING_DESC,
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setSearchValue(state, action:PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setCategoryId(state, action:PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSort(state, action:PayloadAction<Sort>) {
			state.sort = action.payload;
		},
		setPageCount(state, action:PayloadAction<number>) {
			state.pageCount = action.payload;
		},
		// setFilters(state, action) {
		// 	state.pageCount= Number(action.payload.pageCount);
		// 	state.sort= action.payload.sort;
		// 	state.categoryId= Number(action.payload.categoryId);
		// },
	},
});
export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectFilter = (state: RootState) => state.filterSlice;
export const { setCategoryId, setSort, setPageCount, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;

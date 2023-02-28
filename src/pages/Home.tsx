import React from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';

import Pagination from '../components/Pagination';
import { selectFilter, setCategoryId, setPageCount } from '../redux/slice/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slice/pizzaSlice';
import Skeleton from '../components/Skeleton';
import { useAppDispatch } from '../redux/store';


const Home:React.FC = () => {
	const dispatch = useAppDispatch();
	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter);

	const onClickCategory = React.useCallback((id:number) => {
		dispatch(setCategoryId(id));
	},[])
	const onChangePage = (page:number) => {
		dispatch(setPageCount(page));
	};
	const getPizzas = async () => {
		const sortBy = sort.sortPropety.replace('-', '');
		const order = sort.sortPropety.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `&category_like=${categoryId}` : '';
		const search = searchValue ? `&title_like=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				pageCount: String(pageCount),
			}),
		);
	};

	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortPropety, searchValue, pageCount]);

	// React.useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(window.location.search.substring(1));
	// 		const sort = sortList.find((obj) => obj.sortPropety === params.sortPropety);
	// 		dispatch(
	// 			setFilters({
	// 				...params,
	// 				sort,
	// 			}),
	// 		);
	// 		isSearch.current = true;
	// 	}
	// }, []);

	// React.useEffect(() => {
	// 	window.scrollTo(0, 0);
	// 	if(isSearch.current){
	// 		fetchPizzas()
	// 	}
	// 	isSearch.current = false;

	// }, [categoryId, sort.sortPropety, searchValue, pageCount]);

	// React.useEffect(() => {
	// if(isMounted.current){
	// 	const queryString = qs.stringify({
	// 		sortPropety: sort.sortPropety,
	// 		categoryId,
	// 		pageCount,
	// 	});
	// 	navigate(`?${queryString}`);
	// }
	// isMounted.current = true
	// }, [categoryId, sort.sortPropety, pageCount]);
	const pizzas = items.map((obj) => (
		
			<PizzaBlock key={obj.id} {...obj} />
	
	));
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort value = {sort}/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>
						Произошла ошибка <span>😕</span>
					</h2>
					<p>К сожалению,не удалось получить питсы.Попробуйте повторить попытку позже.</p>
				</div>
			) : (
				<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
			)}
			<Pagination pageCount={pageCount} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;

// import { useNavigate } from 'react-router-dom';
// import qs from 'qs';

// const navigate = useNavigate();
// const isSearch = React.useRef(false);
// const isMounted = React.useRef(false);

// await axios
// 	.get(
// 		`http://localhost:3002/pizzas?_page=${pageCount}&_limit=4${category}&_sort=${sortBy}&_order=${order}${search}`,
// 	)
// 	.then((res) => {
// 		setItems(res.data);
// 	});

// {items.map((obj) => (
// 	<PizzaBlock key={obj.id} {...obj} />
// ))}

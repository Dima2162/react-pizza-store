import './scss/app.scss';
import MainLayout from './components/layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFoundBlock = React.lazy(
	() => import(/*webpackChunkName: "NotFoundBlock" */ './pages/NotFound'),
);

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route
					path="cart"
					element={
						<React.Suspense fallback={<div>Идет загрузка корзины...</div>}>
							<Cart />
						</React.Suspense>
					}
				/>
				<Route
					path="pizza/:id"
					element={
						<React.Suspense fallback={<div>Идет загрузка...</div>}>
							<FullPizza />
						</React.Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<React.Suspense fallback={<div>Идет загрузка...</div>}>
							<NotFoundBlock />
						</React.Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;

import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('http://localhost:3002/pizzas/' + id);
				setPizza(data);
			} catch (error) {
				alert('Ошибка при получении пиццы');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return <React.Fragment>'Загрузка...'</React.Fragment>;
	}
	return (
		<div className="container">
			<img src={pizza.imageUrl} />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}</h4>
			<Link to='/notfkpew'>
			<div className="button button--outline button--add">
				<span>Назад</span>
			</div>
			</Link>
		</div>
	);
};

export default FullPizza;

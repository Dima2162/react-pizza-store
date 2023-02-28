import React from 'react';
import styles from './Pagination.module.scss';

import ReactPaginate from 'react-paginate';
type PaginationProps = { pageCount: number; onChangePage: (page: number) => void };
const Pagination: React.FC<PaginationProps> = ({ pageCount, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(e) => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={pageCount - 1}
		/>
	);
};

export default Pagination;

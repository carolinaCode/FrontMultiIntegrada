import ReactPaginate from 'react-paginate';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';

type Props = {
    changeSelectedPage: (selected: number) => void;
    totalPages: number;
}

type PageChangeProps = {
    selected: number;
}

export function Pagination({ changeSelectedPage, totalPages }: Props) {
    function handlePageClick(event: PageChangeProps) {
        const newOffset = event.selected + 1;
        
        changeSelectedPage(newOffset);
    }

    return (
        <ReactPaginate
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            nextClassName="page-item next"
            nextLinkClassName="page-link"
            previousClassName="page-item previous"
            previousLinkClassName="page-link"
            breakLabel="..."
            nextLabel={<GrFormNext />}
            previousLabel={<GrFormPrevious />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
        />
    )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

export default function Paginate({ handlePageClick, pageCount }) {
  return (
    <div className="paginate flex justify-center">
      <ReactPaginate
        containerClassName="paginate"
        breakLabel="..."
        previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

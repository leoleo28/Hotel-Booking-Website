import "./pagination.css";
import _ from "lodash";

const Pagination = ({ total, pagesize, currentpage, changepage }) => {
  const pagecount = Math.ceil(total / pagesize);
  if (pagecount === 1) return null;
  const pages = _.range(1, pagecount + 1);
  return (
    <div className="pagination">
      {pages.map((page) => (
        <a
          onClick={() => changepage(page)}
          key={page}
          className={currentpage === page ? "active" : ""}
        >
          {page}
        </a>
      ))}
    </div>
  );
};

export default Pagination;

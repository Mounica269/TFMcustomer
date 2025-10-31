


// import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";

// const Pagination = ({ pageCount, onPageChange, initialPage }) => {
//     const [pageRange, setPageRange] = useState(3);

//     useEffect(() => {
//         const updatePageRange = () => {
//             if (window.innerWidth <= 768) setPageRange(1);
//             else if (window.innerWidth <= 1024) setPageRange(2);
//             else setPageRange(3);
//         };

//         window.addEventListener("resize", updatePageRange);
//         updatePageRange();

//         return () => window.removeEventListener("resize", updatePageRange);
//     }, []);

//     return (
//         <ReactPaginate
//             initialPage={initialPage}
//             pageCount={pageCount}
//             onPageChange={onPageChange}
//             marginPagesDisplayed={1}
//             pageRangeDisplayed={pageRange}
//             containerClassName="pagination"
//             previousLabel="«Prev"
//             nextLabel="Next»"
//             disabledClassName="navigationDisabled"
//             activeClassName="active"
//             previousLinkClassName="previous"
//             nextLinkClassName="next"
//         />
//     );
// };

// export default Pagination;


import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange, initialPage }) => {
    const [pageRange, setPageRange] = useState(3);
    const [isMobile, setIsMobile] = useState(false); // Track screen size

    useEffect(() => {
        const updatePageRange = () => {
            if (window.innerWidth <= 768) setPageRange(1);
            else if (window.innerWidth <= 1024) setPageRange(2);
            else setPageRange(3);

            if (window.innerWidth < 270) setIsMobile(true); // Below 270px
            else setIsMobile(false);
        };

        window.addEventListener("resize", updatePageRange);
        updatePageRange();

        return () => window.removeEventListener("resize", updatePageRange);
    }, []);

    return (
        <div className="pagination-container">
            <ReactPaginate
                initialPage={initialPage}
                pageCount={pageCount}
                onPageChange={onPageChange}
                marginPagesDisplayed={1}
                pageRangeDisplayed={pageRange}
                containerClassName="pagination"
                previousLabel="«Prev"
                nextLabel="Next»"
                disabledClassName="navigationDisabled"
                activeClassName="active"
                previousLinkClassName={isMobile ? "previous hidden" : "previous"}
                nextLinkClassName={isMobile ? "next hidden" : "next"}
            />
        </div>
    );
};

export default Pagination;

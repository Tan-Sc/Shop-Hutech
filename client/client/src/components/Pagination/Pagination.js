import React from 'react';
import './Pagination.css'

function Pagination({ page, handlePageChange, products }) {

    // console.log(products.length);
    return (
        <div className="pagination">
            <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
            >
                Prev
            </button>
            <button
                disabled={products.length < 10}
                onClick={() => handlePageChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
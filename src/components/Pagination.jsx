import React from 'react'

function Pagination({ totalNotes, notesPerPage, currentPage, setCurrentPage }) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
        pages.push(i);
    }

    return (
        <div>
            {
                pages.map((page, index) => {
                    return <button key={index} className={page === currentPage ? "active" : "pagination-btn"} onClick={() => setCurrentPage(page)}>{index}</button>
                })
            }
        </div>
    )
}

export default Pagination
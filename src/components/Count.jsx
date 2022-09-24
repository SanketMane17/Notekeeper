import React from "react";

function Count({ count }) {
    return (
        <div className="count">
            <h4>{count} notes in Database</h4>
        </div>
    );
}

export default Count;
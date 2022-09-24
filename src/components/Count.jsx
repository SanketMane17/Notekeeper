import React from "react";

function Count({ count }) {

    if (count > 0) {
        if (count == 1) {
            return (
                <div className="count">
                    <h4>{count} note in Database</h4>
                </div>
            )
        }
        return (
            <div className="count">
                <h4>{count} notes in Database</h4>
            </div>
        )
    }
}

export default Count;
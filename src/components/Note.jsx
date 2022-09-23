import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

function Note({ id, title, tagline, content, onDelete, onEdit, isOpenPopup, notes, isPinned, setNotes }) {

    const [isPin, setIsPin] = useState(isPinned);
    function addPinnedData(e, id) {
        e.stopPropagation();
        if (isPin === true) {
            notes.forEach(note => {
                if (note.id === id) {
                    note.isPinned = !isPin;
                }
            });
        } else if (isPin === false) {
            notes.forEach(note => {
                if (note.id === id) {
                    note.isPinned = !isPin;
                }
            });
        }
        setIsPin(!isPin);
        setNotes([...notes]);
    }

    const pinImage =
        (!isPin) ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTE3IDR2N2wyIDN2MmgtNnY1bC0xIDEtMS0xdi01SDV2LTJsMi0zVjRjMC0xLjEuOS0yIDItMmg2YzEuMTEgMCAyIC44OSAyIDJ6TTkgNHY3Ljc1TDcuNSAxNGg5TDE1IDExLjc1VjRIOXoiLz4KPC9zdmc+Cg==" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTE3IDRhMiAyIDAgMCAwLTItMkg5Yy0xLjEgMC0yIC45LTIgMnY3bC0yIDN2Mmg2djVsMSAxIDEtMXYtNWg2di0ybC0yLTNWNHoiLz4KPC9zdmc+Cg==";

    return (
        <>
            <div className={isOpenPopup ? "note pointer-event" : "note"} onClick={() => onEdit(id)}>
                <p className="title">{title}</p>
                <p>{tagline}</p>
                <p>{content}</p>
                <div>
                    <img
                        className="pin"
                        src={pinImage}
                        alt="pinned"
                        onClick={(e) => addPinnedData(e, id)}
                    />
                </div>
                <div className="buttons">
                    <div></div>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id)
                    }}>
                        <MdDelete size={25} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Note;
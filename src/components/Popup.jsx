import React, { useState } from 'react'
import { AiOutlineCheck } from "react-icons/ai";

function Popup({ isOpenPopup, setOpenPopup, editNote, setEditNote, notes, setNotes }) {

    function handleChange(e) {
        const { name, value } = e.target;
        setEditNote(preValue => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    function saveData(e) {
        e.preventDefault();
        const editNotes = [];
        editNotes.push(editNote);
        editNotes.forEach(element => {
            const itemIndex = notes.findIndex(o => o.id === element.id);
            if (itemIndex > -1) {
                notes[itemIndex] = element;
            } else {
                notes = notes.push(element);
            }
        });
        setNotes([...notes]);
        setOpenPopup(false);
    }

    if (!isOpenPopup) return null;
    return (
        <div>
            <form className='popup-form' onClick={(e) => e.stopPropagation()}>
                <input
                    value={editNote.title}
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />
                <input
                    value={editNote.tagline}
                    type="text"
                    placeholder="Tagline"
                    name="tagline"
                    onChange={handleChange}
                />
                <p>
                    <textarea
                        value={editNote.content}
                        name="content"
                        placeholder="Take a note..."
                        onChange={handleChange}
                        rows={3}
                    ></textarea>
                </p>
                <div>
                    <button onClick={saveData}><AiOutlineCheck size={25} /></button>
                </div>
            </form>
        </div>)
}

export default Popup;

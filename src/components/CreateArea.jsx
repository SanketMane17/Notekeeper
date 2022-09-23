import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function CreateArea({ onAdd, note, setNote, isOpenPopup, isExpanded, setExpanded }) {

    function handleChange(e) {
        const { name, value } = e.target;
        setNote((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    }

    function handleExpanded() {
        setExpanded(true);
    }

    function validateInput(note) {

        if (!note.title) {
            toast.error("Title cannot be empty", { position: toast.POSITION.BOTTOM_CENTER });
            return false;
        }
        else if (!note.tagline) {
            toast.error("Tagline cannot be empty", { position: toast.POSITION.BOTTOM_CENTER });
            return false;
        } else if (!note.content) {
            toast.error("Content cannot be empty", { position: toast.POSITION.BOTTOM_CENTER });
            return false;
        }
        return true;
    }

    function submitButton(event, note) {
        event.preventDefault();
        if (!validateInput(note)) return;

        onAdd(note);
        setNote({
            ...note,
            title: "",
            tagline: "",
            content: "",
        });
        setExpanded(false);
    }

    const classForm = isOpenPopup ? "input-form pointer-event" : "input-form";
    return (
        <div>
            <form className={classForm} onClick={(e) => e.stopPropagation()} >
                {isExpanded && (
                    <>
                        <input
                            value={note.title}
                            type="text"
                            placeholder="Title"
                            name="title"
                            onChange={handleChange}
                        />
                        <input
                            value={note.tagline}
                            type="text"
                            placeholder="Tagline"
                            name="tagline"
                            onChange={handleChange}
                        />
                    </>
                )}
                <p>
                    <textarea
                        value={note.content}
                        name="content"
                        placeholder="Take a note..."
                        onChange={handleChange}
                        rows={isExpanded ? 3 : 1}
                        onClick={handleExpanded}
                    ></textarea>
                </p>
                <button onClick={(event) => submitButton(event, note)}>
                    <IoIosAdd size={35} />
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default CreateArea;
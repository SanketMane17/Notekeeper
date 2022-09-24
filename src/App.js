import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Popup from "./components/Popup";
import Pagination from "./components/Pagination";

const notesPerPage = 6;

// Get data from localStoage
const getDataFromLocalStorage = () => {
  let notes = localStorage.getItem("notes");

  if (notes)
    return JSON.parse(localStorage.getItem("notes"));
  return [];
}

function App() {
  // Lifting state up
  const [currentPage, setCurrentPage] = useState(1);
  const [notes, setNotes] = useState(getDataFromLocalStorage());
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    tagline: "",
    content: "",
    isPinned: false
  });
  const [editNote, setEditNote] = useState({
    id: "",
    title: "",
    tagline: "",
    content: ""
  });

  function addNote(note) {
    const allInputData = { id: new Date().getTime().toString(), title: note.title, tagline: note.tagline, content: note.content, isPinned: false };
    setNotes([...notes, allInputData]);
  }

  function deleteNotes(id) {
    setNotes((preValue) => {
      return [...preValue.filter((note) => note.id !== id)];
    });
  }

  function editNotes(id) {
    const newEditNote = notes.find(note => note.id === id);
    setEditNote(newEditNote);
    setOpenPopup(true);
  }

  const lastNoteIndex = currentPage * notesPerPage;
  const firstNoteIndex = lastNoteIndex - notesPerPage;
  const currentNotes = notes.slice(firstNoteIndex, lastNoteIndex);

  const pinnedNotes = currentNotes.filter(note => note.isPinned);
  const unpinnedNotes = currentNotes.filter(note => !note.isPinned);


  // Add data to localStorage
  useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  return (
    <>
      <div className={isOpenPopup ? "container" : ""} onClick={() => {
        if (isOpenPopup === true)
          setOpenPopup(false)

        if (isExpanded === true)
          setExpanded(false);
      }
      }>
        <Header />
        <CreateArea
          note={note}
          setNote={setNote}
          onAdd={addNote}
          isOpenPopup={isOpenPopup}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
        />
        {pinnedNotes.length > 0 && (
          <>
            <p className="sections">Pinned</p>
            <div className="notes">
              {pinnedNotes.map((note) => {
                return (
                  <div key={note.id}>
                    <Note
                      id={note.id}
                      title={note.title}
                      tagline={note.tagline}
                      content={note.content}
                      onDelete={deleteNotes}
                      onEdit={editNotes}
                      isOpenPopup={isOpenPopup}
                      isPinned={note.isPinned}
                      notes={notes}
                      setNotes={setNotes}
                    />
                    <Popup isOpenPopup={isOpenPopup} setOpenPopup={setOpenPopup} editNote={editNote} setEditNote={setEditNote} notes={notes} setNotes={setNotes} />
                  </div>
                )
              })}
            </div>
          </>
        )}

        {unpinnedNotes.length > 0 && (
          <>
            {pinnedNotes.length !== 0 && (<p className="sections">Others</p>)}
            <div className="notes">
              {unpinnedNotes.map((note) => {
                return (
                  <div key={note.id}>
                    <Note
                      id={note.id}
                      title={note.title}
                      tagline={note.tagline}
                      content={note.content}
                      onDelete={deleteNotes}
                      onEdit={editNotes}
                      isOpenPopup={isOpenPopup}
                      isPinned={note.isPinned}
                      notes={notes}
                      setNotes={setNotes}
                    />
                    <Popup isOpenPopup={isOpenPopup} setOpenPopup={setOpenPopup} editNote={editNote} setEditNote={setEditNote} notes={notes} setNotes={setNotes} />
                  </div>
                )
              })}
            </div>
          </>
        )}
        <div className="pagination">
          <Pagination
            totalNotes={notes.length}
            notesPerPage={notesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} />
        </div>
      </div>

    </>
  );
}

export default App;
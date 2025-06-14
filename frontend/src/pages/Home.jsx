import React, { useState } from 'react'
import Nav from '../components/Nav'
import { RxCross2 } from "react-icons/rx";

function Home() {
  const [notes,setnotes] = useState([])
  const [newnote,setnewnote] = useState({
    title: "",
    content: ""
  })
  const [showForm, setShowForm] = useState(false);

  const handlechange = (e) => {
    e.preventDefault();
    try {
      if (newnote.title || newnote.content) {
        setnotes([...notes, newnote])
        setnewnote({
          title: "",
          content: ""
        })
        setShowForm(false);
        console.log("Note added successfully:", notes);
      }
      else {
        alert("Please fill fields");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
     
   function handleDelete(index) {
    const updatedNotes = notes.filter((_, idx) => idx !== index);
    setnotes(updatedNotes);
    setShowForm(false);
     setnewnote({
          title: "",
          content: ""
        })
    console.log("Note deleted successfully:", updatedNotes);
   }
    
  return (
    <div className="w-full min-h-[100vh] bg-[#f3edd2]">
      <Nav />
      <div className="flex flex-col w-full lg:flex-row items-start justify-center gap-[20px] px-[20px] pt-[40px]">
        <div className="w-full h-[400px] lg:w-[30%] lg:h-[500px] min-h-[500px] bg-white shadow-lg rounded-lg flex flex-col items-center justify-start px-[30px] py-[20px] gap-[20px]">
          <div className='w-full flex flex-col items-start justify-center'>
          <h1 className="text-[30px] font-bold text-[#333]">Notes</h1>
          </div>
          <div className='w-full flex flex-col items-start justify-center'>
            <div className='w-full flex items-center bg-blue-900 text-white rounded-lg px-[10px] py-[5px] gap-[10px] h-[40px]'>
              <button className='w-full border-none outline-none text-[23px]' onClick={()=>setShowForm(true)}>+ New Notes</button>
            </div> 
          </div>
         {notes &&  <div className='w-full flex flex-col gap-2 mt-4'>
            {notes.map((note, idx) => (
              <div key={idx} className="text-lg text-blue-900 font-semibold bg-blue-100 rounded px-2 py-1 flex items-center justify-between " onClick={() => { setShowForm(true); setnewnote(note); }}>
                {note.title}
                 <button
                   className='text-blue-900 hover:text-red-600'
                   onClick={(e) => {
                     e.stopPropagation();
                     handleDelete(idx);
                   }}
                   aria-label="Delete note"
                 >
                    <RxCross2 size={20} />
                  </button>
              </div>
            ))}
          </div> }
          
        </div>

        <div className="w-full h-[400px] lg:w-[40%] lg:h-[500px] min-h-[500px] bg-white shadow-lg rounded-lg flex flex-col items-center justify-center px-[30px] py-[50px]">
          {/* Middle content */}
          {showForm && (
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handlechange}
            >
              <input
                type="text"
                placeholder="Title"
                className="border rounded px-3 py-2 text-lg"
                value={newnote.title}
                onChange={e => setnewnote({ ...newnote, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="border rounded px-3 py-2 text-base min-h-[100px] resize-none"
                value={newnote.content}
                onChange={e => setnewnote({ ...newnote, content: e.target.value })}
                required
              />
              <button
                type="submit"
                className="bg-blue-900 text-white rounded px-4 py-2 font-semibold hover:bg-blue-800 transition"
              >
                Save
              </button>
            </form>
          )}
        </div>
        <div className="hidden lg:flex lg:w-[30%] lg:h-[500px] min-h-[500px] bg-white shadow-lg rounded-lg flex-col items-center justify-center px-[30px] py-[50px]">
          {/* Right content */}
        </div>
      </div>
    </div>
  )
}

export default Home
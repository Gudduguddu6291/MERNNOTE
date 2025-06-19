import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDatacontext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
function Home() {
  const [notes,setnotes] = useState([])
  let {notesData,setnotesData} = useContext(userDataContext);
  const [newnote,setnewnote] = useState({
    title: "",
    content: "",
    file:null,
  })
  const [showForm, setShowForm] = useState(false);
  let {serverURL} = useContext(authDatacontext)
  const handlechange = async (e) => {
    e.preventDefault();
    try {
      if (newnote.title || newnote.content) {
        const formData = new FormData();
        formData.append('title', newnote.title);
        formData.append('content', newnote.content);
        formData.append('file', newnote.file);
        let result = await axios.post(serverURL +"/api/notes/upload", formData, {withCredentials:true})
        const savedNote = result.data.result;
        setnotes([...notes, savedNote])
        setnotesData(prev=>[...prev, savedNote])
        setnewnote({title: "",content: "",file:null})
        setShowForm(false);
        console.log("Note added successfully:", result.data);
      }
      else {
        alert("Please fill fields");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
     
   async function handleDelete(noteId) {
    try {
      if (!noteId) {
        console.log( "Note ID is required for deletion");
        return;
      }
      let res = await axios.delete(serverURL+`/api/notes/delete/${noteId}`,{withCredentials:true})
      setnotesData(prev => prev.filter(note => note._id !== noteId));
      setnotes(prev => prev.filter(note => note._id !== noteId));
      setShowForm(false);
      setnewnote({title: "",content: ""})
      console.log("Note deleted successfully:", res.data);
    } 
    catch (error) {
      console.error("Error deleting note:", error);
    }
    
   }
   
   async function updateNote(e,noteId,note)
   {
    e.preventDefault();
    if (!noteId || !note.title || !note.content) {
      alert("Please fill all fields");
      return;
    }
    try {
        let result = await axios.put(serverURL+`/api/notes/update/${noteId}`,
          {title:note.title,content:note.content},{withCredentials:true});
        setnotesData(prev=> prev.map(old =>old._id === noteId ? {...old,title:note.title,content:note.content}:old))
        setnotes(prev =>prev.map(old =>old._id === noteId ? {...old,title:note.title,content:note.content}:old))
        setShowForm(false);
        setnewnote({title: "",content: ""})
        console.log("Note updated successfully:", result.data);
    } 
    catch (error) {
      console.error("Error updating note:", error);
    }
   }

  return (
    <div className="w-full min-h-[100vh] bg-[#f3edd2]">
      <Nav />
      <div className="flex flex-col w-full lg:flex-row items-start justify-center gap-[20px] px-[20px] pt-[40px] ">
        <div className="w-full h-[400px] lg:w-[30%] lg:h-[500px] min-h-[500px] bg-white shadow-lg rounded-lg flex flex-col items-center justify-start px-[30px] py-[20px] gap-[20px]">
          <div className='w-full flex flex-col items-start justify-center'>
          <h1 className="text-[30px] font-bold text-[#333]">Notes</h1>
          </div>
          <div className='w-full flex flex-col items-start justify-center'>
            <div className='w-full flex items-center bg-blue-900 text-white rounded-lg px-[10px] py-[5px] gap-[10px] h-[40px]'>
              <button className='w-full border-none outline-none text-[23px]' onClick={()=>{setShowForm(true); setnewnote({ title: "", content: "",file:null})}}>+ New Notes</button>
            </div> 
          </div>
          <div className='w-full flex flex-col gap-2 mt-4 overflow-y-auto max-h-[300px] scrollbar-hide'>
         {notesData.length>0 &&  <div className='w-full flex flex-col gap-2 mt-4'>
            {notesData.map((note, idx) => (
              <div key={note._id || idx} className="text-lg text-blue-900 font-semibold bg-blue-100 rounded px-2 py-1 flex items-center justify-between cursor-pointer" onClick={() => { setShowForm(true); setnewnote({
                title: note.title,
                content: note.content,
                fileUrl: note.fileUrl
                });
               }}>
                {note.title}
                 <button
                   className='text-blue-900 hover:text-red-600'
                   onClick={(e) => {
                     e.stopPropagation();
                     handleDelete(note._id);
                   }}
                   aria-label="Delete note"
                 >
                    <RxCross2 size={20} />
                  </button>
              </div>
            ))}
          </div> }
          </div>
        </div>

        <div className="w-full h-[400px] lg:w-[40%] lg:h-[500px] min-h-[500px] bg-white shadow-lg rounded-lg flex flex-col items-center justify-center px-[30px] py-[50px]">
          {/* Middle content */}
          {showForm && (
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={(e)=>{
                newnote._id?updateNote(e,newnote._id,newnote):handlechange(e)}}>
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
              {/* Show PDF preview if fileUrl exists */}
              {newnote.fileUrl && (
                <button
                  type="button"
                  onClick={() => window.open(newnote.fileUrl, '_blank')}
                  className="text-blue-700 underline text-sm w-fit"
                >
                  Open attached PDF
                </button>
              )}

              {/* File input to add new PDF */}
            <input
            type="file"
            accept='application/pdf'
            className="border rounded px-3 py-2 text-base"
            onChange={e => setnewnote({ ...newnote, file: e.target.files[0] })}
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
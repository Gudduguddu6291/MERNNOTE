import express from 'express';
import Note from '../models/note.js';
import uploadOnCloudinary from '../config/cloudinary.js';
export const upload = async (req, res) => {
    try {
       let {title,content} = req.body;
       let fileUrl = null;
       
       if(!title && !content) return res.status(400).json({message: "Title or content are required"});
        if(req.file)
        fileUrl =await uploadOnCloudinary (req.file.path);
        const result = await Note.create({
            title,
            content,
            fileUrl,
            author: req.user_id
        });
        return res.status(201).json({message: "Upload Successfull", result});
       }
      catch (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({message: "Upload Error"});
      }
    }
   



export const deleteNote = async (req,res)=>{
    try {
        let {noteId} = req.params;
        if(!noteId) return res.status(400).json({message:"Note Id is required"});
        let result = await Note.findByIdAndDelete(noteId);
        if(!result) return res.status(404).json({message:"Note not found"});
        return res.status(200).json({message:"Note deleted successfully"});
    } 
    catch (error) {
        return res.status(500).json({message:"Delete Note Error"});
    }
}

export const updateNote = async(req,res)=>{
    try {
        let {noteId} = req.params;
        let {title,content} = req.body;
        if(!noteId) return res.status(400).json({message:"Note Id is required"});
        if(!title && !content) return res.status(400).json({message:"Title or content are required"});
        let result = await Note.findByIdAndUpdate(noteId,{title,content},{new:true});
        if(!result) return res.status(404).json({message:"Note not found"});
        return res.status(200).json({message:"Note updated successfully", result});
    } 
    catch (error) {
        return res.status(500).json({message:"Update Note Error"});
    }
}

export const getnote = async(req,res)=>{
    try {
        const note = await Note.find()
        .populate("author","firstName lastName UserName")
        .sort({createdAt:-1})
        return res.status(200).json(note)
    } 
    catch (error) {
        return res.status(500).json({message:"getnote error"})
    }
}

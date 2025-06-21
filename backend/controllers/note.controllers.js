import express from 'express';
import Note from '../models/note.js';
import fs from 'fs';
import uploadOnCloudinary from '../config/cloudinary.js';
import { v2 as cloudinary } from 'cloudinary'

export const upload = async (req, res) => {
    try {
       let {title,content} = req.body;
       let fileUrl = null;
       
       if(!title && !content) return res.status(400).json({message: "Title or content are required"});
        if(req.file)
        fileUrl =await uploadOnCloudinary (req.file.path, "raw"); // specify resource_type 'auto' for all file types
        const result = await Note.create({
            title,
            content,
            fileUrl,
            author: req.userId
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

export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    if (!noteId) return res.status(400).json({ message: "Note Id is required" });
    if (!title && !content && !req.file) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    console.log("User ID:", req.userId); // Make sure req.userId is being set properly
    const note = await Note.findOne({ _id: noteId, author: req.userId });

    if (!note) {
      return res.status(403).json({ message: "Not authorized or note not found" });
    }

    let fileUrl = note.fileUrl;
    let public_id = note.public_id;

    if (req.file && req.file.path) {
      // Delete old file from Cloudinary
      if (public_id) {
        try {
          await cloudinary.uploader.destroy(public_id, { resource_type: "raw" });
        } catch (err) {
          console.error("Cloudinary delete error:", err.message);
        }
      }

      // Upload new file to Cloudinary
      const uploaded = await uploadOnCloudinary(req.file.path, "raw");
      console.log("Uploaded File URL:", uploaded);

      if (!uploaded?.secure_url) {
        return res.status(500).json({ message: "Cloudinary upload failed" });
      }

      fileUrl = uploaded.secure_url;
      public_id = uploaded.public_id;

      // Delete local temp file safely
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    // Update fields
    note.title = title ?? note.title;
    note.content = content ?? note.content;
   
    note.public_id = public_id;

   try {
      const result = await note.save();
      return res.status(200).json({ message: "Note updated successfully", result });
  } 

  catch (saveError) {
  console.error("Mongoose Save Error:", saveError);
  return res.status(500).json({ message: saveError.message });
  }
    // Note.findByIdAndUpdate(public_id,{})

  } catch (error) {
    console.error("Update Note Error:", error);
    return res.status(500).json({ message: error.message || "Update Note Error" });
  }
};




export const getnote = async(req,res)=>{
    try {
        const note = await Note.find({author:req.userId})
        .populate("author","firstName lastName UserName")
        .sort({createdAt:-1})
        return res.status(200).json(note)
       
    } 
    catch (error) {
        return res.status(500).json({message:"getnote error"})
    }
}

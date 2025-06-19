import moongoose from 'mongoose';
const noteSchema = new moongoose.Schema({
    author:{
        type: moongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    fileUrl:{
        type: String,
        required: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

},{timestamps:true});

const Note = moongoose.model('Note', noteSchema);
export default Note;
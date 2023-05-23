import mongoose from "mongoose";

const tableSchma= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 15
    },
    rollno : {
        type: Number,
        required: true
    },
    classname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    }
})

const Table= mongoose.model("Table", tableSchma)
export default Table;
import mongoose from "mongoose";

const classSchema= new mongoose.Schema({
    classroom: {
        type: String,
        required: true,
    }
})

const Classroom= mongoose.model("Classroom", classSchema)
export default Classroom;
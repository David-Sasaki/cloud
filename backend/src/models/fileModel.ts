import mongoose from "mongoose";

const File = mongoose.model(
    "File",
    new mongoose.Schema({ owner: String, name: String, data: Buffer, contentType: String, size: Number, users: Array<String> })
);

export default File;

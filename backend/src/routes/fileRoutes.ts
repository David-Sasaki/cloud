import express, { Router } from "express";
import multer from "multer";
import File from "../models/fileModel";

const router: Router = express.Router();

const storage = multer.memoryStorage();

router.post("/upload/:id", multer({ storage }).single("file"), async (req, res) => {
    try {
        const id = req.params.id;
        let uploadFile = req.file;
        const newFile = new File({
            owner: id,
            name: uploadFile?.originalname,
            data: uploadFile?.buffer,
            contentType: uploadFile?.mimetype,
            size: uploadFile?.size,
            users: [],
        });
        await newFile.save();
        console.log("File Saved!");
        return res.status(200).send("File uploaded and saved.");
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/getfiles/:id", async (req, res) => {
    const id = req.params.id;
    const response = await File.find({ owner: id });
    res.status(200).send(response);
});

router.get("/getfile/:id", async (req, res) => {
    const id = req.params.id;
    const response = await File.findOne({ _id: id });
    // res.set('Content-Type', response?.contentType || "");
    // res.set('Content-Disposition', `attachment; filename="${response?.name}"`);
    res.status(200).send(response);
});

router.get("/getfilecontent/:id", async (req, res) => {
    const id = req.params.id;
    const response = await File.findOne({ _id: id });
    res.set('Content-Type', response?.contentType || "");
    res.set('Content-Disposition', `attachment; filename="${response?.name}"`);
    res.status(200).send(response?.data);
});

router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    let doc = await File.findOne({ _id: id });
    if (doc) {
        await File.findOneAndUpdate({ _id: id }, { users: req.body.usernames });
    }
    res.status(200).send("Success!");
});

router.put("/updatename/:id", async (req, res) => {
    const id = req.params.id;
    let doc = await File.findOne({ _id: id });
    if (doc) {
        await File.findOneAndUpdate({ _id: id }, { name: req.body.name });
    }
    res.status(200).send("Success!");
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await File.findOneAndDelete({ _id: id });
    res.status(200).send("Success!");
});

export default router;

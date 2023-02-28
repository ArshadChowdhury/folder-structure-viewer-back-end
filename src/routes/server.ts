import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from '../config/config';
import FolderModel from '../models/FolderModel';

// Allowing server to use JSON

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to mongoose

mongoose.set('strictQuery', true);
mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log('connected to DB');
    })
    .catch((err) => console.log(err));

// Routes

app.get('/', (req, res) => {
    FolderModel.find({}, (err, foldersFound) => {
        if (!err) {
            res.json({
                folders: foldersFound
            });
        }
    });
});

app.post('/create-folder', (req, res) => {
    const newFolderEntry = new FolderModel({
        folderName: req.body.folder_name
    });

    newFolderEntry.save((err) => {
        if (!err) {
            console.log('Saved');
        } else {
            console.log('Failed to save', err);
        }
    });
    res.redirect('/');
});

app.post('/delete-folder', (req, res) => {
    const folderToBeDeletedID = req.body.deleting;

    FolderModel.findByIdAndRemove(folderToBeDeletedID, (err) => {
        if (!err) {
            console.log('Successfully Deleted Folder');
        }
    });
});

// Error Handling for a route that doesn't exist

app.use((req, res) => {
    const error = new Error('Not Found');
    return res.status(404).json({ message: error.message });
});

// Server setup and listening to specific port

http.createServer(app).listen(3000, () => console.log('listening to port 3000'));

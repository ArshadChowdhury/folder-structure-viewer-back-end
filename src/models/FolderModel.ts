import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const folderSchema = new Schema({
    folderName: String
});

const FolderModel = mongoose.model('FolderModel', folderSchema);

export default FolderModel;

import multer from 'multer';
import uuidv4 from 'uuid/v4';
import path from 'path';
import mongoose from 'mongoose';

export const escapeRegex = text => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

//removes an element from an array, using for removing wishlist and readlist items!
export const removeElement = (array, element) => {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
};

//returns true if the element is present in the array
export const isInArray = (array, element) => {
    return JSON.stringify(array).includes(element);
};

//converts a normal string to object id
export const stringToObjectId = id => {
    return mongoose.Types.ObjectId(id);
};

export const isLoggedIn = (req, res, next) => {
    //check if the user is authenticated
    if (req.isAuthenticated()) {
        //allow access to the resource
        return next();
        // res.redirect("back");
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.username.equals('admin')) {
        return next();
    }
};

// configure storage
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    }
});

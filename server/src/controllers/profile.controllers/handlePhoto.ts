import { Request, Response } from 'express';
import { User } from '../../models/user.model';
import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File,
                  cb: (error: Error | null, destination: string) => void): void => {
        cb(null, './uploads/');
    },
    filename: (req: Express.Request, file: Express.Multer.File,
               cb: (error: Error | null, filename: string) => void): void => {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req: Request, file: any, cb: any): void => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Please, choose a valid image'), false);
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter,
});

const handlePhotoChange = async (req: Request): Promise<any> => {
    const user: any = await User.findOneAndUpdate(
        { _id: req.body.id },
        { photoPath: req.file ? req.file.path : '' },
    );
    if (user.photoPath) {
        fs.unlink(user.photoPath, (err: Error | null) => {
            if (err) {
                throw err;
            }
        });
    }
    return req.file ? req.file.path : '';
};

export const handlePhoto = async (req: Request, res: Response): Promise<any> => {
    const photoPath = await handlePhotoChange(req);
    const status = photoPath ? 'Photo was successfully uploaded' : 'Photo was successfully deleted';
    res.json({ status, photoPath });
};

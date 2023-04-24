import multer from 'multer'

const fileStorageEngineAvatar = multer.diskStorage({
    destination: (_req, _file, cb) => {
		cb(null, );
    },

    filename: (_req, file, cb) => {
      	cb(null, `${file.originalname}`);
		
    },
});

const uploadEventImage = multer({ storage: fileStorageEngineAvatar });

export default uploadEventImage;


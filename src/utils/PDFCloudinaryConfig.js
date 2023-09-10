const cloudinary = require('cloudinary').v2;
const config = require('../configCloud.js');

// Configuacion de Cloudinary
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

// Subimos el archivo PDF a Cloudinary
const uploadFile = async (file) => {
    try {
        let result;
        if (typeof file === 'string') {
            // En caso de que sea una URL
            result = await cloudinary.uploader.upload(file, {
                folder: 'selpro/files',
                resource_type: 'auto',
                format: 'pdf',
            });
        } else {
            // En caso de que se suba un archivo desde la PC
            result = await cloudinary.uploader.upload(file.path, {
                folder: 'selpro/files',
                resource_type: 'auto',
                format: 'pdf',
            });
        }
        return result.secure_url;
    } catch (error) {
        throw error;
    }
};

module.exports = { uploadFile };

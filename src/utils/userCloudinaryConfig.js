const cloudinary = require('cloudinary').v2;
const config = require('../configCloud.js');
const streamifier = require('streamifier');

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

// Upload an image to Cloudinary
const uploadImage = async (imageInput) => {
    try {
        let result;

        if (typeof imageInput === 'string') {
            result = await cloudinary.uploader.upload(imageInput, {
                folder: 'selpro/user-documents',
				resource_type: 'auto'
            });
            return result.secure_url;
        } else {
            return new Promise((resolve, reject) => {
                const result = cloudinary.uploader.upload_stream(
                    {
                        folder: 'selpro/user-documents',
                        resource_type: 'auto',
                    },
                    (error, cloudinaryResult) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(cloudinaryResult.secure_url);
                        }
                    }
                );
                const bufferStream = streamifier.createReadStream(imageInput);
                bufferStream.pipe(result);
            });
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { uploadImage };

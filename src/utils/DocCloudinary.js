const cloudinary = require('cloudinary').v2;
const config = require('../configCloud.js');

// Configuration for Cloudinary
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

// Upload a PDF buffer to Cloudinary
const uploadDoc = async (file) => {
    try {
        if (Buffer.isBuffer(file)) {
            // Upload buffer directly
            const result = await cloudinary.uploader.upload('data:application/pdf;base64,' + file.toString('base64'), {
                folder: 'selpro/docs',
                resource_type: 'raw',
                format: 'pdf',
            });
            return result.secure_url;
        } else {
            throw new Error('Invalid input format');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { uploadDoc };

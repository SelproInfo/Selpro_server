const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer().single('image');
const config = require('../configCloud.js');
//IMPORTANTE : esta function solo lleva la imagen a la carpeta PRODUCTS de cloudinary!!
//se utiliza SOLO para funcion POST PRODUCT
const productCloudinaryConfig = async (image) => {
    // se le envia por parametro la imagen (value) de la prop del objeto x ej: newUser.RUT_image (
    //recuerde q newUser es la constante creada en el handler para mandar las props dentro de una palabra, asi el controller post solo recibe está y no todas las props q son muchas)
    cloudinary.config({
        cloud_name: config.cloud_name,
        api_key: config.api_key,
        api_secret: config.api_secret,
    });

    try {
        let result;
        if(typeof image === "string") {
            result = await cloudinary.uploader.upload(image, {
                folder: 'selpro/Products',
                transformation: [
                    {
                        width: 192, // Define el ancho deseado aquí
                        crop: 'scale', // Escala la imagen para que se ajuste al ancho especificado
                    },
                ],
            });
        } else {
            result = await cloudinary.uploader.upload(image.path, {
                folder: 'selpro/Products',
                transformation: [
                    {
                        width: 192, 
                        crop: 'scale',
                    },
                ],
            });
        }
        return result.secure_url;
    } catch (error) {
        throw error;
    }
};
module.exports = { productCloudinaryConfig };
const PDFDocument = require('pdfkit');
const { User } = require('../../db.js');
const { uploadDoc } = require('../../utils/DocCloudinary.js');

async function generatePDF() {
    return new Promise(async (resolve, reject) => {

        const doc = new PDFDocument();
        const buffers = [];
    
        const users = await User.findAll();
    
        const headers = [
            'Ref',
            'Nombre',
            'ID Num',
            'Telefono',
            'Email',
            'Dirección',
            'Empresa',
            'NIT',
            'CIIU',
            'Sector',
        ];
    
        let y = 30;
    
        const customXCoordinates = [30, 52, 108, 145, 194, 285, 420, 480, 520, 540];
    
        headers.forEach((header, index) => {
            const x = customXCoordinates[index];
    
            doc
                .fontSize(8)
                .text(header, x, y)
                .moveDown(0.5);
        });
    
        doc.fontSize(6);
    
        users.forEach(user => {
            y += 10;
    
            doc
                .text(user.user_id.toString(), 30, y)
                .text(user.name, 52, y)
                .text(user.num_ident, 108, y)
                .text(user.phone, 145, y)
                .text(user.email, 194, y)
                .text(user.adress.join(', '), 285, y)
                .text(user.company_name, 420, y)
                .text(user.NIT, 480, y)
                .text(user.CIIU, 520, y)
                .text(user.sector, 540, y);
        });
    
        doc.on('data', (chunk) => {
            buffers.push(chunk);
        });
    
        doc.on('end', async () => {
            const pdfBuffer = Buffer.concat(buffers);
    
            try {
                // Upload PDF to Cloudinary
                const pdfUrl = await uploadDoc(pdfBuffer);

                resolve(pdfUrl)
            } catch (error) {
                reject(error)
            }
        });
    
        doc.end();
    })
}

module.exports = { generatePDF };

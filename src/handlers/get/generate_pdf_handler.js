const { generatePDF } = require("../../controllers/get/generate_pdf.js")



const PDFgenerate = async (req, res) => {
    try {
        const response = await generatePDF()
        res.json({email: response})
    } catch (error) {
        res.send({ error: error.message })
    }
}

module.exports = { PDFgenerate }
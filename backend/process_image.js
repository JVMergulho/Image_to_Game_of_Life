const { removeBackground } = require('@imgly/background-removal-node');
const Jimp = require('jimp');
const path = require('path');

async function removeImageBackground(imgSource) {
    try{
        const blob = await removeBackground(imgSource);
        const buffer = Buffer.from(await blob.arrayBuffer());
        const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
        return dataURL;
    } catch(error){
        throw new Error('Error removing background: ' + error);
    }
}

const process_image = async (req, res) => {
    try {
        const file = req.file;
        const imagePath = file.path; // Path to the uploaded image
        const outputPath = './uploads/'+ file.filename.replace(/\.(jpg|jpeg|png)$/i, '.png');
        // Obs. A imagem de input pode estar com outras extensões, jpg, jpeg, png...

        console.log('Image Path:', imagePath);
        console.log('Output Image Path:', outputPath);
        
        // Perform background removal
        const resultDataURL = await removeImageBackground(imagePath)

        // Carrega a imagem com Jimp
        const image = await Jimp.read(Buffer.from(resultDataURL.split(';base64,').pop(), 'base64'));

        // Redimensiona a imagem para 80x80
        await image.resize(80, 80);

        // Obtém o buffer da imagem redimensionada
        const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

        // Converte o buffer em uma string base64
        const base64Data = buffer.toString('base64');

        res.json({ success: true, base64Data });
    } catch (error) {
        // Handle errors
        console.error('Error processing image:', error);
        res.status(500).json({ success: false, error: 'Error processing image' });
    }
};

module.exports = process_image 
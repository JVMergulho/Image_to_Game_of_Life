const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

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
        const outputPath = './uploads/'+ file.filename.replace('.jpg', '.png'); 

        console.log('Image Path:', imagePath);
        console.log('Output Image Path:', outputPath);
        
        // Perform background removal
        const resultDataURL = await removeImageBackground(imagePath)

        fs.writeFileSync(outputPath, resultDataURL.split(';base64,').pop(), { encoding: 'base64' });

        // Logging success message
        console.log('Background removed successfully.');

        res.json({ success: true, outputPath});
    } catch (error) {
        // Handle errors
        console.error('Error processing image:', error);
        res.status(500).json({ success: false, error: 'Error processing image' });
    }
};

module.exports = process_image 
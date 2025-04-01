// Script to download chemical-specific images for WatFix Chemicals website gallery
const fs = require('fs');
const https = require('https');
const path = require('path');

// Image URLs from Unsplash, Pexels, and Pixabay (all free for commercial use)
// Focusing specifically on chemical products and containers
const imageUrls = {
    'gallery-1.jpg': 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=600&auto=format&fit=crop',    // Laboratory chemicals in bottles
    'gallery-2.jpg': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?w=600&auto=compress',          // Industrial chemical tanks
    'gallery-3.jpg': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop',    // Chemical containers and barrels
    'gallery-4.jpg': 'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?w=600&auto=compress'           // Chemical testing and quality control
};

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
    console.log('Created images directory');
}

// Download each image
Object.entries(imageUrls).forEach(([filename, url]) => {
    const filePath = path.join(imagesDir, filename);
    
    // Create a file stream
    const file = fs.createWriteStream(filePath);
    
    // Download the image
    https.get(url, (response) => {
        response.pipe(file);
        
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there was an error
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
});

console.log('Started downloading chemical-specific gallery images. This may take a few moments...');

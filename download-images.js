// Script to download images for WatFix Chemicals website
const fs = require('fs');
const https = require('https');
const path = require('path');

// Image URLs from Unsplash, Pexels, and Pixabay (all free for commercial use)
const imageUrls = {
    'hero-image.png': 'https://images.unsplash.com/photo-1611921561569-0dc52d4253d6?q=80&w=1200&auto=format&fit=crop',  // Water treatment facility
    'about-image.jpg': 'https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=800&auto=format&fit=crop',  // Lab scientist working with chemicals
    'gallery-1.jpg': 'https://images.unsplash.com/photo-1617900906639-cab7adceb499?q=80&w=600&auto=format&fit=crop',    // Industrial water treatment tanks
    'gallery-2.jpg': 'https://images.pexels.com/photos/2308893/pexels-photo-2308893.jpeg?w=600&auto=compress',          // Laboratory with chemicals
    'gallery-3.jpg': 'https://images.unsplash.com/photo-1581093196277-9f608bb3b669?q=80&w=600&auto=format&fit=crop',    // Water treatment chemicals
    'gallery-4.jpg': 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?w=600&auto=compress'           // Industrial facility
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

console.log('Started downloading images. This may take a few moments...');

// Script to download specific chemical product images for WatFix Chemicals website modals
const fs = require('fs');
const https = require('https');
const path = require('path');

// Image URLs from Unsplash, Pexels, and Pixabay (all free for commercial use)
// Each image specifically represents the chemical category
const imageUrls = {
    'product-scale-inhibitors.jpg': 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=800&auto=format&fit=crop',    // Scale & Corrosion Inhibitors - Lab chemicals in bottles
    'product-boiler-chemicals.jpg': 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?w=800&auto=compress',          // Boiler Water Treatment - Industrial tanks
    'product-polymers.jpg': 'https://images.unsplash.com/photo-1615900119312-2acd3a71f3aa?q=80&w=800&auto=format&fit=crop',           // Polymers - Chemical polymer beads
    'product-cooling-chemicals.jpg': 'https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?w=800&auto=compress',           // Cooling Tower Chemicals - Industrial cooling towers
    'product-stp-chemicals.jpg': 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=800&auto=format&fit=crop',       // STP/ETP Chemicals - Water treatment facility
    'product-specialty-chemicals.jpg': 'https://images.pexels.com/photos/8325710/pexels-photo-8325710.jpeg?w=800&auto=compress',       // Specialty Chemicals - Lab testing chemicals
    'product-oem-chemicals.jpg': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop'        // OEM Formulation - Chemical containers and barrels
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

console.log('Started downloading specific product chemical images. This may take a few moments...');

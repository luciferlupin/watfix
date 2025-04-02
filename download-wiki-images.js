// Script to download chemical images from Wikimedia Commons and other open sources
const fs = require('fs');
const https = require('https');
const path = require('path');

// Image URLs from Wikimedia Commons and other open sources
const imageUrls = {
    'wastewater-treatment-chemicals.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chemical_plant_in_operation.jpg/800px-Chemical_plant_in_operation.jpg',
    'sodium-molybdate.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Sodium-molybdate-sample.jpg/800px-Sodium-molybdate-sample.jpg',
    'hedp.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Etidronic_acid.svg/800px-Etidronic_acid.svg.png',
    'pbtc.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/PBTC.svg/800px-PBTC.svg.png',
    'shmp.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Sodium_hexametaphosphate.svg/800px-Sodium_hexametaphosphate.svg.png',
    'homopolymer.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Polyacrylamide.svg/800px-Polyacrylamide.svg.png',
    'copolymer.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Acrylamide-acrylic-acid-copolymer.svg/800px-Acrylamide-acrylic-acid-copolymer.svg.png',
    'ter-polymer.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Terpolymer.svg/800px-Terpolymer.svg.png',
    'benzotriazole.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Benzotriazole.svg/800px-Benzotriazole.svg.png'
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

console.log('Started downloading chemical images from Wikimedia Commons. This may take a few moments...');

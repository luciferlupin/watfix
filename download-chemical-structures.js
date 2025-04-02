// Script to download consistent chemical structure images for WatFix Chemicals website gallery
const fs = require('fs');
const https = require('https');
const path = require('path');

// Chemical structure image URLs from PubChem and Wikimedia Commons
const imageUrls = {
    // Wastewater Treatment Chemicals - showing water treatment plant
    'wastewater-treatment-chemicals.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/BASF_water_treatment_plant.jpg/800px-BASF_water_treatment_plant.jpg',
    
    // Sodium Molybdate - chemical structure
    'sodium-molybdate.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Sodium_molybdate.svg/800px-Sodium_molybdate.svg.png',
    
    // HEDP - chemical structure
    'hedp.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Etidronic_acid.svg/800px-Etidronic_acid.svg.png',
    
    // PBTC - chemical structure
    'pbtc.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/PBTC.svg/800px-PBTC.svg.png',
    
    // SHMP - chemical structure
    'shmp.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Sodium_hexametaphosphate.svg/800px-Sodium_hexametaphosphate.svg.png',
    
    // Homopolymer - polyacrylamide structure
    'homopolymer.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Polyacrylamide.svg/800px-Polyacrylamide.svg.png',
    
    // Copolymer - acrylamide-acrylic acid copolymer
    'copolymer.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Acrylamide-acrylic-acid-copolymer.svg/800px-Acrylamide-acrylic-acid-copolymer.svg.png',
    
    // Ter Polymer - generic terpolymer structure
    'ter-polymer.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Terpolymer.svg/800px-Terpolymer.svg.png',
    
    // Benzotriazole - chemical structure
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

console.log('Started downloading chemical structure images. This may take a few moments...');

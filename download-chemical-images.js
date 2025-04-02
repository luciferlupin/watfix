// Script to download chemical-specific images for WatFix Chemicals website gallery
const fs = require('fs');
const https = require('https');
const path = require('path');

// Image URLs for specific chemicals (free for commercial use or stock images)
const imageUrls = {
    // Wastewater treatment chemicals
    'wastewater-treatment-chemicals.jpg': 'https://cdn.pixabay.com/photo/2020/04/19/13/33/chemicals-5063724_1280.jpg',
    
    // Sodium Molybdate
    'sodium-molybdate.jpg': 'https://5.imimg.com/data5/SELLER/Default/2021/12/XO/ZE/JZ/3823480/sodium-molybdate-500x500.jpg',
    
    // HEDP
    'hedp.jpg': 'https://5.imimg.com/data5/SELLER/Default/2022/9/WY/OP/ZJ/155483735/1-hydroxyethylidene-1-1-diphosphonic-acid-hedp-60-500x500.jpg',
    
    // PBTC
    'pbtc.jpg': 'https://5.imimg.com/data5/SELLER/Default/2022/8/QO/KG/HZ/7605616/2-phosphonobutane-1-2-4-tricarboxylic-acid-pbtc-500x500.jpg',
    
    // SHMP (Sodium Hexametaphosphate)
    'shmp.jpg': 'https://5.imimg.com/data5/SELLER/Default/2022/3/UW/RA/QF/150551939/sodium-hexametaphosphate-shmp-500x500.jpg',
    
    // Homopolymer
    'homopolymer.jpg': 'https://5.imimg.com/data5/SELLER/Default/2022/1/HS/ZC/YP/151673312/polyacrylamide-powder-500x500.jpg',
    
    // Copolymer
    'copolymer.jpg': 'https://5.imimg.com/data5/SELLER/Default/2021/12/GD/RP/QI/12593698/anionic-polyacrylamide-500x500.jpg',
    
    // Ter Polymer
    'ter-polymer.jpg': 'https://5.imimg.com/data5/SELLER/Default/2023/7/324788775/IO/PN/ND/13349360/acrylic-ter-polymer-500x500.jpg',
    
    // Benzotriazole
    'benzotriazole.jpg': 'https://5.imimg.com/data5/SELLER/Default/2022/9/RM/TS/RO/162284831/1-2-3-benzotriazole-500x500.jpg'
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

console.log('Started downloading chemical-specific images. This may take a few moments...');

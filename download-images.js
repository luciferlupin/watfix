// Script to download images for WatFix Chemicals website
const fs = require('fs');
const https = require('https');
const path = require('path');

// Image URLs from Unsplash, Pexels, and Pixabay (all free for commercial use)
const imageUrls = {
    'hero-image.png': 'https://images.unsplash.com/photo-1611921561569-0dc52d4253d6?q=80&w=1200&auto=format&fit=crop',  // Water treatment facility
    'about-image.jpg': 'https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=800&auto=format&fit=crop',   // Lab scientist working with chemicals
    'Hb6bb962beaa64c98a87561a3bfb33e35t.jpg_720x720q50.jpg.avif': 'https://example.com/Hb6bb962beaa64c98a87561a3bfb33e35t.jpg_720x720q50.jpg.avif',  // HEDP 60% Water Treatment Chemical
    'PBTC-50-percent.png': 'https://example.com/PBTC-50-percent.png',  // PBTC 50% Water Treatment Chemical
    'sodium-molybdate-di-hydrate.jpg': 'https://example.com/sodium-molybdate-di-hydrate.jpg',  // Sodium Molybdate Dihydrate
    'Waste Water Treatment Chemicals.jpg': 'https://example.com/Waste-Water-Treatment-Chemicals.jpg',  // Waste Water Treatment Chemicals
    'sodium-hexa-meta-phosphate-68--500x500.jpg.webp': 'https://example.com/sodium-hexa-meta-phosphate-68--500x500.jpg.webp',  // Sodium Hexametaphosphate (SHMP)
    '6576b69aba2bb90184.jpg.webp': 'https://example.com/6576b69aba2bb90184.jpg.webp',  // Benzotriazole
    'Black White Simple Quote Instagram Post.png': 'https://example.com/Black-White-Simple-Quote-Instagram-Post.png',  // Homopolymer
    'alack White Simple Quote Instagram Post.png': 'https://example.com/alack-White-Simple-Quote-Instagram-Post.png',  // Co-polymer
    'lack White Simple Quote Instagram Post.png': 'https://example.com/lack-White-Simple-Quote-Instagram-Post.png',  // Ter-polymer
    'Beack White Simple Quote Instagram Post.png': 'https://example.com/Beack-White-Simple-Quote-Instagram-Post.png',  // Quad-polymer
    'ETP-50-percent.png': 'https://example.com/ETP-50-percent.png',  // ETP Plant
    'ZLD-50-percent.png': 'https://example.com/ZLD-50-percent.png',  // ZLD Plant
    'ro plant WhatsApp Image 2025-04-02 at 14.11.40.jpeg': 'https://example.com/ro-plant-WhatsApp-Image-2025-04-02-at-14.11.40.jpeg',  // RO Plant
    'sewage-treatment-plant-stp.png': 'https://example.com/sewage-treatment-plant-stp.png',  // STP Plant
    'mf-water-treatment-plant-500x500.jpg.webp': 'https://example.com/mf-water-treatment-plant-500x500.jpg.webp'  // Ultra and Nano Filtration Plant
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

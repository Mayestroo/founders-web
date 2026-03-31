const fs = require('fs');
const path = require('path');

async function getAudioFiles(directoryPath) {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  const audioFiles = [];
  
  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);
    
    if (entry.isDirectory()) {
      audioFiles.push(...(await getAudioFiles(fullPath)));
      continue;
    }
    
    if (!entry.isFile()) continue;
    
    const ext = path.extname(entry.name).toLowerCase();
    if (['.mp3', '.wav', '.ogg', '.m4a'].includes(ext)) {
      audioFiles.push(fullPath);
    }
  }
  
  return audioFiles;
}

async function generateAudioMaterials() {
  try {
    const data = {};
    const publicRoot = path.join(process.cwd(), 'public');
    const audiosRoot = path.join(publicRoot, 'audios');
    
    if (!fs.existsSync(audiosRoot)) {
      console.log('audios directory not found, skipping generation');
      return;
    }
    
    const levelFolders = fs.readdirSync(audiosRoot, { withFileTypes: true });
    
    for (const levelFolder of levelFolders) {
      if (!levelFolder.isDirectory()) continue;
      
      const name = levelFolder.name.toLowerCase();
      let level = null;
      if (name.includes('upper-intermediate')) level = 'UPPER-INTERMEDIATE';
      else if (name.includes('pre-intermediate')) level = 'PRE-INTERMEDIATE';
      else if (name.includes('beginner')) level = 'BEGINNER';
      else if (name.includes('elementary')) level = 'ELEMENTARY';
      else if (name.includes('intermediate')) level = 'INTERMEDIATE';
      
      let bookType = null;
      if (name.includes('workbook')) bookType = 'WORK BOOKS';
      else if (name.includes('student')) bookType = 'STUDENT BOOKS';
      
      if (!level || !bookType) continue;
      
      const categoryPath = path.join(audiosRoot, levelFolder.name);
      const files = await getAudioFiles(categoryPath);
      
      files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
      
      const tracks = files.map(filePath => {
        const baseName = path.basename(filePath, path.extname(filePath));
        const relativePath = path.relative(publicRoot, filePath);
        const url = '/' + relativePath.split(path.sep).map(s => encodeURIComponent(s)).join('/');
        
        return {
          id: url,
          name: baseName.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim(),
          file: url
        };
      });
      
      if (!data[level]) data[level] = {};
      data[level][bookType] = tracks;
    }
    
    fs.writeFileSync(
      path.join(publicRoot, 'audio-materials.json'),
      JSON.stringify(data, null, 2)
    );
    
    console.log('✓ Generated audio-materials.json');
  } catch (error) {
    console.error('Error generating audio materials:', error);
    process.exit(1);
  }
}

generateAudioMaterials();

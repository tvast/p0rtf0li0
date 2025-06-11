import fs from 'fs/promises';
import path from 'path';

const rootDir = process.cwd();

// Define folder mappings by file extension
const folderMap = {
  html: ['.html'],
  js: ['.js', '.mjs'],
  css: ['.css'],
  img: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'],
  audio: ['.mp3', '.wav', '.ogg'],
  data: ['.json'],
  docs: ['.md', '.txt'],
  // add more if needed
};

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

function getFolderByExt(ext) {
  for (const [folder, exts] of Object.entries(folderMap)) {
    if (exts.includes(ext.toLowerCase())) return folder;
  }
  return null;
}

async function moveFile(file, targetFolder) {
  const targetDir = path.join(rootDir, targetFolder);
  await ensureDir(targetDir);
  const targetPath = path.join(targetDir, path.basename(file));
  await fs.rename(path.join(rootDir, file), targetPath);
  console.log(`Moved ${file} -> ${targetFolder}/`);
}

async function tidy() {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === 'lib') {
        // skip lib folder entirely
        continue;
      }
      // You can optionally tidy subfolders too (not implemented here)
      continue;
    }

    const ext = path.extname(entry.name);
    const folder = getFolderByExt(ext);

    if (folder) {
      await moveFile(entry.name, folder);
    } else {
      console.log(`Skipping unrecognized file: ${entry.name}`);
    }
  }

  console.log('Tidying complete!');
}

tidy().catch(console.error);

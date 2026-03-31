import { promises as fs } from "fs";
import type { Dirent } from "fs";
import path from "path";

export type AudioTrack = {
  id: string;
  name: string;
  file: string;
};

export type AudioMaterialsData = Record<string, Record<string, AudioTrack[]>>;

const AUDIO_EXTENSIONS = new Set([".mp3", ".wav", ".ogg", ".m4a"]);

function resolveLevel(folderName: string): string | null {
  const normalized = folderName.toLowerCase();

  if (normalized.includes("upper-intermediate")) {
    return "UPPER-INTERMEDIATE";
  }

  if (normalized.includes("pre-intermediate")) {
    return "PRE-INTERMEDIATE";
  }

  if (normalized.includes("beginner")) {
    return "BEGINNER";
  }

  if (normalized.includes("elementary")) {
    return "ELEMENTARY";
  }

  if (normalized.includes("intermediate")) {
    return "INTERMEDIATE";
  }

  return null;
}

function resolveBookType(folderName: string): string | null {
  const normalized = folderName.toLowerCase();

  if (normalized.includes("workbook")) {
    return "WORK BOOKS";
  }

  if (normalized.includes("student")) {
    return "STUDENT BOOKS";
  }

  return null;
}

async function getAudioFiles(directoryPath: string): Promise<string[]> {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const audioFiles: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      audioFiles.push(...(await getAudioFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (AUDIO_EXTENSIONS.has(extension)) {
      audioFiles.push(fullPath);
    }
  }

  return audioFiles;
}

function toPublicUrl(filePath: string, publicRoot: string): string {
  const relativePath = path.relative(publicRoot, filePath);
  const encodedPath = relativePath
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/${encodedPath}`;
}

function formatTrackName(fileName: string): string {
  return fileName
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getAudioMaterialsData(
  projectRoot: string = process.cwd(),
): Promise<AudioMaterialsData> {
  const data: AudioMaterialsData = {};
  const publicRoot = path.join(projectRoot, "public");
  const audiosRoot = path.join(publicRoot, "audios");

  let levelFolders: Dirent[] = [];
  try {
    levelFolders = await fs.readdir(audiosRoot, { withFileTypes: true });
  } catch {
    return data;
  }

  for (const levelFolder of levelFolders) {
    if (!levelFolder.isDirectory()) {
      continue;
    }

    const level = resolveLevel(levelFolder.name);
    const bookType = resolveBookType(levelFolder.name);

    if (!level || !bookType) {
      continue;
    }

    const categoryPath = path.join(audiosRoot, levelFolder.name);
    const files = await getAudioFiles(categoryPath);

    files.sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }),
    );

    const tracks: AudioTrack[] = files.map((filePath) => {
      const baseName = path.basename(filePath, path.extname(filePath));
      const url = toPublicUrl(filePath, publicRoot);

      return {
        id: url,
        name: formatTrackName(baseName),
        file: url,
      };
    });

    if (!data[level]) {
      data[level] = {};
    }

    data[level][bookType] = tracks;
  }

  return data;
}

import ExpoFileSystem from './ExpoFileSystem';
import { Path } from './FileSystem.types';
import { dirname, extname, join } from './path';

export class File extends ExpoFileSystem.FileSystemFile {
  constructor(path: Path) {
    super(path);
    this.validatePath();
  }
  /*
   * Directory containing the file.
   */
  get parentDirectory() {
    return new Directory(dirname(this.path));
  }
  /*
   * File extension (with the dot).
   */
  get extension() {
    return extname(this.path);
  }
}

// Cannot use `static` keyword in class declaration because of a runtime error.
File.downloadFileAsync = async function downloadFileAsync(url: string, to: File | Directory) {
  const outputPath = await ExpoFileSystem.downloadFileAsync(url, to);
  return new File(outputPath);
};

export class Directory extends ExpoFileSystem.FileSystemDirectory {
  constructor(path: Path) {
    super(path);
    this.validatePath();
  }
  /*
   * Directory containing the file.
   */
  get parentDirectory() {
    return new Directory(join(this.path, '..'));
  }
}

// consider module functions as API alternative
export async function write(file: File, contents: string) {
  return file.write(contents);
}

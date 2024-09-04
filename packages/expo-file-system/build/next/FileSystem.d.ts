import ExpoFileSystem from './ExpoFileSystem';
import { Path } from './FileSystem.types';
export declare class File extends ExpoFileSystem.FileSystemFile {
    constructor(path: Path);
    get parentDirectory(): Directory;
    get extension(): string;
}
export declare class Directory extends ExpoFileSystem.FileSystemDirectory {
    constructor(path: Path);
    get parentDirectory(): Directory;
}
export declare function write(file: File, contents: string): Promise<void>;
//# sourceMappingURL=FileSystem.d.ts.map
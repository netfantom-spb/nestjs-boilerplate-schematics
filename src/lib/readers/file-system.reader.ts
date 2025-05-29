import * as fs from 'fs';
import * as path from 'path';
import { Reader } from './reader';

export class FileSystemReader implements Reader {
  constructor(private readonly directory: string) {}

  public list(): Promise<string[]> {
    return fs.promises.readdir(this.directory);
  }

  public read(name: string): Promise<string> {
    return fs.promises.readFile(path.join(this.directory, name), 'utf8');
  }

  public readSync(name: string): string {
    return fs.readFileSync(path.join(this.directory, name), 'utf8');
  }

  public async readAnyOf(filenames: string[]): Promise<string | undefined> {
    try {
      for (const file of filenames) {
        return await this.read(file);
      }
    } catch {
      return filenames.length > 0
        ? await this.readAnyOf(filenames.slice(1, filenames.length))
        : undefined;
    }
  }

  public readSyncAnyOf(filenames: string[]): string | undefined {
    try {
      for (const file of filenames) {
        return this.readSync(file);
      }
    } catch {
      return filenames.length > 0
        ? this.readSyncAnyOf(filenames.slice(1, filenames.length))
        : undefined;
    }
  }
}

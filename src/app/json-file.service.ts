import { Injectable } from '@angular/core';
import { JsonFile } from './json-file';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonFileService {
  private _files : JsonFile[]  = []
  private _fileSubject = new ReplaySubject<JsonFile>();

  constructor() { }

  public addFile(fileName: string, text: string){
    let file: JsonFile = {
      fileName: fileName,
      text: text,
      id: this._files.length + 1
    };
    this._files.push(file);
    this._fileSubject.next(file);
  }

  public getFiles(): JsonFile[]{
    return this._files;
  }

  public getFile(id: number){
    let file = this._files.find(elem => elem.id == id);
    return file;
  }

  public getObservable(): Observable<JsonFile>{
    return this._fileSubject.asObservable();
  }
}

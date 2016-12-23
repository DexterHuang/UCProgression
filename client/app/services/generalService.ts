import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GeneralService {
  constructor(private http:Http){
    console.log('General Service Initialized...');
  }

  getObjectList(name:string){
    return this.http.get('/Gapi/find/' + name)
    .map(res => res.json());
  }

  addObject(name:string, obj: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/Gapi/save/' + name,
    JSON.stringify(obj), {headers: headers})
    .map(res => res.json());
  }

  deleteObject(name:string, id: string){
    return this.http.delete('/Gapi/remove/' + name + '/' + id)
    .map(res => res.json());
  }

  updateObject(name:string, obj:any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/Gapi/' +name+ '/' + obj._id,
    JSON.stringify(obj), {headers: headers})
    .map(res => res.json());
  }
}

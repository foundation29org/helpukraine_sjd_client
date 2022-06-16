import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge, mergeMap, concatMap } from 'rxjs/operators'

@Injectable()
export class ApiDx29ServerService {
    constructor(private http: HttpClient) {}

    getSymptoms(id){
      return this.http.get(environment.api+'/api/phenotypes/'+id)
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
           return err;
         })
    }
    
    getDetectLanguage(text){
      var jsonText = [{ "text": text }];
        return this.http.post(environment.api+'/api/getDetectLanguage', jsonText)
        .map( (res : any) => {
            return res;
        }, (err) => {
            console.log(err);
            return err;
        })
    }

    createblobOpenDx29(symptoms) {
      return this.http.post(environment.api + '/api/blobOpenDx29', symptoms)
        .map((res: any) => {
          return res;
        }, (err) => {
          console.log(err);
          return err;
        })
    }

    createblobOpenDx29Timeline(symptoms) {
      return this.http.post(environment.api + '/api/blobOpenDx29Timeline', symptoms)
        .map((res: any) => {
          return res;
        }, (err) => {
          console.log(err);
          return err;
        })
    }

    chekedSymptomsOpenDx29(info) {
      return this.http.post(environment.api + '/api/chekedSymptomsOpenDx29', info)
        .map((res: any) => {
          return res;
        }, (err) => {
          console.log(err);
          return err;
        })
    }

    getblob(patientId, blobName){
      var jsonText = { "patientId": patientId, "blobName": blobName };
        return this.http.post(environment.api+'/api/getblob', jsonText)
        .map( (res : any) => {
            return res;
        }, (err) => {
            console.log(err);
            return err;
        })
    }

    loadGroups() {
      return this.http.get(environment.api+'/api/groupsnames/')
      .map( (res : any) => {
        return res;
       }, (err) => {
        console.log(err);
        return err;
       });
    }

}

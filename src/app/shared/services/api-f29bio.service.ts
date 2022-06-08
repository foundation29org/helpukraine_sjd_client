import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge, mergeMap, concatMap } from 'rxjs/operators'
import { OVERLAY_KEYBOARD_DISPATCHER_PROVIDER } from '@angular/cdk/overlay/keyboard/overlay-keyboard-dispatcher';

@Injectable()
export class Apif29BioService {

    constructor(private http: HttpClient) {}

    getInfoSymptomsJSON(listIds,json){
        return new Observable((observer)=>{
            var listFound=[];
            for(var k=0;k<listIds.length;k++){
                listFound.push(json.filter(function(hpoInfo){
                if( hpoInfo.id == listIds[k]){
                    return hpoInfo;
                }}))
            }
            observer.next(JSON.parse(JSON.stringify(listFound)));
        })

    }
    
    callTextAnalytics(textf){
        return this.http.post(environment.api+'/api/callTextAnalytics', textf)
        .map( (res : any) => {
            return res;
        }, (err) => {
            console.log(err);
            return err;
        })
    }

    getTranslationDictionary2(lang,info){
        var body = {lang:lang, info: info}
          return this.http.post(environment.api+'/api/Translation/document/translate2', body)
          .map( (res : any) => {
              return res;
          }, (err) => {
              console.log(err);
              return err;
          })
      }

}

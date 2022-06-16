import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { SortService} from 'app/shared/services/sort.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs/Subscription';
import { ApiDx29ServerService } from 'app/shared/services/api-dx29-server.service';
import { Observable } from 'rxjs/Observable';
import {DateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  providers: [ApiDx29ServerService]
})
export class SupportComponent implements OnDestroy{

  private subscription: Subscription = new Subscription();
  uploadProgress: Observable<number>;
  totalSize: number = 0;
  msgList: any = [];
  timeformat="";
  groupId: any;
  lang: any;

  constructor(private http: HttpClient, private translate : TranslateService, private authService: AuthService, private authGuard: AuthGuard, public toastr: ToastrService, private sortService: SortService, private adapter: DateAdapter<any>, private apiDx29ServerService: ApiDx29ServerService) {

    this.initVars();
    this.lang = this.authService.getLang()

  }

  initVars(){
    this.adapter.setLocale(this.authService.getLang());
    switch(this.authService.getLang()){
      case 'en':
        this.timeformat="M/d/yy";
        break;
      case 'es':
          this.timeformat="d/M/yy";
          break;
      case 'nl':
          this.timeformat="d-M-yy";
          break;
      default:
          this.timeformat="M/d/yy";
          break;

    }
    this.loadGroupId();
  }

  loadGroupId(){
    this.subscription.add( this.http.get(environment.api+'/api/group/'+this.authService.getGroup())
      .subscribe( (resGroup : any) => {
        this.groupId = resGroup._id;
        this.loadMsg();
      }, (err) => {
        console.log(err);
    }));
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadMsg(){
    if(this.authGuard.testtoken()){
    var data = {groupId: this.groupId}
    this.subscription.add( this.http.post(environment.api+'/api/support/all/'+this.authService.getIdUser(), data)
      .subscribe( (res : any) => {
        res.listmsgs.sort(this.sortService.DateSort("date"));
        this.msgList = res.listmsgs;
       }, (err) => {
         console.log(err);
         this.toastr.error('', this.translate.instant("generics.error try again"));
       }));

    }
  }

  goToLink(msg){
    var description = msg.description.replace(/\n/g, "%0A")
    var url = 'https://translate.google.com/?hl=en&sl=uk&tl='+this.lang+'&text=Subject:%0A'+msg.subject+'%0A%0AMessage:%0A'+description+'&op=translate'
      window.open(url, "_blank");
  }

  fieldStatusChanged(msg){
    msg.statusDate = Date.now();
    this.subscription.add( this.http.put(environment.api+'/api/support/'+msg._id, msg)
    .subscribe( (res : any) => {
      //this.loadMsg();
      this.toastr.success('', this.translate.instant("generics.Data saved successfully"));
     }, (err) => {
       console.log(err.error);
       if(err.error.message=='Token expired' || err.error.message=='Invalid Token'){
         this.authGuard.testtoken();
       }else{
         this.toastr.error('', this.translate.instant("generics.error try again"));
       }
     }));
  }

}

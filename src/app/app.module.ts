import * as $ from 'jquery';
import { NgModule ,LOCALE_ID  } from '@angular/core';
import es from '@angular/common/locales/es'
import ru from '@angular/common/locales/ru'
import uk from '@angular/common/locales/uk'
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);
registerLocaleData(ru);
registerLocaleData(uk);
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
  } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { LandPageLayoutComponent } from "./layouts/land-page/land-page-layout.component";

import { AuthService } from './shared/auth/auth.service';
import { TokenService } from './shared/auth/token.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { RoleGuard } from './shared/auth/role-guard.service';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { DatePipe } from '@angular/common';
import { DateService } from 'app/shared/services/date.service';
import { SearchFilterPipe } from 'app/shared/services/search-filter.service';
import { HighlightSearch } from 'app/shared/services/search-filter-highlight.service';
import { TextTransform } from 'app/shared/services/transform-text.service';
import { LocalizedDatePipe } from 'app/shared/services/localizedDatePipe.service';
import { SortService } from 'app/shared/services/sort.service';
import { SearchService } from 'app/shared/services/search.service';
import { EventsService } from 'app/shared/services/events.service';
import { DialogService } from 'app/shared/services/dialog.service';
import { Data } from 'app/shared/services/data.service';
import { environment } from 'environments/environment';
import { BlobStorageService } from 'app/shared/services/blob-storage.service';
import { BlobStoragePedService } from 'app/shared/services/blob-storage-ped.service';
import { BlobStorageSupportService } from 'app/shared/services/blob-storage-support.service';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgxHotjarModule } from 'ngx-hotjar';
import {GoogleAnalyticsService} from './shared/services/google-analytics.service';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';


const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#005bbb'
    },
    button: {
      background: '#ffd500'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
  };

  export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
  }


  @NgModule({
    declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, LandPageLayoutComponent, SearchFilterPipe, HighlightSearch, TextTransform, LocalizedDatePipe],
    imports: [
      CommonModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      SharedModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      NgbModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
      AgmCoreModule.forRoot({
        apiKey: environment.googlemapkey,
        language: sessionStorage && sessionStorage.getItem('lang') || 'en'
      }),
      Angulartics2Module.forRoot(),
      PerfectScrollbarModule,
      NgxHotjarModule.forRoot(environment.hotjarSiteId),
      NgcCookieConsentModule.forRoot(cookieConfig)
    ],
    providers: [
      AuthService,
      TokenService,
      AuthGuard,
      RoleGuard,
      {
        provide : HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi   : true
      },
      DatePipe,
      DateService,
      SearchFilterPipe,
      HighlightSearch,
      TextTransform,
      LocalizedDatePipe,
      { provide: LOCALE_ID, useValue: 'es-ES' },
      SortService,
      SearchService,
      EventsService,
      DialogService,
      Data,
      BlobStorageService,
      BlobStoragePedService,
      BlobStorageSupportService,
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },
      { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
      GoogleAnalyticsService
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {}

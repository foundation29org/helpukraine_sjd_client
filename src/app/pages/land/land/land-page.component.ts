import { Component, OnInit } from '@angular/core';
import { EventsService } from 'app/shared/services/events.service';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TermsConditionsPageComponent } from "../../content-pages/terms-conditions/terms-conditions-page.component";

@Component({
    selector: 'app-land-page',
    templateUrl: './land-page.component.html',
    styleUrls: ['./land-page.component.scss'],
})

export class LandPageComponent implements OnInit {
    isApp: boolean = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1 && location.hostname != "localhost" && location.hostname != "127.0.0.1";
    iconjsd: string = 'assets/img/land/logos/sjd_en.png';
    iconmoh: string = 'assets/img/land/logos/MoH_en.png';
    lang: string = 'en';
    modalReference: NgbModalRef;

    constructor(private eventsService: EventsService, private modalService: NgbModal) {
        this.lang = sessionStorage.getItem('lang');
        if (this.lang == 'uk') {
            this.iconmoh = 'assets/img/land/logos/MoH_uk.png';
        }else{
            this.iconmoh = 'assets/img/land/logos/MoH_en.png';
        }
        if (this.lang == 'es') {
            this.iconjsd = 'assets/img/land/logos/sjd_es.png';
        } else {
            this.iconjsd = 'assets/img/land/logos/sjd_en.png';
        }
    }

    ngOnInit() {

        this.eventsService.on('changelang', function (lang) {
            this.lang = lang;
            if (this.lang == 'uk') {
                this.iconmoh = 'assets/img/land/logos/MoH_uk.png';
            }else{
                this.iconmoh = 'assets/img/land/logos/MoH_en.png';
            }
            if (this.lang == 'es') {
                this.iconjsd = 'assets/img/land/logos/sjd_es.png';
            } else {
                this.iconjsd = 'assets/img/land/logos/sjd_en.png';
            }
        }.bind(this));

    }

    openWeb() {
        if (this.lang == 'es') {
            window.open('https://www.foundation29.org', '_blank');
        } else {
            window.open('https://www.foundation29.org/en/', '_blank');
        }
    }

    goTo() {
        document.getElementById('waysoptions').scrollIntoView(true);
    }

    openModal(panel) {
        let ngbModalOptions: NgbModalOptions = {
            keyboard: false,
            backdrop: 'static',
            windowClass: 'ModalClass-sm'// xl, lg, sm
        };
        this.modalReference = this.modalService.open(panel, ngbModalOptions);
    }

    closeModal() {
        if (this.modalReference != undefined) {
            this.modalReference.close()
        }
    }

    openTerms() {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'ModalClass-sm'
        };
        this.modalReference = this.modalService.open(TermsConditionsPageComponent, ngbModalOptions);
      }

}

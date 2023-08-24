import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {trigger, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('dancingText', [
      transition('* => *', [
        animate('10s', keyframes([
          style({ transform: 'translateY(0) rotate(0)', offset: 0 }),
          style({ transform: 'translateY(-10px) rotate(-5deg)', offset: 0.25 }),
          style({ transform: 'translateY(0) rotate(0)', offset: 0.5 }),
          style({ transform: 'translateY(10px) rotate(5deg)', offset: 0.75 }),
          style({ transform: 'translateY(0) rotate(0)', offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class HomeComponent {

  @ViewChild('aboutModal') aboutModal: any;
  constructor(private  route:Router,private modalService: NgbModal) {
  }

  gotoGame(){
    this.route.navigate(['/game']).then(() =>{

    } )

  }
  openAboutModal() {
    this.modalService.open(this.aboutModal, { centered: true });
  }

}

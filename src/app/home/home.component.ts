import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgPath = '../assets/contact_lenses_homepage.jpg';
  alt = 'Contact me logo';

  constructor() {
  }

  ngOnInit() {
  }
}

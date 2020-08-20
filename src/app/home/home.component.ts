import {Component, OnInit} from '@angular/core';
import {CatServiceService} from '../service/cat-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imgPath = '../assets/ContactMe.jpg';
  alt = 'Contact me logo';

  catImg = null;

  constructor(private catService: CatServiceService) {
  }

  ngOnInit() {
  }

  onClick() {
    this.catService.getCat().subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.catImg = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}

import { Component } from '@angular/core';
import { CatServiceService } from '../service/cat-service.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent {
  catImageUrl: string = '';
  isImageVisible: boolean = false;

  constructor(private catService: CatServiceService) {}

  getNewCat() {
    this.isImageVisible = false;
    this.catService.getCat().subscribe((response: any) => {
      this.catImageUrl = response[0].url;
      // Add a small delay to ensure the image is loaded before showing it
      setTimeout(() => {
        this.isImageVisible = true;
      }, 100);
    });
  }
} 
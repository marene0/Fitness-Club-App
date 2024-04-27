import { Component } from '@angular/core';
import { CarouselResponsiveOptions } from 'primeng/carousel';
@Component({
  selector: 'app-scroll-block',
  templateUrl: './scroll-block.component.html',
  styleUrl: './scroll-block.component.scss'
})
export class ScrollBlockComponent {

  imageUrls: string[] = [
    'assets/image/default_photo.jpg',
    'assets/image/big_photo.jpg',
    'assets/image/default_photo.jpg',
    'assets/image/first_photo.jpg',
    'assets/image/small_photo.jpg'
  ];
  name: string[] = [
    'assets/image/default_photo.jpg',
    'assets/image/big_photo.jpg',
    'assets/image/default_photo.jpg',
    'assets/image/first_photo.jpg',
    'assets/image/small_photo.jpg'];

  item: string = this.imageUrls[5];
  responsiveOptions: CarouselResponsiveOptions[] | undefined;

  getSeverity(inventoryStatus: any) {
    return undefined;
  }
}

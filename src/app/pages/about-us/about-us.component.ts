import { Component } from '@angular/core';
import { Cards } from 'src/app/models/cards';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  cards: Cards[] = [
    new Cards("./assets/about-us/albaricoque.png","Alba Carranza","full stack developer"),
    new Cards("./assets/about-us/IMG_4465 1.png","Roberto Melero","full stack developer"),
    new Cards("./assets/about-us/dani 1.png","Dani Valverde","full stack developer"),
    new Cards("./assets/about-us/leo 1.png","Leo Rosales","full stack developer"),
    new Cards("./assets/about-us/Maritere 1.png","Teresa de Miguel","full stack developer"),
    new Cards("./assets/about-us/alrx 1.png","Alejandro Planelles","full stack developer"),
  ]
}

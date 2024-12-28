import { Component } from '@angular/core';
import { AsideComponent } from "../aside.component";

@Component({
  selector: 'app-home-aside',
  standalone: true,
  imports: [AsideComponent],
  templateUrl: './home-aside.component.html',
  styleUrl: './home-aside.component.css'
})
export class HomeAsideComponent {

}

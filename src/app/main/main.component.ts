import { Component } from '@angular/core';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [QuestionComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}

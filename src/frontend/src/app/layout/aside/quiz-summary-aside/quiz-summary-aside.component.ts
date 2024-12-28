import { Component } from '@angular/core';
import { AsideComponent } from "../aside.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-quiz-summary-aside',
  standalone: true,
  imports: [AsideComponent, RouterLink],
  templateUrl: './quiz-summary-aside.component.html',
  styleUrl: './quiz-summary-aside.component.css'
})
export class QuizSummaryAsideComponent {

}

import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { HomeAsideComponent } from '../aside/home-aside/home-aside.component';
import { QuizComponent } from "../main/quiz/quiz.component";
import { QuizListService } from '../../quiz-list.service';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeAsideComponent,
    FooterComponent,
    QuizComponent
],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {
  constructor(private quizListService: QuizListService) {
  }

  public getQuizList(): string[] {
    return this.quizListService.getQuizes().map(quiz => quiz.title);
  }
}

import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { HomeAsideComponent } from '../aside/home-aside/home-aside.component';
import { QuizComponent } from "../main/quiz/quiz.component";
import { QuizListService } from '../../quiz-list.service';
import { CurrentQuizService } from '../../current-quiz.service';
import { CreateQuizService } from '../../create-quiz.service';

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
  constructor(private quizListService: QuizListService,
              private currentQuizService: CurrentQuizService,
              private createQuizService: CreateQuizService
  ) {
    this.currentQuizService.stopQuiz();
    this.createQuizService.stopEditing();
  }

  public getQuizList(): {id: number, title: string}[] {
    return this.quizListService.getQuizes().map(quiz => {
      return {
        id: quiz.id,
        title: quiz.title
      }
    });
  }
}

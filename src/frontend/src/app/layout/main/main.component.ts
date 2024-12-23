import { Component, inject, Input } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizListService } from '../../quiz-list.service';
import { CurrentQuestion, CurrentQuizService } from '../../current-quiz.service';
import { Mode } from '../layout.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [QuestionComponent, QuizComponent, CreateQuizComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @Input() mode: Mode = Mode.Home;
  @Input() currentQuestionUrlId: number = -1;
  private currentQuizService: CurrentQuizService;
  private quizListService: QuizListService;

  constructor() {
    this.currentQuizService = inject(CurrentQuizService);
    this.quizListService = inject(QuizListService);
  }

  public getCurrentQuestion(): CurrentQuestion {
    return this.currentQuizService.getCurrentQuiz()!.currentQuestionList[this.currentQuestionUrlId-1];
  }

  public getQuizList(): string[] {
    return this.quizListService.getQuizes().map(quiz => quiz.title);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentQuestion, CurrentQuiz, CurrentQuizService } from '../../current-quiz.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SolveQuizAsideComponent } from '../aside/solve-quiz-aside/solve-quiz-aside.component';
import { QuestionComponent } from '../main/question/question.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    QuestionComponent,
    SolveQuizAsideComponent, 
    FooterComponent
  ],
  templateUrl: './solve-quiz-layout.component.html',
  styleUrl: './solve-quiz-layout.component.css'
})
export class SolveQuizLayoutComponent {
  currentQuestionUrlId: number = -1;
  currentQuiz?: CurrentQuiz;

  constructor(private route: ActivatedRoute,
              private currentQuizService: CurrentQuizService) {

    this.route.url.subscribe(url => {
      const quizUrlId : number = +url[1];
      this.currentQuestionUrlId = +url[2];
      this.currentQuiz = this.currentQuizService.getCurrentQuiz();
      if (this.currentQuiz === undefined) {
        this.currentQuizService.startQuiz(quizUrlId - 1);
        this.currentQuiz = this.currentQuizService.getCurrentQuiz();
      }
    });
  }

  public getCurrentQuizTitle(): string {
    return this.currentQuizService.getCurrentQuiz()!.title;
  
  }

  public getCurrentQuestion(): CurrentQuestion {
    return this.currentQuizService.getCurrentQuiz()!.currentQuestionList[this.currentQuestionUrlId-1];
  }

  public getCurrentQuiz(): CurrentQuiz {
    return this.currentQuiz!;
  }
}

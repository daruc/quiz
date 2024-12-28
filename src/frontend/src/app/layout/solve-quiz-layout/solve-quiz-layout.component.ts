import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateQuizService } from '../../create-quiz.service';
import { CurrentQuiz, CurrentQuizService } from '../../current-quiz.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from '../main/main.component';
import { SolveQuizAsideComponent } from '../aside/solve-quiz-aside/solve-quiz-aside.component';

export enum Mode {
  Home = "Home",
  Quiz = "Quiz",
  Create = "Create"
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent, 
    SolveQuizAsideComponent, 
    FooterComponent
  ],
  templateUrl: './solve-quiz-layout.component.html',
  styleUrl: './solve-quiz-layout.component.css'
})
export class SolveQuizLayoutComponent {
  currentQuestionUrlId: number = -1;
  currentQuiz?: CurrentQuiz;
  mode: Mode = Mode.Home;

  constructor(private route: ActivatedRoute,
      private currentQuizService: CurrentQuizService,
      private createQuizService: CreateQuizService) {

    this.route.url.subscribe(url => {
      if (url.length == 0) {
        this.mode = Mode.Home;
        createQuizService.stopEditing();
      } else {
        switch (url[0].path) {
          case 'create':
            this.mode = Mode.Create;
            createQuizService.startEditing();
            break;
          case 'edit':
            this.mode = Mode.Create;
            const quizIdToEdit: number = Number(url[1]) - 1;
            createQuizService.startEditing(quizIdToEdit);
            break;
          case 'quiz':
            this.mode = Mode.Quiz;
            createQuizService.stopEditing();
            break;
        }
      }

      if (url.length < 3) {
        currentQuizService.stopQuiz();
        this.currentQuestionUrlId = -1;
        return;
      }

      const quizId: number = Number(url[1]) - 1;
      this.currentQuestionUrlId = Number(url[2]);
      currentQuizService.startQuiz(quizId);
      console.log('set current quizId=', quizId);
      console.log('set current currentQuestionUrlId=', this.currentQuestionUrlId);
      this.currentQuiz = this.currentQuizService.getCurrentQuiz();
    });
  }

  public getCurrentQuizTitle(): string {
    switch (this.mode) {
      case Mode.Home:
        return 'Select quiz';
      case Mode.Create:
        return 'Create quiz';
      case Mode.Quiz:
        return this.currentQuizService.getCurrentQuiz()!.title;
    }
  }
}

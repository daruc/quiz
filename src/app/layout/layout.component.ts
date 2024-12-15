import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { CurrentQuiz, CurrentQuizService } from '../current-quiz.service';

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
    AsideComponent, 
    FooterComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  currentQuestionUrlId: number = -1;
  currentQuiz?: CurrentQuiz;
  mode: Mode = Mode.Home;

  constructor(private route: ActivatedRoute, private currentQuizService: CurrentQuizService) {
    this.route.url.subscribe(url => {
      if (url.length == 0) {
        this.mode = Mode.Home;
      } else {
        switch (url[0].path) {
          case 'create':
            this.mode = Mode.Create;
            break;
          case 'quiz':
            this.mode = Mode.Quiz;
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

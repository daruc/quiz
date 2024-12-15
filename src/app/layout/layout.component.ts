import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { CurrentQuiz, CurrentQuizService } from '../current-quiz.service';

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

  constructor(private route: ActivatedRoute, private currentQuizService: CurrentQuizService) {
    this.route.url.subscribe(url => {
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
    const currentQuiz: CurrentQuiz | undefined = this.currentQuizService.getCurrentQuiz();
    if (currentQuiz) {
      return currentQuiz.title;
    }
    return 'Select quiz';
  }
}

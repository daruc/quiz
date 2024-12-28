import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateQuizService } from '../../create-quiz.service';
import { CurrentQuiz, CurrentQuizService } from '../../current-quiz.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CreateQuizAsideComponent } from '../aside/create-quiz-aside/create-quiz-aside.component';
import { CreateQuizComponent } from "../main/create-quiz/create-quiz.component";


@Component({
  selector: 'app-create-quiz-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    CreateQuizAsideComponent,
    FooterComponent,
    CreateQuizComponent
],
  templateUrl: './create-quiz-layout.component.html',
  styleUrl: './create-quiz-layout.component.css'
})
export class CreateQuizLayoutComponent {

  constructor(private route: ActivatedRoute,
      private createQuizService: CreateQuizService) {

    this.route.url.subscribe(url => {
        if (url[0].path === 'edit') {
          const quizId: number = +url[1].path - 1;
          createQuizService.startEditing(quizId);
        } else if (url[0].path === 'create') {
          createQuizService.startEditing();
        }
    });
  }
}

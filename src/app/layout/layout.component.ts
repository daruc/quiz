import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../questions.service';

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
  constructor(private route: ActivatedRoute, private questionsService: QuestionsService) {
    this.route.url.subscribe(url => {
      const quizId: number = Number(url[1]) - 1;
      const questionId: number = Number(url[2]) - 1;
      questionsService.setCurrentQuiz(quizId);
      questionsService.setCurrentQuestion(questionId);
    });
  }
}

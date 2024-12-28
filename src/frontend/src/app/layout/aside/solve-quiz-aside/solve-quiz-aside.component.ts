import { Component, inject, Input } from '@angular/core';
import { AsideComponent } from '../aside.component';
import { CurrentQuiz, CurrentQuizService, QuizResult } from '../../../current-quiz.service';
import { CreateQuizService } from '../../../create-quiz.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-solve-quiz-aside',
  standalone: true,
  imports: [AsideComponent, RouterLink, RouterLinkActive],
  templateUrl: './solve-quiz-aside.component.html',
  styleUrl: './solve-quiz-aside.component.css'
})
export class SolveQuizAsideComponent {
  @Input() currentQuiz: CurrentQuiz | undefined;


  constructor(private currentQuizService: CurrentQuizService,
    private createQuizService: CreateQuizService) {

  currentQuizService = inject(CurrentQuizService);
}

  public getQuestionLabelList(): string[] {
    const labels: string[] = [];
    for (let i = 1; i <= this.currentQuiz!.currentQuestionList.length; ++i) {
      labels.push(i.toString());
    }
    return labels;
  }

  public getCurrentQuizUrlId() {
    return this.currentQuiz!.id + 1;
  }

  public finishQuiz() {
    let quizResultMsg = this.currentQuiz!.title + '\n'
    const quizResult: QuizResult = this.currentQuizService.rateEntire();
    const questionResultMsg = quizResult.questionResultList.map(questionResult => 
      (questionResult.id + 1) + ': ' + questionResult.selectedCorrect + '/' + questionResult.maxCorrect
    ).reduce((acc, cur) => acc + cur + '\n', '');
    quizResultMsg += questionResultMsg;
    window.alert(quizResultMsg);
  }
}

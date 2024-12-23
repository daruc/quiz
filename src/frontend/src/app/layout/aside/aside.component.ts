import { Component, inject, Input } from '@angular/core';
import { CurrentQuiz, CurrentQuizService, QuizResult } from '../../current-quiz.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Mode } from '../layout.component';
import { CreateQuizService } from '../../create-quiz.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  @Input() mode: Mode = Mode.Home;
  @Input() currentQuiz: CurrentQuiz | undefined;

  constructor(private currentQuizService: CurrentQuizService,
      private createQuizService: CreateQuizService) {

    currentQuizService = inject(CurrentQuizService);
  }

  public isQuizSelected(): boolean {
    return this.currentQuiz !== undefined;
  }

  public getQuizTitle(): string {
    return this.currentQuiz!.title;
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

  public saveNewQuiz() {
    this.createQuizService.saveQuiz();
  }
}

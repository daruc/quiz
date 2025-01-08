import { Component, computed, inject, Input, Signal } from '@angular/core';
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
  startDate: number;
  timeLeft: string = '';
  interval;

  constructor(private currentQuizService: CurrentQuizService,
    private createQuizService: CreateQuizService) {

  currentQuizService = inject(CurrentQuizService);

  this.startDate = Date.now();

  this.interval = setInterval(() => {
    const timeLeftMs: number = this.startDate + 10 * 1000 - Date.now();
    const timeLeftSec: number = Math.round(timeLeftMs / 1000);
    const timeLeftMin: number = Math.floor(timeLeftSec / 60);
    const timeLeftSecRemainder: number = timeLeftSec - timeLeftMin;
    if (timeLeftMin <= 0 && timeLeftSecRemainder <= 0) {
      clearInterval(this.interval);
    }
    this.timeLeft = `${timeLeftMin}m ${timeLeftSecRemainder}s`;
  }, 1000);
}

  public getQuestionLabelList(): string[] {
    const labels: string[] = [];
    for (let i = 1; this.currentQuiz && i <= this.currentQuiz.currentQuestionList.length; ++i) {
      labels.push(i.toString());
    }
    return labels;
  }

  public getCurrentQuizId(): number {
    return this.currentQuiz!.id;
  }

  public getTimeLeft(): string {
    return this.timeLeft;
  }
}

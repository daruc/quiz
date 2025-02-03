import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AsideComponent } from '../aside.component';
import { CurrentQuiz, CurrentQuizService, QuizResult } from '../../../current-quiz.service';
import { CreateQuizService } from '../../../create-quiz.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-solve-quiz-aside',
  standalone: true,
  imports: [AsideComponent, RouterLink, RouterLinkActive],
  templateUrl: './solve-quiz-aside.component.html',
  styleUrl: './solve-quiz-aside.component.css'
})
export class SolveQuizAsideComponent implements OnChanges {
  @Input() currentQuiz: CurrentQuiz | undefined;
  startDate: number;
  timeLeft: string = '';
  interval;

  constructor(private currentQuizService: CurrentQuizService,
    private createQuizService: CreateQuizService,
    private router: Router) {

    this.startDate = Date.now();
    this.initTimeLeft();
    this.interval = setInterval(() => this.refreshTimeLeft(), 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTimeLeft();
  }

  private initTimeLeft(): void {
    console.log('initTimeLeft');
    if (this.currentQuiz) {
      const timeLeftMs: number = this.currentQuiz.timeLeftSec * 1000;
      const timeLeftSec: number = Math.round(timeLeftMs / 1000);
      const timeLeftMin: number = Math.floor(timeLeftSec / 60);
      const timeLeftSecRemainder: number = timeLeftSec - timeLeftMin * 60;
      this.timeLeft = `${timeLeftMin}m ${timeLeftSecRemainder}s`;
    }
  }

  private refreshTimeLeft(): void {
    if (this.currentQuiz) {
      const timeLeftMs: number = this.startDate + this.currentQuiz.timeLeftSec * 1000 - Date.now();
      const timeLeftSec: number = Math.round(timeLeftMs / 1000);
      const timeLeftMin: number = Math.floor(timeLeftSec / 60);
      const timeLeftSecRemainder: number = timeLeftSec - timeLeftMin * 60;
      if (timeLeftMin <= 0 && timeLeftSecRemainder <= 0) {
        clearInterval(this.interval);
        this.router.navigate(['/summary']);
      }
      this.timeLeft = `${timeLeftMin}m ${timeLeftSecRemainder}s`;
    }
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

  public isTimeLimit(): boolean {
    return this.currentQuiz?.timeLeftSec === 0;
  }
}

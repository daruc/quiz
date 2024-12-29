import { Component, Input } from '@angular/core';
import { CurrentQuestion, CurrentQuiz } from '../../../current-quiz.service';
import { MainComponent } from "../main.component";
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MainComponent, RouterLink],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @Input() currentQuestion?: CurrentQuestion;
  @Input() currentQuiz?: CurrentQuiz;

  constructor(private router: Router) {

  }

  public selectAnswer(event: Event): void {
    const answerId: number = +(<HTMLInputElement>event.target).id;
    const isChecked = (<HTMLInputElement>event.target).checked;
    console.log('select answerId', answerId, 'isChecked', isChecked, 'questionId=', this.currentQuestion?.id);
    const currentAnswerList = this.currentQuestion!.currentAnswerList;
    if (this.currentQuestion?.type === 'radio') {
      currentAnswerList.forEach(ca => ca.checked = false);
    }
    currentAnswerList.find(currentAnswer => currentAnswer.id === answerId)!.checked = isChecked;
  }

  public getQuestionsCount(): number {
    if (this.currentQuiz) {
      return this.currentQuiz!.currentQuestionList.length; 
    }
    return 0;
  }

  public getCurrentQuestionNumber(): number {
    if (this.currentQuiz && this.currentQuestion) {
      return this.currentQuiz?.currentQuestionList.findIndex(cq => cq.id === this.currentQuestion?.id) + 1;
    }
    return 0;
  }

  public getPreviousQuestionUrlId(): number {
    return this.getCurrentQuestionUrlId() - 1;
  }

  private getCurrentQuestionUrlId(): number {
    if (this.currentQuiz) {
      return this.currentQuiz?.currentQuestionList.findIndex(cq => cq.id === this.currentQuestion?.id) + 1;
    }
    return 0;
  }

  public getNextQuestionUrlId(): number {
    return this.getCurrentQuestionUrlId() + 1;
  }

  public isPreviousButtonDisabled(): boolean {
    return this.getPreviousQuestionUrlId() < 1;
  }

  public isNextButtonDisabled(): boolean {
    return this.getNextQuestionUrlId() > this.getQuestionsCount();
  }
}

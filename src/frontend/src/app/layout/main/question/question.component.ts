import { Component, Input } from '@angular/core';
import { CurrentQuestion } from '../../../current-quiz.service';
import { MainComponent } from "../main.component";


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @Input() currentQuestion?: CurrentQuestion;

  public selectAnswer(event: Event): void {
    const answerId: number = +(<HTMLInputElement>event.target).id;
    const isChecked = (<HTMLInputElement>event.target).checked;
    console.log('select answerId', answerId, 'isChecked', isChecked);
    this.currentQuestion!.currentAnswerList.find(currentAnswer => currentAnswer.id === answerId)!.checked = isChecked;
  }
}

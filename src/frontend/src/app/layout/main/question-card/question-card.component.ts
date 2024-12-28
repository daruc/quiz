import { Component, Input } from '@angular/core';


export interface AnswerCardData {
  id: number,
  description: string,
  userSelected: boolean,
  expectedSelection: boolean
}

export interface QuestionCardData {
  id: number,
  description: string,
  answerList: AnswerCardData[],
}

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
  @Input() question: QuestionCardData = {
    id: 0,
    description: '',
    answerList: [
      {
        id: 0,
        description: '',
        userSelected: false,
        expectedSelection: false
      }
    ],
  };

  public getAnswerClass(answer: AnswerCardData): string {
    if (answer.userSelected === answer.expectedSelection) {
      return 'answer-correct';
    } else {
      return 'answer-wrong';
    }
  }

  public isQuestionCorrect(question: QuestionCardData): boolean {
    return question.answerList.every(a => a.userSelected === a.expectedSelection);
  }

  public getQuestionClass(question: QuestionCardData): string {
    if (this.isQuestionCorrect(question)) {
      return 'question-correct';
    } else {
      return 'question-wrong';
    }
  }
}

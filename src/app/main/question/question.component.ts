import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { QuestionsService } from '../../questions.service';
import { Answer, AnswersService } from '../../answers.service';

interface AnswerInComponent {
  answerId: number;
  text: string;
}

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  private questionsService: QuestionsService;
  private answersService: AnswersService;
  private currentAnswerIds: number[];

  question: string = '';
  answers: AnswerInComponent[] = [];
  answerType: 'radio' | 'checkbox' = 'radio';

  constructor() {
    this.questionsService = inject(QuestionsService)
    this.questionsService.addChangeListener(this);
    this.answersService = inject(AnswersService);
    this.currentAnswerIds = [];
  }

  private printCurrentQuestion(): void {
    const q = this.questionsService.getCurrentQuestion();
    if (q) {
      this.question = q.question;
      this.answers = q.answers.map((a, i) => {
        return {
          answerId: i,
          text: a
        };
      });
      this.answerType = q.multipleChoose ? 'checkbox' : 'radio';
      if (q.randomOrder) {
        this.answers = this.shuffle(this.answers);
      }
      this.currentAnswerIds = [];
    }
  }

  ngOnInit(): void {
    console.log('draw');
    this.printCurrentQuestion();
  }

  private shuffle(arr: any[]): any[] {
    let copy = arr.slice(0);
    const mid = Math.floor(copy.length / 2);
    for (let i = 0; i < mid; ++i) {
      let newIndex = this.randInt(mid, copy.length - 1);
      console.log(newIndex);
      let tmp = copy[newIndex];
      copy[newIndex] = copy[i];
      copy[i] = tmp;
    }
    return copy;
  }

  private randInt(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  public selectAnswer(event: Event): void {
    const answerId: number = +(<HTMLInputElement>event.target).id;
    if ((<HTMLInputElement>event.target).type === 'radio') {
      this.currentAnswerIds = [answerId];
    } else {
      const isChecked = (<HTMLInputElement>event.target).checked;
      if (isChecked) {
        this.currentAnswerIds.push(answerId);
      } else {
        this.currentAnswerIds.splice(this.currentAnswerIds.indexOf(answerId), 1);
      }
    }
    const userAnswer: Answer = {
      questionId: this.questionsService.getCurrentQuestion()!.questionId,
      answerIds: this.currentAnswerIds
    }
    this.answersService.setAnswer(userAnswer);
  }
}

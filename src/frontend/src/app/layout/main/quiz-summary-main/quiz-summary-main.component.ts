import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MainComponent } from "../main.component";
import { AnswerCardData, QuestionCardComponent, QuestionCardData } from "../question-card/question-card.component";

export interface StatSummary {
  actualCorrectQuestions: number;
  expectedCorrectQuestions: number;
  scorePercent: number;
}

export class QuizSummary {
  title: string = '';
  questionList: QuestionCardData[] = [];
  public rate(): StatSummary {
    const correctNum: number = this.calculateCorrectQuestions();
    return {
      actualCorrectQuestions: correctNum,
      expectedCorrectQuestions: this.questionList.length,
      scorePercent: (correctNum / this.questionList.length) * 100
    }
  }
  private calculateCorrectQuestions(): number {
    return this.questionList.filter(q => this.areAllAnswersCorrect(q)).length;
  }

  private areAllAnswersCorrect(question: QuestionCardData): boolean {
    return question.answerList.every(a => a.userSelected === a.expectedSelection);
  }
}

@Component({
  selector: 'app-quiz-summary-main',
  standalone: true,
  imports: [MainComponent, QuestionCardComponent],
  templateUrl: './quiz-summary-main.component.html',
  styleUrl: './quiz-summary-main.component.css'
})
export class QuizSummaryMainComponent implements OnChanges {
  @Input() quizSummary: QuizSummary = new QuizSummary();
  statSummary: StatSummary = this.quizSummary.rate();

  constructor() {
    console.log(this.quizSummary);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.statSummary = this.quizSummary.rate();
  }
}

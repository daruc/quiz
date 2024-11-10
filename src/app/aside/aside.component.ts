import { Component, inject } from '@angular/core';
import { QuestionsService, Quiz } from '../questions.service';
import { Answer, Answers, AnswersService } from '../answers.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  private questionsService: QuestionsService;
  private answersService: AnswersService;

  constructor() {
    this.questionsService = inject(QuestionsService);
    this.answersService = inject(AnswersService);
  }

  public getQuizTitle(): string {
    const quiz = this.questionsService.getCurrentQuiz();
    if (quiz) {
      return quiz.title;
    }
    return '';
  }

  public getQuestionsNumber(): number {
    const quiz = this.questionsService.getCurrentQuiz();
    if (quiz) {
      return quiz.questions.length;
    }
    return 0;
  }

  public loadQuestion(index: number): void {
    console.log('loadQuestion=' + index);
    this.questionsService.setCurrentQuestion(index);
  }

  public finishQuiz(): void {
    const answers: Answers = this.answersService.getAnswers();
    const quiz: Quiz = this.questionsService.getCurrentQuiz()!;
    let result = '';
    quiz.questions.map(question => {
      result += question.question
      const userIndices: number[] = this.getUserAnswers(question.questionId, answers);
      result += ' ' + this.printCorrectAnswers(question.correctIndex, userIndices);
      result += '\n';
    });
    window.alert(result);
  }

  private getUserAnswers(questionId: number, answers: Answers): number[] {
    const questionAnswers: Answer | undefined = answers.answers.find(a => a.questionId === questionId)
    if (questionAnswers) {
      return questionAnswers.answerIds;
    }
    return [];
  }

  private printCorrectAnswers(correctIndices: number[], userIndices: number[]): boolean {
    return correctIndices.length == userIndices.length &&
       correctIndices.map(correct => userIndices.indexOf(correct) != -1)
      .reduce((acc, cur) => acc && cur);
  }

  public goToQuizSelection(): void {
   this.questionsService.setCurrentQuiz(-1); 
  }

  public isQuizSelected(): boolean {
    return this.questionsService.getCurrentQuiz() != undefined;
  }

  public getCurrentQuestionIndex(): number {
    return this.questionsService.getCurrentQuestion()!.questionId;
  }
}

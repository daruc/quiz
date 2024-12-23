import { inject, Injectable } from '@angular/core';
import { Question, Quiz, QuizListService } from './quiz-list.service';

export interface CurrentAnswer {
  id: number;
  str: string;
  checked: boolean;
}

export interface CurrentQuestion {
  id: number;
  str: string;
  type: "radio" | "checkbox";
  currentAnswerList: CurrentAnswer[];
}

export interface CurrentQuiz {
  id: number;
  title: string;
  currentQuestionList: CurrentQuestion[]
}

export interface QuestionResult {
  id: number,
  selectedCorrect: number,
  maxCorrect: number
}

export interface QuizResult {
  id: number,
  questionResultList: QuestionResult[]
}

@Injectable({
  providedIn: 'root'
})
export class CurrentQuizService {
  private currentQuiz: CurrentQuiz | undefined = undefined;
  private quizListService: QuizListService;

  constructor() {
    this.quizListService = inject(QuizListService);
  }

  public startQuiz(quizId: number): void {
    if (this.currentQuiz && this.currentQuiz.id === quizId) {
      return;
    }

    console.log('start quiz', quizId);
    const quiz : Quiz = this.quizListService.getQuiz(quizId);
    this.currentQuiz = {
      id: quizId,
      title: quiz.title,
      currentQuestionList: this.createCurrentQuestionList(quiz)
    }
  }

  public stopQuiz() {
    console.log('stop quiz');
    this.currentQuiz = undefined;
  }

  private createCurrentQuestionList(quiz: Quiz): CurrentQuestion[] {
    const currentQuestionList = quiz.questions.map(question => this.createCurrentQuestion(question));
    if (quiz.randomOrder) {
      return this.shuffleArray(currentQuestionList);
    }
    return currentQuestionList;
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private createCurrentQuestion(question: Question): CurrentQuestion {
    return {
      id: question.id,
      str: question.description,
      type: question.multipleChoice ? "checkbox" : "radio",
      currentAnswerList: this.createCurrentAnswerList(question)
    }
  }

  private createCurrentAnswerList(question: Question): CurrentAnswer[] {
    const currentAswerList = question.answers.map((answer, index) => this.createCurrentAnswer(index, answer.description));
    if (question.randomOrder) {
      return this.shuffleArray(currentAswerList);
    }
    return currentAswerList;
  }

  private createCurrentAnswer(index: number, answerStr: string): CurrentAnswer {
    return {
      id: index,
      str: answerStr,
      checked: false
    }
  }

  public getCurrentQuiz(): CurrentQuiz | undefined {
    return this.currentQuiz;
  }

  public rateEntire(): QuizResult {
    if (this.currentQuiz) {
      console.log('current quiz', this.currentQuiz);

      const quiz: Quiz = this.quizListService.getQuiz(this.currentQuiz.id);
      console.log('quiz:', quiz);
      const questResultList: QuestionResult[] = this.currentQuiz.currentQuestionList.map(currentQuestion => {
        const question: Question = quiz.questions.find(question => question.id === currentQuestion.id)!;
        return {
          id: currentQuestion.id,
          selectedCorrect: this.calculateSelectedCorrect(currentQuestion, question),
          maxCorrect: this.calculateMaxCorrect(question)
        }
      });

      return {
        id: this.currentQuiz.id,
        questionResultList: questResultList
      }
    }

    return {
      id: -1,
      questionResultList: []
    }
  }

  private calculateSelectedCorrect(currentQuestion: CurrentQuestion, question: Question): number {
    if (question.multipleChoice) {
      return this.calculateSelectedCorrectCheckbox(currentQuestion, question);
    }
    return this.calculateSelectedCorrectRadio(currentQuestion, question);
  }

  private calculateSelectedCorrectCheckbox(currentQuestion: CurrentQuestion, question: Question) {
    let correct = 0;
    for (var currentAnswer of currentQuestion.currentAnswerList) {
      if (this.isCheckedCorrectly(currentAnswer, question)) {
        ++correct;
      } else {
        --correct;
      }
    }
    if (correct < 0) {
      correct = 0;
    }
    return correct;
  }

  private calculateSelectedCorrectRadio(currentQuestion: CurrentQuestion, question: Question) {
    let correct = 0;
    for (var answer of currentQuestion.currentAnswerList) {
      if (this.isCheckedCorrectly(answer, question)) {
        ++correct;
      }
    }
    return correct;
  }

  private isCheckedCorrectly(currentAnswer: CurrentAnswer, question: Question): boolean {
    return currentAnswer.checked === question.answers.find(answer => answer.id === currentAnswer.id)!.correct;
  }

  private calculateMaxCorrect(question: Question): number {
    return question.answers.reduce((acc, answer) => acc + +answer.correct, 0);
  }
}


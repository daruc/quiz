import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { QuizSummary, QuizSummaryMainComponent } from "../main/quiz-summary-main/quiz-summary-main.component";
import { QuizSummaryAsideComponent } from "../aside/quiz-summary-aside/quiz-summary-aside.component";
import { CurrentQuizService, QuestionResult, QuizResult } from '../../current-quiz.service';
import { Answer, Question, Quiz, QuizListService } from '../../quiz-list.service';
import { AnswerCardData, QuestionCardData } from '../main/question-card/question-card.component';

@Component({
  selector: 'quiz-summary-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, QuizSummaryMainComponent, QuizSummaryAsideComponent],
  templateUrl: './quiz-summary-layout.component.html',
  styleUrl: './quiz-summary-layout.component.css'
})
export class QuizSummaryLayoutComponent {
  quizSummary: QuizSummary;

  constructor(private currentQuizService: CurrentQuizService,
              private quizListService: QuizListService
  ) {
    this.quizSummary = this.getCurrentQuizSummary();
  }

  public getCurrentQuizSummary(): QuizSummary {
    const quizResult: QuizResult = this.currentQuizService.rateEntire();
    const quizId = quizResult.id;
    const quiz = this.quizListService.getQuiz(quizId);
    return this.buildQuizSummary(quizResult, quiz);
  }

  private buildQuizSummary(quizResult: QuizResult, quiz: Quiz): QuizSummary {
    const quizSummary = new QuizSummary();
    quizSummary.title = quiz.title;
    quizSummary.questionList = quiz.questions.map(q => {
      return {
        qu: q,
        qr: quizResult.questionResultList.find(qr => qr.id === q.id)!
      };
    })
    .map(({qu, qr}) => this.buildQuestionCardData(qu, qr))
    return quizSummary;
  }

  private buildQuestionCardData(question: Question, questionResult: QuestionResult): QuestionCardData {
    return {
      id: question.id,
      description: question.description,
      answerList: question.answers.map(a => this.buildAnswerCardData(a))
    }
  }

  private buildAnswerCardData(answer: Answer): AnswerCardData {
    return {
      id: answer.id,
      description: answer.description,
      userSelected: false,
      expectedSelection: answer.correct
    }
  }
}

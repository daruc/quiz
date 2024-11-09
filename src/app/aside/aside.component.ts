import { Component, inject } from '@angular/core';
import { QuestionsService, Quiz } from '../questions.service';
import { Answers, AnswersService } from '../answers.service';

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
    window.alert(JSON.stringify(answers));
  }
}

package pl.daruc.quiz;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private List<QuizDto> quizes;

    public QuizController() {
        var answer11 = new AnswerDto(0, "answer11 (correct)", true);
        var answer12 = new AnswerDto(1, "answer12", false);
        var answer13 = new AnswerDto(2, "answer13", false);
        var answers1 = new AnswerDto[] {answer11, answer12, answer13};
        var question1 = new QuestionDto(0, "question1 (radio, random order)", false, true, answers1);
        var answer21 = new AnswerDto(0, "answer21 (correct)", true);
        var answer22 = new AnswerDto(1, "answer22 (correct)", true);
        var answers2 = new AnswerDto[]{answer21, answer22};
        var question2 = new QuestionDto(0, "question1 (radio, random order)", true, true, answers2);
        var questions1 = new QuestionDto[] {question1, question2};
        var questions2 = new QuestionDto[] {question1};
        var quiz1 = new QuizDto(0, "quiz1 (random order)", true, questions1);
        var quiz2 = new QuizDto(1, "quiz2", false, questions2);
        quizes = new ArrayList<>();
        quizes.add(quiz1);
        quizes.add(quiz2);
    }

    @GetMapping()
    public List<QuizDto> getQuizList() {
        return quizes;
    }

    @PostMapping()
    public void createQuiz(@RequestBody QuizDto newQuiz) {
        quizes.add(newQuiz);
    }

    @PutMapping()
    public void editQuiz(@RequestBody QuizDto existingQuiz) {
        quizes.removeIf(q -> q.id() == existingQuiz.id());
        quizes.add(existingQuiz);
    }

    @DeleteMapping("/{quizUrlId}")
    public void deleteQuiz(@PathVariable("quizUrlId") int quizUrlId) {
        quizes.removeIf(q -> q.id() == (quizUrlId - 1));
    }

}

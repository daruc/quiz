package pl.daruc.quiz;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizListRepository quizListRepository;

    public QuizController(QuizListRepository quizListRepository) {
        this.quizListRepository = quizListRepository;
    }

    @GetMapping()
    public List<QuizDto> getQuizList() {
        return quizListRepository.findAll().stream().map(QuizController::toQuizDto)
                .toList();
    }

    private static QuizDto toQuizDto(QuizEntity entity) {
        int id = entity.getId();
        String title = entity.getTitle();
        boolean randomOrder = entity.isRandomOrder();
        QuestionDto[] questionArray = entity.getQuestionSet().stream().map(QuizController::toQuestionDto)
                .toArray(QuestionDto[]::new);
        return new QuizDto(id, title, randomOrder, questionArray);
    }

    private static QuestionDto toQuestionDto(QuestionEntity entity) {
        int id = entity.getId();
        String description = entity.getDescription();
        boolean randomOrder = entity.isRandomOrder();
        boolean multipleChoice = entity.isMultipleChoice();
        AnswerDto[] answerArray = entity.getAnswerSet().stream().map(QuizController::toAnswerDto)
                .toArray(AnswerDto[]::new);
        return new QuestionDto(id, description, multipleChoice, randomOrder, answerArray);
    }

    private static AnswerDto toAnswerDto(AnswerEntity entity) {
        int id = entity.getId();
        String description = entity.getDescription();
        boolean correct = entity.isCorrect();
        return new AnswerDto(id, description, correct);
    }

    @PostMapping()
    public void createQuiz(@RequestBody QuizDto newQuiz) {
        quizListRepository.save(toQuizEntity(newQuiz));
    }

    private static QuizEntity toQuizEntity(QuizDto dto) {
        var entity = new QuizEntity();
        //entity.setId(dto.id());
        entity.setTitle(dto.title());
        entity.setRandomOrder(dto.randomOrder());
        Set<QuestionEntity> questionSet = Arrays.stream(dto.questions()).map(QuizController::toQuestionEntity)
                .collect(Collectors.toSet());
        entity.setQuestionSet(questionSet);
        return entity;
    }

    private static QuestionEntity toQuestionEntity(QuestionDto dto) {
        var entity = new QuestionEntity();
        entity.setDescription(dto.description());
        entity.setMultipleChoice(dto.multipleChoice());
        entity.setRandomOrder(dto.randomOrder());
        Set<AnswerEntity> answerSet = Arrays.stream(dto.answers()).map(QuizController::toAnswerEntity)
                        .collect(Collectors.toSet());
        entity.setAnswerSet(answerSet);
        return entity;
    }

    private static AnswerEntity toAnswerEntity(AnswerDto dto) {
        var entity = new AnswerEntity();
        entity.setCorrect(dto.correct());
        entity.setDescription(dto.description());
        return entity;
    }

    @PutMapping()
    public void editQuiz(@RequestBody QuizDto existingQuiz) {
        if (quizListRepository.findById(existingQuiz.id()).isPresent()) {
            quizListRepository.save(toQuizEntity(existingQuiz));
        }
    }

    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable("quizId") int quizId) {
        quizListRepository.deleteById(quizId);
    }

}

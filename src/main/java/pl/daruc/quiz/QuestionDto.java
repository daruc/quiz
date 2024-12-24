package pl.daruc.quiz;

public record QuestionDto(int id,
                          String description,
                          boolean multipleChoice,
                          boolean randomOrder,
                          AnswerDto[] answers) {
}

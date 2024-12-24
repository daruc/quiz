package pl.daruc.quiz;

public record QuizDto(int id,
                      String title,
                      boolean randomOrder,
                      QuestionDto[] questions) {
}

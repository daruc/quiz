package pl.daruc.quiz;

public record QuizDto(int id,
                      String title,
                      boolean randomOrder,
                      int timeLimitSec,
                      QuestionDto[] questions) {
}

package pl.daruc.quiz;

public record AnswerDto(int id,
                        String description,
                        boolean correct) {
}

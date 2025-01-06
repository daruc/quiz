package pl.daruc.quiz;

import jakarta.persistence.*;

@Entity
@Table(name = "answer")
public class AnswerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "answer_gen")
    @SequenceGenerator(name = "answer_gen", sequenceName = "answer_seq", allocationSize = 1)
    private int id;
    @Column
    private String description;
    @Column
    private boolean correct;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }
}

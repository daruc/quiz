package pl.daruc.quiz;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "question")
public class QuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="question_gen")
    @SequenceGenerator(name = "question_gen", sequenceName = "question_seq", allocationSize = 1)
    private int id;
    @Column
    private String description;
    @Column
    private boolean multipleChoice;
    @Column
    private boolean randomOrder;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
    private Set<AnswerEntity> answerSet;

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

    public boolean isMultipleChoice() {
        return multipleChoice;
    }

    public void setMultipleChoice(boolean multipleChoice) {
        this.multipleChoice = multipleChoice;
    }

    public boolean isRandomOrder() {
        return randomOrder;
    }

    public void setRandomOrder(boolean randomOrder) {
        this.randomOrder = randomOrder;
    }

    public Set<AnswerEntity> getAnswerSet() {
        return answerSet;
    }

    public void setAnswerSet(Set<AnswerEntity> answerSet) {
        this.answerSet = answerSet;
    }
}

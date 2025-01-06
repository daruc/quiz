package pl.daruc.quiz;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "quiz")
public class QuizEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quiz_gen")
    @SequenceGenerator(name = "quiz_gen", sequenceName = "quiz_seq", allocationSize = 1)
    private int id;
    @Column
    private String title;
    @Column
    private boolean randomOrder;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "quiz_id", referencedColumnName = "id", nullable = false)
    private Set<QuestionEntity> questionSet;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isRandomOrder() {
        return randomOrder;
    }

    public void setRandomOrder(boolean randomOrder) {
        this.randomOrder = randomOrder;
    }

    public Set<QuestionEntity> getQuestionSet() {
        return questionSet;
    }

    public void setQuestionSet(Set<QuestionEntity> questionSet) {
        this.questionSet = questionSet;
    }
}

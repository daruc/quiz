package pl.daruc.quiz;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizListRepository extends JpaRepository<QuizEntity, Integer> {

}

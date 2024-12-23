package pl.daruc.quiz;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @GetMapping("/list")
    public List<String> getQuizList() {
        return List.of("aaa", "bbb", "ccc");
    }
}

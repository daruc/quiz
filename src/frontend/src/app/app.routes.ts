import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CreateQuizLayoutComponent } from './layout/create-quiz-layout/create-quiz-layout.component';
import { SolveQuizLayoutComponent } from './layout/solve-quiz-layout/solve-quiz-layout.component';

export const routes: Routes = [
    { path: '', component: HomeLayoutComponent },
    { path: 'quiz/:id/:page', component: SolveQuizLayoutComponent },
    { path: 'create', component: CreateQuizLayoutComponent },
    { path: 'edit/:id', component: CreateQuizLayoutComponent }
];

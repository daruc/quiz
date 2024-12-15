import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent },
    { path: 'quiz/:id/:page', component: LayoutComponent },
    { path: 'create', component: LayoutComponent }
];

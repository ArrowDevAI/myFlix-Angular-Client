import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MainComponent } from './main/main.component';


export const routes: Routes = [
    {path: 'welcome', component: WelcomePageComponent},
    {path: 'login', component: UserLoginFormComponent},
    {path: 'registration', component: UserRegistrationFormComponent},
    {path: 'movies', component: MovieCardComponent},
    {path: 'main', component: MainComponent},
    {path: '**', redirectTo: 'welcome' },
];


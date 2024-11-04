
import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
@NgModule({
  declarations: [
    WelcomePageComponent,
],
  imports: [
MatCardModule,
MatIconModule,
  ], 
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule {}

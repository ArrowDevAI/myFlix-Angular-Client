import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule], 
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]  // Bootstrap your app component
})
export class AppModule {}


import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component'


@NgModule({
  declarations: [
],
  imports: [

  ], 
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EntityRelationshipBuilderModule } from './entity-relationship-builder/entityRelationship.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EntityRelationshipBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuildEntityComponent } from './components';
import { MaterialModule } from '../material-modules';
import { EntityBuilderService } from './service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntityFieldComponent } from './components/ngx-field/ngx-field.component';
import { BrowserModule } from '@angular/platform-browser';
import { EditTableComponent } from './components/editTable/component';
import { DragbleElementDirective } from './components/plainDrag.directive';
import { DndModule } from 'ng2-dnd';
import { EntityPrimaryComponent } from './components/entityPrimary/component';
import { EntityRelationalComponent } from './components/entityRelational/component';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        DndModule.forRoot()
    ],
    declarations: [
        BuildEntityComponent,
        EntityFieldComponent,
        EditTableComponent,
        DragbleElementDirective,
        EntityPrimaryComponent,
        EntityRelationalComponent
    ],
    entryComponents: [BuildEntityComponent, EditTableComponent],
    exports: [
        BuildEntityComponent
    ]
})
export class EntityRelationshipBuilderModule { }

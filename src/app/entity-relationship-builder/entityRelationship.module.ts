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
import {DndModule} from 'ng2-dnd';
import { TableRelationComponent } from './components/table-relation/table-relation.component';
import { FilterPipe } from '../filter.pipe';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        BrowserModule,
        DndModule.forRoot(),
        BrowserAnimationsModule,
        MaterialModule
    ],
    declarations: [
        BuildEntityComponent,
        EntityFieldComponent,
        EditTableComponent,
        TableRelationComponent,
        FilterPipe
        
    ],
    entryComponents: [BuildEntityComponent, EditTableComponent],
    exports: [
        BuildEntityComponent
    ]
})
export class EntityRelationshipBuilderModule { }

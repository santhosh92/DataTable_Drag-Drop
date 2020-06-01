import {
    Component, OnInit, OnChanges, AfterViewInit, Input, Output, ElementRef,
    EventEmitter, SimpleChange, SimpleChanges, NgZone
} from '@angular/core';
import { EntityBuilderService } from '../service';
import { Subscription, Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { EditTableComponent } from './editTable/component';
declare let LeaderLine: any;
export interface erModel {
    tables: any[];
    entityRelationship: any;
}
@Component({
    selector: 'entity-relationship-builder',
    templateUrl: './build.component.html',
    styleUrls: ['./build.component.scss'],
    providers: [EntityBuilderService]
})
export class BuildEntityComponent implements OnInit, AfterViewInit {
    @Input() data: erModel;
    @Input() tableList: any[];
    fieldSub: Subscription;
    public fieldsList: Observable<any>;
    public defaultWidth = 24;
    simpleDrop: any = null;



    constructor(public formBuilder: EntityBuilderService, private dialog: MatDialog,
        private zone: NgZone) {
    }

    ngOnInit() {
        // this.fieldsList = this.formBuilder.fields$.pipe();
        // this.formBuilder.createForm('section');
        // this.formBuilder.mergeField(this.data.tables);
    }


    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }


    edit(table) {
        const dialogRef = this.dialog.open(EditTableComponent, {
            disableClose: true,
            width: '80vw',
            data: {
                tables: [...this.data.tables],
                currentTable: { ...table },
                entityRelationship: this.data.entityRelationship.filter(item =>
                    item.primaryTable === table.name || item.relationalTable === table.name)
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                let er = this.data.entityRelationship.filter(item =>
                    item.primaryTable === table.name || item.relationalTable === table.name);
                er = er.concat.apply([], result.er);
                this.data.entityRelationship = [...er];
                this.data.entityRelationship.forEach(_er => {
                    this.leader(_er.primaryTable, _er.relationalTable);
                });
            }
        });
    }

    ngAfterViewInit() {
        this.data.entityRelationship.forEach(er => {
            this.leader(er.primaryTable, er.relationalTable);
        });
    }

    leader(id, id2) {
        const startEl = document.getElementById(id);
        const endEl = document.getElementById(id2);

        return new LeaderLine(
            startEl,
            endEl,
            {
                path: 'grid',
                // startSocket: 'right',
                // endSocket: 'left'
            }
            //  {
            //     endPlugOutline: false,
            //     animOptions: { duration: 3000, timing: 'linear' }
            // }
        );
    }

    onStart(event, element) {
        console.log(event);
    }

    onResizeEnd(column, event: any): void {
        column.width = event.width;
    }

    insertRow() {
        // this.formBuilder.insertRow(this.config[this.config.length - 1]);
    }
    removeRow() {
        // this.remove.emit(this.config[0]);
    }

}

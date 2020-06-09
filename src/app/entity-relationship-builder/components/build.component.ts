import {
    Component, OnInit, OnChanges, AfterViewInit, Input, Output, ElementRef,
    EventEmitter, SimpleChange, SimpleChanges, NgZone, ViewChild
} from '@angular/core';
import { EntityBuilderService } from '../service';
import { Subscription, Observable } from 'rxjs';
// import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragMove, CdkDragEnter } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { EditTableComponent } from './editTable/component';
declare let LeaderLine: any;
declare let PlainDraggable: any;
export interface erModel {
    tables: any[];
    entityRelationship: any[];
    entityCordinates: any[];

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

    height: number = 650;
    @ViewChild('resizeBox') resizeBox: ElementRef;
    @ViewChild('dragHandleCorner') dragHandleCorner: ElementRef;
    constructor(public formBuilder: EntityBuilderService, private dialog: MatDialog,
        private zone: NgZone) {
    }

    // get resizeBoxElement(): HTMLElement {
    //     return this.resizeBox.nativeElement;
    // }

    // get dragHandleCornerElement(): HTMLElement {
    //     return this.dragHandleCorner.nativeElement;
    // }

    ngOnInit() {
        // this.fieldsList = this.formBuilder.fields$.pipe();
        // this.formBuilder.createForm('section');
        // this.formBuilder.mergeField(this.data.tables);
    }

    // dragenter(event: CdkDragEnter<string[]>) {
    //     console.log(event,"event");
    // }

    // drop(event: CdkDragDrop<string[]>) {
    //     console.log(event);
    //     if (event.previousContainer === event.container) {
    //         // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //     } else {
    //         transferArrayItem(event.previousContainer.data,
    //             event.container.data,
    //             event.previousIndex,
    //             event.currentIndex);
    //             if(this.data.tables.length > 10){
    //                 this.data.tables.forEach(data=>{this.height += 250});
    //             }
    //     }
    // }
    onDrop(event: any) {
        this.data.tables.push(event.dragData);
        this.data.entityCordinates.push({
            tablename: event.dragData.name,
            positionXY: { left: event.mouseEvent.layerX, top: event.mouseEvent.layerY }
        });
    }

    edit(table) {
        const dialogRef = this.dialog.open(EditTableComponent, {
            disableClose: true,
            width: '80vw',
            data: {
                tables: [...this.data.tables],
                currentTable: { ...table },
                entityRelationship: this.data.entityRelationship.filter(item =>
                    item.primaryTable === table.name)
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let er = this.data.entityRelationship.filter(item =>
                    item.primaryTable === table.name || item.relationalTable === table.name);
                er = er.concat.apply([], result.er);
                this.data.entityRelationship = [...er];
                this.drawEntityRelationship();
            }

        });
    }

    ngAfterViewInit() {
        this.data.entityRelationship.forEach(er => {
            this.drawEntityRelationship();
        });
        // this.setAllHandleTransform();
    }

    setAllHandleTransform() {
        // const rect = this.resizeBoxElement.getBoundingClientRect();
        // this.setHandleTransform(this.dragHandleCornerElement, rect, 'both');

    }

    setHandleTransform(
        dragHandle: HTMLElement,
        targetRect: ClientRect | DOMRect,
        position: 'x' | 'y' | 'both'
    ) {
        const dragRect = dragHandle.getBoundingClientRect();
        const translateX = targetRect.width - dragRect.width;
        const translateY = targetRect.height - dragRect.height;
        console.log(translateY, "translateY")
        if (position === 'both') {
            dragHandle.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        }
    }
    // dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
    //     this.zone.runOutsideAngular(() => {
    //         this.resize(dragHandle, this.resizeBoxElement);
    //     });
    // }

    resize(dragHandle: HTMLElement, target: HTMLElement) {
        const dragRect = dragHandle.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // const width = dragRect.left - targetRect.left + dragRect.width;
        const height = dragRect.top - targetRect.top + dragRect.height;

        // target.style.width = width + 'px';
        target.style.height = height + 'px';

        this.setAllHandleTransform();
    }

    drawEntityRelationship() {
        this.data.entityRelationship.forEach(er => {
            this.leader(er.primaryTable, er.relationalTable, er.primaryKey, er.foreginKey);
        });
        window.dispatchEvent(new Event('resize'));
    }

    leader(id, id2, key1, key2) {
        const container = document.getElementById('templatebuilder');
        const startEl = document.getElementById(id);
        const endEl = document.getElementById(id2);
        const pk = document.getElementById(id + key1);
        const fk = document.getElementById(id2 + key2);
        const _endElementPosition = this.getCordinates(id2);
        const _startElementPosition = this.getCordinates(id);
        const plaincomponent = new LeaderLine(
            pk,
            fk,
            {
                path: 'grid',
                size: 4,
                startPlugSize: 1,
                endPlugSize: 1,
                color: "#fb8c00",
                startSocket: "right",
                endSocket: "left",
            }

            // {
            //     path: 'grid',
            //     // startSocket: 'right',
            //     // endSocket: 'left'
            // }
            //  {
            //     endPlugOutline: false,
            //     animOptions: { duration: 3000, timing: 'linear' }
            // }
        );
        const _startDragable = new PlainDraggable(startEl, {
            onMove: function () {
                plaincomponent.position();
            },
            containment: document.getElementById('templatebuilder'),
            left: _startElementPosition.left, top: _startElementPosition.top,
            onDragEnd: function () {
                window.dispatchEvent(new Event('resize'));
            },
            autoScroll: {
                target: container
            }

        });

        const _endDragable = new PlainDraggable(endEl, {
            onMove: function () {
                plaincomponent.position();
            },
            containment: document.getElementById('templatebuilder'),
            left: _endElementPosition.left, top: _endElementPosition.top,
            onDragEnd: function () {
                window.dispatchEvent(new Event('resize'));
            },
            autoScroll: {
                target: container
            }
        });

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

    getCordinates(tablename) {
        const _entityCordinate = this.data.entityCordinates.find(item => item.tablename === tablename);
        if (_entityCordinate) {
            return _entityCordinate.positionXY;
        } else {
            return {
                "left": 0,
                "top": 0
            };
        }
    }
}

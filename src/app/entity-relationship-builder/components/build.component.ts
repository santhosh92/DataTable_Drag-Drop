import {
    Component, OnInit, OnChanges, AfterViewInit, Input, Output, ElementRef,
    EventEmitter, SimpleChange, SimpleChanges, NgZone, ViewChild
} from '@angular/core';
import { EntityBuilderService } from '../service';
import { Subscription, Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragMove, CdkDragEnter } from '@angular/cdk/drag-drop';
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

    height : number = 650;
    @ViewChild('resizeBox') resizeBox: ElementRef;
    @ViewChild('dragHandleCorner') dragHandleCorner: ElementRef;
    constructor(public formBuilder: EntityBuilderService, private dialog: MatDialog,
        private zone: NgZone) {
    }

    get resizeBoxElement(): HTMLElement {
        return this.resizeBox.nativeElement;
      }
    
      get dragHandleCornerElement(): HTMLElement {
        return this.dragHandleCorner.nativeElement;
      }

    ngOnInit() {
        // this.fieldsList = this.formBuilder.fields$.pipe();
        // this.formBuilder.createForm('section');
        // this.formBuilder.mergeField(this.data.tables);
    }

    dragenter(event: CdkDragEnter<string[]>) {
        console.log(event,"event");
    }

    drop(event: CdkDragDrop<string[]>) {
        console.log(event);
        if (event.previousContainer === event.container) {
            // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
                if(this.data.tables.length > 10){
                    this.data.tables.forEach(data=>{this.height += 250});
                }
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
                    item.primaryTable === table.name)
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                console.log('The dialog was closed', result);
                // let er = this.data.entityRelationship.filter(item =>
                //     item.primaryTable === table.name);
                // er = er.concat.apply([], result.er);
                this.data.entityRelationship = [...this.data.entityRelationship, ...result.er];
                this.data.entityRelationship.forEach((_er, index) => {
                    if(!_er.hasOwnProperty('line')){
                        _er['line'] = this.leader(_er.primaryTable, _er.relationalTable);
                        this.data.entityRelationship[index] = _er
                    }
                });
            }
        });
    }

    ngAfterViewInit() {
        this.data.entityRelationship.forEach(er => {
            this.leader(er.primaryTable, er.relationalTable);
        });
        this.setAllHandleTransform();
    }

    setAllHandleTransform() {
        const rect = this.resizeBoxElement.getBoundingClientRect();
        this.setHandleTransform(this.dragHandleCornerElement, rect, 'both');
       
      }

      setHandleTransform(
        dragHandle: HTMLElement,
        targetRect: ClientRect | DOMRect,
        position: 'x' | 'y' | 'both'
      ) {
        const dragRect = dragHandle.getBoundingClientRect();
        const translateX = targetRect.width - dragRect.width;
        const translateY = targetRect.height - dragRect.height;
        console.log(translateY,"translateY")
        if (position === 'both') {
          dragHandle.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        }
      }
      dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
        this.zone.runOutsideAngular(() => {
          this.resize(dragHandle, this.resizeBoxElement);
        });
      }
    
      resize(dragHandle: HTMLElement, target: HTMLElement) {
        const dragRect = dragHandle.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
    
        // const width = dragRect.left - targetRect.left + dragRect.width;
        const height = dragRect.top - targetRect.top + dragRect.height;
    
        // target.style.width = width + 'px';
        target.style.height = height + 'px';
    
        this.setAllHandleTransform();
      }

    leader(id, id2) {
        const startEl = document.getElementById(id);
        const endEl = document.getElementById(id2);

        return new LeaderLine(
            startEl,
            endEl,
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
    }

    rerenderTable(data:any){
        if(this.data.entityRelationship.length > 0){
            console.log("innnnnnnnnnnnn", this.data.entityRelationship, data);
            this.data.entityRelationship.forEach((e,index) => {
                console.log(e.primaryTable , data.name , e.relationalTable , data.name)
                if(e.primaryTable === data.name || e.relationalTable === data.name){
                    console.log(e,"eeeeeeeeeeeeeeeeeee");
                    e.line.remove();
                    e['line'] = this.leader(e.primaryTable, e.relationalTable);
                    this.data.entityRelationship[index] = e
                }
            });
        }
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

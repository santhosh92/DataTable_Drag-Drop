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
declare let PlainDraggable: any;

export interface erModel {
    tables: any[];
    entityRelationship: any;
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
    searchTerm: string;
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

    // get resizeBoxElement(): HTMLElement {
    //     return this.resizeBox.nativeElement;
    //   }
    
    //   get dragHandleCornerElement(): HTMLElement {
    //     return this.dragHandleCorner.nativeElement;
    //   }

    ngOnInit() {
        // this.fieldsList = this.formBuilder.fields$.pipe();
        // this.formBuilder.createForm('section');
        // this.formBuilder.mergeField(this.data.tables);
    }

    transferData: Array<any> = [{id: 1, msg: 'Hello'},{id: 2, msg: 'Hi'}];
    receivedData: Array<any> = [];
    
    transferDataSuccess($event: any) {
        console.log($event.mouseEvent, $event.mouseEvent.clientX, $event.mouseEvent.clientY);
        if($event.dragData != null){
            
            const index = this.tableList.map(e => e.name).indexOf($event.dragData.name);
            this.tableList.splice(index,1);
            let value ={
                data:$event.dragData,
                position:{
                    x:$event.mouseEvent.layerX,
                    y:$event.mouseEvent.layerY
                }
            }
            this.data.tables.push($event.dragData);
            this.data.entityCordinates.push({
                tablename: $event.dragData.name,
                positionXY: { left: $event.mouseEvent.layerX+231, top: $event.mouseEvent.layerY+68 }
            });
            // console.log(document.getElementById($event.dragData.name));
            // let draggable = new PlainDraggable(document.getElementById($event.dragData.name))
            // draggable.containment = document.getElementById('dropArea');
            console.log(this.data.entityCordinates,"this.data.entityCordinates");
            setTimeout(() => {
                this.drawEntityRelationship1();
            })
           
        }
    }

    dragenter(event: CdkDragEnter<string[]>) {
        console.log(event,"event");
    }

    drop(event: CdkDragDrop<string[]>) {
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
                // this.data.entityRelationship = [...this.data.entityRelationship, ...result.er];
                // this.data.entityRelationship.forEach((_er, index) => {
                //     if(!_er.hasOwnProperty('line')){
                //         _er['line'] = this.leader(_er.primaryTable, _er.relationalTable);
                //         this.data.entityRelationship[index] = _er
                //     }
                // });
                // this.drawEntityRelationship();
                let er = this.data.entityRelationship.filter(item =>
                    item.primaryTable === table.name || item.relationalTable === table.name);
                er = er.concat.apply([], result.er);
                this.data.entityRelationship = [...er];
                this.drawEntityRelationship();
            }
        });
    }

    ngAfterViewInit() {
        this.drawEntityRelationship();
        // this.data.entityRelationship.forEach(er => {
        //     this.leader(er.primaryTable, er.relationalTable);
        // });
        // console.log("sssssssssss");
        // this.data.tables.forEach(data=>{
        //     new PlainDraggable(data.data.name);
        // });
        // this.setAllHandleTransform();
    }

    // setAllHandleTransform() {
    //     const rect = this.resizeBoxElement.getBoundingClientRect();
    //     this.setHandleTransform(this.dragHandleCornerElement, rect, 'both');
       
    //   }

    //   setHandleTransform(
    //     dragHandle: HTMLElement,
    //     targetRect: ClientRect | DOMRect,
    //     position: 'x' | 'y' | 'both'
    //   ) {
    //     const dragRect = dragHandle.getBoundingClientRect();
    //     const translateX = targetRect.width - dragRect.width;
    //     const translateY = targetRect.height - dragRect.height;
    //     console.log(translateY,"translateY");
    //     if (position === 'both') {
    //       dragHandle.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    //     }
    //   }
    //   dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
    //     this.zone.runOutsideAngular(() => {
    //       this.resize(dragHandle, this.resizeBoxElement);
    //     });
    //   }
    
    //   resize(dragHandle: HTMLElement, target: HTMLElement) {
    //     const dragRect = dragHandle.getBoundingClientRect();
    //     const targetRect = target.getBoundingClientRect();
    
    //     // const width = dragRect.left - targetRect.left + dragRect.width;
    //     const height = dragRect.top - targetRect.top + dragRect.height;
    
    //     // target.style.width = width + 'px';
    //     target.style.height = height + 'px';
    
    //     this.setAllHandleTransform();
    //   }

    drawEntityRelationship1() {
        this.data.tables.forEach(er => {
            this.leader_new(er.name);
        });
        window.dispatchEvent(new Event('resize'));
    }

    drawEntityRelationship() {
        this.data.entityRelationship.forEach(er => {
            this.leader(er.primaryTable, er.relationalTable);
        });
        window.dispatchEvent(new Event('resize'));
    }

    set_position(newPostion,id) {
        console.log(this.data.entityCordinates,"this.data.entityCordinatesthis.data.entityCordinates");
            const index = this.data.entityCordinates.map(item => item.tablename).indexOf(id);
            this.data.entityCordinates[index].positionXY = newPostion;
    }

    leader_new(id) {
        const container = document.getElementById('dropArea');
        const startEl = document.getElementById(id);
        const _startElementPosition = this.getCordinates(id);
        console.log(this.data.entityCordinates,"this.data.entityCordinatesthis.data.entityCordinates");
        // const set_position = (newPostion) => {
        //     console.log(this.data.entityCordinates,"this.data.entityCordinatesthis.data.entityCordinates");
        //         const index = this.data.entityCordinates.map(item => item.tablename).indexOf(id);
        //         this.data.entityCordinates[index].positionXY = newPostion;
        // }
        let _self = this;
        console.log(_startElementPosition);
        const _startDragable = new PlainDraggable(startEl, {
            onDrag: function (newPostion) {
                _self.set_position(newPostion,id);
            },
            containment: document.getElementById('dropArea'),
            left: _startElementPosition.left, top: _startElementPosition.top,
            onDragEnd: function () {
                window.dispatchEvent(new Event('resize'));
            },
            autoScroll: {
                target: container
            }
        });
    }

    leader(id, id2) {
        const container = document.getElementById('dropArea');
        const startEl = document.getElementById(id);
        const endEl = document.getElementById(id2);
        const _endElementPosition = this.getCordinates(id2);
        const _startElementPosition = this.getCordinates(id);

        const plaincomponent = new LeaderLine(
            startEl,
            endEl,
            {
                startPlug: "behind",
                endPlug: "behind",
            }
            // {
            //     path: 'grid',
            //     size: 4,
            //     startPlugSize: 1,
            //     endPlugSize: 1,
            //     color: "#fb8c00",
            //     startSocket: "right",
            //     endSocket: "left",
            // }
        );
        let _self = this;
        const _startDragable = new PlainDraggable(startEl, {
            onMove: function (newPostion) {
                _self.set_position(newPostion,id);
                console.log("ssssssssssss");
                // plaincomponent.position();
                window.dispatchEvent(new Event('resize'));
            },
            onDrag: function (newPostion) {
                console.log(newPostion,"newPostionnewPostionnewPostion");
            },
            containment: document.getElementById('dropArea'),
            left: _startElementPosition.left, top: _startElementPosition.top,
            onDragEnd: function () {
                window.dispatchEvent(new Event('resize'));
            },
            autoScroll: {
                target: container
            }

        });

        const _endDragable = new PlainDraggable(endEl, {
            onMove: function (newPostion) {
                _self.set_position(newPostion,id2);
                console.log("ssssssssssss");
                // plaincomponent.position();
                window.dispatchEvent(new Event('resize'));
            },
            onDrag: function (newPostion) {
                console.log(newPostion,"newPostionnewPostionnewPostion");
            },
            containment: document.getElementById('dropArea'),
            left: _endElementPosition.left, top: _endElementPosition.top,
            onDragEnd: function () {
                window.dispatchEvent(new Event('resize'));
            },
            autoScroll: {
                target: container
            }
        });
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

    // rerenderTable(data:any){
    //     if(this.data.entityRelationship.length > 0){
    //         console.log("innnnnnnnnnnnn", this.data.entityRelationship, data);
    //         this.data.entityRelationship.forEach((e,index) => {
    //             console.log(e.primaryTable , data.name , e.relationalTable , data.name)
    //             if(e.primaryTable === data.name || e.relationalTable === data.name){
    //                 console.log(e,"eeeeeeeeeeeeeeeeeee");
    //                 e.line.remove();
    //                 e['line'] = this.leader(e.primaryTable, e.relationalTable);
    //                 this.data.entityRelationship[index] = e
    //             }
    //         });
    //     }
    // }

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

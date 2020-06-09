import { Directive, OnInit, ElementRef, Input, AfterViewInit, OnChanges } from '@angular/core';
declare let PlainDraggable: any;
@Directive({
    selector: '[plainDrag]'
})

export class DragbleElementDirective implements AfterViewInit {
    @Input('plainDrag') plainDrag: string;
    @Input('entityCordinates') entityCordinates: any[] = [];

    constructor(private _elem: ElementRef) { }
    ngAfterViewInit() {
        const element = document.getElementById(this.plainDrag);
        const coordinate = this.getCordinates(this.plainDrag);
        const draggable = new PlainDraggable(element, {
            left: coordinate.left, top: coordinate.top,
            onDragEnd: (event) => {
                const table = this.entityCordinates.find(item => item.tablename === this.plainDrag);
                if (table) {
                    table.positionXY = event;
                } else {
                    this.entityCordinates.push({
                        tablename: this.plainDrag,
                        positionXY: event
                    });
                }

            }
        });

        // const permissions = this._permissionService.hasPermission(this.resourseName, this.resourseType);
        // this.applyPermission(permissions);
    }
    getCordinates(tablename) {
        const _entityCordinate = this.entityCordinates.find(item => item.tablename === tablename);
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

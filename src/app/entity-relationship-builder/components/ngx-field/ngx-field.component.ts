import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef
} from '@angular/core';
import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'entity-field',
  templateUrl: './ngx-field.component.html',
  styleUrls: ['./ngx-field.component.scss']
})
export class EntityFieldComponent implements OnInit {
  @ViewChild("item") public item: ElementRef;
  @ViewChild('actionItem') actionItem: ElementRef;
  @Input('field') public field: any;
  @Output('edit') edit: EventEmitter<any> = new EventEmitter();
  @Output('rerenderTable') rerenderTable : EventEmitter<any> = new EventEmitter();
  actionItemEnabled: boolean = false;
  available: boolean = true;
  constructor() {}
  position : any;
  ngOnInit() {
    this.position = { ...this.field.position };
    console.log(this.field,"field")
  }

  onControlDrop(event, field) {
    if (this.available) {

      // }
    } else {

    }

  }

  resetField(field: any) {
     
  }

  addColumn() {
  }

  removeColumn(field) {
    
  }

  

  // initialPosition = { x: 100, y: 100 };
  // position = { ...this.field.position };
  offset = { x: 0, y: 0 };

  dragMoved(event: CdkDragMove) {
    console.log(`> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`);
  }

  dragEnd(event: CdkDragEnd) {
    const transform = this.item.nativeElement.style.transform;
    let regex = /translate3d\(\s?(?<x>[-]?\d*)px,\s?(?<y>[-]?\d*)px,\s?(?<z>[-]?\d*)px\)/;
    var values = regex.exec(transform);
    console.log(transform);
    this.offset = { x: parseInt(values[1]), y: parseInt(values[2]) };
    this.position.x = this.field.position.x + this.offset.x;
    this.position.y = this.field.position.y + this.offset.y;
    console.log(this.position, this.field.position, this.offset);
    this.rerenderTable.emit(this.field);
  }
  

}

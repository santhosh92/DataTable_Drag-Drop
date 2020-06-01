import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef
} from '@angular/core';

@Component({
  selector: 'entity-field',
  templateUrl: './ngx-field.component.html',
  styleUrls: ['./ngx-field.component.scss']
})
export class EntityFieldComponent implements OnInit {
  @ViewChild('actionItem') actionItem: ElementRef;
  @Input('field') public field: any;
  @Output('edit') edit: EventEmitter<any> = new EventEmitter();
  actionItemEnabled: boolean = false;
  available: boolean = true;
  constructor() { }

  ngOnInit() {
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

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-relation',
  templateUrl: './table-relation.component.html',
  styleUrls: ['./table-relation.component.css']
})
export class TableRelationComponent implements OnInit {

  @Input('entityRelationship') entityRelationship: any;
  @Input('tableList') tableList: any[];
  @Input('tableRelation') tableRelation: any;
  @Output('add') add: EventEmitter<any> = new EventEmitter();
  @Output('remove') remove: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  columns(tableName:string): any {
    return this.tableList.find(data => data.name === tableName);
  }

  disableOption(table:string): boolean{
    return this.entityRelationship.map(e => e.relationalTable).indexOf(table) > -1;
  }

  isValidAdd(fields:any):boolean{
    return ![
      fields.primaryTable,
      fields.relationalTable,
      fields.primaryKey,
      fields.foreginKey,
    ].every(Boolean);
  }

}

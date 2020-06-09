import { Component, Input, Inject } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-entity-relational',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class EntityRelationalComponent {
  @Input('table') table: any;
  @Input('tableList') tableList: any[];
  @Input('er') er: any;
  columns: any[];
  constructor() {
  }

  onTableSelect(table) {
    const _table = this.tableList.find(item => item.name === table);
    this.columns = _table.columns;
  }
}

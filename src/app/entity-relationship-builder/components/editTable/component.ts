import { Component, Input, Inject } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-table',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class EditTableComponent implements OnInit {
  table: any;
  tableList: any[];
  entityRelationship: any[];
  tableRelation : any[];
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTableComponent>) {
  }

  ngOnInit() {
    console.log(this.data.tables);
    this.table = JSON.parse(JSON.stringify(this.data.currentTable));
    this.tableList = this.data.tables;
    this.tableRelation = this.data.tables.filter(data => this.table.name !== data.name);
    this.entityRelationship = this.data.entityRelationship.length > 0 ?  [...this.data.entityRelationship] : [{
      'name': '',
      'primaryTable': this.table.name,
      'relationalTable': '',
      'primaryKey': '',
      'foreginKey': ''
    }];
  }

  addEr() {
    console.log(this.entityRelationship);
    this.entityRelationship.push({
      'name': '',
      'primaryTable': this.table.name,
      'relationalTable': '',
      'primaryKey': '',
      'foreginKey': ''
    });
    
  }

  removeEr(index) {
    console.log(index,"dddddddddddddd");
    this.entityRelationship.splice(index,1);
    console.log(this.entityRelationship);
  }

  columns(tableName){
    return this.tableList.find(data => data.name === tableName);
  }

  public save() {
    if(this.entityRelationship[0].relationalTable === ''){
      this.entityRelationship=[];
    }
    this.dialogRef.close({ table: this.table, er: this.entityRelationship });
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

}

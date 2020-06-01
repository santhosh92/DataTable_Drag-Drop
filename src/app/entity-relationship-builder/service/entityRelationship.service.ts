import { Injectable, Type, Input, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject, combineLatest, Observer } from 'rxjs';
 

@Injectable()
export class EntityBuilderService {
    public noOfSections = 1;
    public noOfColumn = 4;
    public defaultNoOfRows = 5;
    private fields: BehaviorSubject<any[]> = new BehaviorSubject([]);
    fields$: Observable<any[]> = this.fields.asObservable();
    constructor() { }

    // public createForm(formType?: string) {
    //     const _section = formType == 'section' ? 'Section 1' : null;
    //     this.createSection(_section, 1, 1);
    // }
    // public mergeField(fields: any[]) {
    //     const currentForm = this.fields.getValue() || [];
    //     const mergedFields = _.merge([], currentForm, fields);
    //     this.fields.next(mergedFields);
    // }

    // createSection(section, rowNo, colNo) {
    //     const currentForm = this.fields.getValue() || [];
    //     for (let _rowNo = 1; _rowNo <= this.defaultNoOfRows; _rowNo++) {
    //         for (let _col = 1; _col <= this.noOfColumn; _col++) {
    //             currentForm.push({ rowNo: _rowNo, colNo: _col, width: 24, section: section });
    //         }
    //     }
    //     const tempArray = [...currentForm];
    //     this.fields.next(tempArray);
    // }
     
    // updateSectionName(section, value) {
    //     const currentForm = this.fields.getValue();
    //     currentForm.forEach(item => {
    //         if (item.section == value) {
    //             item.section = section;
    //         }
    //     });
    //     this.fields.next(currentForm);

    // }
    // removeSection(section) {
    //     const currentForm = this.fields.getValue().filter(item => item.section !== section);
    //     const tempArray = [...currentForm];
    //     this.fields.next(tempArray);
    // }

    // createRow(section) {
    //     const currentSection = this.fields.getValue().filter(item => item.section == section);
    //     const rowNo = currentSection[currentSection.length - 1].rowNo + 1;
    //     const currentForm = this.fields.getValue() || [];
    //     for (let _col = 1; _col <= this.noOfColumn; _col++) {
    //         currentForm.push(new any({ rowNo: rowNo, colNo: _col, width: 24, section: section }));
    //     }
    //     const tempArray = [...currentForm];
    //     this.fields.next(tempArray);
    // }
    // public insertRow(field: any) {
    //     let currentForm = this.fields.getValue();
    //     let current_index = currentForm.findIndex(item => item.section == field.section && item.rowNo == field.rowNo && item.colNo == field.colNo) + 1;
    //     const _rowNo = field.rowNo + 1;
    //     for (let _col = 1; _col <= this.noOfColumn; _col++) {
    //         currentForm = insert(currentForm, current_index, new any({ rowNo: _rowNo, colNo: _col, width: 24, section: field.section }));
    //         current_index++;
    //     }
    //     currentForm.forEach((item, index) => {
    //         if (item.section == field.section && index > current_index) {
    //             item.rowNo = item.rowNo + 1
    //         }
    //     });
    //     const tempArray = [...currentForm];
    //     this.fields.next(tempArray);
    // }

    // public updatetRow(fields: any[], libriries) {
    //     let currentForm = this.fields.getValue();
    //     let current_index = currentForm.findIndex(item => item.section == fields[0].section && item.rowNo == fields[0].rowNo);
    //     const last_index = currentForm.filter(item => item.section == fields[0].section && item.rowNo == fields[0].rowNo).length + current_index;
    //     const _rowNo = fields[0].rowNo;
    //     let currentLib;
    //     while (current_index < last_index) {
    //         const library = libriries.find(lib => lib.id == currentForm[current_index].libraryID);
    //         if (currentForm[current_index].elementType == 'CUSTOM') {
    //             library.controls.forEach(control => {
    //                 currentForm[current_index].control = control;
    //                 current_index++;
    //             });
    //         } else if (currentForm[current_index].elementType !== null && library) {
    //             if (currentLib !== library.id) {
    //                 currentLib = library.id;
    //                 library.controls.forEach(control => {

    //                     if (currentForm[current_index].libraryID === library.id) {
    //                         currentForm[current_index].control = control;
    //                         current_index++;
    //                     } else {
    //                         currentForm = insert(currentForm, current_index, new any({
    //                             rowNo: _rowNo,
    //                             colNo: currentForm[current_index].colNo,
    //                             width: 24,
    //                             section: currentForm[current_index].section,
    //                             elementType: library.elementType,
    //                             control: control,
    //                             libraryID: library.id,
    //                             elementName: library.elementName,
    //                             description: library.description
    //                         }));

    //                         // fields.push(
    //                         //   new any({
    //                         //     rowNo: field.rowNo,
    //                         //     colNo: i,
    //                         //     width: 24,
    //                         //     section: field.section,
    //                         //     elementType: library.elementType,
    //                         //     control: control,
    //                         //     libraryID: library.id,
    //                         //     elementName:library.elementName,
    //                         //     description:library.description
    //                         //   }));
    //                     }
    //                 });
    //             } else {
    //                 currentForm[current_index].control = null;
    //                 currentForm[current_index].libraryID = null;
    //                 currentForm[current_index].elementType = null;
    //                 currentForm[current_index].elementName = null;
    //                 currentForm[current_index].actionEnabled = false;
    //                 currentForm[current_index].description = null;
    //                 current_index++;
    //             }
    //         }

    //     }

    //     // for (let _col = 1; _col <= this.noOfColumn; _col++) {
    //     //     currentForm = insert(currentForm, current_index, new any({ rowNo: _rowNo, colNo: _col, width: 24, section: field.section }));
    //     //     current_index++;
    //     // }

    //     const tempArray = [...currentForm];
    //     this.fields.next(tempArray);
    // }

    // removeRow(field: any) {
    //     const currentForm = this.fields.getValue().filter(item => (item.section !== field.section || item.rowNo !== field.rowNo));
    //     const tempArray = [...currentForm];
    //     this.fields.next(tempArray);
    // }

    // removeField(field: any) {
    //     const currentForm = this.fields.getValue().filter(item => (item.section !== field.section || item.rowNo !== field.rowNo || item.colNo !== field.colNo));
    //     const tempArray = [...currentForm];
    //     this.fields.next(tempArray);
    // }
 

    // public addFields(field: any, data: any) {
    //     let currentForm = this.fields.getValue();
    //     let current_index = currentForm.findIndex(item => item.section == field.section && item.rowNo == field.rowNo && item.colNo == field.colNo);
    //     const max_index = this._getMaxAvailablefieldIndex(current_index, data.controls.length);
    //     const childControls = data.controls.filter(item => item.conditionalControl);
    //     let controls = data.controls.filter(item => item.conditionalControl == null);
    //     controls.forEach((element, i) => {
    //         if (current_index < max_index) {
    //             currentForm[current_index].control = element;
    //             currentForm[current_index].libraryID = data.id;
    //             currentForm[current_index].elementType = data.elementType;
    //             currentForm[current_index].elementName = data.name;
    //             currentForm[current_index].actionEnabled = data.actionEnabled;
    //             currentForm[current_index].description = data.description;
    //             currentForm[current_index].g3File = data.g3File
    //         } else {
    //             currentForm = insert(currentForm, current_index,
    //                 new any({
    //                     rowNo: field.rowNo,
    //                     width: 24,
    //                     section: field.section,
    //                     control: element,
    //                     libraryID: data.id,
    //                     elementType: data.elementType,
    //                     elementName: data.name,
    //                     actionEnabled: data.actionEnabled,
    //                     description: data.description,
    //                     g3File: data.g3File
    //                 }));
    //         }
    //         current_index++;
    //     });
    //     if (childControls && childControls.length > 0) {
    //         const lastIndex = currentForm.map(item =>
    //             item.section == field.section && item.rowNo == field.rowNo).lastIndexOf(true);
    //         current_index = lastIndex + 1;
    //         currentForm = insert(currentForm, current_index,
    //             new any({
    //                 rowNo: field.rowNo,
    //                 colNo: 1,
    //                 width: 100,
    //                 section: field.section,
    //                 elementType: 'space'
    //             }));
    //         current_index++;
    //         if (data.conditions && data.conditions.length > 0) {
    //             currentForm = insert(currentForm, current_index,
    //                 new any({
    //                     rowNo: field.rowNo,
    //                     width: 100,
    //                     section: field.section,
    //                     conditions: data.conditions,
    //                     fieldType: 'CONDITION',
    //                     controls: childControls,
    //                     libraryID: data.id,
    //                     elementType: data.elementType,
    //                     elementName: data.name,
    //                     actionEnabled: data.actionEnabled,
    //                     description: data.description,
    //                     g3File: data.g3File
    //                 }));
    //         } 
    //     }

    //     const _rows = currentForm.filter(item => item.section == field.section && item.rowNo == field.rowNo);
    //     _rows.forEach((row, colNo) => {
    //         row.colNo = colNo;
    //     });
    //     const tempArray = [...currentForm];
    //     this.fields.next(tempArray);
    // } 

    // public updateRow(rowNo: number, row: any) {
    //     this.fields[rowNo] = row;
    // }
    
    
    // public getFormatedTemplate() {
    //     return this.fields.getValue();
    // }

    // public _generateDefaultRow(rowNo, colNo): any {

    //     return {
    //         rowNo: rowNo,
    //         colNo: colNo,
    //         width: '1 1 calc(25%)'
    //     };
    // }

    
    // private _getMaxAvailablefieldIndex(currentIndex, colSpan) {
    //     const currentForm = this.fields.getValue();
    //     let max_index;
    //     for (let i = currentIndex; i < colSpan + currentIndex; i++) {
    //         if (currentForm[i].control && !max_index) {
    //             max_index = i;
    //             // return max_index;
    //         }
    //     }
    //     return max_index || colSpan + currentIndex;
    // } 
  
}
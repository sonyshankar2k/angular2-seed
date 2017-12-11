import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AgGridModule } from 'ag-grid-angular/main';
import { GridOptions } from 'ag-grid/main'
import { ChallengeService } from '../service/challenge.service';
import { Challenge } from '../entities/challenge.entity';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge-component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [ChallengeService]
})

export class ChallengeComponent implements OnInit {
  public rowData: any[] = [];
  public gridOptions: GridOptions;
  public columnDefs: any[];
  private errorMsg: string;

  constructor( private challengeService: ChallengeService ) {
      this.gridOptions = <GridOptions>{};
      this.columnDefs = this.createColumnDefs();
    };

  public ngOnInit() {}

  public ngAfterViewInit() {
    this.getAllData();
  }

  private getAllData() {
    this.challengeService.getAllUserData().subscribe(
      (res) => {
        res.forEach(element => {
          this.rowData.push({name: element.name,
            category: element.category,
            amount: element.amount});
        });
        this.gridOptions.api.setRowData(this.rowData);
      },
      (err) => {
        this.errorMsg = <any> err;
      }
    );
  }

  private createColumnDefs() {
    const columnDefs = [
        {
            headerName: 'name',
            field: 'name',
            checkboxSelection: false,
            suppressSorting: false,
            suppressMenu: false,
            pinned: true
        },
        {
          headerName: 'category',
          field: 'category',
          checkboxSelection: false,
          suppressSorting: false,
          suppressMenu: false,
          pinned: true
      },
      {
        headerName: 'amount',
        field: 'amount',
        checkboxSelection: false,
        suppressSorting: false,
        suppressMenu: false,
        pinned: true
      }              
    ]
    return columnDefs;
  }

}

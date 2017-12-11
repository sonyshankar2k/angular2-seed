import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AgGridModule } from 'ag-grid-angular/main';
import { GridOptions } from 'ag-grid/main'
import { ChallengeService } from '../service/challenge.service';
import { Challenge } from '../entities/challenge.entity';
import { ChallengeGroup, Dictionary } from '../entities/challengeGroup.entity';

@Component({
  selector: 'app-challenge-group',
  templateUrl: './challengeGroup.component.html',
  styleUrls: ['./challengeGroup-component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [ChallengeService]
})

export class ChallengeGroupComponent implements OnInit {
  private errorMsg: string;
  private challengeGroup: ChallengeGroup[] = [];
  private globalCategory :any[] = [];

  constructor( private challengeService: ChallengeService ) {};

  public ngOnInit() {}

  public ngAfterViewInit() {
    this.getData();
  }

private getData() {
  this.challengeService.getAllUserData().subscribe(
    (res) => {
      res.forEach(element => {
        this.globalCategory.push(element.category);
      });        

      this.globalCategory = this.globalCategory.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      });

      res.forEach(element => {
        if (this.challengeGroup.filter(a => a.name === element.name).length > 0 ) {
          this.challengeGroup.filter(a => a.name === element.name)[0].data.filter(a => a.key == element.category)[0].value = element.amount;
        } else {
          let cGroup = new ChallengeGroup();
          this.globalCategory.forEach(cat =>{
            let cDictionary = new Dictionary();
            cDictionary.key = cat;
            cDictionary.value ='-';
            cGroup.data.push(cDictionary); 
          })

          cGroup.data.filter(a => a.key == element.category)[0].value = element.amount;
          cGroup.name = element.name;
          this.challengeGroup.push(cGroup);
        }
      });
      this.challengeGroup.sort((a, b) =>{
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0; });
    });
}

}

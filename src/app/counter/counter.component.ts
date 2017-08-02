import { Component } from '@angular/core';
import { IDownloadCount } from './shared/counter.models';
import { CounterService } from './shared/counter.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  public packageForm: FormGroup;
  @LocalStorage() public packageName: string = 'angular-switchable-grid';
  public showForm: boolean;
  public lastDay: number;
  public lastWeek: number;
  public lastMonth: number;

  constructor(private counterService: CounterService, private fb: FormBuilder) {
    this.createForm();
    this.lastDay = 0;
    this.lastWeek = 0;
    this.lastMonth = 0;
    this.showForm = false;

    if (this.packageName) {
      this.getDownloads();
    } else {
      this.showForm = true;
    }
  }

  private getLastDayDownloadCounts(): void {
    this.counterService.getDownloads(this.packageName, 'last-day').subscribe((response: IDownloadCount) => {
      this.lastDay = response.downloads;
    });
  }

  private getLastWeekDownloadCounts(): void {
    this.counterService.getDownloads(this.packageName, 'last-week').subscribe((response: IDownloadCount) => {
      this.lastWeek = response.downloads;
    });
  }

  private getLastMonthDownloadCounts(): void {
    this.counterService.getDownloads(this.packageName, 'last-month').subscribe((response: IDownloadCount) => {
      this.lastMonth = response.downloads;
    });
  }

  private createForm(): void {
    this.packageForm = this.fb.group({
      packageName: [this.packageName, [Validators.required]]
    });
  }

  private getDownloads(): void {
    this.getLastDayDownloadCounts();
    this.getLastWeekDownloadCounts();
    this.getLastMonthDownloadCounts();
  }

  private onSubmit(): void {
    this.showForm = false;
    this.getDownloads();
  }

}

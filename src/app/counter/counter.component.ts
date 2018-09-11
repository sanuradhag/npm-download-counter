import {Component} from '@angular/core';
import {IDownloadCount} from './shared/counter.models';
import {CounterService} from './shared/counter.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {LocalStorage} from 'ngx-store';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  public packageForm: FormGroup;
  @LocalStorage() public packageName = 'angular-switchable-grid';
  @LocalStorage() public startDate = '2016-01-01';
  @LocalStorage() public endDate = '2019-12-31';

  public showForm: boolean;
  public noDownloads: boolean;
  public lastDay: number;
  public lastWeek: number;
  public lastMonth: number;
  public allDownloads: number;

  constructor(private counterService: CounterService, private fb: FormBuilder) {
    this.createForm();
    this.lastDay = 0;
    this.lastWeek = 0;
    this.lastMonth = 0;
    this.allDownloads = 0;
    this.showForm = false;
    this.noDownloads = false;

    if (this.packageName) {
      this.getDownloads();
    } else {
      this.showForm = true;
    }
  }

  public onSubmit(): void {
    this.showForm = false;
    this.getDownloads();
  }

  public onPackageClick(packageName): void {
    const url = `https://www.npmjs.com/package/${packageName}`;
    window.open(url, '_blank');
  }

  private getLastDayDownloadCounts(): void {
    this.counterService.getDownloads(this.packageName, 'last-day').subscribe((response: IDownloadCount) => {
      this.lastDay = response.downloads;
      this.noDownloads = false;
    }, (error) => {
      this.noDownloads = true;
    });
  }

  private getLastWeekDownloadCounts(): void {
    this.counterService.getDownloads(this.packageName, 'last-week').subscribe((response: IDownloadCount) => {
      this.lastWeek = response.downloads;
      this.noDownloads = false;
    }, (error) => {
      this.noDownloads = true;
    });
  }

  private getLastMonthDownloadCounts(): void {
    this.counterService.getDownloads(this.packageName, 'last-month').subscribe((response: IDownloadCount) => {
      this.lastMonth = response.downloads;
      this.noDownloads = false;
    }, (error) => {
      this.noDownloads = true;
    });
  }

  private createForm(): void {
    this.packageForm = this.fb.group({
      packageName: [this.packageName, [Validators.required]],
      startDate: [this.startDate],
      endDate: [this.endDate]
    });
  }

  private getDownloads(): void {
    this.getLastDayDownloadCounts();
    this.getLastWeekDownloadCounts();
    this.getLastMonthDownloadCounts();
    this.getAllDowloads();
  }

  private getAllDowloads(): void {
    this.counterService.getDownloads(this.packageName, `${this.startDate}:${this.endDate}`).subscribe((response: IDownloadCount) => {
      this.allDownloads = response.downloads;
      this.noDownloads = false;
    }, (error) => {
      this.noDownloads = true;
    });
  }


}

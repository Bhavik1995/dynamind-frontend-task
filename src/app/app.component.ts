import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HighchartsChartModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dynamind-frontend-task';
  Highcharts: typeof Highcharts = Highcharts;
  chartForm!: FormGroup;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Market Qtr Report',
      align: 'left',
    },
    series: [{
      data: [
        {y: 3000, color: 'Green'},
        {y: 2000, color: 'Blue'},
        {y: 5000, color: 'Yellow'}
      ],
      type: 'bar'
    }]
  };

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.chartForm = this.fb.group({
      january: [3000, Validators.required],
      february: [2000, Validators.required],
      march: [5000, Validators.required],
      januaryColor: ['green', Validators.required],
      februaryColor: ['blue', Validators.required],
      marchColor: ['yellow', Validators.required],
      chartType: ['bar', Validators.required]
    });

    this.chartForm.get('chartType')?.valueChanges.subscribe(chartType => {
      this.updateChartType(chartType);
    });
  }

  onSubmit(): void {
    const values = this.chartForm.value;
    this.generateChart(values);
  }

  generateChart(values: any): void {
    const chartData: Highcharts.Options = {
      chart: {
        type: values.chartType
      },
      title: {
        text: 'Market Qtr Report'
      },
      xAxis: {
        categories: ['January', 'February', 'March']
      },
      series: [{
        data: [
          { y: values.january, color: values.januaryColor },
          { y: values.february, color: values.februaryColor },
          { y: values.march, color: values.marchColor }
        ],
        type: values.chartType
      }]
    }
    this.chartOptions = chartData;   
  }

  updateChartType(chartType: string): void {
    const values = this.chartForm.value;
    values.chartType = chartType;
    this.generateChart(values);
  }
}

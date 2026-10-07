import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { first } from 'rxjs/operators';
import { ChartComponent } from 'ng-apexcharts'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart: any = ChartComponent;

  totalRevenue: any = 0;
  totalCustomers: any = 0;
  activeCustomers: any = 0;
  suspendCustomers: any = 0;
  recentMovieData: any = [];
  recentTvshowData: any = [];
  totalMovies: any = 0;
  totalTvshows: any = 0;
  revenueDaysSelector = "TotalRevenue";
  customersDaysSelector = "TotalActivity";
  chartOptions : any = [];

  constructor(
    private dashboardService : DashboardService,
    private toastr : ToastrService,
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Total Customers",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Active Customers",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "Suspended Customers",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      chart: {
        height: 650,
        type: "line",
        toolbar: {
          show: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Customer Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val: any, opts: any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val: any) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    }
   }

  ngOnInit(): void {
    this.getrevenuedetails();
    this.getrecentlyaddedmovies();
    this.getrecentlyaddedtvshows();
    this.getcustomerscountdetails();
  }

  getrevenuedetails() {
    this.dashboardService.getrevenueamount(this.revenueDaysSelector)
    .pipe(first())
    .subscribe(
      res => {
        this.totalRevenue = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  revenueChange(selectedDate: any) {
    this.revenueDaysSelector = selectedDate;
    this.dashboardService.getrevenueamount(this.revenueDaysSelector)
    .pipe(first())
    .subscribe(
      res => {
        this.totalRevenue = res.data;
        if (this.totalRevenue == null) {
          this.totalRevenue = 0;
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  getrecentlyaddedmovies() {
    this.dashboardService.getrecentlyaddedmovies()
    .pipe(first())
    .subscribe(
      res => {
        this.recentMovieData = res.moviedata;
        this.totalMovies = res.moviecountdata;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  getrecentlyaddedtvshows() {
    this.dashboardService.getrecentlyaddedtvshows()
    .pipe(first())
    .subscribe(
      res => {
        this.recentTvshowData = res.tvshowdata;
        this.totalTvshows = res.tvshowcountdata;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  getcustomerscountdetails() {
    this.dashboardService.getcustomerscount(this.customersDaysSelector)
    .pipe(first())
    .subscribe(
      res => {
        this.totalCustomers = res.totalcustomerscountdata;
        this.activeCustomers = res.activecustomerscountdata;
        this.suspendCustomers = res.suspendcustomerscountdata;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  customersChange(selectedDate: any) {
    this.customersDaysSelector = selectedDate;
    this.dashboardService.getcustomerscount(this.customersDaysSelector)
    .pipe(first())
    .subscribe(
      res => {
        this.totalCustomers = res.totalcustomerscountdata;
        this.activeCustomers = res.activecustomerscountdata;
        this.suspendCustomers = res.suspendcustomerscountdata;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  seasonSlideConfig = {
    "autoplay": true,
    "infinite": false,
    "draggable": true, 
    "loop": false,
    "slidesToShow": 3, 
    "slidesToScroll": 3,
    responsive: [     
      {
        breakpoint: 1700,
        settings: {
          "slidesToShow": 2,
          "slidesToScroll": 2
        },
      },   
      {
        breakpoint: 1199,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1
        },
      },                      
      {
        breakpoint: 767,
        settings: {
          "slidesToShow": 2,
          "slidesToScroll": 2
        },
      },
      {
        breakpoint: 576,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1
        },
      }
    ]
  };

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/services/customers.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  status = false;
  getCustomersData: any = [];
  totalCustomers: any = 0;
  totalPages: any = [];
  totalRevenue: any;
  activeCustomers: any = 0;
  suspendCustomers: any = 0;
  next: any = 0;
  numofPage: any = 0;
  nextButton: any = false;
  prevButton: any = true;
  searchType: any = '';
  searchValue: any = '';
  pageIndex : any = '';

  constructor(
    private customersService : CustomersService,
    private toastr : ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getrevenuedetails();
    this.getcustomers(0,'','');
  }

  getrevenuedetails() {
    this.customersService.getrevenuedetails()
    .pipe(first())
    .subscribe(
      res => {
        this.totalCustomers = res.countdata;
        this.totalRevenue = res.revenuedata;
        this.activeCustomers = res.activecustdata;
        this.suspendCustomers = res.suspendcustdata;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }
  searchcustomers(event: any, type: any) {
    this.getcustomers(0, event.target.value, type);
  }

  getcustomers(offset: any, searchValue: any, searchType: any) {
    this.searchValue = searchValue;
    this.searchType = searchType;
    const custData = {
      'offset': offset,
      'searchValue': searchValue,
      'searchType': searchType
    }
    this.customersService.getcustomers(custData)
    .pipe(first())
    .subscribe(
      res => {
        this.getCustomersData = res.data;
        const totalRecords = res.totalrecords/10;
        this.totalPages = Math.ceil(totalRecords);
        this.numofPage = this.totalPages - 1;
        this.pageIndex = offset + 1;
        if (offset == this.numofPage) {
          this.nextButton = true;
        } else {
          this.nextButton = false;
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  paginationSelectClick(offset: any, event: any) {
    let redDivs = document.querySelectorAll('.page-item');
      let i = 0;
      if (redDivs.length) {
        for(i=0;i<redDivs.length;i++) {
          redDivs[i].classList.remove('active');
        }
      }
      let target = event.currentTarget;
      target.classList.add("active");

      this.next = offset;

      if (offset != 0) {
        this.prevButton = false; 
      } else {
        this.prevButton = true; 
      }

      if (offset == this.numofPage) {
        this.nextButton = true;
      } else {
        this.nextButton = false;
      }
      
      this.pageIndex = offset + 1;
      
      const custData = {
        'offset': offset,
        'searchValue': this.searchValue,
        'searchType': this.searchType
      }
      this.customersService.getcustomers(custData)
      .pipe(first())
      .subscribe(
        res => {
          this.getCustomersData = res.data;
          const totalRecords = res.totalrecords/10;
          this.totalPages = Math.ceil(totalRecords);
        },
        error => {
          this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  counter(i: number) {
    return new Array(i);
  }
}

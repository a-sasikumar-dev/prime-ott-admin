import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/services/customers.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})

export class CustomerProfileComponent implements OnInit {

  customerId: any;
  customerName: any = '';
  customerEmail: any = '';
  customerPhone: any = '';
  customerImage: any = 'assets/images/avatardefault.png';
  customerState: any = '';
  customerCountry: any = '';

  subName: any = '';
  subAmount: any = '';
  subDuration: any = '';
  nextPaymentDate: any = '';
  subStatus: any = '';

  successfullPayment: any = 0;
  failedPayment: any = 0;
  recurringPayment: any = 0;
  paymentHistoryData: any = []; 
  agentData: any = [];
  watchHistoryData: any = []; 
  dataLength: any = 0;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    paging: true,
  };

  constructor(
    private customersService : CustomersService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.queryParamMap.get('cId');
    this.getcustomerdetail();
    this.getcurrentsubscription();
    this.getcustomerpaymentdetails();
    this.getagentdata();
    this.getpaymenthistory();
    this.getwatchhistory();
    // this.dtOptions = {
      
    // };
  }
  
  getcustomerdetail() {
    this.customersService.getcustomerdetail(this.customerId)
    .pipe(first())
    .subscribe(
      res => {
        this.customerName = res.data[0].customer_name;
        this.customerEmail = res.data[0].customer_email;
        this.customerPhone = res.data[0].customer_phone;
        this.customerState = res.data[0].state;
        this.customerCountry = res.data[0].country;
        if(res.data[0].profilepicture != null) {
          this.customerImage = res.data[0].profilepicture;
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  getcurrentsubscription() {
    this.customersService.getcurrentsubscription(this.customerId)
    .pipe(first())
    .subscribe(
      res => {
        this.subName = res.data[0].sub_name;
        this.subAmount = res.data[0].sub_amount;
        this.subDuration = res.data[0].sub_month;
        this.nextPaymentDate = res.data[0].next_payment_date;
        this.subStatus = res.data[0].sub_status;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  getcustomerpaymentdetails() {
    this.customersService.getcustomerpaymentdetails(this.customerId)
    .pipe(first())
    .subscribe(
      res => {
        this.successfullPayment = res.successpaymentdata;
        this.failedPayment = res.failedpaymentdata;
        this.recurringPayment = res.recurringpaymentdata;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  getagentdata() {
    this.customersService.getagentdata(this.customerId)
    .pipe(first())
    .subscribe(
      res => {
        this.agentData = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  getpaymenthistory() {
    this.customersService.getpaymenthistory(this.customerId)
    .pipe(first())
    .subscribe(
      res => {
        this.dataLength = res.data.length;
        this.paymentHistoryData = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }


//watch history
getwatchhistory() {
  this.customersService.getwatchhistory(this.customerId)
  .pipe(first())
  .subscribe(
    res => {
      this.watchHistoryData = res.data;
    },
    error => {
      this.toastr.error(error.error.errors[0]['msg']);
    });
}

}

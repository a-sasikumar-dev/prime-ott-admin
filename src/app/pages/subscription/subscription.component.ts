import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  
  status = false;
  toggleForm()
  {
    this.status = !this.status;       
  }
  subscirbeSelector = "Active";
  ngDropDwonClick(value: any) {
    this.subscirbeSelector = value;
  }

  isLoading = false;
  submitted = false;
  subForm = new FormGroup({
    'subName' : new FormControl(null, Validators.required),
    'subMonth' : new FormControl(null, Validators.required),
    'subAmount' : new FormControl(null, Validators.required)
  });
  subPlans: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private subService : SubscriptionService
  ) {
    this.getsubplans();
   }

  ngOnInit(): void {
  }

  getsubplans() {
    this.subService.getsubplans()
      .pipe(first())
      .subscribe(
        res => {
          this.subPlans = res.data;
        },
        error => {
          this.isLoading = false;
          this.toastr.error(error.error.errors[0]['msg']);
        });
  }

  setSubStatusClick(subId: any, status: any, event: any) {
    this.subService.updatesubstatus(subId,status)
    .pipe(first())
    .subscribe(
      res => {
        this.toastr.success(res.success[0]['msg']);
        this.subPlans = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
        event.target.checked = false;
      });
  }

  onSubmit() {
    this.submitted = false;
    if (this.subForm.valid) {
      this.isLoading = true;
      this.subService.addsubscriptionplan(this.subForm.value)
      .pipe(first())
      .subscribe(
        res => {
          this.subForm.reset();
          this.toastr.success(res.success[0]['msg']);
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.toastr.error(error.error.errors[0]['msg']);
        });
    } else {
      this.isLoading = false;
      this.submitted = true;
    }
  }

}

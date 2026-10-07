import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { MediauploadService } from 'src/app/services/mediaupload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  progress: number = 0;
  filledForm = true;
  updateForm = false;
  isLoading = false;
  submitted = false;
  fileUpload = true;
  fileCircleProgress = false;
  eyeOn = true;
  eyeOff = false;
  eyeOn_1 = true;
  eyeOff_1 = false;
  eyeOn_2 = true;
  eyeOff_2 = false;
  imageObj!: File;
  imageUrl: string = '';
  

  profileForm = new FormGroup({
    'fullname' : new FormControl(null, Validators.required),
    'phone' : new FormControl(null, Validators.required),
    'email' : new FormControl(null, [Validators.required, Validators.email])
  });

  passwordForm = new FormGroup({
    'currentpassword' : new FormControl(null, Validators.required),
    'newpassword' : new FormControl(null, Validators.required),
    'confirmpassword' : new FormControl(null, Validators.required)
  });

  editClick()
  {
    this.updateForm = true;
    this.filledForm = false;
  }
  updateClick()
  {
    this.filledForm = true;
    this.updateForm = false;
  }

  fullname: any;
  phone: any;
  email: any;
  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private adminService : AdminService,
    private mediauploadService : MediauploadService,
  ) {
    this.getadmindetails()
   }

  ngOnInit(): void {
  }

  /* Passowrd Text Show Hide */
  eyeOnClick() {
    this.eyeOff = true;
    this.eyeOn = false
  }
  eyeOffClick() {
    this.eyeOn = true;
    this.eyeOff = false;
  }

  eyeOnClick_1() {
    this.eyeOff_1 = true;
    this.eyeOn_1 = false
  }
  eyeOffClick_1() {
    this.eyeOn_1 = true;
    this.eyeOff_1 = false;
  }

  eyeOnClick_2() {
    this.eyeOff_2 = true;
    this.eyeOn_2 = false
  }
  eyeOffClick_2() {
    this.eyeOn_2 = true;
    this.eyeOff_2 = false;
  }

  getadmindetails() {
    this.adminService.getadmindetails()
      .pipe(first())
      .subscribe(
        res => {
          this.fullname = res.data.fullname;
          this.phone = res.data.phone;
          this.email = res.data.email;
          this.imageUrl = res.data.profilepicture;
          this.profileForm.setValue({
            'fullname' : res.data.fullname,
            'phone' : res.data.phone,
            'email' : res.data.email
          });
        },
        error => {
          this.toastr.error(error.error.errors[0]['msg']);
        });
  }

  onSubmit() {
    this.submitted = false;
    if (this.profileForm.valid) {
      this.isLoading = true;
        let adminData = {'adminId': this.accessTokenObj['id']}
        let mergedData = Object.assign(this.profileForm.value, adminData)
        this.adminService.updateadmindetails(mergedData)
        .pipe(first())
        .subscribe(
          res => {
            this.fullname = this.profileForm.value.fullname;
            this.phone = this.profileForm.value.phone;
            this.email = this.profileForm.value.email;
            
            this.toastr.success(res.success[0]['msg']);
            this.isLoading = false;
            this.filledForm = true;
            this.updateForm = false;
          },
          error => {
            this.isLoading = false;
            this.toastr.error(error.error.errors[0]['msg']);
          });
    }  else {
        this.isLoading = false;
        this.submitted = true;
      }
  }

  onImagePicked(event: Event) {
    const FILE = (event.target as HTMLInputElement).files![0];
    this.imageObj = FILE;
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.mediauploadService.uploadavatar(
      imageForm
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            // console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            // console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.fileCircleProgress = true;
            this.fileUpload = false;
            this.progress = Math.round(event.loaded / event.total! * 100);
            // console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            this.imageUrl = event.body.filepath;
            this.toastr.success('Avatar Successfully Updated');
            this.progress = 0;
            this.fileUpload = true;
            this.fileCircleProgress = false;
            this.accessTokenObj['profilepicture'] = this.imageUrl;
            localStorage.setItem("currentAdmin",JSON.stringify(this.accessTokenObj));
        }
      });
   }

  onSubmitPassword() {
    this.submitted = false;
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.newpassword == this.passwordForm.value.confirmpassword) {
        this.isLoading = true;
      const passwordData = {'adminId': this.accessTokenObj['id']}
      let mergedData = Object.assign(this.passwordForm.value, passwordData)
      this.adminService.updatepassword(mergedData)
      .pipe(first())
      .subscribe(
        res => {
          this.toastr.success(res.success[0]['msg']);
          this.isLoading = false;
          this.passwordForm.reset();
          this.eyeOn = true;
          this.eyeOn_1 = true;
          this.eyeOn_2 = true;
          this.eyeOff = false;
          this.eyeOff_1 = false;
          this.eyeOff_2 = false;
        },
        error => {
          this.isLoading = false;
          this.toastr.error(error.error.errors[0]['msg']);
        });
      } else {
        this.toastr.error('New password and confirm password is not same');
      }
      
    } else {
      this.isLoading = false;
      this.submitted = true;
    }
  }
}

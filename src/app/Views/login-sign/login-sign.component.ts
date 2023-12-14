import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import djb2a from 'djb2a';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login-sign',
  templateUrl: './login-sign.component.html',
  styleUrls: ['./login-sign.component.css']
})
export class LoginSignComponent implements OnInit{
  isLogin: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginError?: string;
  registerError?: string;

  constructor(private formBuilder: FormBuilder, private service: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    let currentType = localStorage.getItem('userType')
      if (currentType !== null) {
        switch(currentType) {
          case '0':
            this.router.navigate(['admin']);
          break;
          case '1':
            this.router.navigate(['ambulance-manager']);
          break;
          case '2':
            this.router.navigate(['user']);
          break;
        }
      }
  }

  toggleForm(){
    this.isLogin = !this.isLogin;
  }

  onLoginSubmit(){

    this.service.login(this.loginForm.value.username.toLowerCase(), djb2a(this.loginForm.value.password)).subscribe(
      {
        next: (data)=> {
          if (data != undefined) {
            localStorage.setItem('_id', data._id);
            localStorage.setItem('userType', data.userType);
            if (data.userType === 0) {
              this.router.navigate(['admin']);
            } else if (data.userType === 1) {
              this.router.navigate(['ambulance-manager']);
            } else {
              this.router.navigate(['user']);
            }
          } else {
            this.loginError = "Incorrect username/password.";
          }
        }
      }
    );
  }

  onRegisterSubmit(){
    this.service.userExists(this.registerForm.value.username).subscribe({
      next: (data)=> {
        if (data === null) {
          let registerData = {
            'username': this.registerForm.value.username.toLowerCase(),
            'password': djb2a(this.registerForm.value.password),
            'userType': 2,
            'notificationsToken': "",
            'notifications': [],
            'userInfo': {
              'fullName': this.registerForm.value.fullName,
              'age': this.registerForm.value.age,
              'gender': this.registerForm.value.gender,
              'email': this.registerForm.value.email
            },
            'patientData': {
              'state': 0,
              'token': this.registerForm.value.username.toLowerCase() + "-" + this.randomNumber(),
              'pairedBracelet': "-1",
              'medicalHistory': "",
              'patientReadings': {
                'heartRate': 0,
                'bloodPressure': {
                  'systolic': 0,
                  'diastolic': 0
                },
                'location': {
                  'longitude': 0,
                  'latitude': 0
                }
              }
            }
          }
          this.service.register(registerData).subscribe({
            next: (data)=> {
              localStorage.setItem('_id', data._id);
              localStorage.setItem('userType', data.userType);
              this.router.navigate(['user']);
            }
          })
        } else {
          this.registerError = "Username already exists.";
        }
      }
    });
  }

  numSequence(): Array<number> {
    let ageSequence = new Array();
    for (let i = 15; i<=90; i++)
      ageSequence.push(i);
    return ageSequence;
  }

  randomNumber(): string {
    return String(Math.floor(Math.random() * 100) + 1)
  }
}

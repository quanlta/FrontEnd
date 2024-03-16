import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../api/services/auth/auth.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  userInfo: any;

  fullname: any;
  age: any;
  phone: any;
  email: any;
  image: any;
  frame: any;
  facebook: any;
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo() {
    this.authService.getUserInfo().subscribe(
      (response) => {


        this.userInfo = {
          id: response.payload.id,
          email: response.payload.email,
          fullname: response.payload.fullname,
          facebook: response.payload.facebook,
          image: response.payload.image,
          role: response.payload.role,
        };

        const userJson = JSON.stringify(this.userInfo);
        localStorage.setItem('user', userJson);
      },
      (error) => {
        // Handle login error
        alert('get info failed');
        console.error('get info failed', error);
      }
    );
  }

  handleUpdateInfo(key: string, e: any) {
    if (key == 'fullname') {
      this.fullname = e.target.value;
    } else if (key == 'age') {
      this.age = e.target.value;
    } else if (key == 'phone') {
      this.phone = e.target.value;
    } else if (key == 'image') {
      this.image = e.target.value;
      this.frame = document.getElementById('frame');
      this.frame.src = URL.createObjectURL(e.target.files[0]);
      this.onFileSelected(e)
    } else if (key == 'email') {
      this.email = e.target.value;
    } else if (key == 'facebook') {
      this.facebook = e.target.value;
    }
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.authService.uploadAvatar(file).subscribe(
      response => {

      },
      error => {

      }
    );
  }
  onUpdateUserInfo() {
    this.authService
      .updateUserInfo(
        this.userInfo.id,
        this.fullname,
        this.facebook,
        this.image
      )
      .subscribe(
        (response) => {
          alert('update success');
          this.getUserInfo()
        },
        (error) => {
          // Handle login error
          alert('update failed');
          console.error('update failed', error);
        }
      );
  }
}

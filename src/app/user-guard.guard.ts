import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './api/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Lấy thông tin của người dùng từ AuthService
    const userInfo = this.authService.getInfo();

    // Kiểm tra xem người dùng có quyền admin không
    if (userInfo && userInfo.role === 'STUDENT') {
      return true; // Cho phép truy cập nếu người dùng là admin
    } else {
      // Nếu không phải admin, chuyển hướng đến trang chính
      // hoặc trang khác tùy thuộc vào yêu cầu của ứng dụng
      // ở đây, chúng ta sẽ chuyển hướng đến trang '/login'
      // Bạn có thể thay đổi thành trang khác nếu cần
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Không cho phép truy cập
    }
  }
}

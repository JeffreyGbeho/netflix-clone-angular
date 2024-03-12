import { Component } from '@angular/core';
import { LOGO_URL, BG_URL } from '../../shared/constants/global.constant';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  public LOGO_URL: string = LOGO_URL;
  public BG_URL: string = BG_URL;
}

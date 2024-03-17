import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() profileThumbnail: string = '';

  public links = [
    { path: '/browse', label: 'Home' },
    { path: '/profiles', label: 'My List' },
  ];

  faEdit = faPencil;

  constructor(private router: Router) {}

  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

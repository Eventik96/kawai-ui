import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public themeService: ThemeService) {}

  isMenuOpened:boolean;
  isMenuMinimized:boolean;

  menuItems = []
}

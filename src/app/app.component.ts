import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSearchForm = false;
  searchQuery = '';

  constructor(private router: Router) {}

  onSearch() {
    this.router.navigate(['/employee-list'], { queryParams: { search: this.searchQuery } });
  }

  navigateToAddEmployee() {
    this.router.navigate(['/employee-form']);
  }
}

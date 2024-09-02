import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  selectedEmployee: any;
  showModal: boolean = false;
  searchQuery: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.loadEmployees();
      this.filterEmployees();
    });
  }

  loadEmployees() {
    this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
  }

  filterEmployees() {
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      this.filteredEmployees = this.employees.filter(employee => 
        employee.name.toLowerCase().includes(query) || employee.id.toString().includes(query)
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  editEmployee(employee: any) {
    employee.isEditing = true;
  }

  saveEmployee(employee: any) {
    employee.isEditing = false;
    this.updateLocalStorage();
  }

  cancelEdit(employee: any) {
    employee.isEditing = false;
    this.loadEmployees(); // Reload the employees to discard changes
    this.filterEmployees();
  }

  deleteEmployee(id: number) {
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees = employees.filter((emp: { id: number }) => emp.id !== id);
    localStorage.setItem('employees', JSON.stringify(employees));
    this.loadEmployees(); // Refresh the list
    this.filterEmployees();
  }

  viewEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  updateLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.loadEmployees();
    this.filterEmployees();
  }
}

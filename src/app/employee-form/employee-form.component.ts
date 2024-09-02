import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee = {
    id: 0,
    name: '',
    role: '',
    experience: 0
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { id: number };

    if (state?.id) {
      this.loadEmployee(state.id);
    }
  }

  loadEmployee(id: number) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const employeeToEdit = employees.find((emp: any) => emp.id === id);
    if (employeeToEdit) {
      this.employee = { ...employeeToEdit };
    }
  }

  onSubmit() {
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');

    if (this.employee.id) {
      // Update existing employee
      employees = employees.map((emp: any) => emp.id === this.employee.id ? this.employee : emp);
    } else {
      // Add new employee
      this.employee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
      employees.push(this.employee);
    }

    localStorage.setItem('employees', JSON.stringify(employees));
    this.router.navigate(['/employee-list']);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from 'src/app/models/employee-model';
import {Observable} from 'rxjs';

import {Subject} from 'rxjs';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  formData: Employee;

    readonly APIUrl = "https://localhost:44321/api/";

    getEmpList(): Observable<Employee[]>{
      return this.http.get<Employee[]>(this.APIUrl +  '/employee');
    }

    addEmployee(dep:Employee){
      return this.http.post(this.APIUrl+'/Employee', dep)
    }

    deleteEmployee(id: number){
      return this.http.delete(this.APIUrl+'/employee/'+id);
    }

    updateEmployee(dep: Employee) {
      return this.http.put(this.APIUrl+ '/employee',dep);
    }

    getDropDownValues():Observable<any>{
      return this.http.get<Department[]>(this.APIUrl+'/department');
    }

    private _listeners = new Subject<any>();
    listen(): Observable<any>{
      return this._listeners.asObservable();
    }

    filter(filterBy: string) {
      this._listeners.next(filterBy);
    }
  }


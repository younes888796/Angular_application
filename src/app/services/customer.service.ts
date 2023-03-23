import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Customer } from '../core/models/customer.model';

const API_URL = 'http://localhost:3000/customers';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) { }

  getCustomers() :Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL);
  }

  getCustomerById(id:number) :Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/${id}`);
  }

  createCustomer(customer:Customer) :Observable<Customer> {
    return this.http.post<Customer>(API_URL, customer);
  }

  updateCustomer(customer:Customer) :Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}/${customer.id}`, customer);
  }

  deleteCustomer(id:number) :Observable<Customer> {
    return this.http.delete<Customer>(`${API_URL}/${id}`);
  }


  search(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?q=${name}`);
  }

  accountNumberExists(accountNumber: any): Observable<boolean> {
    return this.http.get<any>(`${API_URL}/accounts?accountNumber=${accountNumber}`)
      .pipe(
        map((response: any) => response.length > 0)
      );
  }
  
  getCustomerByPhoneNumber(phoneNumber: any): Observable<boolean | null> {
    return this.http.get<any>(`${API_URL}?phoneNumber=${phoneNumber}`)
      .pipe(
        map((response: any) => response.length > 0)
      );
  }

  
  
  getCustomerWithHighestBalance(): Observable<Customer> {
    return this.http.get<Customer[]>(API_URL).pipe(
      map((customers: Customer[]) => {
        let highestBalance = -Infinity;
        let cus: Customer = <Customer>{};
        for (const customer of customers) {
          for (const account of customer.accounts) {
            if (account.balance > highestBalance) {
              highestBalance = account.balance;
              cus = customer;
            }
          }
        }
        return cus;
      })
    );
  }

  
  getCustomerWithLowestBalance(): Observable<Customer> {
    return this.http.get<Customer[]>(API_URL).pipe(
      map((customers: Customer[]) => {
        let lowestBalance = Infinity;
        let customerWithLowestBalance: Customer = <Customer>{};
        
        for (const customer of customers) {
          for (const account of customer.accounts) {
            if (account.balance < lowestBalance) {
              lowestBalance = account.balance;
              customerWithLowestBalance = customer;
            }
          }
        }
  
        return customerWithLowestBalance;
      })
    );
  }

  getTotalCustomers(): Observable<number> {
    return this.http.get<Customer[]>(API_URL).pipe(
      map((customers: Customer[]) => {
        return customers.length;
      })
    );
  }

  getTotalBalance(): Observable<number> {
    return this.http.get<Customer[]>(API_URL).pipe(
      map((customers: Customer[]) => {
        let totalBalance = 0;
        for (const customer of customers) {
          for (const account of customer.accounts) {
            totalBalance += account.balance;
          }
        }
        return totalBalance;
      })
    );
  }
  
  
  

}

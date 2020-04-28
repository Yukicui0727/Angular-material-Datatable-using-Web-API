import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { DataSource} from '@angular/cdk/collections';
import { User } from '../../models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
  allUser:User[]; 
  dataSource: MatTableDataSource<User>; 
  displayedColumns = ['userId', 'id', 'title', 'body'];
 

 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: UserService,){  
    this.service.getUser().subscribe(data =>{  
      this.dataSource = new MatTableDataSource(data);  
      this.dataSource.paginator = this.paginator;  
      this.dataSource.sort = this.sort;  
    });  
  }  
    ngOnInit() {  
      this.dataSource.paginator = this.paginator;  
      this.dataSource.sort = this.sort;  
       
    }  
    
    applyFilter(filterValue: string) {  
      this.dataSource.filter = filterValue.trim().toLowerCase();  
    
      if (this.dataSource.paginator) {  
        this.dataSource.paginator.firstPage();  
      }  
    }  
  }  
  
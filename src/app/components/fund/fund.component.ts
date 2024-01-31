/*
import { Component, OnInit } from '@angular/core';
import { FundService } from '../../services/fund.service';

@Component({
  selector: 'app-data',
  standalone: true,
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {

  data: any[];

  constructor(private dataService: FundService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataService.fetchData().subscribe(response => {
      this.data = response?.data || []; // Assuming the data array is nested under the 'data' property
    });
  }
}
*/
import {Component, OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FundService } from "../../services/fund.service";

  @Component({
    selector: "app-fund",
    standalone: true,
    imports:[CommonModule],
    templateUrl: "./fund.component.html",
    styleUrls: ["fund.component.css"]
  })

  export class FundComponent implements OnInit {
    datas: any;

    constructor(private dataService: FundService) {
    }

    ngOnInit(): void {
      console.log('ngOnInit called'); // Log when ngOnInit is called
      this.dataService.getData().subscribe(response => {
        console.log(response); // Log the response data to check
        this.datas = response;
      });
    }
  }

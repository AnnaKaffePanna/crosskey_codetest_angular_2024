import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FundService } from '../../services/fund.service';
import { FundData } from '../../models/fund.model';

@Component({
  selector: 'app-fund',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fund.component.html',
  styleUrls: ['fund.component.css'],
})

export class FundComponent implements OnInit {
  //Initialize parameter
  fundData$: Observable<FundData[]> | null = null;
  constructor(private fundService: FundService) {}

  ngOnInit(): void {
    this.fundData$ = this.fundService.getData();
    // You have to subscribe to be able to log response data
    this.fundData$.subscribe((data) => {
      console.log(data);
    });
  }
}

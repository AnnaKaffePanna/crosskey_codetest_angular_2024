import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundComponent } from './fund.component';
import { FundService } from '../../services/fund.service';
import { FundData } from '../../models/fund.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FundComponent', () => {
  let component: FundComponent;
  let fixture: ComponentFixture<FundComponent>;
  let fundServiceSpy: jasmine.SpyObj<FundService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FundService', ['getData']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: FundService, useValue: spy }],
    }).compileComponents();

    // Mocking FundService
    fundServiceSpy = TestBed.inject(FundService) as jasmine.SpyObj<FundService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundComponent);
    component = fixture.componentInstance;
  });

  it('should be create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on initialization', () => {
    // Test data
    const testData: FundData[] = [
      { fundName: 'Test Fund', change1m: 0.05, change3m: 0.1, change3y: 0.2 },
    ];

    fundServiceSpy.getData.and.returnValue(of(testData));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(fundServiceSpy.getData).toHaveBeenCalled();
    expect(component.fundData$).toBeTruthy();

    // Check if fundData$ is not null before subscribing
    if (component.fundData$) {
      // Subscribe to the component's observable and compare emitted values
      component.fundData$.subscribe((emittedData) => {
        expect(emittedData).toEqual(testData);
      });
    } else {
      // Fail the test if fundData$ is null
      fail('fundData$ is null');
    }
  });
});

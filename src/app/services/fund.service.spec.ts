import { TestBed } from '@angular/core/testing';
import { FundService } from '../services/fund.service';
import { FundData } from '../models/fund.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('FundService', () => {
    let service: FundService;
    let httpMock: HttpTestingController;
  
    beforeEach(async () => {
        TestBed.configureTestingModule({ 
            imports: [HttpClientTestingModule], // Import HttpClientTestingModule
            providers: [FundService] 
        });
        service = TestBed.inject(FundService); // Inject FundService
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
      });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch data from API and transform it correctly', () => {
        const mockResponse = [
          {
            data: [
              { fundName: 'Fund A', change1m: 0.05, change3m: 0.1, change3y: 0.2 },
              { fundName: 'Fund B', change1m: 0.03, change3m: 0.08, change3y: 0.15 },
              { fundName: 'Fund C', change1m: 0.02, change3m: null, change3y: 0.18 }
            ]
          }
        ];
    
        const expectedData: FundData[] = [
          { fundName: 'Fund A', change1m: 0.05, change3m: 0.1, change3y: 0.2 },
          { fundName: 'Fund B', change1m: 0.03, change3m: 0.08, change3y: 0.15 }
        ];
    
        service.getData().subscribe((data: FundData[]) => {
          expect(data).toEqual(expectedData);
        });

    const req = httpMock.expectOne('https://ivarpivar.netlify.app/api');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
 
  it('should handle errors properly', () => {
    const errorMessage = 'Test error message';
    spyOn(console, 'error');

    const errorObservable = service['handleError'](errorMessage);

    errorObservable.subscribe({
      error: (error: any) => {
        expect(error).toBe(errorMessage);
        expect(console.error).toHaveBeenCalledWith('An error occurred:', errorMessage);
      }
    });
});
});

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  private firstObsSubscripition!: Subscription;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.firstObsSubscripition = interval(1000).subscribe( count => console.log(count));

    // const firstCustomObservable = Observable.create( (observer:any) => {
    //   let count = 0;
    //   setInterval(()=>{
    //     observer.next(count);
    //     count++;
    //   },1000)
    // });

    // const firstCustomObservable = Observable.create( (observer:any) => {
    //   setInterval(()=>{
    //     observer.next('count');
    //   },1000)
    // });

     // this.firstObsSubscripition = firstCustomObservable.subscribe((data:any) =>{
    //   console.log(data);
    // })

    // Angular v 18
    const firstCustomObservable = new Observable<number>((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        observer.next(count);
        if(count == 4){
          observer.complete();
        }
        if(count >3){
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);

      // Provide a way to clean up the interval when the observable is unsubscribed
      return () => {
        clearInterval(interval);
      };
    });

    // this.firstObsSubscripition = firstCustomObservable.subscribe({
    //   next: (value) => console.log('Value:', value),
    //   // error: (err) => console.error('Error:', err),
    //   error: (err) => {
    //     console.log('Error:', err);
    //     alert(err.message);
    //     console.log('Error:', err);
    //   },
    //   complete: () => console.log('Complete'),
    // });

    this.firstObsSubscripition = firstCustomObservable.pipe(
      filter((data) => {
      return data>0; // skip 0 and starts from 1
    }),
    map((data) => {
      return 'Round:' + (data + 1); //1+1=2
    })
  ).subscribe({
      next: (value) => console.log('Value:', value),
      // error: (err) => console.error('Error:', err),
      error: (err) => {
        console.log('Error:', err);
        alert(err.message);
        console.log('Error:', err);
      },
      complete: () => console.log('Complete'),
    });



  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.firstObsSubscripition.unsubscribe();
  }
}

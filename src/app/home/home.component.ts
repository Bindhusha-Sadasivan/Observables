import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';

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
        count++;
      }, 1000);

      // Provide a way to clean up the interval when the observable is unsubscribed
      return () => {
        clearInterval(interval);
      };
    });

    this.firstObsSubscripition = firstCustomObservable.subscribe({
      next: (value) => console.log('Value:', value),
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Complete'),
    });



  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.firstObsSubscripition.unsubscribe();
  }
}

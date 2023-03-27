import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

// The 'filter' operator:
// It's an RxJS counterpart of the 'filter' known from JavaScript arrays.
// If a value gets emitted by the source, this operator will either pass it through to the output or not, based on the condition we provide to it.
// Let's see how the 'filter' operator affects each notification type.
// So, let's start with the next notifications. For each emitted value 'filter' can act in two ways. It can either pass the value further if it meets the condition provided by us to the 'filter' operator, and if it doesn't, the value won't be remitted further.
// The 'filter' operator affects the next notifications only, so the error will always be reemitted further unchanged. And the same will happen for the complete notification. It will also be passed through.

// Example 1:
// Output:
// {category: "Sports", content: "B"}
// {category: "Sports", content: "D"}

// Defining NewsItem model using TypeScript interface
interface NewsItem {
  category: 'Business' | 'Sports';
  content: string;
}

const newsFeed$ = new Observable<NewsItem>((subscriber) => {
  setTimeout(() => {
    subscriber.next({ category: 'Business', content: 'A' });
  }, 1000);
  setTimeout(() => {
    subscriber.next({ category: 'Sports', content: 'B' });
  }, 3000);
  setTimeout(() => {
    subscriber.next({ category: 'Business', content: 'C' });
  }, 4000);
  setTimeout(() => {
    subscriber.next({ category: 'Sports', content: 'D' });
  }, 6000);
  setTimeout(() => {
    subscriber.next({ category: 'Business', content: 'E' });
  }, 7000);
});

// So the 'pipe' method allows us to provide the Pipeable Operators we want to apply here and it will connect all these operators together and return the final output Observable with all these operators applied in the provided order so we can subscribe to it over here.

// newsFeed$
//   .pipe(filter((item) => item.category === 'Sports'))
//   .subscribe((item) => console.log(item));

// Now, before we move on, let's have a look at one more thing. The 'filter' operator that we've applied here, and actually and the other Pipeable Operator, takes what it has above as that input. Which in our case is the 'newsFeed$' Observable and creates a new Observable with the logic extended with the operator's features. So, it's valid to do something like this.

const sportsNewsFeed$ = newsFeed$.pipe(
  filter((item) => item.category === 'Sports')
);

sportsNewsFeed$.subscribe((item) => console.log(item));

// So, in this coding section, we've learned how can we use a Pipeable Operator to create a new Observable which extends the logic of an already existing one. We have used the 'filter' operator to create a new feed including the sports news only.

const log = (message: string, userId?: string) => {
  console.log(message, userId);
}

log('Error');

log('Error', '1234');

const add = (...num: number[]) => {
  return num.reduce((total, n) => total + n, 0);
}

function generateDate(this: Date) {
  return `${this.getMonth() + 1}/${this.getDate()}`;
}
generateDate.call(new Date);

// ジェネレーター

function* createNum(): Generator<number> {
  let n = 0;
  while(true) {
    yield n+=1;
  }
}

let num = createNum();
num.next();
num.next();

let numbers = {
  *[Symbol.iterator]() {
    for(let n = 1; n <= 10; n += 1) {
      yield n;
    }
  }
}

function times(
  f: (index: number) => void,
  n: number
) {
  for(let i = 0; i < n; i+=1) {
    f(i);
  }
}

times((n) => console.log(n * 2), 3);

type Reservation = string;

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
}

// 実装する時はこうなる
const reserve: Reservation = (from: Date, toOrDestination: Date | string, destination?: string) => {
  if(toOrDestination instanceof Date && destination !== undefined) {
    // 引数３つ
  } else if (typeof toOrDestination === 'string') {
    // 引数２つ
  }
}

type Filter<T> = (array: T[], f: (item: T) => boolean) => T[];

# O'REILLY プログラミング TypeScript

## 4章 関数

### 関数の宣言と呼び出し

- 引数は基本的に型を推論されないため型を明示的に宣言する
- 様々な関数宣言があるが(`=>`,`function`)関数コントラクタ(`new Function()`)は安全ではないので使用すべきではない

#### オプションパラメータとデフォルトパラメータ

- `?`を使ってパラメータを省略可能と指定することが可能

```ts
const log = (message: string, userId?: string) => {
  console.log(message, userId);
}

log('Error');

log('Error', '1234');
```

- デフォルトパラメータを設定することでオプションではなくすことも可能

```ts
const log = (message: string, userId = '----') => {
  console.log(message, userId);
}

log('Error');

log('Error', '1234');
```

#### レストパラメータ

- レストパラメータも配列として型を指定できる

```ts
const add = (...num: number[]) => {
  return num.reduce((total, n) => total + n, 0);
}
```

#### call,apply,bind

- 関数を呼び出す方法は他にもいくつかある

```ts
function add(a: number, b: number) {return a + b};
add(1, 2);
add.apply(null, [1, 2]);
add.call(null, 1, 2);
add.bind(null, 1, 2)();
```

- apply...値を関数ないのthisにバインドする。引数を展開する
- call...applyとやっていることはほぼ同じだが、引数を順番に適用する
- bind...新しい関数を返しているので()で呼び出す必要がある

#### thisの型付け

> Tips: クラスメソッド以外でthisを使用禁止にするにはTSLintの`no-invalid-this`を有効にする

- thisに型指定をできる

```ts
function generateDate(this: Date) {
  return `${this.getMonth() + 1}/${this.getDate()}`;
}
generateDate.call(new Date);
```

#### ジェネレーター

- yieldを使用してcallされたタイミングで次のyieldまで処理を実行
- ジェネリクスで返す型明示できる

```ts
function* createNum(): Generator<number> {
  let n = 0;
  while(true) {
    yield n+=1;
  }
}

let num = createNum();
num.next();
num.next();
```

#### イテレーター

- イテラブルオブジェクトを`next`を利用するための方法
- イテラブルオブジェクト：`Symbol.iterator`と呼ばれるプロパティを含んでいるオブジェクト

#### 呼び出しシグネチャ

- 関数を定義したらその型は`Function`となる。だが、`object`が全てのオブジェクトを表現するように、全ての関数の包括的な型
- 関数の型は`(a: number,b: number) => number`**呼び出しシグネチャ**や**型シグネチャ**と呼ばれる

```ts
type Log = (message: string, userId?: string) => void
const showLog: Log = (message, userId) => {
  console.log(message, 'userId', userId);
}
```

#### 文脈的型付け

```ts
function times(
  f: (index: number) => void,
  n: number
) {
  for(let i = 0; i < n; i+=1) {
    f(i);
  }
}

times((n) => console.log(n * 2), 3);
// インラインで記述することで、引数の関数が型推論される
```

#### オーバーロードされた関数の型

- オーバーロードとはいうが、言語機能としてのサポートではなく型としてのサポートを行うことができる

```ts
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
```

- 具体的にシグネチャを実装することで、正しく使用されていることを保証できる

### ポリモーフィズム

- 関数の型に自由（ジェネリック）を持たせることでポリモーフィズムを実装する
- ジェネリックに型を継承させることで、多様性のある関数を実装できる

- ジェネリック型パラメータ
  - 型使用時に使用する型を指定できる

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}
```

#### ジェネリックはいつバインドされる

- 型を指定した関数を呼び出す時に具体的な型をバインドする

#### ジェネリックはどこで宣言できるか

```ts
type Filter<T> = (array: T[], f: (item: T) => boolean) => T[];
```

#### ジェネリックの型推論

- tsにおいて、ジェネリックはほとんどの場合型を推論してくれる

```ts
let filter = <T>(array: T[], f: (item: T) => boolean): T[] => {
  let list: T[] = [];
  array.forEach(item => f(item) && list.push(item));
  return list;
};

// 呼び出したタイミングでTをnumberと推論してくれる
console.log(filter([1, 2, 3], (n) => n>2));
```

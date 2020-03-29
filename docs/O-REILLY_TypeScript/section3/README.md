# O'REILLY プログラミング TypeScript

## 3章 型について

### 型

- 値と、それを使ってできる事柄の集まり

### 型の初歩
#### any
- anyは型のゴッドファーザー
- できるだけ避けるべきである
  - 避けるべき理由
  - なんでもできる型。つまり`TypeScriptのメリットが何もない`型
- anyを使いたい場合は、その理由について明示するべき

#### unknown
- 前もって本当に型がわからない値がある場合に、anyではなく`unknown`を使用する
1. TSは何かをunknownと推論することはない
2. unknown型の値と他の値を比較することができる
3. unknown値が特定の型であることを想定した事柄は行えない(以下コード参考)

- 3番はつまりどういうことかというと
```ts
let a: unknown = 30;
let b = a === 123;
let c = a +10; // エラー `+` は数値の持っている機能なので unknown では使用できない
if (typeof a === 'number') {
  let d = a + 10; // numberの判定をすれば動く
}
```

#### boolean

```ts
let a = true // boolean
const b = true // true
let f: true = false // Error true型にfalseは入れられない
```

1. 値がbooleanで固定される
2. constで宣言するとbooleanではなくtrue/false型になる
3. 特定のbool値だと方を宣言することができる

> Tips: 3番目のような一つの特定の値を許容する型を`リテラル型`という

#### number

- number型は基本的にはTypeScriptに型を推論させる。
- 変数宣言時にnumberを明示的に片付けする理由は特にない

```ts
let a = 100; // 変数に代入するだけなら肩を推論させていい
let b: number = 200; // 代入で明示的に宣言する理由は特にない
```

> Tips: 大きな数値を扱う時は_で区切ることができる `let oneMillion = 1_000_000`

#### bigint

- bigintはJabaScriptでもステージ段階の機能
- 大きな整数を扱うことができる
- number型は2^53まで扱えるが、bigint型はそれより大きな整数も表すことができる

```ts
let a = 1234n; // bigint型
let b = 12.34n; // Error 整数じゃないのでエラー
let c: bigint = 300; // 300はbigintじゃない（number）のでエラー
```

#### string

- 文字列とそれを使ってできること
- number boolean同様に、可能な限り型を推論させるべき

#### symbol

- ES2015で導入されたもの
- マップにおいて、文字列キーの代わりとして

```ts
let a = Symbol('a'); // symbol
let b: symbol = Symbol('b');
```

- symbolは一意な物なので、他のどのsymbolとも一致しないという特徴がある。
- constを宣言された時は、完全にユニークな値が設定されるので`unique symbol`型が設定される。

```ts
const a = Symbol('a'); // typeof a
const b: unique symbol = Symbol('b');
let c: unique symbol = Symbol('c'); // Error letにunique symbolは設定できない
const d = a === a; // OK
const e = a === b; // Error unique symbol同士は常にfalseを返すので
```

#### オブジェクト

- `{}`を使って作成するようなオブジェクトと、newを使って作成するようなオブジェクトを区別することはできない
- JSは**構造的**に型付けされるので、TSもそれに沿っている

> Tips: `構造的型付け(structural typing)` 

```ts
let a: object = {
  b: 'hoge'
};
a.b; // bが見つからない

let c = {
  d: 'hoge'
};
c.d; // hoge
```

- objectという型は`b`というパラメータを持っていない
- 型推論の時に`{d: string}`という型付けが行われる

```ts
// 変数の宣言のみ
let a: {b: string};

a = {}; // Error
```

- オブジェクトにある程度の範囲を持たせたキーの指定もできる。

```ts
let a: {
  b: number,
  [key: number]: boolean
}

a = {
  b: 10,
  1: true,
  2: false
}
```

- keyにはnuber型なら指定が可能
- keyの部分には任意の文字を指定可能

> Tips: `インデックスシグネチャ` [key: T]: U という構文。
> インデックスシグネチャで宣言するキーの型(T)は、numberかstringで無ければいけない。

```ts
let danger: {};
danger = {}; // 問題なく
danger = {x: 1}; // 問題なく。でも、TSを活用できていない
danger = 2; // これでも問題ない。これは危険!!!
```

- 上記の{},objectあと、Objectの型の違いを見ると下記表になる。

|値|{}|object|Object|
|:--|:--|:--|:--|
|{}| :o: | :o: | :o: |
|'a'| :o: | :x: | :o: |
|1| :o: | :x: | :o: |
|Symbol('1')| :o: | :x: | :o: |
|null| :x: | :x: | :x: |
|undefined| :x: | :x: | :x: |

#### 型エイリアス

- 変数宣言と同じように型も宣言することができる。

```ts
type Age = number;

type Person = {
  name: string,
  age: Age
};

type Age = 20; // Error Ageが宣言されているから、同じ型は宣言できない。

if (a === b) {
  type Age = 30; // 型もブロックスコープなのでここでの宣言は可能
}
```

- typeの扱いは、letやconstなどの変数と同じように扱うことができる。

##### 合併型と交差型

- AとBという型がある場合に、合併（和 `|`）もしくは交差（積 `&`）することが可能。

```ts
type Cat = {name: string, purrs: boolean};
type Dog = {name: string, barks: boolean, wags: boolean};

type CatOrDogOtBoth = Cat | Dog;  
type CatAndDog = Cat & Dog;
```
- `|`で結合したものは
  ```ts
  {
    name: 'tama',
    purrs: true,
    barks: true,
    wags: false
  }
  ```
  という値も受け取ることが可能。
- `&`で結合することで上記のような値は受け取らず、`Cat,Dog`のどちらかに一致した値のみ受け取る。

#### 配列

- 配列はすべての要素が同じ型を持つように設計をする。
- 配列の型宣言には2通りあるが、`T[]`も`Array<T>`も、意味もパフォーマンスもまったく同じ。

```ts
const createList = () => {
  let a = []; // any[]
  a.push('type');
  a.push(20);
  return a;
}
let list = createList(); // (stirng | number)[]
list.push(false); // Error booleanは入れられなくなっている
```

- `any`で宣言しても、関数から返却したら型が決まる。

#### タプル

- 配列の派生型
- その配列の各インデックスでの値は特定の既知の型を持つ

```ts
let a: [string, number] = ['taro', 20];
a = ['hanako', 'yasuna']; // Error numberにstringを入れられない
```

- オプショナル、可変長も宣言可能

```ts
let hoge: [string, string?]; // 一つもしくは二つのstring
let fuga: [string, ...string[]]; // 一つ以上のstring
```

##### 読み取り専用の配列とタプル

- readonlyで配列を宣言したら、破壊的メソッドは使用できなくなる。

```ts
let a: readonly number[] = [1, 2, 3];
a.push(4); // Error readonlyにpushは使えない
a[3] = 5; // Error 拡張もできない
a[2] = 6; // Error もちろん現在持っている値も変更できない
```

- 配列でreadonlyばかり使っていると、配列のコピーなどでメモリを余計に使用する構文を書くことになるかもしれないので、使う場所は考慮する必要がある。

#### null,undefined,void,never

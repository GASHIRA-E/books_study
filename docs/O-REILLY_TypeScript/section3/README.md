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
```typescript
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



# O'REILLY プログラミング TypeScript

## 2章 TypeScript:全体像

### コンパイラー

- Javaなどの言語だとコンパイルすると

1. プログラムがASTへと解析される
2. ASTがバイトコードにコンパイルされる
3. バイトコードがランタイムによって評価される

という流れ。

- TypeScriptは独特で、バイトコードに変換する代わりに`JavaScript`へと変換を行う

1. TSソース -> TS AST
2. TS ASTを型チェック
3. TS AST -> JSソース

- その後、ランタイム環境(Node.js/ブラウザ等)にて

4. JSソース -> JS AST
5. JS AST -> バイトコード
6. バイトコードが評価される 


> Tips: `AST...抽象構文木。プログラムの実行に必要な情報をノードとして持っている`

### 型システム

- 型システム: プログラマが作成したプログラムに肩を割り当てるために肩チェッカーが使用するルールの集まり

- 型システムには２つの種類がある
  - 明示的な構文を使って、全ての物の方をコンパイラに伝える必要がある物
  - 方を自動的に推論する物
- TSは両方から発想を得ているのでどちらもできる

```ts
let a: number = 1;
let b = 1;
// どちらもnumber型として扱われる
```

### 環境構築

1. `npm init -y`
2. `npm install -D typescript tslint @types/node`
3. `touch tsconfig.json`
```json
{
  "compilerOptions": {
    "lib": ["es2015"],
    "module": "commonjs",
    "outDir": "dist",
    "sourceMap": true,
    "strict": true,
    "target": "es2015"
  },
  "include": [
    "src"
  ]
}
```

#### tsconfig.jsonの設定
|オプション|説明|
|:-|:-|
|include|どのファイルを探すか|
|lib|実行する環境にどのASTが存在するとTSCが想定すべきか？|
|module|TSCがどのモジュールシステムにコンパイルするべきか？|
|strict|strictモード|
|target|TSCがコードをどのJavaScriptバージョンにコンパイルするべきか|


### tslint.json

- `node_modules/.bin/tslint --init` を実行することで初期ファイルが生成される。

### index.tsを作成

- `mkdir src`
- `touch src/index.ts`

- index.tsの中身に
  ```ts
  console.log('Hello TypeScript!')
  ```

- コンパイルして実行する
- `node_modules/.bin/tsc`
- `node dist/index.js`

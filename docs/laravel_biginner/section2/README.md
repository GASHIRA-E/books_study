# PHPフレームワーク Laravel入門 第2版

## 2章 ルーティングとコントローラ

### ルーティング
- アプリケーションの構成
- ファイルについて
  | ファイル | 説明 |
  | :------------- | :------------- |
  | .editorConfig | エディタに関する設定 |
  | .env .env.example | 動作環境に関する設定 |
  | .gitattributes .gitignore | git周り |
  | .styleci.yml | [styleCI](https://styleci.io/)というコードチェッカーのファイル(PHPのpublicリポジトリは無料) |
  | artisan | artisanで利用 |
  | composer.json composer.lock | composerで利用 |
  | package.json package.lock.json | npmで利用 |
  | phpunit.xml | phpのユニットテスト(PHPUnit)で利用 |
  | server.php | サーバー起動時に利用 |
  | webpack.mix.js | webpackで使用 |
  | yarn.lock | yarnで利用（みた限りデフォはnpmっぽい） |

- フォルダについて
  | フォルダ | 説明 |
  | :------------- | :------------- |
  | app | アプリケーションのプログラム部分がまとめられられる<br>アプリケーション周りは基本的にここ |
  | bootstrap | アプリケーション実行時に最初に行われる処理 |
  | config | 設定管絵系 |
  | darabase | データベース関連 |
  | public | 公開フォルダ jsやスタイルシートなど |
  | resources | リソース関係。プログラムが利用するリソースファイル<br>プログラムのテンプレートファイルなど |
  | routes | ルート情報の保存場所 |
  | storage | ファイルの保存場所。ログや、アプリケーションが保存するファイルなど |
  | tests | UT周り |
  | vendor | フレームワーク本体（多分触らない） |

- これからよく使うのは「app」「routes」
- 続いて「resources」でテンプレートを触って
- 「database」も使うようになる

#### 「app」フォルダについて
- laravelのほとんどのプログラムはappフィルダ内に用意される事になる
  | フォルダ/ファイル | 説明 |
  | :----- | :--- |
  | Console | コンソールプログラムを配置する |
  | Exceptions | 例外に関する処理を配置する |
  | Http | Webアプリケーションにアクセスした時の処理 |
  | Providers | プロパイダと呼ばれるプログラムを配置 |
  | User.php | ユーザー認証に関するスクリプト |

#### ルーティングと「routes」フォルダ
- 「routes」フォルダについて
  | ファイル | 説明 |
  | :------------- | :------------- |
  | api.php | APIのルーティング。例えばユーザー認証など |
  | channels.php | ブロードキャストチャンネルのためのルーティング |
  | console.php | コンソールプログラムのためのルーティング |
  | web.php | 一般的なWebページとしてアクセスするためのルーティング |

#### ルート情報を追加する

- localhost/hello にアクセスすると以下が呼び出される
- web.php

```php
Route::get('hello', function() {
  return '<html><head>title</head><body><h1>Hello</h1></body></html>';
});

Route::get('hello/{msg}', function($msg) {
  return "<html><head>title</head><body><h1>Hello</h1><p>{$msg}</p></body></html>";
});

// 
Route::get('hello/{id?}', function($id = 'no name') {
  return "<html><head>title</head><body><h1>Hello</h1><p>ID={$id}</p></body></html>";
});
```

### コントローラの利用

#### MVCとコントローラ

- Model
  - データ処理全般
- View
  - 画面表示を担当
- Controller
  - 全体の制御(Modelを使ったりしてViewを指定する)

#### コントローラの作成

- `artisan`コマンドを使用する
- `php artisan make:controller <コントローラ名>`

#### Controller.phpをチェックする

- Controllers名前空間
  - `namespace App\Http\Controllers;`
- useによるクラスのインポート
  - `use Illuminate\Http\Request;`
  - import構文
- クラスの定義
  ```php
    class HelloController extends Controller
    {
      //
    }
  ```
  - Controllerクラスを継承する

#### アクションを追加する

- コントローラに用意される処理は「アクション」と呼ばれる
  - HelloController.php
  ```php
    class HelloController extends Controller
    {
      // アクションとして関数を追加する
      // 戻り値はHTMLのソースコード
      public function index() {
        return hoge;
      }
    }
  ```
  - web.php (ルート)
  ```php
    Route::get('hello', 'HelloController@index');
  ```
  - Controllerにてアクションを設定して、ルート設定で`コントローラ名@メソッド名`という設定をすることで第1引数のアドレスにアクセスした時に第2引数のアクションが実行される

#### ルートパラメータの利用
- 変更箇所のみ
  - HelloController.php
  ```php
    public function index($id = 'user id', $pass = 'password') {
      return hoge;
    }
  ```
  - web.php (ルート)
  ```php
    Route::get('hello/{id?}/{pass?}', 'HelloController@index');
  ```

#### 複数アクションの利用
- 変更箇所のみ
  - HelloController.php
  ```php
    class HelloController extends Controller
    {
      public function index() {
        return hoge;
      }
      public function other() {
        return fuga;
      }
    }
  ```
  - web.php (ルート)
  ```php
  Route::get('hello', 'HelloController@index');
  Route::get('hello/other', 'HelloController@other');
  ```

> Tips: 一般的なアドレスの割当
> `http://アプリケーションのアドレス/コントローラ/アクション`
> とするのが一般的

#### RequestおよびResponse

- urlパラメータだけではなく、requestやresponseも扱うことができる

  - HelloController.php
  ```php
    use Illuminate\Http\Request;
    use Illuminate\Http\Response;

    class HelloController extends Controller
    {
      public function index(Request $request, Response $response) {
        $html = "<pre>$request</pre>";
        $response->setContent($html);
        return $response;
      }
    }
  ```

  - web.php (ルート)
  ```php
    Route::get('hello', 'HelloController@index');
  ```

> Tips: サービスとDI
> 上記の例だとindexでRequestとResponseを追加するとそれだけで利用できるようになった。
> これを理解するには「サービス」、「サービスコンテナ」という機能について理解する必要がある

## 感想/まとめ

- routes配下のファイルにルーティングの設定はまとまっている
- `app/http`配下にコントローラが生成される。
  - Controllerにメソッドを追加することで、一つのコントローラに複数のアクションを定義できる。

# PHPフレームワーク Laravel入門 第2版

## 3章 ビューとテンプレート

### PHPテンプレートの利用

#### ビューについて

- Laravelで使用されているテンプレートは大きく２つ
  - １つはPHPのソースコードをそのままテンプレートとして使う方法
  - もう一つは「Blade(ブレード)」と呼ばれるテンプレートエンジンを使った方法

#### PHPテンプレートを作る

- `resources/views`配下に配置する
- `hello`ディレクトリ作成して`index.php`を作成する
- `server/resources/views/hello/index.php`

#### テンプレートを表示する

- ルートから呼び出す
  ```php
    Route::get('hello', function() {
      return view('hello.index');
    });
  ```

- コントローラから呼び出す
  - ルート
    ```php
      Route::get('hello', 'HelloController@index');
    ```
  - コントローラ
    ```php
      public function index() {
        return view('hello.index');
      }
    ```

#### 値をテンプレートに渡す

- コントローラから値を渡す
- viewメソッドの第2引数で受け渡したいデータ(連想配列)を渡す
  - ビュー
    ```html
      <body>
        <p><?php echo $msg; ?></p>
      </body>
    ```

  - コントローラ
    ```php
      public function index() {
        $data = ['msg' => 'これはコントローラから渡されたメッセージです'];
        return view('hello.index', $data);
      }
    ```

### Bladeテンプレートを使う

- bladeテンプレート
  - `{{$変数}}`で表示できる
  - `server/resources/views/hello/index.blade.php`を作成
  - `index.blade.php`
    ```blade
      <p>{{$msg}}</p>
    ```

#### フォームを利用する

- テンプレートの用意
  - `@csrf`を入れるとトークンを付与してCSRF対策ができる
  - トークンがない物は基本的にLarabelでエラー吐く
  - bladeテンプレート
    ```html
      <body>
        <form method="post" action="/hello">
          @csrf
          <input type="text" name="msg" />
          <input type="submit" />
        </form>
      </body>
    ```

- コントローラにメソッドを追加
  - Controller.php
    ```php
      public function post(Request $request) {
        $msg = $request->msg;
        $data = [
            'msg' => "こんにちは、{$msg}さん！",
        ];
        return view('hello.index', $data);
    }
    ```

- POSTのルート設定
  - ルート情報の追記
  - web.php
    ```php
      Route::post('hello/', 'HelloController@post');
    ```

### Bladeの構文

#### 値の表示
- HTMLエスケープして処理される
  - `{{ 値・変数・式・関数など }}`
- HTMLエスケープ処理されないで表示される
  - `{!! 値・変数・式・関数など !!}`

#### @ifディレクティブ
- if文
  ```bleade
  @if (条件)
  @elseif (条件)
  @else
  @endif
  ```

#### 特殊なディレクティブ
- 条件が非成立の時に表示

```blade
@unless (条件)
...表示内容...
@endunless
```

- 変数が空の場合に表示

```blade
@empty (変数)
表示内容
@endempty
```

- 変数が定義済みの場合に表示

```blade
@isset (変数)
表示内容
@endisset
```

#### 繰り返しのディレクティブ

- for構文に相当するもの

```blade
@for (初期化;条件;後処理)
@endfor
```

- foreach構文に相当するもの

```blade
@foreach ($配列 as $変数)
@endforeach
```

- foreach-else構文

```blade
@forelse ($配列 as $変数)
...繰り返す表示
@empty
...変数が空の時の処理
@endforelse
```

- while構文

```blade
@while (条件)
@endwhile
```

#### @break と @continue

- @break...その時点で繰り返しのディレクティブが中断
- @continue...すぐに次の繰り返しに進む

#### $loopによるループ変数

- 繰り返しディレクティブには「`$loop`」という特別な変数が用意されている

| ループ変数 | 説明 |
| :------------- | :------------- |
| $loop->index | 現在のインデックス（ゼロから開始） |
| $loop->iteration | 現在の繰り返し数（１から開始） |
| $loop->remaining | あと何回繰り返すか（残り回数） |
| $loop->count | 繰り返しで使っている配列の要素数 |
| $loop->first | 最初の繰り返しかどうか（最初ならtrue） |
| $loop->last | 最後の繰り返しかどうか（最後ならtrue） |
| $loop->depth | 繰り返しのネスト数 |
| $loop->parent | ネストしている場合、親の繰り返しのループ変数を示す |

#### @phpディレクティブについて

- phpに囲われているでphpを使用できる

```blade
@php
@endphp
```

- 例

```blade
@php
$coounter=0;
@endphp
@while ($counter < count($data))
<li>{{$data[$counter]}}</li>
@php
$counter++;
@endphp
@endwhile
```

### レイアウトの作成


#### レイアウトの定義と継承

- 継承とは
  - すでにあるBladeのテンプレートを継承してそこにない要素だけを用意する
- セクションとは
  - レイアウト内に用意される区画。
  - ページ内にセクションの区画を用意してm継承して作られた新しいテンプレートでセクションの内容を用意する

#### @sectionと@yield

- @sectionについて
  - 同じ名前で指定された`@yeild`にはめ込まれ、表示される
  - 継承先で@sectionで上書きすることもできる
  ```
    @section(名前)
    @endsection
  ```

- @yieldについて
  - セクションの内容をはめ込んで表示するためのもの
  - 配置場所を示すもの
  ```
    @yield(名前)
  ```

#### ベースレイアウト
```html
<html>
<head>
  <title>@yield('title')</title>
</head>
<body>
  <h1>@yield('title')</h1>
  @section('menubar')
  <h2 class="menutitle">※メニュー</h2>
  <ul>
    <li>@show</li>
  </ul>
  <hr size="1">
  <div class="content">
    @yield('content')
  </div>
  <div class="footer">
    @yield('footer')
  </div>
</body>
</html>
```

- 土台で宣言した`@section`は`@show`で終わる

#### 継承レイアウトの作成
```blade
@extends('layouts.helloapp')

@section('title', 'Index')

@section('menubar')
  @parent
  インデックスページ
@endsection

@section('content')
  <p>ここが本文のコンテンツです</p>
  <p>必要なだけ記述できます</p>
@endsection

@section('footer')
  copyright 2020 Ega
@endsection
```

- `@extends`で使用するテンプレートを指定する

- sectionの第2引数で値を受け渡す
  - `@section('title', 'Index')`

- `@parent`を使用して継承元のテンプレートを使用する
  ```
    @section('menubar')
      @parent
      インデックスページ
    @endsection
  ```

#### コンポーネントについて

- `@component`ディレクティブ
  - コンポーネントの組み込み
  ```
    @component(名前)
      <p>{{$slot_1}}</p>
    @endcomponent
  ```

- スロットについて
  ```
  @component('components.message')
    @slot(slot_1)
      slotメッセージ
    @endslot
  @endcomponent
  ```

#### サブビューについて

- サブビュー

```
@include('components.message', [
  'msg_title'=>'OK',
  'msg_content'=>'サブビューです。'
])
```

#### eachに夜コレクションビュー

- `@each`による表示を利用する

```
  @each('components.item', $data, 'item')
```

### サービスとビューコンポーザ

#### ビューコンポーザとは

- コントローラとは別にビジネスロジックを使うって必要な情報を処理する機能
- ビューをレンダリングする際に使用する関数、クラス。

#### サービスとサービスプロパイダ

- サービスプロパイダの定義

```php
  namespace App\Providers;

  use Illuminate\Support\Facades\View;
  use Illuminate\Support\ServiceProvider;

  class プロパイダクラス extends ServiceProvider
  {
    public function register()
    {
      // コンポーザの設定
    }

    public function boot()
    {
      // コンポーザの設定
    }
  }
```

- `boot`メソッドは**ブートストラップ処理**(アプリケーションが起動する際に割り込んで実行される処理)を設定する

#### providerを作成

- artisanを利用すれば簡単に作成できる。
- `php artisan make:provider HelloServiceProvider`

- `View::composer(ビューの指定, 関数またはクラス)`というメソッドを実行することで、ビューコンポーザを設定する。

```php
  View::composer(
      'hello.index', function($view) {
          $view->with('view_message', 'composer message!');
      }
  );
```

- `$view`が用意されている。withというメソッドで変数などを追加するためのもの。

#### サービスプロパイダの登録

- `server/config/app.php`の`'providers' => [`に`App\Providers\HelloServiceProvider::Class,`を追加
- これで動くようになる

#### ビューコンポーザクラスの作成

- `server/app/Http/Composers/HelloComposer.php`を作成
- Composerを設定する

```php
namespace App\Http\Composers;

use Illuminate\View\View;

class HelloComposer {
  public function compose(View $view) {
    $view->with('view_message', 'this view is "'.$view->getName().'"!!');
  }
}
```

- `server/app/Providers/HelloServiceProvider.php`
- providerの指定でクラスを指定できる

```php
View::composer(
    'hello.index', 'App\Http\Composers\HelloComposer'
);
```

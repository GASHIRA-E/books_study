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

## 感想/まとめ

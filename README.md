# webpack で LP 制作の環境構築

## 使用技術

- webpack
- ejs
- sass
- Imagemin

## 起動方法

webpack 起動

```
npm run dev
```

- 環境変数を読み込み、dev ならソースマップを出力します。
- JS ファイルのサイズ適正化のため、プラグインなどの vendor ファイル群と 自作する module ファイル群で js ファイルの出力を分けます。

ローカルサーバー起動

```
npm start
```

## 納品前チェック

JS Lint

```
npm run lint
```

JS Lint の修正

```
npm run lint:fix
```

HTML の成形

```
npm run lint:html
```

プロジェクトのビルド

```
npm run build
```

- 環境変数を読み込み、build ならソースマップを出力しません。

## 注意点

- JS ファイルの成形`npm run lint:fix`をしてから、HTML ファイルの成形`npm run lint:html`を実行してください。
  逆で実行すると、HTML ファイルの成形が戻ってしまいます。

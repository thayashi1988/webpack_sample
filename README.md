# webpack で LP 制作の環境構築

## 使用技術

- webpack
- ejs
- sass
- 画像圧縮

## 起動方法

ファイルのコンパイル

```
npm run webpack
```

ローカルサーバー起動

```
npm start
```

## 納品前チェック

JS ファイルの構文チェック

```
npm run lint
```

JS ファイルの成形

```
npm run lint:fix
```

HTML ファイルの成形

```
npm run lint:html
```

プロジェクトのビルド

```
npm run build
```

## 注意点

- JS ファイルの成形`npm run lint:fix`をしてから、HTML ファイルの成形`npm run lint:html`を実行してください。
  逆で実行すると、HTML ファイルの成形が戻ってしまいます。

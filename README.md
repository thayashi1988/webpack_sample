# webpack で LP 制作の環境構築

## 使用技術

- webpack
- ejs
- sass
- 画像圧縮

## 起動方法

ファイルのコンパイル、バンドル

```
npm run webpack
```

ローカルサーバー起動

```
npm start
```

ファイルを圧縮

```
npm run build
```

## 注意点

ejs から HTML を生成した際にインデントなどが崩れるため、生成 HTML を command+s で保存をかけることで整形する。
settings.json の、
"editor.formatOnSave": false,
を true にして html ファイルを開き保存すること。

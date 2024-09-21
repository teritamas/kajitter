# かじったー

[デモページ](https://kajitter.vercel.app/)

## 概要

かじったー は家事を世界にオープンにし、みんなで家事をするモチベーションを高め合う SNS です。

## 全体構成

本アプリケーションは Vercel にデプロイされており、データベース/認証には Supabase を使用しています。

全体構成は以下の通りです。

![構成図](docs/arch.png)

## Quick Start

必要ライブラリをインストールします。

```bash
npm install
```

その後、以下のコマンドを実行することで、開発サーバーが立ち上がります。

```bash
npm run dev
```

開発サーバは 以下の URL からアクセスできます。

- http://localhost:3000

## デプロイ

本アプリケーションは以下のリポジトリと Sync した後 Vercel にデプロイされます。

- https://github.com/sey323/kajitter

# ちっく・たっく

Tick Tock にすると某 SNS と名前が非常に似るので、できるだけ被り感ないようにしました。以上です。

## For developers

### Contribute

要望のある方は Issue か Pull request を上げてください。

- コミットメッセージ

[AngularJS](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) のフォーマットを採用します。

Conventional Commits については [こちら](https://www.conventionalcommits.org/)

- CHANGELOG の更新

[git-chglog](https://github.com/git-chglog/git-chglog) を使用します。

ファイル名は `CHANGELOG.md` とし、バージョンタグを付けたコミットの後で `update CHANGELOG` というメッセージでコミットしてください。

```shell
git-chglog -o CHANGELOG.md
```

### Preview, build app

Prepare (npm required)

```shell
npm install # or npm update
```

Preview app

```shell
npm run start
```

Create icons

```shell
npm run create-icons
```

Build app

- Windows

```shell
npm run release-win
```

- Mac (execute as an administrator)

```shell
npm run release-mac
```

## その他

アイコンは [いらすとや](https://www.irasutoya.com/) 様より頂戴しました。ありがとうございます。

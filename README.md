# CEP-Study
CEPのお勉強用リポジトリ
* [CC Extension Builder](https://marketplace.visualstudio.com/items?itemName=hennamann.cc-extension-builder)のtopcoatにてCEPをビルド
* バージョンはCEP 9.0
* 機能をあまり想定してなかった
* npm-scriptによるタスクランナーを設定したい
* node.jsを利用したい

## 作業の手順
1. [manifest.xml](CSXS/manifest.xml)の修正
    1. InDesign用にコメントアウトを解除し `<Host Name="IDSN" Version="10.0" />` と記述
        * 対応バージョンを範囲で指定する場合は配列表記 `[10.0, 15.0]` のようにする
    2. Node.jsを利用するために[下記を記述](https://github.com/Adobe-CEP/CEP-Resources/blob/819a08432aa92710789d4f8197191fe5051b4a2b/CEP_9.x/Samples/CEP_HTML_Test_Extension-9.0/CSXS/manifest.xml#L40)
       ```xml
        <CEFCommandLine>
            <Parameter>--enable-nodejs</Parameter>
        </CEFCommandLine>
        ```
2. フォルダにnpmのrequestモジュールをインストール（HTTPリクエストとかしたい）
    * `$ npm install request`
    * CEPのフォルダ内に[package-lock.json](package-lock.json)と node_modules が生成される
    * 面倒くさいのでnode_modulesは[.gitignore](.gitignore)に追加した
3. Babelをインストール（新しいESで記述してES3にトランスパイル仕組みを用意したい）
    1. `$ npm init`
        * いろいろ聞かれるが全部Enterを押して[package.json](package.json)を生成した
    2. `$ npm install --save-dev @babel/core @babel/cli @babel/preset-env`
        * [pachage-lock.json](package-lock.json)にいろいろ記述される（これひょっとして.gitignore入れたほうがいい？）
    3. Babelの設定ファイルを作成する
        * フォルダのルートに[babel.config.json](babel.config.json)を作成
        * 下記を記述
            ```json
            {
                "presets": ["@babel/preset-env", "@babel/preset-typescript"]
            }
            ```
        * `presets`については下記の通り（[参考](https://qiita.com/koedamon/items/92c986456e4b9e845acd)）
            * `@babel/preset-env`: ECMAScript用
            * `@babel/preset-flow`: Flow用
            * `@babel/preset-react`: React用
            * `@babel/preset-typescript`: Typescript用
        * 今回はECMAScriptのバージョン違いに対応すればいいんだけど、将来的にTS書きたいとも思っているのでTS用も書いておく
        * 各presetに詳細な設定（`targets`指定）をしたい場合は配列で囲む  
            `["@babel/preset-env", {<@babel/preset-envの設定値>}]`
        * ES3対応のブラウザはIE6になるので、IE6をターゲットにする
            ```json
            {
                "presets": [
                    ["@babel/preset-env", {
                        "targets": {
                            "ie": 6
                        }
                    }], "@babel/preset-typescript"]
            }
            ```
        * PolyfillとuseBuiltInsオプション
            * `"useBuiltIns": "usage"`を追加
            * ただし experimental らしい
            * `Promise`とか使わない限りは気にしなくていいかもしれない……
            ```json
            {
                "presets": [
                    ["@babel/preset-env", {
                        "targets": {
                            "ie": 6
                        },
                        "useBuiltIns": "usage"
                    }], "@babel/preset-typescript"]
            }
            ```
        * 試しにトランスパイルしたら怒られが発生した
          * `useBuiltIns`オプション使うならcore-jsをインストールせよとのこと
          * `npm install --save core-js@3`した
          * そういう問題でもなかった
            * `@babel/preset-typescript`モジュールが見当たらないらしい
            * core-js@3をインストールしたけど怒られたので、babel.config.jsonから該当オプションを削除してみた
            ```json
            {
                "presets": [
                    ["@babel/preset-env", {
                        "targets": {
                            "ie": 6
                        }
                    }]
                ]
            }
            ```
        * トランスパイル成功
4. 自動トランスパイルを仕込む
    * [.babelrc](.babelrc)を追加
    * 下記を記述
      ```json
      {
            "presets": [
                ["env", {
                    "targets": {
                        "ie": 6
                    }
                }]
            ]
        }
      ```
    * `./node_modules/.bin/babel src/host.js -w -o jsx/host.jsx`を実行
      * `-w`オプションでファイルをwatchする
      * `-o`オプションでファイルとして出力する
      * このコマンドは[src/host.js](src/host.js)ファイルが保存されたら[jsx/host.jsx](jsx/host.jsx)にトランスパイルする、という意味
      * [参考にしたサイト](https://barikanblog.com/javascript-es6-babel/)
    * リポジトリがぐっっっちゃぐちゃになったのでリセットしたい
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
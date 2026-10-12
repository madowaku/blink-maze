# BLINK MAZE

**目を閉じれば、道が開く。でも、別の目が覚めてしまう。**

青と琥珀の目が反対に開閉する、8問の短いグリッドパズル。開いた目は壁、閉じた目は道。限られたBLINKで出口を目指します。時間制限・死亡・敵はありません。

## 遊ぶ

このフォルダをターミナルで開いて、Node.js 22.12以降で実行します。

```powershell
npm ci
npm run dev
```

開発用：<http://127.0.0.1:5201/>。配布用ビルドのプレビュー：`npm run build` → `npm run preview` → <http://127.0.0.1:5202/>。

- 矢印 / WASD、画面の方向ボタン：1マス移動
- Space / まばたき：目を一斉に反転
- Z / 戻す：直前の成功した操作を取り消す。BLINK残数も復元
- R / やり直す：この面を最初から
- ヒント：必要なときだけ表示。全8面を自由に選べます
- EN / JA：言語切替。音ボタン：BGM・SEのON/OFF（最初はOFF）

閉じた目に乗っている間はBLINKできません。失敗した操作は回数を使いません。クリア後は「次の迷路へ」「もう一度」「ステージを選ぶ」で進めます。進行と選択中の面はブラウザに保存し、保存が拒否されても遊べます。

## 検証・配布

```powershell
npm test
npm run typecheck
npm run build
npm run pack
```

`artifacts/blink-maze-v0.1.zip` は `index.html` がZIP直下にあるHTMLゲーム配布物です。`dist/` の内容を静的ホスティングに配置できます。外部API・CDN・リモートフォント・アカウントは不要です。ZIPの内容をブラウザゲームとして取り込む形式を想定しています。直接 `file://` で開く形式ではありません。

ソースのゲームルールは `src/core.ts`、付属のレベル原本は `src/levels.json`。UI・翻訳・音・保存・素材一覧はそれぞれ別ファイルです。既存のCRY WOLF本編から独立しています。

素材の出典・加工・ハッシュは `ASSET_PROVENANCE.md` と `docs/asset-manifest.json`、生成プロンプトは `docs/IMAGEGEN_PROMPTS.md` と `docs/TILE_ASSET_PROMPT.md`。QA結果は `docs/VALIDATION.md` と `design-qa.md`。

実機のタッチ・音声品質、初見でルールや迂回路に気づけるか、人間にとっての難易度と面白さは未検証です。

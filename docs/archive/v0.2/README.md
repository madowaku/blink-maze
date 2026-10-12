# BLINK MAZE v0.2

**目を閉じれば、道が開く。でも、別の目が覚めてしまう。**

目が彫られた石壁を切り替え、出口を目指す5問のパズルです。床はいつも存在し、壁は床と床の間にあります。開いた目の壁は通れず、閉じた目の壁は引いて通路になります。青と琥珀は、いつも反対に開閉します。

## 遊ぶ

このフォルダをターミナルで開き、Node.js 22.12以降で実行します。

~~~powershell
npm ci
npm run dev
~~~

開発用：<http://127.0.0.1:5201/>。配布用：`npm run build` → `npm run preview` → <http://127.0.0.1:5202/>。

- 矢印 / WASD、画面の方向ボタン：1マス移動
- Space / BLINK：目と壁を一斉に反転。**どの床からでも使えます**
- Z / 戻す：直前の成功した移動またはBLINKを取り消す。残数も戻ります
- R / 最初から：この面の初期状態に戻る
- ヒント：必要なときだけ表示
- ステージを選ぶ：5面を自由に選択。スマホでは一覧を開きます
- EN / JA、音ボタン：言語とBGM・SEの切替。音は初期OFFで、ヘルプやクリア画面でもミュートできます

移動は何回でも。BLINKには回数制限があります。時間制限・敵・死亡・ゲームオーバーはありません。クリア後は「次の迷路へ」「もう一度」「ステージを選ぶ」で進めます。

## v0.1から変わったこと

旧8面を使い回さず、付属の境界式5面へ更新しました。目の上に立つ／足元が壁になる旧ルールはありません。

進行は `blink-maze.progress.v2` に保存します。旧 `blink-maze.progress.v1` は変更せず、言語だけ引き継ぎます。旧クリアのIDは別のパズルを指すため、新5面のクリアには数えません。保存できない環境でも遊べます。

画像はImagegenによる新しい石壁・敷石・目・旅人・扉・挿絵です。参考画像の迷路をそのまま当たり判定には使わず、JSONの接続から盤面を描画しています。通常は180msで壁を切り替え、動きを減らす設定では即時です。

## 検証・配布

~~~powershell
npm test
npm run typecheck
npm run build
npm run pack
~~~

`artifacts/blink-maze-v0.2.zip` はZIP直下に `index.html` があるHTMLゲーム配布物です。`dist/` を静的ホスティングに配置できます。画像・音・フォントはローカル同梱で、外部API・CDN・バックエンド・アカウントは不要です。直接 `file://` で開く形式ではありません。旧v0.1 ZIPは残しています。

| ファイル | 役割 |
| --- | --- |
| `src/core.ts` | 純粋な境界判定、移動、BLINK、UNDO、BFS |
| `src/levels.json`, `data.ts` | 付属5面の原本と検証済み読込 |
| `src/board.ts` | 床・壁・目・旅人・出口を独立レイヤーで描画 |
| `src/main.ts`, `style.css` | UI・入力・180msの制御・レスポンシブ |
| `src/text.ts`, `storage.ts`, `audio.ts` | JA/EN、保存の版管理、BGM・SE |
| `docs/source/` | ユーザー提供のv0.1 / v0.2資料 |
| `docs/archive/v0.1/`, `docs/art/v01/` | 旧実装・旧画像の保管 |
| `docs/art/v02/` | 新しいImagegen原本・正規化記録・確認画像 |
| `scripts/qa/edge-orientation.html` | 本編外の横向きの目の検証画面。配布対象外 |

検証記録は `docs/VALIDATION.md` と `design-qa.md`。出典・加工・ハッシュは `ASSET_PROVENANCE.md` と `docs/asset-manifest.json`。生成プロンプトは `docs/IMAGEGEN_PROMPTS_v0.2.md` と `docs/TILE_ASSET_PROMPT_v0.2.md`。

実機タッチ、音の聞こえ方、初見での理解と面白さは人間による試遊が必要です。


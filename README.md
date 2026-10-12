# BLINK MAZE v0.3

**目を閉じれば、道が開く。でも、別の目が覚めてしまう。**

目のある石壁を切り替え、出口を目指す11問のパズル。開いた目は壁、閉じた目は通路。青と琥珀は反対に開閉します。床は常にあり、どの床からでもBLINKできます。

001–005「はじまりの章」に、006–011「発見の章」を追加しました。使わずに残すまばたき、同色の壁、出口からの逆算、色の順番、逆の初期状態、反対側からの入口を考える6問です。新しいヒントは観察→考え方→具体的な手助けの3段階。必要な分だけ開けます。BGMは「迷わず進め！迷宮コロコロ」／こーち（OpenTracks）です。

## 遊ぶ・配布する

Node.js24推奨（通常の開発・ビルドは22.12以降）。

~~~powershell
npm ci
npm run dev
~~~

開発用：http://127.0.0.1:5201/ 。配布用プレビュー：npm run build → npm run preview → http://127.0.0.1:5202/ 。

- 矢印 / WASD、画面の方向ボタン：1マス移動
- Space / BLINK：すべての目と壁を反転
- Z / 戻す：成功した移動やBLINKを取り消す。残数も戻ります
- R / 最初から：初期状態に戻る
- ヒント：任意で表示。次を押すまで後段の文を出しません
- ステージを選ぶ：11面から自由に選択
- EN / JA、音ボタン：言語とBGM・SE。音は初期OFF、ダイアログ内でもミュートできます

時間制限・敵・死亡・ゲームオーバーはありません。通常の切替は180ms、動きを減らす設定では即時。初回はブラウザが日本語ならJA、それ以外はEN。保存した設定を優先します。

~~~powershell
npm test
npm run build
npm run pack
~~~

artifacts/blink-maze-v0.3.zipはZIP直下にindex.htmlがあるHTMLゲームです。dist/を静的ホスティングへ配置できます。画像・音・フォントは同梱。BGMは単体の音声として配布しないゲーム用コンテナを再生時に復元します。復元にはHTTPSまたはlocalhostが必要です。外部API・CDN・バックエンド・アカウントは不要。直接file://で開く形式ではありません。packはWindowsの.NET ZIPを利用します。

## 保存と資料

追加更新なのでblink-maze.progress.v2の保存形式を継続し、001–005のクリア記録を保持します。v0.1の旧8面は別のパズルで、旧キーは変更せず言語だけ引き継ぎます。保存できない環境でも画面を閉じるまで遊べます。

| ファイル | 役割 |
|---|---|
| src/core.ts | 純粋な境界判定、移動、BLINK、UNDO、BFS |
| src/levels.json, src/data.ts | 手で設計した11面と読込検証 |
| src/board.ts, src/main.ts, src/style.css | 盤面、UI、入力、画面サイズ調整 |
| src/audio.ts, src/music-container.ts | 任意のBGM・SE、ゲーム用音源の復元 |
| docs/AHA_STAGE_DESIGN_v0.3.md | 追加面の意図・落とし穴・解法 |
| docs/TRIJAM_393_SUBMISSION.md | ジャムの条件、英語紹介文、投稿設定 |
| docs/VALIDATION.md, design-qa.md | 検証と未確認の範囲 |
| ASSET_PROVENANCE.md, docs/asset-manifest.json | 素材の出典・加工・ハッシュ |
| docs/archive/, docs/art/, docs/source/ | 旧実装・原画像・提供資料 |

画像生成プロンプトはdocs/IMAGEGEN_PROMPTS_v0.2.mdとdocs/TILE_ASSET_PROMPT_v0.2.md。面再生成・音源変換の作者用スクリプトはNode.js24で実行します。新BGMの元MP3は同梱しません。素材単体の再利用条件は権利者の規約に従ってください。

初見でのAHA体験・面白さ、実機タッチ、モバイルでの音量・再生方針は人間による試遊が必要です。


# BLINK MAZE — 新しい画像案 v0.2

ビジュアル方向：前回の絵本風の羊皮紙、ミッドグリーンの苔壁、植物、神秘的な巨大な目、白フードの旅人、青/琥珀の目、金色の扉。元画像の質感を継続。

**重要：画像は世界観の参照。ゲームの実際の壁配置・衝突はレベルJSONとレンダラーが決める。AI画像の幾何学や当たり判定をそのまま採用しない。**

## 案A：モバイル縦画面「壁に目がある迷宮」【最優先】

用途：Codexが360×800のUIを作る際の画面完成形参照、itch.ioスクリーンショットの構図研究。

画角：9:16縦長。タイトル/小さいステージ見出し/眼付き石壁の迷路/大きなBLINKボタンと方向キー。

見せ場：1枚の「縦の石壁」の中央に青い開いた目。隣の「横の石壁」は琥珀色の閉じた目で石壁が引いて通路になっている。両方とも**床セルの中央ではなくセル境界上**。

英語プロンプト素案：
> A polished portrait 9:16 mobile game UI concept for BLINK MAZE, elegant vintage storybook parchment, botanical engraving, muted mossy stone labyrinth, tiny ivory-hooded traveler and golden goal door. The eyes are embedded into thick stone wall segments BETWEEN adjacent walkable floor tiles, never floating on tiles. A blue eye is wide open in a solid blocking wall; an amber eye is closed in a visibly open passage where stone slabs have retracted. Clean legible board, BLINK action button and compact D-pad below, restrained warm cream, moss green, dusty blue and amber. Slightly eerie but gentle, readable gameplay first.

## 案B：まばたき前／後「世界が組み替わる」

用途：ゲーム説明、itch.ioページ、投稿用画像。横16:9、左Before / 右Afterの2コマ。**プレイヤー・床・視点・壁の位置は同じ**。

- 左：青い眼付き壁Aは開眼して石壁あり、金の眼付き壁Bは閉眼して通路あり。
- 右：青い眼付き壁Aは閉眼して通路あり、金Bは開眼して石壁あり。
- 変化するのは**壁境界だけ**。床セルは両側で同数・同位置に残る。
- 中央に小さな「BLINK」モチーフ、雰囲気は静かな紙版画。

英語プロンプト素案：
> Two-panel before/after diagram for a refined storybook puzzle game called BLINK MAZE. Identical top-down stone labyrinth geometry and camera in both panels. In the BEFORE panel, blue eyed wall segments are solid and open-eyed; amber eyed segments retract into passages with closed eyelids. AFTER BLINK, the blue walls retract and amber walls extend and open their eyes. All eyes are physically part of walls BETWEEN floor cells. No eye symbols on floor tiles. Warm cream paper, moss green stone, dusty blue and ochre, botanical flourishes, precise visually understandable change, side-by-side comparison.

## 案C：動く壁の素材・拡大図「壁の目」

用途：正式アセット制作の美術参照。背景抜きの4セル＋通常石壁1セル（本当のゲームアセットにする前に左右/上下の寸法と透明余白を揃える）。

- A open：青い丸い瞳が開き、板石が隙間なく合わさる
- A closed：青い閉眼、板石が左右/上下へ引く
- B open：琥珀の菱形瞳が開き、板石が隙間なく合わさる
- B closed：琥珀の閉眼、板石が左右/上下へ引く
- normal：ツタが生えた固定壁

英語プロンプト素案：
> Consistent game-art concept sheet of five mossy ancient stone wall SEGMENTS for a mysterious top-down puzzle, matched scale and materials: blue-eye open solid wall, blue-eye closed retracted wall passage, amber-eye open solid wall, amber-eye closed retracted wall passage, plain stone wall. Every eyeball is carved INTO THE STONE WALL surface, not placed on floor. Antique engraved watercolor style, pale neutral background, no interface, all panels in consistent lighting, no text.

## 優先制作順

1. **案A**：本編のスマホでの成立をチェック。
2. 案B：遊びのルール説明と広報に使える。
3. 案C：演出を精密化する段階で活用。

生成画像の目・扉・石壁は、別々に生成しただけではゲームに使える透過スプライトや当たり判定素材にならない。ゲーム実装時はSVG/CSSを第一案とする。

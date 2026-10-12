import type { Language } from './storage';
export const titles: Record<Language, string[]> = {
  ja: ['はじめてのまばたき','安全な足場','眠っている目','目と目のすきま','遠回りこそ近道','ジグザグまばたき','まばたき禁止','最後の選択'],
  en: ['First blink','A safe place','Sleeping eyes','Between the eyes','The longer way','A winding path','No blinking','The final choice'],
};
export const hints: Record<Language, string[]> = {
  ja: ['青い目を閉じてみよう。','目の上にいると、その目を開くことはできない。','眠っている目は、起こさず通れる。','となり合う青と琥珀。すきまのない道は通れる？','近い道が、少ないまばたきとは限らない。','曲がり角の安全な足場で、次の目を考えよう。','今回は、まばたきしないという選択。','まっすぐ進む前に、ふたつの道を比べてみよう。'],
  en: ['Try closing the blue eye.','You cannot open the eye you are standing on.','A sleeping eye can be crossed without waking it.','Can you cross adjacent eyes of different colors?','The shortest-looking path may need more blinks.','Plan the next eye from a safe corner.','Sometimes the best blink is no blink at all.','Compare both paths before going straight ahead.'],
};
export const copy = {
  ja: {
    subtitle:'まばたきで、見え方を変える小さなパズル', headline:'目を閉じれば、\n道が開く。', intro:'でも、別の目が\n覚めてしまう。',
    chapter:'小さな旅 / 全8問', budget:'残りのまばたき', blink:'まばたき', undo:'戻す', restart:'やり直す', move:'移動', hint:'ヒント',
    open:'開いた目は壁', closed:'閉じた目は道', rule:'BLINKで、青と琥珀が入れ替わる。', safe:'目の上では BLINKできない。',
    help:'遊び方', select:'ステージを選ぶ', soundOn:'音 ON', soundOff:'音 OFF', credits:'素材・クレジット', close:'閉じる',
    up:'上へ', down:'下へ', left:'左へ', right:'右へ', actions:'操作', levels:'8つの小さな迷路', cleared:'クリア済み', current:'選択中',
    wall:'そこは壁。別の道を探そう。', unsafe:'足元の目が開いてしまう。普通の床で BLINKしよう。', noBudget:'まばたきは残り0回。戻すか、やり直せるよ。',
    empty:'まだ戻せる操作がありません。', ready:'開いた目は壁。閉じた目は道。', flipped:'青と琥珀の目が、入れ替わった。', undone:'ひとつ前の操作に戻しました。', restarted:'この迷路を、はじめから。',
    found:'道が、見えた。', allClear:'すべての道が、見えた。', clearBody:'少し違う見方で、出口にたどり着いた。', allBody:'8つの迷路を抜けました。世界の見え方は、変わったかな？',
    next:'次の迷路へ', replay:'もう一度', blinks:'まばたき', steps:'移動', complete:'8問クリア', progress:'クリア',
    instructions:'矢印 / WASD で1マス移動。Space でまばたき。Z で戻す。R でやり直す。画面のボタンでも遊べます。',
    helpRule:'青と琥珀の目は、いつも反対に開閉します。開いた目は通れません。閉じた目は通れます。普通の床で BLINKして、出口を目指しましょう。',
    helpBudget:'まばたきの回数には上限があります。移動は何回でも。閉じた目に乗っている間は BLINKできません。失敗した操作は回数を使いません。',
    helpUndo:'「戻す」で移動もまばたきも取り消せます。クリア後は「もう一度」で再挑戦。時間制限もゲームオーバーもありません。',
    saveNote:'クリアした面と選んだ面を、このブラウザに保存します。', noSave:'保存が使えないため、この画面を閉じるまで進行を保持します。',
    artCredit:'美術：Imagegenによるオリジナル生成画像', bgmCredit:'BGM：ループ03 / OtoLogic（CC BY 4.0）', seCredit:'効果音：Kenney UI Audio（CC0）', iconCredit:'アイコン：Tabler Icons（MIT）',
    footer:'急がなくていい。見え方を変えてみよう。',
  },
  en: {
    subtitle:'A little puzzle about seeing differently', headline:'Close your eyes.\nFind your way.', intro:'But somewhere,\nanother eye wakes.',
    chapter:'A little journey / 8 puzzles', budget:'Blinks remaining', blink:'BLINK', undo:'Undo', restart:'Restart', move:'Move', hint:'Hint',
    open:'Open eyes are walls', closed:'Closed eyes are paths', rule:'BLINK swaps blue and amber.', safe:'No blinking on an eye.',
    help:'How to play', select:'Level select', soundOn:'Sound ON', soundOff:'Sound OFF', credits:'Credits', close:'Close',
    up:'Move up', down:'Move down', left:'Move left', right:'Move right', actions:'Controls', levels:'Eight little mazes', cleared:'Cleared', current:'Selected',
    wall:'That is a wall. Find another way.', unsafe:'The eye beneath you would open. BLINK on a regular tile.', noBudget:'No blinks left. You can undo or restart.',
    empty:'No actions to undo yet.', ready:'Open eyes are walls. Closed eyes are paths.', flipped:'The blue and amber eyes have swapped.', undone:'One action undone.', restarted:'A fresh start in this maze.',
    found:'You found a way.', allClear:'Every path, discovered.', clearBody:'A different way of seeing brought you to the exit.', allBody:'You made it through all eight mazes. Does the world look a little different now?',
    next:'Next maze', replay:'Play again', blinks:'blinks', steps:'moves', complete:'All 8 cleared', progress:'cleared',
    instructions:'Arrows / WASD: move one tile. Space: blink. Z: undo. R: restart. You can also use the on-screen buttons.',
    helpRule:'Blue and amber eyes always have opposite states. Open eyes block your way; closed eyes can be crossed. BLINK on a regular tile to find your way to the door.',
    helpBudget:'Each maze has a blink limit. Moves are unlimited. You cannot BLINK while standing on a closed eye. Rejected actions never use your budget.',
    helpUndo:'Undo takes back moves and blinks. After clearing a maze, Play again starts a fresh attempt. There is no timer or game over.',
    saveNote:'Cleared levels and your selected level are saved in this browser.', noSave:'Storage is unavailable. Progress lasts until this page is closed.',
    artCredit:'Art: original images generated with Imagegen', bgmCredit:'Music: Loop03 / OtoLogic (CC BY 4.0)', seCredit:'Sound effects: Kenney UI Audio (CC0)', iconCredit:'Icons: Tabler Icons (MIT)',
    footer:'Take your time. See things differently.',
  },
} as const;

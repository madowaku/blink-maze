import type { Language } from './storage';
export const titles:Record<Language,string[]>={
  ja:['はじめてのまばたき','ふたつの目','眠っている目','遠回りの道','少ないまばたき、長い道','静かな回廊','ひとつの合図','最後の境目','二つの長い道','もうひとつの朝','向こう側から'],
  en:['First blink','Two kinds of eyes','Already asleep','The long way around','Fewer blinks, longer walk','The quiet corridor','One signal','The last threshold','Two long roads','Another morning','The other side'],
};
export const hints:Record<Language,string[][]>={
  ja:[
    ['青い目を閉じると、石壁に通路ができる。'],['青と琥珀の目は、いつも反対にまばたく。'],['はじめから眠っている琥珀の目は、そのまま通れる。'],['目の壁が続く道の下にも、通路がある。'],['眠っている琥珀の壁を通ってから、青の目を閉じてみよう。'],
    ['出口へつながる境目を、上と下で見比べよう。','回数は「使える上限」。使い切らなくてもいい。','最初の床から下へ。眠っている琥珀の壁だけを通ってみよう。'],
    ['まっすぐな道と、下へ曲がる道。目の色の並びを見よう。','同じ色の壁は、離れていても同時に切り替わる。','最初の琥珀を通ったら下へ。もう一つの琥珀を通ってからBLINKしよう。'],
    ['出口のすぐ手前には、どの色の目がある？','最後に琥珀を通るには、青が開いた状態へ戻す必要がある。','上の道で青の壁をまとめて通り、出口の琥珀の前で2回目のBLINKをしよう。'],
    ['上と下の遠回りは、どちらも同じ長さ。違いはどこ？','数えるのは目の数ではなく、通る色が切り替わる回数。','下へ2マス進む道を選ぼう。琥珀2つのあとで一度だけBLINKすれば、青4つを通れる。'],
    ['今回は、青と琥珀の目をよく見てから動こう。','最初の状態が、これまでと逆。いま眠っているのは青い目。','上の道へ。青の壁を先に通り、最上段の琥珀の手前でBLINKしよう。'],
    ['近い出口にも、違う方向から入れるかもしれない。','左からの道は青→琥珀→青。右から入る道も探してみよう。','上の外周を進もう。琥珀→青→琥珀の順なら2回。出口を右側から目指そう。'],
  ],
  en:[
    ['Close the blue eye to make a passage through its wall.'],['Blue and amber eyes always blink in opposite states.'],['The sleeping amber wall can already be crossed.'],['There is another passage below the row of eyed walls.'],['Pass the sleeping amber wall before closing the blue eye.'],
    ['Compare the boundaries on the upper and lower routes to the exit.','The budget is a maximum. You do not have to spend it.','Go down from the starting tile. Follow only the sleeping amber walls.'],
    ['Compare the order of eye colors on the straight and lower routes.','Walls of the same color change together, however far apart.','Cross the first amber wall, then go down. Cross the next amber wall before blinking.'],
    ['What color guards the very last step into the exit?','To cross amber last, you must return to the state with blue eyes open.','Use the upper route. Cross its blue walls together, then blink again before the final amber wall.'],
    ['The upper and lower detours are equally long. What differs?','Count changes of color along the route, rather than the number of eyes.','Go down twice. Cross two amber walls, then blink once to cross all four blue walls.'],
    ['Look carefully at both eye colors before moving this time.','The starting state is reversed. The blue eyes are already asleep.','Take the upper route. Pass blue first, then blink before the amber walls on the top row.'],
    ['A nearby exit might also have an entrance from another direction.','The left route goes blue, amber, blue. Look for a way in from the right.','Follow the upper rim: amber, blue, amber costs two blinks. Approach the exit from its right.'],
  ],
};
export const discoveries:Record<Language,string[]>={
  ja:['','','','','','まばたきは、使い切らなくてもいい。','同じ色の壁なら、一度の合図で道になる。','出口から逆算すると、最後のまばたきが見える。','壁の数より、色が変わる順番を見る。','いつもの色でも、今の状態は違うかもしれない。','近い出口も、向こう側から目指せる。'],
  en:['','','','','','You do not have to spend every blink.','One signal opens every wall of the same color.','Work backward from the exit to plan your last blink.','Look at the order of colors, not the number of walls.','Familiar colors can begin in a different state.','A nearby exit can be reached from the other side.'],
};
export const copy={
  ja:{
    subtitle:'まばたきで、道をひらく',headline:'目を閉じれば、\n道が開く。',intro:'でも、別の目が\n覚めてしまう。',
    chapter:'壁に目がある、小さな旅',tutorial:'はじまりの章',discovery:'発見の章',hintNext:'もう少しヒント',hintLast:'具体的な手助けを見る',hintStep:'ヒント',budget:'残りのまばたき',blink:'BLINK',undo:'戻す',restart:'最初から',move:'移動',hint:'ヒント',
    open:'開いた目の壁は通れない。',closed:'閉じた目の壁は通れる。',rule:'まばたきで、青と琥珀の壁が入れ替わる。',
    blue:'青い目',amber:'琥珀の目',blocked:'壁あり',passable:'通路',state:'目の状態',position:'旅人の位置',
    help:'遊び方',select:'ステージを選ぶ',soundOn:'音 ON',soundOff:'音 OFF',credits:'素材・クレジット',close:'閉じる',
    up:'上へ',down:'下へ',left:'左へ',right:'右へ',actions:'操作',levels:'小さな迷路の旅',cleared:'クリア済み',current:'選択中',
    wall:'その境目は石壁。別の通路を探そう。',noBudget:'残り0回。戻すか、最初からやり直せるよ。',
    empty:'まだ戻せる操作がありません。',ready:'目は、床と床の間の石壁にある。',flipped:'青と琥珀の壁が、入れ替わった。',undone:'ひとつ前の操作に戻しました。',restarted:'この迷路を、はじめから。',
    found:'道が、見えた。',allClear:'すべての道が、見えた。',clearBody:'少し違う見方で、出口にたどり着いた。',allBody:'すべての迷路を抜けました。世界の見え方は、変わったかな？',
    next:'次の迷路へ',replay:'もう一度',blinks:'まばたき',steps:'移動',progress:'クリア',
    instructions:'矢印 / WASD で1マス移動。Space でまばたき。Z で戻す。R で最初から。画面のボタンでも遊べます。',
    helpRule:'目は、床と床の間の石壁に彫られています。開いた目の壁は通れません。閉じた目の壁は引いて、通路になります。青と琥珀は、いつも反対に開閉します。',
    helpBudget:'どの床からでもBLINKできます。床が消えることはありません。まばたきには回数制限がありますが、移動は何回でも。壁に向かった操作は回数を使いません。',
    helpUndo:'「戻す」で移動もまばたきも取り消せます。クリア後は「もう一度」で再挑戦。時間制限もゲームオーバーもありません。',
    saveNote:'進行をこのブラウザに保存します。これまでのクリア記録も引き継ぎます。',noSave:'保存が使えないため、この画面を閉じるまで進行を保持します。',
    artCredit:'美術：Imagegenによるオリジナル生成画像',bgmCredit:'BGM：迷わず進め！迷宮コロコロ / こーち（OpenTracks）',seCredit:'効果音：Kenney UI Audio（CC0）',iconCredit:'アイコン：Tabler Icons（MIT）',
    footer:'急がなくていい。見え方を変えてみよう。',
  },
  en:{
    subtitle:'A little puzzle about seeing differently',headline:'Close your eyes.\nFind your way.',intro:'But somewhere,\nanother eye wakes.',
    chapter:'A little journey through watchful walls',tutorial:'First steps',discovery:'Discoveries',hintNext:'A little more help',hintLast:'Show a specific nudge',hintStep:'Hint',budget:'Blinks remaining',blink:'BLINK',undo:'Undo',restart:'Restart',move:'Move',hint:'Hint',
    open:'Open eyes block the way.',closed:'Closed eyes let you pass.',rule:'BLINK swaps the blue and amber walls.',
    blue:'Blue eye',amber:'Amber eye',blocked:'Wall',passable:'Passage',state:'Eye states',position:'Traveler position',
    help:'How to play',select:'Level select',soundOn:'Sound ON',soundOff:'Sound OFF',credits:'Credits',close:'Close',
    up:'Move up',down:'Move down',left:'Move left',right:'Move right',actions:'Controls',levels:'A little journey',cleared:'Cleared',current:'Selected',
    wall:'That boundary is a wall. Try another passage.',noBudget:'No blinks left. Undo or restart to try another way.',
    empty:'No actions to undo yet.',ready:'The eyes are carved into walls between the floor tiles.',flipped:'The blue and amber walls have swapped.',undone:'One action undone.',restarted:'A fresh start in this maze.',
    found:'You found a way.',allClear:'Every path, discovered.',clearBody:'A different way of seeing brought you to the exit.',allBody:'You made it through every maze. Does the world look a little different now?',
    next:'Next maze',replay:'Play again',blinks:'blinks',steps:'moves',progress:'cleared',
    instructions:'Arrows / WASD: move one tile. Space: blink. Z: undo. R: restart. You can also use the on-screen buttons.',
    helpRule:'The eyes are carved into stone walls between floor tiles. An open eye blocks the way. A closed eye makes its wall retract into a passage. Blue and amber eyes always have opposite states.',
    helpBudget:'You can BLINK from any floor tile. The floor never disappears. Each maze has a blink limit, but moves are unlimited. Rejected moves never use your budget.',
    helpUndo:'Undo takes back moves and blinks. After clearing a maze, Play again starts a fresh attempt. There is no timer or game over.',
    saveNote:'Progress is saved in this browser. Your existing clear records carry over.',noSave:'Storage is unavailable. Progress lasts until this page is closed.',
    artCredit:'Art: original images generated with Imagegen',bgmCredit:'Music: 迷わず進め！迷宮コロコロ / こーち (OpenTracks)',seCredit:'Sound effects: Kenney UI Audio (CC0)',iconCredit:'Icons: Tabler Icons (MIT)',
    footer:'Take your time. See things differently.',
  },
} as const;


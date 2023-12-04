/**
 * 動作確認は必ずテストから実行すること
 */

function testEntry() {
  let userMail = "an.apple.183@gmail.com";
  console.log(MasterEntry(userMail));
}

function testDecline(){
  console.log(MasterDecline());
}


function test(){

let array = [
[ 
    '10/07 12:00',
    '15:00',
    'テストグラウンド１',
    '【アカウント情報】\n登録者ID = 00112389\n登録者名 = 岩佐 昌弥' 
  ],
  [ 
    '10/07 13:00',
    '16:00',
    'テストグラウンド２',
    '【アカウント情報】\n登録者ID = 00112389\n登録者名 = 岩佐 昌弥' 
  ],
  [ 
    '10/15 12:00',
    '15:00',
    '豊平川緑地（中央区） 南２２条野球場 Ｂ球場',
    '【アカウント情報】\n登録者ID = 00112389\n登録者名 = 岩佐 昌弥' 
  ]
]

console.log(array[0][0]);
let message = [];

for(let i=0; i<array.lenght; i++){
  let start = array[i][0];
  let end = array[i][1];
  let date = start.concat("-",end);
  let title = array[i][2];
  let description = array[i][3];
  message.push = [date.concat("\n",title,description)];
}

let test1 = '10/07 12:00';
let test2 = "15:00"

console.log(message);

}
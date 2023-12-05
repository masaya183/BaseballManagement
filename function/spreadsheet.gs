/**
 * 申請者名を取得
 * 
 * @param {string} userMail ß
 * @returns {string} 申請者名
 */
function getUserName(userMail)
{  
  //初期設定
  let lastRow       = RampageAccounts.getLastRow();                           //シートの最終行を取得
  let acountDetails = RampageAccounts.getRange(2,1,lastRow-1,4).getValues();  //スプレッドシートからユーザー情報を二次元配列で取得

  //メールアドレスからユーザー名を取得
  for(var i=0; i<lastRow-1; i++){
    if(acountDetails[i][3] == userMail) return acountDetails[i][2];
  }
}

/**
 * グラウンド情報を追加
 * 
 * @param {array} groundDetails
 * @returns {void}
 */
function addGroundDetails(groundDetails)
{
  //初期設定
  var lastRow      = RampageGrounds.getLastRow();  //シートの最終行を取得
  let arrayLastRow = groundDetails.length;         //配列の最終行を取得

  //貼り付け処理  
  RampageGrounds.getRange(lastRow+1,1,arrayLastRow,9).setNumberFormat("@");      //貼り付け先の書式を「書式なしテキスト」に設定する
  RampageGrounds.getRange(lastRow+1,1,arrayLastRow,9).setValues(groundDetails);  //配列をスプレッドシートに書き込む

  //重複削除
  var lastRow = RampageGrounds.getLastRow();           //スプレッドシートの最終行を取得
  let range = RampageGrounds.getRange(2,1,lastRow,9);  //範囲を指定
  range.removeDuplicates([1]);                         //重複削除
}


function declineEntrys(declineEntryIds){

  //初期設定
  let lastRow      = RampageGrounds.getLastRow();                                //スプレッドシートの最終行を取得
  let entryNombers = RampageGrounds.getRange(2,1,lastRow,1).getValues().flat();  //スプレッドシートから受付番号を一次配列で取得する

  //取得した一次元配列から一致した受付番号のステータスを変更する
  let declineEventIds = new Array();
  for(let entryNo of declineEntryIds){
    let row = entryNombers.indexOf(entryNo);
    if(row > 0) RampageGrounds.getRange(row+2,8).setValue("取消済");
    let eventId = RampageGrounds.getRange(row+2,9).getValue();

    //ステータスを変更したグラウンドのイベントIDを配列に格納する
    if(eventId != "イベントID") declineEventIds.push(eventId);
  }

  console.log(declineEventIds);
  return declineEventIds;  

}

/**
 * グラウンド情報をソート
 * 
 * @returns {void}
 */
function sortGroundList()
{
  //初期設定
  let lastRow = RampageGrounds.getLastRow();            //スプレッドシートの最終行を取得
  let range   = RampageGrounds.getRange(2,1,lastRow,9)  //ソートする範囲を選択

  range.sort([
    {column:8, ascending: false},
    {column:2, ascending: false},
    {column:3, ascending: true},
    {column:5, ascending: true}
  ]);
}
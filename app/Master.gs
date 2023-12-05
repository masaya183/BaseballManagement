/**
 * 申込メールを取得してグラウンド情報をスプレッドシートとカレンダーに登録する
 * 
 * @param {string} userMail - 申請者のメールアドレス 
 * @returns {string} 実行結果メッセージ
 */
function MasterEntry(userMail)
{
  //メールからグラウンド情報を取得
  let userName = getUserName(userMail);                        //スプレッドシートからユーザー名を取得
  var groundDetails = getEntryGroundDetails(userName);         //申込完了メールからグラウンド情報を二次配列で取得
  if (groundDetails.length === 0) return "新しい予定はありません。";  //メールがなれば処理を終了

  //Googleカレンダーに予定を登録して、配列にイベントIDを追加して返す
  var groundDetails = createEvent(groundDetails);
  
  //スプレッドシートに追記
  addGroundDetails(groundDetails);

  //スプレッドシートをソートする
  sortGroundList();

  return "グラウンド情報の更新が完了しました。" 
}

/**
 * キャンセルメールを取得してグラウンド情報をスプレッドシートとカレンダーに登録する
 * 
 * @returns {string} 実行結果メッセージ
 */
function MasterDecline()
{  
  //メールからキャンセルした申込IDを取得
  let declineEntryIds = getDeclineGround();                                    //キャンセルしたグラウンドの受付番号を一次配列で取得
  if (declineEntryIds.length === 0) return "キャンセルしたグラウンドはありませんでした。";  //メールがなければ処理を終了

  //スプレッドシートの状況列を更新し、イベントIDを一次配列で取得する
  let declineEventIds = declineEntrys(declineEntryIds);

  //スプレッドシートをソートする
  sortGroundList();

  //一次元配列で取得したイベントIDの予定をGoogleカレンダーから削除する
  declineEvent(declineEventIds);

  return "キャンセルしたグラウンド情報を更新しました。";
}
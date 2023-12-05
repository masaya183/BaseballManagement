/**
 * 申込完了メール取得
 * 
 * @param {string} userName - 申請者名
 * @returns {array} グラウンド情報詳細
 */
function getEntryGroundDetails(userName) {
ß
  //初期設定
  let subject       = "(【札幌市公共施設予約情報システム】予約申込完了のお知らせ)";            //メール件名を指定
  let mails         = GmailApp.search("subject:"+subject+"from:"+fromMail+query);  //gmailからメール一覧を取得
  let groundDetails = new Array();                                                 //配列の初期化

  //検索にヒットしたメールを配列に格納
  mails.forEach(function(thread){
    let messages = thread.getMessages();  //メール本文を二次配列で取得

    //すべてのメール本文を配列に格納
    messages.forEach(function(message){
      let messageBody = message.getBody();                          //メール本文
      let requestNo   = messageBody.match(/【受付番号】(.*)/);          //受付番号
      let ground      = messageBody.match(/【施設室場】(.*)/);          //グランド名
      let date        = messageBody.match(/【利用日時】(.*)/);          //予約日時
      let id          = messageBody.match(/【利用者番号】(.*)/);        //ID
      let day         = date[1].slice(0,10).replace(/年|月/g,"/");   //日時 ※「YYYY/MM/DD」に変換
      let time        = date[1].slice(14);                          //時間
      let startTime   = time.split("～")[0];                        //開始時間
      let endTime     = time.split("～")[1];                        //終了時間

      //グランド名、日付、開始時間、終了時間を配列に格納
      groundDetails.push([requestNo[1],day,startTime,endTime,ground[1],id[1],userName,"申込済"]);
    });

    //処理済みのラベルを貼る
    thread.addLabel(processedlLabel);
  });

  console.log(groundDetails);
  return groundDetails;

}

/**
 * 当選メール取得
 * 
 * @param {string} userName - 申請者名
 * @returns {array} グラウンド情報詳細
 */
function getWinGroundDetails(userName) {

  //初期設定
  let subject       = "(【札幌市公共施設予約情報システム】抽選申込当選のお知らせ)";            //メール件名を指定
  let mails         = GmailApp.search("subject:"+subject+"from:"+fromMail+query);  //gmailからメール一覧を取得
  let groundDetails = new Array();                                                 //配列の初期化

  //検索にヒットしたメールを配列に格納
  mails.forEach(function(thread){
    let messages = thread.getMessages();  //メール本文を二次配列で取得

    //すべてのメール本文を配列に格納
    messages.forEach(function(message){
      let messageBody = message.getBody();                          //メール本文
      let requestNo   = messageBody.match(/【受付番号】(.*)/);          //受付番号
      let ground      = messageBody.match(/【施設室場】(.*)/);          //グランド名
      let date        = messageBody.match(/【利用日時】(.*)/);          //予約日時
      let id          = messageBody.match(/【利用者番号】(.*)/);        //ID
      let day         = date[1].slice(0,10).replace(/年|月/g,"/");   //日時 ※「YYYY/MM/DD」に変換
      let time        = date[1].slice(14);                          //時間
      let startTime   = time.split("～")[0];                        //開始時間
      let endTime     = time.split("～")[1];                        //終了時間

      //グランド名、日付、開始時間、終了時間を配列に格納
      groundDetails.push([requestNo[1],day,startTime,endTime,ground[1],id[1],userName,"申込済"]);
    });

    //処理済みのラベルを貼る
    thread.addLabel(processedlLabel);
  });

  console.log(groundDetails);
  return groundDetails;

}

/**
 * キャンセルメール取得
 * 
 * @param {string} userName - 申請者名
 * @returns {array} グラウンド情報詳細
 */
function getDeclineGround() {

  //初期設定
  let subject       = "(【札幌市公共施設予約情報システム】予約取消完了のお知らせ)";           //メール件名を指定
  let mails         = GmailApp.search("subject:"+subject+"from:"+fromMail+query); //gmailからメール一覧を取得
  let groundDetails = new Array();                                                //配列の初期化

  //検索にヒットしたメールを配列に格納
  mails.forEach(function(thread){
    let messages = thread.getMessages();  //メール本文を二次配列で取得

    //すべてのメール本文を配列に格納
    messages.forEach(function(message){
      let messageBody = message.getBody();                //メール本文
      let requestNo = messageBody.match(/【受付番号】(.*)/);  //受付番号取得

      //グランド名、日付、開始時間、終了時間を配列に格納
      groundDetails.push(requestNo[1]);
    });

    //処理済みのラベルを貼る
    thread.addLabel(processedlLabel);
  });

  console.log(groundDetails);
  return groundDetails;

}
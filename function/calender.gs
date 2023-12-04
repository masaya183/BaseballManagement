/**
 * Googleカレンダーに登録する
 * 
 * @param {array} groundDetails - グラウンド情報詳細 
 * @returns {array} グラウンド情報にGoolgeカレンダーのイベントIDを追加して返す
 */
function createEvent(groundDetails)
{
  //初期設定
  let length = groundDetails.length;  //配列の長さを取得してグラウンドの数を取得

  //グラウンドの数だけ処理をループ
  for (let i = 0; i < length; i++) {

    //登録する詳細情報を取得
    let day        = groundDetails[i][1]; //日付
    let startHour  = groundDetails[i][2]; //開始時間
    let endHour    = groundDetails[i][3]; //終了時間
    let groundName = groundDetails[i][4]; //グラウンド場所
    let userId     = groundDetails[i][5]; //ユーザーID
    let userName   = groundDetails[i][6]; //配列からユーザー名取得
  
    //カレンダーに登録する詳細情報を作成
    let description = userId + "(" + userName + ")";

    //イベントの開始日時と終了日時を日付型に変換 
    let startTime = new Date(day+" "+startHour);
    let endTime   = new Date(day+" "+endHour);

    //カレンダーに予定を登録
    let event = Calender.createEvent(groundName,startTime,endTime,{description:description,location:groundName});

    //イベントID取得
    let eventId = event.getId();
    //二次元配列にイベントIDを追加
    groundDetails[i].push(eventId);
  }

  // デバッグ用
  console.log(groundDetails);
  return groundDetails;
}

/**
 * Googleカレンダーからイベントを削除する
 * 
 * @param declineEventIds 
 * @returns {void}
 */
function declineEvent(declineEventIds)
{
  //一次元配列で取得したキャンセル済みのイベントIDをカレンダーから削除
  declineEventIds.forEach(function(eventId) {
    let event = Calender.getEventById(eventId);
    event.deleteEvent();
  });
}

/**
 * グラウンド情報を取得
 * 
 * @returns {array} グラウンド詳細
 */
function getEvents()
{
  //初期設定
  let today = dayjs.dayjs();                                            //今日の日付を取得
  let startDate = new Date(today.add( 8, "day").format("YYYY/MM/DD"));  //検索開始日
  let endDate   = new Date(today.add(14, "day").format("YYYY/MM/DD"));  //検索終了日
  let groundDetails = [];                                               //配列の初期化
  let events = Calender.getEvents(startDate, endDate);                  //開始日～終了日に存在するGoogleカレンダーのイベントを取得する
  
  //forループの処理で取得したイベントの件名をログ出力する
  for (let i = 0 ; i < events.length ; i++ ) {
    let ground      = events[i].getTitle();       //タイトル
    let startTime   = events[i].getStartTime();   //開始時間
    let start       = Utilities.formatDate(startTime, "JST", "MM/dd HH:mm");
    let endTime     = events[i].getEndTime();     //終了時間
    let end         = Utilities.formatDate(endTime, "JST", "HH:mm");
    let description = events[i].getDescription(); //詳細
    let time        = start + "-" + end;
    groundDetails.push([time,ground,description]);

  }

  // デバッグ用
  console.log(groundDetails);
  return groundDetails;
}
/**
 * LINEにグラウンド情報を送信
 * 
 * @returns {void}
 */
function postLine()
{
  const token = 'YLyo6CZzhiAoNTxyw4ZiiDxrp153O9RYKs646RraDhL';
  const lineNotifyApi = 'https://notify-api.line.me/api/notify';

  let groundList = getEvents(); //翌週

  if (groundList.length == 0) {
    var message = "\n取得しているグラウンドはありません";
  } else {
    let lenght = groundList.length;
    var message = "\n";
    for (let i=0; i<lenght; i++) {
      var message = message + groundList[i].join("\n") + "\n\n";
    }
  }

  const options =
   {
      "method"  : "post",
      "payload" : {"message": message},
      "headers" : {"Authorization":"Bearer " + token}
   };

   UrlFetchApp.fetch(lineNotifyApi, options);
}
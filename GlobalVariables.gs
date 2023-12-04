//メール
GmailApp.createLabel('処理済み');                                 //アカウントにラベルを作成
const processedlLabel = GmailApp.getUserLabelByName('処理済み');  //貼り付けるラベル名を指定
const fromMail        = "do-not-reply@e-harp.jp";                //送信元メールアドレス
const query           = ", has:nouserlabels";                    //タグなしを指定

//スプレッドシート
const RampageGrounds  = SpreadsheetApp.openById("1_wrO1iwxppbusz6mtvwjIA2ZdYlFj0PEIO4Q_9DXh54").getSheetByName("グラウンド情報");
const RampageAccounts = SpreadsheetApp.openById("1_wrO1iwxppbusz6mtvwjIA2ZdYlFj0PEIO4Q_9DXh54").getSheetByName("アカウント情報");
const Calender        = CalendarApp.getCalendarById("rampage.horse643@gmail.com");

import { MailComposer } from "expo";
import { Linking } from "react-native";

/*
recipients: array of e-mail addresses of reciepients (!!! could be user + doctor)
subject: subject of email
body: body of email
attachments: app's internal file uris to attach (**use null for no attachments)
callBack: function to be called after email has been sent. Passes in object containing
status field that has "sent", "saved", or "cancelled" (**use null for no callBack)

*/
export async function sendMail(
  recipients,
  subject,
  body,
  attachments,
  callBack
) {
  let options = {
    recipients: recipients,
    subject: subject,
    body: body
  };
  Linking.openURL(
    "mailto:" + recipients[0] + "?subject=" + subject + "&body=" + body
  );
  // if (attachments) options.attachments = attachments;
  // let p = MailComposer.composeAsync(options).catch(e => {});
  // if (callBack) {
  //   p.then(obj => {
  //     callBack;
  //   });
  // }
}

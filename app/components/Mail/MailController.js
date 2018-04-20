import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Platform } from 'react-native';
import { MailComposer } from 'expo';

const saveOptions = {
  recipients: ['navinr13@gmail.com'],
  subject: 'Test Subject',
  body: 'Test Body, this was sent through Mail Composer',
  attachments: null
};

/*
recipients: array of e-mail addresses of reciepients (!!! could be user + doctor)
subject: subject of email
body: body of email
attachments: app's internal file uris to attach (**use null for no attachments)
callBack: function to be called after email has been sent. Passes in object containing
status field that has "sent", "saved", or "cancelled" (**use null for no callBack)

*/
export function sendMail(recipients, subject, body, attachments, callBack) {
  let options = {
    recipients: recipients,
    subject: subject,
    body: body
  };
  if (attachments) options.attachments = attachments;
  let p = MailComposer.composeAsync(options);
  if (callBack) {
    p.then(obj => {
      callBack;
    });
  }
}

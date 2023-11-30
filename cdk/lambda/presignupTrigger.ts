// MISNOMER: THIS IS ACTUALLY THE POST SIGNUP TRIGGER
import { SNS } from 'aws-sdk';
const sns = new SNS();

exports.handler = async (event: any) => {
  const user = event.request.userAttributes;
  console.log(`USER----${JSON.stringify(user)}`);

  if (user.profile !== 'pro') {
    return event;
  }

  const params = {
    Protocol: 'email',
    TopicArn: 'arn:aws:sns:us-east-1:539460444185:ContractorNotification',
    Endpoint: user.email,
  };

  console.log(`PARAMS----${JSON.stringify(params)}`);

  try {
    await sns.subscribe(params).promise();
    console.log('User subscribed to SNS topic:', user.email);
  } catch (err) {
    console.error('Error subscribing user:', err);
  }

  return event;
};

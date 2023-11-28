import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { HttpsRedirect } from 'aws-cdk-lib/aws-route53-patterns';

export class HttpsRedirectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'HostedZoneWithAttributes', {
      hostedZoneId: 'Z08663992YTL843XORKK7',
      zoneName: 'schedule.builders'
    })

    new HttpsRedirect(this, 'RedirectStack', {
      recordNames: ['schedule.builders'],
      targetDomain: 'www.schedule.builders',
      zone: hostedZone
    })
  }
}
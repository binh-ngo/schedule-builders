#!/usr/bin/env node
import { App, Environment, Stack, StackProps } from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { CognitoStack } from '../lib/cognito-stack';
import { BackendStack } from '../lib/backend-stack';
import { CertificateStack } from '../lib/certificate-stack';
import { HttpsRedirectStack } from '../lib/redirect-stack';
require("dotenv").config({ path: '.env' });

const app = new App();

class ContractorStack extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);

    const certificate = new CertificateStack(this, "CertificateStack", {
      env: props.env as Environment,
      domainName: "schedule.builders",
      siteSubDomain: "*",
    });

    new FrontendStack(this, 'ContractorFrontendStack', {
      env: props.env as Environment,
      siteDomain: certificate.siteDomain,
      viewerCertificate: certificate.viewerCertificate,
      zone: certificate.zone,
    });

    const cognito = new CognitoStack(this, "ContractorCognitoStack", {
      env: props.env as Environment,
    });

    new HttpsRedirectStack(app, "ScheduleBuildersHttpsRedirectStack", {
      env: props.env as Environment,
    })

    new BackendStack(this, "ContractorBackendStack", {
      env: props.env as Environment,
      userPool: cognito.userPool,
    });
  }
}

new ContractorStack(app, 'ContractorSite', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
import {
    CfnOutput,
    Duration,
    Expiration,
    Stack,
    StackProps,
  } from "aws-cdk-lib";
  import { IUserPool } from "aws-cdk-lib/aws-cognito";
  import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
  import {
    AuthorizationType,
    FieldLogLevel,
    GraphqlApi,
    Schema,
    UserPoolDefaultAction,
  } from "@aws-cdk/aws-appsync-alpha";
  import {
    Code,
    Function as LambdaFunction,
    Runtime,
  } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
  
  interface BackendStackProps extends StackProps {
    readonly userPool: IUserPool;
  }
  
  export class BackendStack extends Stack {
    constructor(parent: Stack, id: string, props: BackendStackProps) {
      super(parent, id, props);
  
      const contractorSiteTable = new Table(this, "ContractorSiteTable", {
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: {
          name: "PK",
          type: AttributeType.STRING,
        },
        sortKey: {
          name: "SK",
          type: AttributeType.STRING,
        },
      });
      new CfnOutput(this, "ContractorSiteTableName", {
        value: contractorSiteTable.tableName,
      });
  
      const contractorSiteLambda = new LambdaFunction(this, "ContractorSiteLambda", {
        runtime: Runtime.NODEJS_18_X,
        handler: "main.handler",
        code: Code.fromAsset("lambda"),
        memorySize: 512,
        environment: {
          // Contractor Table
          CONTRACTORS_TABLE: contractorSiteTable.tableName,
        },
      });
      contractorSiteTable.grantFullAccess(contractorSiteLambda);
  
      const snsLambda = new LambdaFunction(this, "PreSignupLambda", {
        runtime: Runtime.NODEJS_18_X,
        handler: "presignupTrigger.handler",
        code: Code.fromAsset("lambda"),
        memorySize: 512,
      });

      const api = new GraphqlApi(this, "ContractorSiteGraphQL", {
        name: "contractor-site",
        schema: Schema.fromAsset("./graphql/schema.graphql"),
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: AuthorizationType.API_KEY,
            apiKeyConfig: {
              expires: Expiration.after(Duration.days(365)),
            },
          },
          additionalAuthorizationModes: [
            {
              authorizationType: AuthorizationType.USER_POOL,
              userPoolConfig: {
                userPool: props.userPool,
                appIdClientRegex: ".*",
                defaultAction: UserPoolDefaultAction.ALLOW,
              },
            },
          ],
        },
        logConfig: {
          fieldLogLevel: FieldLogLevel.ERROR,
        },
        xrayEnabled: false,
      });
  
      // Prints out the AppSync GraphQL endpoint to the terminal
      new CfnOutput(this, "ContractorSiteGraphQLAPIURL", {
        value: api.graphqlUrl,
      });
  
      // Prints out the AppSync GraphQL API key to the terminal
      new CfnOutput(this, "ContractorSiteGraphQLAPIKey", {
        value: api.apiKey || "",
      });
  
      // Prints out the stack region to the terminal
      new CfnOutput(this, "Stack Region", {
        value: this.region,
      });

      // Define the IAM role for the AppSync DataSource
      const appSyncDataSourceRole = new Role(this, 'AppSyncDataSourceRole', {
        assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      });
  
      // Attach the necessary policy statement to the role
      appSyncDataSourceRole.addToPolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['lambda:InvokeFunction'], 
        resources: [contractorSiteLambda.functionArn],
      }));
      
      appSyncDataSourceRole.addToPolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['dynamodb:UpdateItem'], 
        resources: [contractorSiteTable.tableArn],
      }));

      const contractorSiteDataSource = api.addLambdaDataSource(
        "ContractorSiteDataSource",
        contractorSiteLambda
      );
      // Project Resolvers
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllProjects",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllProjectsFromAllClients",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllProjectsWithEstimates",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllProjectsWithEstimatesAndContractors",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllProjectsWithoutEstimates",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getProjectById",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getPublishedProjects",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getUnpublishedProjects",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllPublishedProjectsFromAllClients",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllUnpublishedProjectsFromAllClients",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "publishProject",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "createProject",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteProject",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "updateProject",
      })

    // Client Resolvers
    contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllClients",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getClientById",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteClient",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "updateClient",
      })

    // Contractor Resolvers
    contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllContractors",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getContractorById",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "createContractor",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteContractor",
      })
      contractorSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "updateContractor",
      })
      
    // Form Resolvers
    contractorSiteDataSource.createResolver({
      typeName: "Query",
      fieldName: "getAllForms",
    })
    contractorSiteDataSource.createResolver({
      typeName: "Query",
      fieldName: "getSelectedForm",
    })
    contractorSiteDataSource.createResolver({
      typeName: "Query",
      fieldName: "getFormById",
    })
    contractorSiteDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "adjustFormSelection",
    })
    contractorSiteDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createForm",
    })
    contractorSiteDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteForm",
    })
    contractorSiteDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateForm",
    })

        // Message Resolvers
        contractorSiteDataSource.createResolver({
          typeName: "Query",
          fieldName: "getAllMessages",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Query",
          fieldName: "getMessagesInThread",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Query",
          fieldName: "getMessageById",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Mutation",
          fieldName: "createMessage",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Mutation",
          fieldName: "deleteMessage",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Mutation",
          fieldName: "updateMessage",
        })

        // Bid Resolvers
        contractorSiteDataSource.createResolver({
          typeName: "Query",
          fieldName: "getAllBids",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Query",
          fieldName: "getBidById",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Mutation",
          fieldName: "createBid",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Mutation",
          fieldName: "deleteBid",
        })
        contractorSiteDataSource.createResolver({
          typeName: "Mutation",
          fieldName: "updateBid",
        })
    }
  }
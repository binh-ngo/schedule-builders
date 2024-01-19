# Schedule.builders - AI Powered Home Improvement Resource
![landingPage](/frontend/src/assets/readme.png)

Welcome to Schedule.builders! This application consists of a serverless application that connects consumers with contractors for home-improvement projects; offers forms for consumers to describe their service request, provides an automated price estimator to streamline the inefficient process of home improvement estimations, and features the "Workshop" where contractors can bid on published projects and message the project owner.
  Please feel free to check it out at [schedule.builders](http://www.schedule.builders).

# Why? 

There are many ways to seek help for home improvement projects whether its through Angi, Thumbtack, Homeadvisor, or Porch. After doing extensive research I found that contractors would have to pay for leads (+$50/lead), and more often than not, they aren't reliable. If they do happen to be reliable, 10 other contractors are trying to contact that lead to secure the job, resulting in an uncomfortable experience for the client. Also, since these services are free for the client, most of the leads aren't even serious to begin with; they just want to find out a rough estimate for the project cost. Unfortunately, since the client's information is necessary to receive the early estimate, these services immediately push out their information resulting in the negative experience listed above.

To answer these problems, I created a service where clients can receive an early estimate for their project. They are required to provide their contact and project information, however, they make the decision when to send out their information. Clients have the opportunity to provide additional information and images before publishing their project to the "Workshop". This extra step filters out all the clients that just want estimate information and allows serious leads to progress. Then, once their project is published, contractors are immediately notified by email and have the opportunity to make bids free of cost. This type of marketplace promotes competitive pricing to secure the job which benefits both parties. Based on the client's preference, they will select their contractor and move forward with their home improvement project. At Schedule.builders, we emphasize the importance of data privacy so we implemented a user flow that creates a better experience for clients and contractors.

# Function and Tech

 Some of the functions of schedule.builders are:

  * CRUD capability for projects, clients, contractors, messages, bids
  * Chatbot powered by AI21 Labs through Amazon Bedrock
  * Automated early project estimates
  * User authorization and authentication
  * S3 image upload
  * On-site messaging
  * SEO
  * Automated email notifications and subscriptions for contractors and clients

  ### Frontend
  * React
  * Bootstrap
  * Cognito
  
  ### Backend
  * GraphQL
  * DynamoDB
  * Lambda
  * AWS Appsync
  * Amazon Bedrock
  * Simple Storage Service (S3)
  * Simple Notification Service (SNS)
  * CDK

  ## Questions
        
  *For further questions:*

  *Contact Info:*
    
  GitHub: [binh-ngo](https://github.com/binh-ngo)
  Email: [bnngo97@gmail.com](mailto:bnngo97@gmail.com)
      
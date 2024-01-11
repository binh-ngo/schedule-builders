import { API } from "aws-amplify";

export type SaveMessageProps = {
    messageId?: string;
    projectId?: string;
    body?: string;
    authorId?: string;
    authorName?: string;
}
// ==================
// CREATE MESSAGE
// ==================

const createMessageQuery = `
  mutation createMessage($messageInput: MessageInput!) {
    createMessage(messageInput: $messageInput) {
      authorId
      authorName
      body
      createdAt
      messageId
      threadId
      projectId
    }
  }
`;

export const ddbCreateMessage = async (messageInput: SaveMessageProps) => {

const resp = await API.graphql({
  query: createMessageQuery,
  variables: {
    messageInput: {
      projectId: messageInput.projectId,
      body: messageInput.body,
      authorId: messageInput.authorId,
      authorName: messageInput.authorName,
    },
  },
  authMode: "AMAZON_COGNITO_USER_POOLS",
});
// console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
return resp;
  };
// =====================
// GET MESSAGE BY ID
// =====================

const getMessageByIdQuery = `
query getMessageById($messageId: String!) {
    getMessageById(messageId: $messageId) {
      authorId
      authorName
      body
      createdAt
      messageId
      threadId
      projectId
    }
  }
`

export const ddbGetMessageById = async (messageId: string) => {
    const resp = await API.graphql({
      query: getMessageByIdQuery,
      variables: {
        messageId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    const contractor = resp.data.getMessageById;
    // console.log(`post.content: ${post.content}`);
    return contractor;
  };

// ===================
// GET ALL MESSAGES
// ===================

  const getAllMessagesQuery = `
  query getAllMessages($projectId: String!) {
      getAllMessages(projectId: $projectId) {
        authorId
        authorName
        body
        createdAt
        messageId
        threadId
        projectId
      }
    }
  `
  export const ddbGetAllMessages = async (projectId: string) => {
    const resp = await API.graphql({ 
      query: getAllMessagesQuery,
      variables: {
        projectId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    return resp.data.getAllMessages;
  }; 

  const getMessagesInThreadQuery = `
  query getMessagesInThread($projectId: String!, $authorName1: String!, $authorName2: String!) {
      getMessagesInThread(projectId: $projectId, authorName1: $authorName1, authorName2: $authorName2) {
        authorId
        authorName
        body
        createdAt
        messageId
        threadId
        projectId
      }
    }
  `
  export const ddbGetMessagesInThread = async (projectId: string, authorName1: string, authorName2: string) => {
    const resp = await API.graphql({ 
      query: getMessagesInThreadQuery,
      variables: {
        projectId,
        authorName1,
        authorName2
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    return resp.data.getMessagesInThread;
  }; 

// ===================
// UPDATE MESSAGES
// ===================

const updateMessageQuery = `
    mutation updateMessage($messageId: String!, $messageInput: MessageInput!) {
      updateMessage(messageId: $messageId, messageInput: $messageInput) {
        authorId
        authorName
        body
        createdAt
        messageId
        threadId
        projectId
      }
    }
  `;

  export const ddbUpdateMessage = async (messageInput: SaveMessageProps) => {
    const resp = await API.graphql({
      query: updateMessageQuery,
      variables: {
        messageId: messageInput.messageId,
        messageInput: {
          body: messageInput.body,
          authorId: messageInput.authorId,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  };

// ==============
// DELETE MESSAGE
// ==============

const deleteMessageQuery = `
  mutation deleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId)
  }
`;

export const ddbDeleteMessage = async (messageId: string) => {
    const resp = await API.graphql({
      query: deleteMessageQuery,
      variables: {
        messageId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    console.log(`successfully deleted: ${resp.data.deleteMessage}`);
  };

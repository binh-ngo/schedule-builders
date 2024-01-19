import { API } from "aws-amplify";

const chatbotQuery = `
  mutation chatbotResponse($prompt: String!, $category: String!) {
    chatbotResponse(prompt: $prompt, category: $category)
  }
`;

export const ddbChatbotResponse = async (prompt: string, category: string) => {
  const resp = await API.graphql({ 
    query: chatbotQuery,
    variables: {
      prompt,
      category
    },
    authMode: "API_KEY"
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.chatbotResponse;
};
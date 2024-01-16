import { API } from "aws-amplify";
export{}

const chatbotQuery = `
  mutation chatbotResponse($freeform_text: String!) {
    chatbotResponse(freeform_text: $freeform_text) {
      
    }
  }
`;
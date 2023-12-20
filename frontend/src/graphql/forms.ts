import { API } from "aws-amplify";

export type SaveFormProps = {
  formId?: string;
  formName?: string;
  question?: string[];
  attributes?: string[];
}

type CreateFormProps = {
  formName: string;
  questions: {
    question: string;
    attributes: {
      name: string;
    };
  }[];
};


// type attributesAttributes = {
//     name: string;
//     value: string;
// }

// ==================
// CREATE FORM
// ==================
const createFormQuery = `
  mutation createForm($formInput: FormInput!) {
    createForm(formInput: $formInput) {
      formId
      formName
      questions {
        question
        attributes {
          name
          value
        }
      }
      createdAt
      updatedAt
      isSelected
    }
  }
`;

export const ddbCreateForm = async (formInput: CreateFormProps) => {

  const resp = await API.graphql({
    query: createFormQuery,
    variables: {
      formInput
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  return resp;
};
// ==================
// GET FORM BY ID
// ==================
const getFormByIdQuery = `
query getFormById($formName: String!, $formId: String!) {
    getFormById(formName: $formName, formId: $formId) {
      createdAt
      formId
      formName
      questions {
        question
        attributes {
          name
          value
        }
      }
      updatedAt
      isSelected
    }
  }
`

export const ddbGetFormById = async (formName: string, formId: string) => {
  const resp = await API.graphql({
    query: getFormByIdQuery,
    variables: {
      formName,
      formId,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS"
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  const form = resp.data.getFormById;
  // console.log(`post.content: ${post.content}`);
  return form;
};

// ==================
// GET ALL FORMS
// ==================
const getAllFormsQuery = `
query getAllForms {
    getAllForms {
      createdAt
      formId
      formName
      questions {
        question
        attributes {
          name
          value
        }
      }
      updatedAt
      isSelected
      }
    }
`
export const ddbGetAllForms = async () => {
  const resp = await API.graphql({
    query: getAllFormsQuery,
    authMode: "AMAZON_COGNITO_USER_POOLS"
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllForms;
};

const getSelectedFormQuery = `
query getSelectedForm {
  getSelectedForm {
    createdAt
    formId
    formName
    questions {
      question
      attributes {
        name
        value
      }
    }
    updatedAt
    isSelected
    }
  }
`;
export const ddbGetSelectedForm = async () => {
  const resp = await API.graphql({ 
    query: getSelectedFormQuery,
    authMode: "AMAZON_COGNITO_USER_POOLS"
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getSelectedForm;
};

// ==================
// DELETE FORM
// ==================

const deleteFormQuery = `
  mutation deleteForm($formName: String!, $formId: String!) {
    deleteForm(formName: $formName, formId: $formId)
  }
`;

export const ddbDeleteForm = async (formName: string, formId: string) => {
  // console.log(`delete called for contractor ${formName}`);
  const resp = await API.graphql({
    query: deleteFormQuery,
    variables: {
      formName,
      formId,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  // console.log(`successfully deleted: ${resp.data.deleteForm}`);
};

// ==================
// UPDATE FORM
// ==================
const updateFormQuery = `
mutation updateForm($formName: String!, $formId: String!, $formInput: FormInput!) {
  updateForm(formName: $formName, formId: $formId, formInput: $FormInput) {
  createdAt
  formId
  formName
  questions {
    question
    attributes {
      name
      value
    }
  }
  updatedAt
  isSelected
    }
  }
  `;

export const ddbUpdateForm = async (formInput: SaveFormProps) => {
  const resp = await API.graphql({
    query: updateFormQuery,
    variables: {
      formName: formInput.formName,
      formId: formInput.formId,
      formInput: {
        formName: formInput.formName,
        question: formInput.question,
        attributes: formInput.attributes,
      },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
};

const selectFormQuery = `
  mutation adjustFormSelection($formId: String!, $isSelected: Boolean!) {
    adjustFormSelection(formId: $formId, isSelected: $isSelected) {
      createdAt
      formId
      formName
      questions {
        question
        attributes {
          name
          value
        }
      }
      updatedAt
      isSelected
        }
      }
`
export const ddbAddSelection = async (formId: string) => {
  // console.log(`Form getting ready to be selected with FormId: ${formId}`);
  const resp = await API.graphql({
    query: selectFormQuery,
    variables: {
      formId,
      isSelected: true,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  // console.log(`form ${formId} successfully selected: ${JSON.stringify(resp.data.adjustFormSelection)}`);
}

export const ddbRemoveSelection = async (formId: string) => {
  // console.log(`Form getting ready to be selected with FormId: ${formId}`);
  const resp = await API.graphql({
    query: selectFormQuery,
    variables: {
      formId,
      isSelected: false,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  // console.log(`form ${formId} successfully removed: ${resp.data.adjustFormSelection}`);
}
import { API } from "aws-amplify";

export type SaveBidProps = {
    contractorName: string;
    contractorId: string;
    projectId: string;
    bidAmount: number;
    bidId?: string;
}
// ==================
// CREATE BID
// ==================

const createBidQuery = `
  mutation createBid($bidInput: BidInput!) {
    createBid(bidInput: $bidInput) {
      bidAmount
      bidId
      contractorId
      contractorName
      createdAt
      projectId
    }
  }
`;

export const ddbCreateBid = async (bidInput: SaveBidProps) => {

const resp = await API.graphql({
  query: createBidQuery,
  variables: {
    bidInput: {
      contractorName: bidInput.contractorName,
      contractorId: bidInput.contractorId,
      projectId: bidInput.projectId,
      bidAmount: bidInput.bidAmount
    },
  },
  authMode: "AMAZON_COGNITO_USER_POOLS",
});
console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
return resp;
  };
// =====================
// GET BID BY ID
// =====================

const getBidByIdQuery = `
query getBidById($bidId: String!) {
    getBidById(bidId: $bidId) {
      bidAmount
      bidId
      contractorId
      contractorName
      createdAt
      projectId
    }
  }
`

export const ddbGetBidById = async (bidId: string) => {
    const resp = await API.graphql({
      query: getBidByIdQuery,
      variables: {
        bidId
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    const bid = resp.data.getBidById;
    // console.log(`post.content: ${post.content}`);
    return bid;
  };

// ===================
// GET ALL BIDS
// ===================

  const getAllBidsQuery = `
  query getAllBids($projectId: String!) {
      getAllBids(projectId: $projectId) {
        bidAmount
        bidId
        contractorId
        contractorName
        createdAt
        projectId
      }
    }
  `
  export const ddbGetAllBids = async (projectId: string) => {
    const resp = await API.graphql({ 
      query: getAllBidsQuery,
      variables: {
        projectId
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    return resp.data.getAllBids;
  }; 

// ===================
// UPDATE BIDS
// ===================

const updateBidQuery = `
    mutation updateBid($bidId: String!, $bidInput: BidInput!) {
      updateBid(bidId: $bidId, bidInput: $bidInput) {
        bidAmount
        bidId
        contractorId
        contractorName
        createdAt
        projectId
      }
    }
  `;

  export const ddbUpdateBid = async (bidInput: SaveBidProps) => {
    const resp = await API.graphql({
      query: updateBidQuery,
      variables: {
        bidId: bidInput.bidId,
        bidInput: {
          contractorName: bidInput.contractorName,
          contractorId: bidInput.contractorId,
          bidAmount: bidInput.bidAmount
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  };

// ==============
// DELETE BID
// ==============

const deleteBidQuery = `
  mutation deleteBid($projectId: String!, $bidId: String!) {
    deleteBid(projectId: $projectId, bidId: $bidId)
  }
`;

export const ddbDeleteBid = async (projectId: string, bidId: string) => {
    const resp = await API.graphql({
      query: deleteBidQuery,
      variables: {
        projectId,
        bidId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    console.log(`successfully deleted: ${resp.data.deleteBid}`);
  };

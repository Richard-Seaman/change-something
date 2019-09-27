const firebaseConfig = {
  apiKey: "AIzaSyDmufRyQfXP0746cuUwrLox8dPN-C6ZU2Y",
  authDomain: "change-something.firebaseapp.com",
  databaseURL: "https://change-something.firebaseio.com",
  projectId: "change-something",
  storageBucket: "change-something.appspot.com",
  messagingSenderId: "500300168354",
  appId: "1:500300168354:web:9c7e5134b6bac55f"
};

export default firebaseConfig;

export const collections = {
  PLEDGES: "pledges",
  COMMITMENTS: "commitments"
};

export const storedAs = {
  MY_COMMITMENTS: "myCommitments",
  ALL_PLEDGES: "allPledges",
  PLEDGE: "pledge",
  PROVIDERS_UNIQUE_CHECK: "providerUniqueCheck"
};

export const queries = {
  getPledges: () => {
    return {
      collection: collections.PLEDGES,
      storeAs: storedAs.ALL_PLEDGES
    };
  },
  getPledge: pledgeId => {
    return {
      collection: collections.PLEDGES,
      doc: pledgeId,
      storeAs: storedAs.PLEDGE
    };
  }
};

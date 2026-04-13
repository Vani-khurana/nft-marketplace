import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, push, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCCUQwQwSgi2y0w4wUYgqSrTFFCc8r5bd8",
  authDomain: "nft-marketplace-da664.firebaseapp.com",
  databaseURL: "https://nft-marketplace-da664-default-rtdb.firebaseio.com",
  projectId: "nft-marketplace-da664",
  storageBucket: "nft-marketplace-da664.firebasestorage.app",
  messagingSenderId: "504780116034",
  appId: "1:504780116034:web:0f7febba4759a5c32ddddb",
  measurementId: "G-83MNGFF4M7"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// --- Backend Helper Functions ---

// Fetch all NFTs
export const getNFTs = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'nfts'));
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    // Convert object of objects into an array of objects
    const nftList = Object.keys(data).map(key => ({ firebaseId: key, ...data[key] }));
    return nftList.reverse(); // put newest items first
  } else {
    return [];
  }
};

// Add a new NFT
export const addNFT = async (nftData) => {
  const nftsRef = ref(db, 'nfts');
  const newNftRef = push(nftsRef);
  await set(newNftRef, nftData);
  return newNftRef.key;
};

// Bulk insert dummy data (used only once if db is empty)
export const bulkInsertMocks = async (mocks) => {
  console.log("Empty DB detected, seeding initial data...");
  const nftsRef = ref(db, 'nfts');
  
  for (const item of mocks) {
    const newNftRef = push(nftsRef);
    await set(newNftRef, item);
  }
};

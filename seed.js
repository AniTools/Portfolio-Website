import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from 'fs';

// 1. --- YOUR FIREBASE CONFIG ---
// This should be the same config object from your src/lib/firebase.js file.
// I've copied it here for convenience so the script can run independently.
const firebaseConfig = {
  apiKey: "AIzaSyABhIAQ705h7Aopp-PhnZhSZz82KzvGMYU",
  authDomain: "anidesingit-portfolio.firebaseapp.com",
  projectId: "anidesingit-portfolio",
  storageBucket: "anidesingit-portfolio.firebasestorage.app",
  messagingSenderId: "397990432239",
  appId: "1:397990432239:web:e165d77c83330c93bbba1a"
};

// --- SCRIPT LOGIC (No need to edit below this line) ---

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to upload the data
async function uploadData() {
  try {
    console.log("Reading case_studies.json file...");
    // 2. Read the local JSON file
    const fileContent = fs.readFileSync('case_studies.json', 'utf8');
    const data = JSON.parse(fileContent);
    const projects = data.case_studies;

    console.log(`Found ${Object.keys(projects).length} projects to upload.`);

    // 3. Get a reference to the 'case_studies' collection in Firestore
    const studiesCollection = collection(db, 'case_studies');

    // 4. Loop through each project in the JSON and add it to Firestore
    for (const key in projects) {
      if (projects.hasOwnProperty(key)) {
        const projectData = projects[key];
        await addDoc(studiesCollection, projectData);
        console.log(`Successfully uploaded: ${projectData.name}`);
      }
    }

    console.log("\n✅ All projects have been successfully uploaded to Firestore!");

  } catch (error) {
    console.error("❌ Error uploading data:", error);
  }
}

// Run the upload function
uploadData();

import { useEffect } from "react";
import { databases } from "@/lib/appwrite";

const AppwriteTest = () => {
  useEffect(() => {
    databases
      .listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, "blogs")
      .then((res) => {
        console.log("✅ APPWRITE CONNECTED");
        console.log("DOCUMENTS:", res.documents);
        alert(`Fetched ${res.documents.length} documents`);
      })
      .catch((err) => {
        console.error("❌ APPWRITE ERROR", err);
        alert("Appwrite error – check console");
      });
  }, []);

  return <h1>Check console</h1>;
};

export default AppwriteTest;

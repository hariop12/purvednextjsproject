import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { databases, DB_ID, CONTACT_COLLECTION_ID } from "../../lib/appwrite";

interface Contact extends Models.Document {
  name: string;
  email: string;
  message: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    databases.listDocuments(DB_ID, CONTACT_COLLECTION_ID).then((res) => {
      const docs = res.documents.map((doc) => doc as unknown as Contact);
      setContacts(docs);
    });
  }, []);

  return (
    <div>
      <h2>Contacts</h2>
      {contacts.map((c) => (
        <div key={c.$id}>
          <p>{c.name}</p>
          <p>{c.email}</p>
          <p>{c.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Contacts;

import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { databases, DB_ID, CONTACT_COLLECTION_ID } from "../../lib/appwrite";

interface Contact extends Models.Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactsView = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    databases.listDocuments(DB_ID, CONTACT_COLLECTION_ID).then((res) => {
      setContacts(res.documents as unknown as Contact[]);
    });
  }, []);

  return (
    <>
      <h2 className="admin-section-title">Contacts</h2>

      <div className="admin-list">
        {contacts.map((c) => (
          <div className="admin-row" key={c.$id}>
            <div className="admin-row-left">
              <div className="admin-row-title">{c.name}</div>
              <div className="admin-row-meta">
                {c.email} • {c.phone}
              </div>
              <div className="admin-tag">{c.subject}</div>
              <div className="admin-row-meta">{c.message}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactsView;

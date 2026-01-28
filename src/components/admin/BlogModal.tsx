import { useState } from "react";
import { Models } from "appwrite";
import { databases, DB_ID, BLOGS_COLLECTION_ID, ID } from "../../lib/appwrite";

/* =====================
   TYPES
===================== */
export type BlogStatus = "draft" | "published";

export interface Blog extends Models.Document {
  title: string;
  content: string;
  author: string;
  status: BlogStatus;
}

interface BlogModalProps {
  close: () => void;
  refresh: () => void;
  blog: Blog | null;
}

const BlogModal = ({ close, refresh, blog }: BlogModalProps) => {
  const [title, setTitle] = useState(blog?.title ?? "");
  const [content, setContent] = useState(blog?.content ?? "");
  const [status, setStatus] = useState<BlogStatus>(blog?.status ?? "draft");

  const submit = async () => {
    const data = {
      title,
      content,
      author: "Purved Innovators",
      status,
    };

    if (blog) {
      await databases.updateDocument(
        DB_ID,
        BLOGS_COLLECTION_ID,
        blog.$id,
        data,
      );
    } else {
      await databases.createDocument(
        DB_ID,
        BLOGS_COLLECTION_ID,
        ID.unique(),
        data,
      );
    }

    refresh();
    close();
  };

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal">
        <h3>{blog ? "Edit Blog" : "Post Blog"}</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows={6}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as BlogStatus)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <div className="modal-actions">
          <button className="admin-btn" onClick={submit}>
            Save
          </button>
          <button className="admin-btn" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;

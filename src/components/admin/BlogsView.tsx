import { useState } from "react";
import { databases, DB_ID, BLOGS_COLLECTION_ID, ID } from "@/lib/appwrite";

const BlogsView = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    image: "",
    readTime: "",
    date: "",
    content: "",
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitBlog = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.category ||
      !form.author ||
      !form.image ||
      !form.content
    ) {
      alert("❌ Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await databases.createDocument(DB_ID, BLOGS_COLLECTION_ID, ID.unique(), {
        title: form.title,
        description: form.description,
        category: form.category,
        author: form.author,
        image: form.image,
        readTime: form.readTime || null,
        date: form.date || null,
        content: form.content,
      });

      alert("✅ Blog posted successfully!");

      setForm({
        title: "",
        description: "",
        category: "",
        author: "",
        image: "",
        readTime: "",
        date: "",
        content: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to post blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 700 }}>
      <h2>Post Blog</h2>

      <input
        placeholder="Blog Title *"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <input
        placeholder="Short Description *"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
      />

      <input
        placeholder="Category *"
        value={form.category}
        onChange={(e) => update("category", e.target.value)}
      />

      <input
        placeholder="Author *"
        value={form.author}
        onChange={(e) => update("author", e.target.value)}
      />

      <input
        placeholder="Image URL *"
        value={form.image}
        onChange={(e) => update("image", e.target.value)}
      />

      <input
        placeholder="Read Time (optional)"
        value={form.readTime}
        onChange={(e) => update("readTime", e.target.value)}
      />

      <input
        placeholder="Date (optional)"
        value={form.date}
        onChange={(e) => update("date", e.target.value)}
      />

      <textarea
        placeholder="Blog Content (HTML allowed) *"
        rows={6}
        value={form.content}
        onChange={(e) => update("content", e.target.value)}
      />

      <button onClick={submitBlog} disabled={loading}>
        {loading ? "Publishing..." : "Publish Blog"}
      </button>
    </div>
  );
};

export default BlogsView;

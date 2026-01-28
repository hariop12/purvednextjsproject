import { useState } from "react";
import Dashboard from "./DashboardView";
import BlogsView from "./BlogsView";
import ContactsView from "./ContactsView";
import JobApplicationsView from "./JobsView";

type AdminTab = "dashboard" | "contacts" | "jobs" | "blogs";

const AdminLayout = () => {
  const [active, setActive] = useState<AdminTab>("dashboard");

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h3 className="admin-title">Admin Panel</h3>

        <button onClick={() => setActive("dashboard")}>Dashboard</button>
        <button onClick={() => setActive("contacts")}>Contacts</button>
        <button onClick={() => setActive("jobs")}>Job Applications</button>
        <button onClick={() => setActive("blogs")}>Blogs</button>
      </aside>

      {/* CONTENT */}
      <main className="admin-content">
        {active === "dashboard" && <Dashboard />}
        {active === "contacts" && <ContactsView />}
        {active === "jobs" && <JobApplicationsView />}
        {active === "blogs" && <BlogsView />}
      </main>
    </div>
  );
};

export default AdminLayout;

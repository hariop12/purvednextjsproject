import { Link } from "react-router-dom";
import AdminProtected from "../../components/AdminProtected";

const Dashboard = () => {
  return (
    <AdminProtected>
      <div>
        <h1>Admin Dashboard</h1>
        <Link to="/admin/contacts">Contacts</Link>
        <br />
        <Link to="/admin/jobs">Job Applications</Link>
      </div>
    </AdminProtected>
  );
};

export default Dashboard;

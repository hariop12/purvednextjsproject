interface Props {
  active: string;
  setActive: (v: string) => void;
}

const Sidebar = ({ active, setActive }: Props) => {
  const item = (id: string, label: string) => (
    <div
      onClick={() => setActive(id)}
      style={{
        padding: "14px 20px",
        cursor: "pointer",
        background: active === id ? "#1e5b6f" : "transparent",
        color: "#fff",
        borderRadius: "6px",
        marginBottom: "8px",
      }}
    >
      {label}
    </div>
  );

  return (
    <div
      style={{
        width: 260,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #154474, #0f2f3a)",
        padding: 20,
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: 30 }}>Admin Panel</h2>
      {item("dashboard", "Dashboard")}
      {item("contacts", "Contacts")}
      {item("jobs", "Job Applications")}
    </div>
  );
};

export default Sidebar;

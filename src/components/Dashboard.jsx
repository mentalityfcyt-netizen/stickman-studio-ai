function Dashboard({ project }) {
  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        padding: "25px",
        borderRadius: "15px",
        marginBottom: "30px",
      }}
    >
      <h1 style={{ marginTop: 0 }}>🎬 Project Workspace</h1>

      <h2>{project?.name}</h2>

      <p>{project?.idea}</p>

      <div
        style={{
          display: "flex",
          gap: "40px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <strong>Status</strong>
          <p>🟢 AI Generated</p>
        </div>

        <div>
          <strong>Sections</strong>
          <p>📜 5 Generated</p>
        </div>

        <div>
          <strong>Created</strong>
          <p>📅 Today</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
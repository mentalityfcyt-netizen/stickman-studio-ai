import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./services/firebaseService";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [currentProject, setCurrentProject] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function goHome() {
    setRefreshKey((oldKey) => oldKey + 1);
    setPage("home");
  }

  if (!user) {
    return <Auth setUser={setUser} />;
  }

  let content;

  if (page === "newProject") {
    content = (
      <NewProject
        user={user}
        setPage={setPage}
        goHome={goHome}
        setCurrentProject={setCurrentProject}
      />
    );
  } else if (page === "project") {
    content = <Project project={currentProject} setPage={setPage} goHome={goHome} />;
  } else {
    content = (
      <Home
        key={refreshKey}
        user={user}
        setPage={setPage}
        setCurrentProject={setCurrentProject}
      />
    );
  }

  return (
    <Layout setPage={setPage}>
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => {
            signOut(auth);
            setUser(null);
          }}
          className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-500"
        >
          Logout
        </button>
      </div>

      {content}
    </Layout>
  );
}

export default App;
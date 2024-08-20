import { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("efecto", { enabled });

    const handleMove = (e) => {
      const [clientX, clientY] = [e.clientX, e.clientY];
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      document.body.classList.add("no-cursor");
      window.addEventListener("mousemove", handleMove);
    } else {
      document.body.classList.remove("no-cursor");
    }

    // Cleanup cuando el componente se desmonta, o cuando cambian las dependencias
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("no-cursor");
    };
  }, [enabled]);

  return (
    <>
      <div
        className={`cursor ${enabled ? "active" : ""}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      <h1 className="title">Mouse Follower</h1>
      <button
        className={`button ${enabled ? "active" : ""}`}
        onClick={() => {
          setEnabled(!enabled);
        }}
      >
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};

function App() {
  return (
    <main className="container">
      <FollowMouse />
    </main>
  );
}

export default App;
import { useEffect, useState } from "react";
import "./App.css";
import KpiCard from "./components/KpiCard";
import VesselTable from "./components/VesselTable";
import IncidentTimeline from "./components/IncidentTimeline";

function App() {
  const [vessels, setVessels] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const vesselsResponse = await fetch("http://127.0.0.1:8000/vessels");
        const incidentsResponse = await fetch(
          "http://127.0.0.1:8000/incidents"
        );

        if (!vesselsResponse.ok || !incidentsResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const vesselsData = await vesselsResponse.json();
        const incidentsData = await incidentsResponse.json();

        setVessels(vesselsData);
        setIncidents(incidentsData);
      } catch (error) {
        console.error(error);
        setError(
          "Could not load dashboard data. Please check the backend server."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const filteredVessels = vessels.filter((vessel) => {
    const matchesSearch = vessel.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "delayed" && vessel.delay !== "No delay") ||
      (filter === "no-delay" && vessel.delay === "No delay");

    return matchesSearch && matchesFilter;
  });

  const totalVessels = vessels.length;

  const delayedVessels = vessels.filter(
    (vessel) => vessel.delay !== "No delay"
  ).length;

  const activeIncidents = incidents.length;

  const congestionLevel = delayedVessels >= 3 ? "High" : "Medium";

  const kpiData = [
    {
      title: "Vessels in Port",
      value: totalVessels,
      description: "Currently tracked vessels",
    },
    {
      title: "Delayed Vessels",
      value: delayedVessels,
      description: "Vessels arriving later than planned",
    },
    {
      title: "Active Incidents",
      value: activeIncidents,
      description: "Open operational issues",
    },
    {
      title: "Port Congestion",
      value: congestionLevel,
      description: "Current traffic level",
    },
  ];

  if (loading) {
    return <p className="message">Loading dashboard data...</p>;
  }

  if (error) {
    return <p className="message error-message">{error}</p>;
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Smart Port Dashboard</h1>
          <p>Real-time port intelligence practice system</p>
        </div>

        <button className="refresh-button">Refresh Data</button>
      </header>

      <section className="kpi-grid">
        {kpiData.map((item) => (
          <KpiCard
            key={item.title}
            title={item.title}
            value={item.value}
            description={item.description}
          />
        ))}
      </section>

      <div className="dashboard-controls">
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All Vessels
          </button>

          <button
            className={filter === "delayed" ? "active-filter" : ""}
            onClick={() => setFilter("delayed")}
          >
            Delayed Only
          </button>

          <button
            className={filter === "no-delay" ? "active-filter" : ""}
            onClick={() => setFilter("no-delay")}
          >
            No Delay
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search vessel..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <main className="content-grid">
        <VesselTable vessels={filteredVessels} />
        <IncidentTimeline incidents={incidents} />
      </main>
    </div>
  );
}

export default App;
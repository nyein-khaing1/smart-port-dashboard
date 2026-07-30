import "./App.css";
import KpiCard from "./components/KpiCard";
import VesselTable from "./components/VesselTable";

const kpiData = [
    {
        title: "Vessels in Port",
        value: 25,
        description: "Currently active vessels",
    },
    {
        title: "Delayed Vessels",
        value: 4,
        description: "Vessels arriving later than planned",
    },
    {
        title: "Active Incidents",
        value: 3,
        description: "Open operational issues",
    },
    {
        title: "Port Congestion",
        value: "10",
        description: "Current traffic level",
    },
];

const vessels = [
    {
        id: 1,
        name: "Ocean Star",
        type: "Cargo",
        status: "Arrived",
        arrivalTime: "08:30",
        delay: "No delay",
    },
    {
        id: 2,
        name: "Blue Horizon",
        type: "Container",
        status: "Waiting",
        arrivalTime: "10:15",
        delay: "45 mins",
    },
    {
        id: 3,
        name: "North Sea Queen",
        type: "Tanker",
        status: "Delayed",
        arrivalTime: "12:00",
        delay: "2 hours",
    },


    {
        id: 4,
        name: "Silver Wave",
        type: "Cargo",
        status: "Arriving",
        arrivalTime: "14:45",
        delay: "30 mins",
    }
];

const incidents = [
    {
        id: 1,
        time: "09:00",
        title: "Berth unavailable",
        details: "One berth is temporarily unavailable due to maintenance.",
    },
    {
        id: 2,
        time: "10:30",
        title: "Weather warning",
        details: "High wind conditions may delay vessel movement.",
    },
    {
        id: 3,
        time: "11:15",
        title: "Equipment issue",
        details: "Crane inspection required before unloading can continue.",
    },

    {
        id: 4,
        time: "13:20",
        title: "Gate congestion",
        details: "Heavy vehicle traffic is causing delays at the port entrance.",
    },
];

function App() {
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

            <main className="content-grid">
                <VesselTable vessels={vessels} />

                <section className="panel">
                    <h2>Incident Timeline</h2>

                    <div className="timeline">
                        {incidents.map((incident) => (
                            <div className="incident-card" key={incident.id}>
                                <span>{incident.time}</span>
                                <h3>{incident.title}</h3>
                                <p>{incident.details}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
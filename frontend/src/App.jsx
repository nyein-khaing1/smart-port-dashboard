import "./App.css";
import KpiCard from "./components/KpiCard";
import VesselTable from "./components/VesselTable";
import IncidentTimeline from "./components/IncidentTimeline";
import { useState, useEffect } from "react";




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
    },

    {
        id: 5,
        name: "Harbour Light",
        type: "Container",
        status: "Delayed",
        arrivalTime: "16:10",
        delay: "1 hour",
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
    const [filter, setFilter] = useState("all");
    //create a filter value
    const [searchTerm, setSearchTerm] = useState("");
    

    const filteredVessels = vessels.filter((vessel) => {
        const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = 
            filter === "all" ||
            (filter === "delayed" && vessel.delay !== "No delay") ||
            (filter === "no-delay" && vessel.delay === "No delay");

        return matchesSearch && matchesFilter;

    });

    const totalVessels = vessels.length;
    const delayedVessels = vessels.filter((vessel) => vessel.delay !== "No delay").length;
    const activeIncidents = incidents.length;
    const congestionLevel = delayedVessels >= 3 ? "High" : "Medium";

    const kpiData = [
        { title: "Total Vessels", value: totalVessels, description: "Currently tracked vessels" },
        { title: "Delayed Vessels", value: delayedVessels, description: "Vessels arriving later than planned" },
        { title: "Active Incidents", value: activeIncidents, description: "Open operational issues" },
        { title: "Congestion Level", value: congestionLevel, description: "Current traffic level" },
    ];

    



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
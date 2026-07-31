from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vessels = [
    {
        "id": 1,
        "name": "Ocean Star",
        "type": "Cargo",
        "status": "Arrived",
        "arrivalTime": "08:30",
        "delay": "No delay",
    },
    {
        "id": 2,
        "name": "Blue Horizon",
        "type": "Container",
        "status": "Waiting",
        "arrivalTime": "10:15",
        "delay": "45 mins",
    },
    {
        "id": 3,
        "name": "North Sea Queen",
        "type": "Tanker",
        "status": "Delayed",
        "arrivalTime": "12:00",
        "delay": "2 hours",
    },
    {
        "id": 4,
        "name": "Silver Wave",
        "type": "Cargo",
        "status": "Arriving",
        "arrivalTime": "14:45",
        "delay": "30 mins",
    },
]

incidents = [
    {
        "id": 1,
        "time": "09:00",
        "title": "Berth unavailable",
        "details": "One berth is temporarily unavailable due to maintenance.",
    },
    {
        "id": 2,
        "time": "10:30",
        "title": "Weather warning",
        "details": "High wind conditions may delay vessel movement.",
    },
    {
        "id": 3,
        "time": "11:15",
        "title": "Equipment issue",
        "details": "Crane inspection required before unloading can continue.",
    },
]


@app.get("/")
def read_root():
    return {"message": "Smart Port API is running"}


@app.get("/vessels")
def get_vessels():
    return vessels


@app.get("/incidents")
def get_incidents():
    return incidents


@app.get("/dashboard-stats")
def get_dashboard_stats():
    total_vessels = len(vessels)

    delayed_vessels = len(
        [vessel for vessel in vessels if vessel["delay"] != "No delay"]
    )

    active_incidents = len(incidents)

    congestion_level = "High" if delayed_vessels >= 3 else "Medium"

    return {
        "totalVessels": total_vessels,
        "delayedVessels": delayed_vessels,
        "activeIncidents": active_incidents,
        "congestionLevel": congestion_level,
    }
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import initialize_database, get_all_vessels, get_all_incidents

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

initialize_database()


@app.get("/")
def read_root():
    return {"message": "Smart Port API is running with SQLite database"}


@app.get("/vessels")
def get_vessels():
    vessels = get_all_vessels()
    return vessels


@app.get("/incidents")
def get_incidents():
    incidents = get_all_incidents()
    return incidents


@app.get("/dashboard-stats")
def get_dashboard_stats():
    vessels = get_all_vessels()
    incidents = get_all_incidents()

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
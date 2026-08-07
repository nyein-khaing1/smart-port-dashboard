import sqlite3

DATABASE_NAME = "smart_port.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_NAME)
    connection.row_factory = sqlite3.Row
    return connection


def create_tables():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS vessels (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            status TEXT NOT NULL,
            arrivalTime TEXT NOT NULL,
            delay TEXT NOT NULL
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY,
            time TEXT NOT NULL,
            title TEXT NOT NULL,
            details TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()


def seed_data():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM vessels")
    vessel_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM incidents")
    incident_count = cursor.fetchone()[0]

    if vessel_count == 0:
        vessels = [
            (1, "Ocean Star DB", "Cargo", "Arrived", "08:30", "No delay"),
            (2, "Blue Horizon", "Container", "Waiting", "10:15", "45 mins"),
            (3, "North Sea Queen", "Tanker", "Delayed", "12:00", "2 hours"),
            (4, "Silver Wave", "Cargo", "Arriving", "14:45", "30 mins"),
        ]

        cursor.executemany(
            """
            INSERT INTO vessels (id, name, type, status, arrivalTime, delay)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            vessels,
        )

    if incident_count == 0:
        incidents = [
            (
                1,
                "09:00",
                "Berth unavailable",
                "One berth is temporarily unavailable due to maintenance.",
            ),
            (
                2,
                "10:30",
                "Weather warning",
                "High wind conditions may delay vessel movement.",
            ),
            (
                3,
                "11:15",
                "Equipment issue",
                "Crane inspection required before unloading can continue.",
            ),
        ]

        cursor.executemany(
            """
            INSERT INTO incidents (id, time, title, details)
            VALUES (?, ?, ?, ?)
            """,
            incidents,
        )

    connection.commit()
    connection.close()


def get_all_vessels():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM vessels")
    rows = cursor.fetchall()

    connection.close()

    return [dict(row) for row in rows]


def get_all_incidents():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM incidents")
    rows = cursor.fetchall()

    connection.close()

    return [dict(row) for row in rows]


def initialize_database():
    create_tables()
    seed_data()
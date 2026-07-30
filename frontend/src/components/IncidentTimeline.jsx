function IncidentTimeline({ incidents }) {
  return (
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
  );
}

export default IncidentTimeline;
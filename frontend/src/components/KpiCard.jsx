function KpiCard({ title, value, description }) {
  return (
    <div className="kpi-card">
      <h2>{value}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default KpiCard;
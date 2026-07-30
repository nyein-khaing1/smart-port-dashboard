function VesselTable({ vessels }) {
    return (
        <section className="panel">
            <h2>Vessel Tracking</h2>

            <table>
                <thead>
                    <tr>
                        <th>Vessel</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Arrival</th>
                        <th>Delay</th>
                    </tr>
                </thead>

                <tbody>
                    {vessels.map((vessel) => (
                        <tr key={vessel.id}>
                            <td>{vessel.name}</td>
                            <td>{vessel.type}</td>
                            <td>{vessel.status}</td>
                            <td>{vessel.arrivalTime}</td>
                            <td>{vessel.delay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default VesselTable;

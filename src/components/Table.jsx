export default function Table({ data, loading }) {
    return (
        <div className="card table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>Scan ID</th>
                        <th>Session</th>
                        <th>Operator</th>
                        <th>Device</th> 
                        <th>Action</th>
                        <th>Status</th>
                        <th>Failure</th>
                        <th>Location</th>
                        <th>App Version</th>
                        <th>Time</th> 
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                                <div className="spinner"></div>
                                <p>Loading data...</p>
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan="9" style={{ textAlign: "center" }}>
                                No Data Found
                            </td>
                        </tr>
                    ) : (
                        data.map(item => (
                            <tr
                                key={item.scan_id}
                                className={item.status === "fail" ? "row-fail" : ""}
                            >
                                <td>{item.scan_id}</td>
                                <td>{item.session_id}</td>
                                <td>{item.operator_id}</td>
                                <td>{item.device_id}</td>
                                <td>{item.action}</td>

                                <td>
                                    <span className={`badge ${item.status}`}>
                                        {item.status}
                                    </span>
                                </td>

                                <td>{item.failure_reason || "-"}</td>

                                <td>
                                    {item.location ? (
                                        <>
                                            {item.location.lat.toFixed(2)}, {item.location.lng.toFixed(2)}
                                            {item.location.accuracy > 50 && (
                                                <span style={{ color: "orange", marginLeft: 5 }}>
                                                    ⚠ Low accuracy
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>

                                <td>{item.app_version}</td>

                                <td>{new Date(item.timestamp).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
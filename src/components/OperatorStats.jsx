export default function OperatorStats({ data }) {
    const allOperators = ["OP_1", "OP_2", "OP_3", "OP_4", "OP_5"];

    const activeSet = new Set(data.map(d => d.operator_id));

    return (
        <div className="card">
            <h4>Operator Activity</h4>

            {allOperators.map(op => (
                <div key={op}>
                    {op} — {activeSet.has(op) ? "🟢 Active" : "⚪ Inactive"}
                </div>
            ))}
        </div>
    );
}
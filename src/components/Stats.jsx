export default function Stats({ data }) {
    const total = data.length;
    const success = data.filter(d => d.status === "success").length;
    const fail = data.filter(d => d.status === "fail").length;

    const allOperators = ["OP_1", "OP_2", "OP_3", "OP_4", "OP_5", "OP_6", "OP_7"];
    const activeOperators = new Set(data.map(d => d.operator_id));

    const activeCount = activeOperators.size;
    const inactiveCount = allOperators.length - activeCount;

    return (
        <div className="card_row flex">
            <div className="kpi_card"><span className="b-txt">Total Scan Events</span> <span>{total}</span></div>
            <div className="kpi_card"><span className="b-txt">Success / Fail</span> <span>{success} / {fail}</span></div>
            <div className="kpi_card"><span className="b-txt">Active Operators</span> <span>{activeCount}</span></div>
            <div className="kpi_card"><span className="b-txt">Inactive Operators</span> <span>{inactiveCount}</span></div>
        </div>
    );
}
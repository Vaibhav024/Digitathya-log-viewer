export default function Filters({ filters, setFilters }) {
    return (
        <div className="filter-row flex justify-between m-justify-center">
            <div>
                <h2>Scan log list</h2>
            </div>
            <div className="flex flex-end">
                <select
                    onChange={e =>
                        setFilters(f => ({ ...f, operator: e.target.value }))
                    }
                >
                    <option value="">All Operators</option>
                    <option value="OP_1">OP_1</option>
                    <option value="OP_2">OP_2</option>
                    <option value="OP_3">OP_3</option>
                    <option value="OP_4">OP_4</option>
                    <option value="OP_5">OP_5</option>
                    <option value="OP_6">OP_6</option>
                    <option value="OP_7">OP_7</option>
                </select>

                <select onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
                    <option value="">All Status</option>
                    <option value="success">Success</option>
                    <option value="fail">Fail</option>
                </select>

                <select onChange={e => setFilters(f => ({ ...f, action: e.target.value }))}>
                    <option value="">All Actions</option>
                    <option value="receive">Receive</option>
                    <option value="dispatch">Dispatch</option>
                    <option value="verify">Verify</option>
                    <option value="return">Return</option>
                </select>
            </div>
        </div>
    );
}
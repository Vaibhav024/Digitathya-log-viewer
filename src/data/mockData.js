const actions = ["receive", "dispatch", "verify", "return"];
const statuses = ["success", "fail"];

const allOperators = ["OP_1", "OP_2", "OP_3", "OP_4", "OP_5", "OP_6", "OP_7"];
const activeOperators = ["OP_1", "OP_2", "OP_3", "OP_6", "OP_7"]; // OP_4, OP_5 inactive

function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function getRandomItem(arr, seed) {
    return arr[Math.floor(seededRandom(seed) * arr.length)];
}

export function generateMockData(count = 50) {
    const data = [];
    let scanCounter = 1;
    let sessionId = 1;

    while (data.length < count) {
        // each session has 2–5 steps
        const sessionSize = Math.floor(seededRandom(sessionId) * 4) + 2;

        // pick active operator only
        const operator =
            activeOperators[
            Math.floor(seededRandom(sessionId * 3) * activeOperators.length)
            ];

        // 🔥 CONTROL FAILURE RATE HERE (IMPORTANT)
        // 30% sessions will fail
        const sessionWillFail = seededRandom(sessionId * 5) < 0.3;

        let failed = false;

        for (let step = 0; step < sessionSize; step++) {
            if (data.length >= count) break;

            const action = actions[step] || getRandomItem(actions, step);

            // 🔥 FAIL MID-SESSION (after first step)
            if (sessionWillFail && !failed && step >= 1) {
                failed = true;
            }

            const status = failed ? "fail" : "success";

            const hasLocation = seededRandom(scanCounter * 2) > 0.3;

            data.push({
                scan_id: `SCAN_${scanCounter}`,
                session_id: `SESSION_${sessionId}`,
                operator_id: operator,
                device_id: `DEV_${Math.ceil(
                    seededRandom(scanCounter * 4) * 3
                )}`,
                timestamp: new Date(
                    2024,
                    0,
                    sessionId,
                    10,
                    scanCounter % 60
                ).toISOString(),
                action,
                status,
                failure_reason: status === "fail" ? "Network issue" : null,

                location: hasLocation
                    ? {
                        lat: 19.07 + seededRandom(scanCounter * 6) * 0.01,
                        lng: 72.87 + seededRandom(scanCounter * 7) * 0.01,
                        accuracy: Math.floor(
                            seededRandom(scanCounter * 8) * 100
                        ),
                    }
                    : null,

                app_version: `1.${Math.floor(
                    seededRandom(scanCounter * 9) * 5
                )}.${Math.floor(
                    seededRandom(scanCounter * 10) * 10
                )}`,
            });

            scanCounter++;
        }

        sessionId++;
    }

    return data;
}
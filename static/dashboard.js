// Load latest session
const session = JSON.parse(localStorage.getItem("sessionData"));

if (!session) {
    alert("No session data found. Play a game first!");
    throw new Error("No session data");
}

/* =========================
   📊 ACCURACY CHART (LEVEL-WISE)
========================= */

if (!session.levelAccuracy) {
    console.error("No levelAccuracy found (old data?)");
} else {

    const accuracyLabels = session.levelAccuracy.map((_, i) => `Level ${i + 1}`);
    const accuracyData = session.levelAccuracy.map(v => (v * 100).toFixed(2));

    const ctx1 = document.getElementById("accuracyChart").getContext("2d");

    new Chart(ctx1, {
        type: "line",
        data: {
            labels: accuracyLabels,
            datasets: [{
                label: "Accuracy (%)",
                data: accuracyData,
                borderWidth: 2,
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: value => value + "%"
                    }
                }
            }
        }
    });
}


/* =========================
   ⚡ REACTION TIME (LEVEL-WISE AVG)
========================= */

if (!session.reactionTimes || !session.levelAccuracy) {
    console.error("Missing reaction time data");
} else {

    let levelReaction = [];
    let index = 0;

    for (let lvl = 1; lvl <= session.levelAccuracy.length; lvl++) {

        let clicksThisLevel = lvl; // Simon game pattern
        let slice = session.reactionTimes.slice(index, index + clicksThisLevel);

        if (slice.length === 0) break;

        let avg = slice.reduce((a, b) => a + b, 0) / slice.length;

        levelReaction.push(Math.round(avg));
        index += clicksThisLevel;
    }

    const reactionLabels = levelReaction.map((_, i) => `Level ${i + 1}`);

    const ctx2 = document.getElementById("reactionChart").getContext("2d");

    new Chart(ctx2, {
        type: "line",
        data: {
            labels: reactionLabels,
            datasets: [{
                label: "Reaction Time (ms)",
                data: levelReaction,
                borderWidth: 2,
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true
        }
    });
}


/* =========================
   🧠 INSIGHTS SECTION
========================= */

const insightBox = document.getElementById("insight");

if (insightBox && session.levelAccuracy) {

    let lastAccuracy = session.levelAccuracy.at(-1);
    let avgAccuracy = session.levelAccuracy.reduce((a, b) => a + b, 0) / session.levelAccuracy.length;

    if (lastAccuracy < 0.7) {
        insightBox.innerText = "⚠️ Accuracy dropped at higher levels → possible cognitive fatigue.";
    } 
    else if (avgAccuracy > 0.9) {
        insightBox.innerText = "🔥 Excellent performance! High accuracy across levels.";
    } 
    else {
        insightBox.innerText = "👍 Stable performance. Minor drops at higher difficulty.";
    }
}


/* =========================
   🧾 DEBUG LOG (OPTIONAL)
========================= */

console.log("Session Data:", session);
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");

const db = new sqlite3.Database(
    "./firefighters.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQLite database.");
    }
);

function parseData(rawData) {
    let unitType = "";
    let unitNumber = "";
    let forest = "";

    for (let i = 0; i < rawData.length; i++) {
        const char = rawData[i];
        if (isNaN(char) && unitNumber === "") {
            unitType += char;
        } else if (!isNaN(char) && char !== " ") {
            unitNumber += char;
        } else {
            forest = rawData.slice(i).trim();
            break;
        }
    }

    return [forest, unitType, unitNumber];
}


db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS firefighters (forest TEXT, unit_type TEXT, name TEXT)"
    );
    const results = [];

    fs.createReadStream("WildWeb.csv")
        .pipe(csv())
        .on("data", (data) => {
            const raw = data[Object.keys(data)[0]];
            const [forest, unitType, unitNumber] = parseData(raw);
            results.push({ forest, unitType, unitNumber });
        })
        .on("end", () => {
            const stmt = db.prepare("INSERT INTO firefighters (forest, unit_type, name) VALUES (?, ?, ?)");
            results.forEach((row) => {
                stmt.run(row.forest, row.unitType, row.unitNumber);
            });
            stmt.finalize();
            console.log("Data imported successfully.");
        });

});
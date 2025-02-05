import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { FormData } from "@/types/types";

let db: Database | null = null;

export async function POST(request: Request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    const rawFormData = await request.formData();
    const data: FormData = {
        RequestType: rawFormData.get("requestType") as string,
        forest: rawFormData.get("forest") as string,
        unitType: rawFormData.get("unitType") as string,
        unitNumber: rawFormData.get("unitNumber") as string,
    };

    if (!data) {
        return new Response('Error Parsing Form Data', { status: 405 });
    }

    // if () {
    //     return new Response('Only one type of Request', { status: 405 });
    // }

    // if (Object.values(FormRequestType).includes(data.get("RequestType"))) {

    // }

    // Update product details using the id and data
    console.log(data);

    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
            filename: "./collection.db", // Specify the database file path
            driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
    }

    // Perform a database query to retrieve all items from the "items" table
    //  OR unitNumber IN (SELECT unitNumber FROM collection WHERE unitType = 'CRW')
    try {
        const items = await db.all(`SELECT * FROM collection WHERE unitType = '${data.unitType}';`);
        console.log(items);
        // Return the items as a JSON response with status 200
        return new Response(JSON.stringify(items), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (e: unknown) {
        console.log(e)
    }
}

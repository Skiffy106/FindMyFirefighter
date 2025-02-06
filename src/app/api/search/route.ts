import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { NextResponse } from "next/server";
import { Firefighter } from '@/types/firefighter';

let db: Database | null = null;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
            filename: "./firefighters.db",
            driver: sqlite3.Database,
        });
    }
    const preparedStatement = await db.prepare("SELECT * FROM firefighters WHERE name LIKE ? OR forest LIKE ? OR unit_type LIKE ?");
    const firefighters: Firefighter[] = await preparedStatement.all(`%${query}%`, `%${query}%`, `%${query}%`);

    return NextResponse.json(firefighters)
}
import { NextResponse } from 'next/server';
import scrapeAndUpdateDatabase from '@/lib/scraper';

export async function GET() {
    await scrapeAndUpdateDatabase();
    return NextResponse.json({ message: 'Scraping initiated' });
}
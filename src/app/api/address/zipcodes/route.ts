import {NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
    const cityId = req.nextUrl.searchParams.get('city_id');

    if (!cityId) {
        return NextResponse.json({error: 'city_id is required'}, {status: 400});
    }
    const zipCode = {
        city_id: cityId,
        zip_code: '12345', // This is a placeholder. Replace with actual logic to fetch zip code.
    };
    return NextResponse.json(zipCode)
}

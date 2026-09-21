// TripNexus Data Store & Catalog Inventory
const catalogDatabase = {
    flights: [
        { id: 'FL-101', name: 'IndiGo 6E-204', type: 'flight', from: 'New Delhi (DEL)', to: 'Goa (GOI)', dep: '06:15 AM', arr: '08:45 AM', duration: '2h 30m', price: 4850, ecoCo2: 118, ecoTier: 'Medium', rating: 4.6, refundable: true, tag: 'Fastest' },
        { id: 'FL-102', name: 'Vistara UK-812', type: 'flight', from: 'New Delhi (DEL)', to: 'Goa (GOI)', dep: '10:30 AM', arr: '01:10 PM', duration: '2h 40m', price: 6200, ecoCo2: 122, ecoTier: 'Medium', rating: 4.8, refundable: true, tag: 'Premium' },
        { id: 'FL-103', name: 'Air India AI-514', type: 'flight', from: 'New Delhi (DEL)', to: 'Goa (GOI)', dep: '04:45 PM', arr: '07:25 PM', duration: '2h 40m', price: 4499, ecoCo2: 125, ecoTier: 'Medium', rating: 4.3, refundable: false, tag: 'Value' }
    ],
    hotels: [
        { id: 'HT-201', name: 'Taj Exotica Resort & Spa', type: 'hotel', location: 'Benaulim, South Goa', price: 12500, ecoCo2: 18, ecoTier: 'Eco-Certified', rating: 4.9, tag: 'Luxury 5-Star', refundable: true, amenities: 'Private Beach, Ocean Pool, Spa, Free Breakfast' },
        { id: 'HT-202', name: 'W Goa - Vagator Beach', type: 'hotel', location: 'Vagator, North Goa', price: 14200, ecoCo2: 22, ecoTier: 'Eco-Certified', rating: 4.8, tag: 'Party & Luxury', refundable: true, amenities: 'Rock Pool, DJ Lounge, Sunset Bar' },
        { id: 'HT-203', name: 'Zostel Eco-Homestay', type: 'hotel', location: 'Anjuna, Goa', price: 1450, ecoCo2: 6, ecoTier: 'Zero-Waste', rating: 4.7, tag: 'Budget & Green', refundable: true, amenities: 'Co-working, Bamboo Huts, Solar Power' }
    ],
    trains: [
        { id: 'TR-301', name: 'Goa Rajdhani Express (22414)', type: 'train', from: 'Hazrat Nizamuddin (NZM)', to: 'Madgaon (MAO)', dep: '06:15 AM', arr: '06:30 AM (Next Day)', duration: '24h 15m', price: 2950, ecoCo2: 16.2, ecoTier: 'Green Choice', rating: 4.7, refundable: true, tag: '🌿 85% Less CO2' },
        { id: 'TR-302', name: 'Vande Bharat Express (22230)', type: 'train', from: 'Mumbai (CSMT)', to: 'Madgaon (MAO)', dep: '05:25 AM', arr: '01:10 PM', duration: '7h 45m', price: 1850, ecoCo2: 12.8, ecoTier: 'Green Choice', rating: 4.9, refundable: true, tag: '🌿 High Speed' }
    ],
    buses: [
        { id: 'BS-401', name: 'Zingbus Electric Multi-Axle Volvo', type: 'bus', from: 'Mumbai', to: 'Goa (Panaji)', dep: '08:00 PM', arr: '07:30 AM', duration: '11h 30m', price: 1250, ecoCo2: 24.5, ecoTier: 'Electric Green', rating: 4.5, refundable: true, tag: '🌿 Zero Exhaust' },
        { id: 'BS-402', name: 'IntrCity SmartBus Sleeper', type: 'bus', from: 'Bangalore', to: 'Goa', dep: '09:15 PM', arr: '08:00 AM', duration: '10h 45m', price: 1100, ecoCo2: 28.0, ecoTier: 'Medium', rating: 4.4, refundable: true, tag: 'Comfort AC' }
    ],
    packages: [
        { id: 'PK-501', name: 'Goa Complete 5D/4N Explorer (Flights + Resort)', type: 'package', location: 'North & South Goa', duration: '5 Days / 4 Nights', price: 18900, ecoCo2: 135, ecoTier: 'Balanced', rating: 4.9, tag: 'Bestseller', refundable: true, amenities: 'Flight, 4-Star Resort, Scuba Diving, Sightseeing' },
        { id: 'PK-502', name: 'Eco-Wilderness & Spice Plantation Trail', type: 'package', location: 'Dudhsagar & Western Ghats', duration: '4 Days / 3 Nights', price: 11500, ecoCo2: 32, ecoTier: 'Eco-Certified', rating: 4.8, tag: '🌿 Eco-Tour', refundable: true, amenities: 'Train Commute, Eco-Lodge, Jungle Safari, Organic Meals' }
    ]
};

let groupMembers = [
    { id: 1, name: 'Vivek Awasthi', role: 'Trip Leader', amount: 7000, paid: true },
    { id: 2, name: 'Rahul Sharma', role: 'Member', amount: 7000, paid: true },
    { id: 3, name: 'Priya Verma', role: 'Member', amount: 7000, paid: true },
    { id: 4, name: 'Amit Kumar', role: 'Member', amount: 7000, paid: false }
];

let appState = {
    activeRole: 'customer',
    currentSearchCategory: 'flights',
    walletBalance: 24500,
    selectedItemForBooking: null,
    selectedPaymentMethod: 'wallet',
    kafkaAlertsCount: 1
};

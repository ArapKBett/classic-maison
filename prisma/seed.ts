import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PLACEHOLDER_IMAGES = {
  residential: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  ],
  commercial: [
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
  ],
  land: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=800',
  ],
  luxury: [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  ],
  rental: [
    'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800',
    'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800',
  ],
  industrial: [
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
    'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800',
  ],
}

async function main() {
  console.log('Seeding database...')

  // Properties
  const properties = [
    {
      title: 'Luxury Villa — Karen',
      slug: 'luxury-villa-karen',
      description: 'A stunning 5-bedroom villa in the leafy suburb of Karen, featuring an infinity pool, landscaped gardens, and premium finishes throughout. Perfect for the discerning buyer seeking the finest in Nairobi living.',
      type: 'LUXURY',
      status: 'AVAILABLE',
      price: 185000000,
      currency: 'KES',
      bedrooms: 5,
      bathrooms: 6,
      area: 6500,
      areaUnit: 'sqft',
      location: 'Karen',
      address: 'Karen Road',
      city: 'Nairobi',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.luxury),
      features: JSON.stringify(['Infinity Pool', 'Home Theatre', 'Staff Quarters', 'Double Garage', 'Solar Power', 'Borehole']),
      featured: true,
    },
    {
      title: 'Modern Apartment — Westlands',
      slug: 'modern-apartment-westlands',
      description: 'A contemporary 3-bedroom apartment in the heart of Westlands with panoramic city views, high-end finishes, and world-class amenities including a rooftop pool and gym.',
      type: 'RESIDENTIAL',
      status: 'AVAILABLE',
      price: 28500000,
      currency: 'KES',
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      areaUnit: 'sqft',
      location: 'Westlands',
      address: 'Westlands Road',
      city: 'Nairobi',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.residential),
      features: JSON.stringify(['Rooftop Pool', 'Gym', 'Concierge', '24/7 Security', 'Backup Generator', 'Parking']),
      featured: true,
    },
    {
      title: 'Prime Office Space — Upper Hill',
      slug: 'prime-office-upper-hill',
      description: 'Grade-A office space on the 14th floor of a landmark building in Upper Hill. Open-plan layout with stunning city views, ideal for corporate headquarters or premium co-working.',
      type: 'COMMERCIAL',
      status: 'AVAILABLE',
      price: 4500000,
      currency: 'KES',
      area: 4800,
      areaUnit: 'sqft',
      location: 'Upper Hill',
      address: 'Upper Hill Road',
      city: 'Nairobi',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.commercial),
      features: JSON.stringify(['City Views', 'Open Plan', 'Conference Rooms', 'High-Speed Fibre', 'Parking', 'Generator']),
      featured: true,
    },
    {
      title: 'Acre Plot — Ruiru',
      slug: 'acre-plot-ruiru',
      description: 'A prime 2-acre plot in the rapidly growing Ruiru corridor. Fully serviced with road access, electricity, and water. Ideal for residential development or light commercial use.',
      type: 'LAND',
      status: 'AVAILABLE',
      price: 14000000,
      currency: 'KES',
      area: 2,
      areaUnit: 'acres',
      location: 'Ruiru',
      address: 'Ruiru-Bypass',
      city: 'Kiambu',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.land),
      features: JSON.stringify(['Title Deed Ready', 'Road Access', 'Electricity', 'Water', 'Flat Terrain', 'Near Highway']),
      featured: true,
    },
    {
      title: 'Serviced 2BR — Kilimani',
      slug: 'serviced-2br-kilimani',
      description: 'Fully furnished and serviced 2-bedroom apartment for rent in the prime Kilimani area. Includes housekeeping, gym, pool, and fast internet. Short and long-term leases available.',
      type: 'RENTAL',
      status: 'AVAILABLE',
      price: 120000,
      currency: 'KES',
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      areaUnit: 'sqft',
      location: 'Kilimani',
      address: 'Lenana Road',
      city: 'Nairobi',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.rental),
      features: JSON.stringify(['Fully Furnished', 'Housekeeping', 'Pool', 'Gym', 'Fast WiFi', 'DStv']),
      featured: true,
    },
    {
      title: 'Warehouse Complex — Mlolongo',
      slug: 'warehouse-mlolongo',
      description: 'Modern 10,000 sqft warehouse facility in Mlolongo Industrial Area, 2km from JKIA. Features high-clearance doors, loading bays, office space, and 24/7 CCTV security.',
      type: 'INDUSTRIAL',
      status: 'AVAILABLE',
      price: 350000,
      currency: 'KES',
      area: 10000,
      areaUnit: 'sqft',
      location: 'Mlolongo',
      address: 'Mombasa Road',
      city: 'Machakos',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.industrial),
      features: JSON.stringify(['Loading Bays', 'High Clearance', 'Office Space', 'CCTV', '3-Phase Power', 'Near Airport']),
      featured: false,
    },
    {
      title: 'Townhouse — Lavington',
      slug: 'townhouse-lavington',
      description: 'An exquisite 4-bedroom townhouse in Lavington with a private garden, rooftop terrace, and modern chef\'s kitchen. Part of a gated development of 12 units with shared pool.',
      type: 'RESIDENTIAL',
      status: 'AVAILABLE',
      price: 62000000,
      currency: 'KES',
      bedrooms: 4,
      bathrooms: 4,
      area: 3800,
      areaUnit: 'sqft',
      location: 'Lavington',
      address: 'James Gichuru Road',
      city: 'Nairobi',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.residential),
      features: JSON.stringify(['Private Garden', 'Rooftop Terrace', "Chef's Kitchen", 'Shared Pool', 'Gated', 'Backup Water']),
      featured: false,
    },
    {
      title: 'Retail Space — Westgate Mall',
      slug: 'retail-westgate-mall',
      description: 'Premium ground-floor retail unit of 1,200 sqft in Westgate Mall, Westlands. High foot traffic location, ideal for fashion, beauty, or F&B concepts.',
      type: 'COMMERCIAL',
      status: 'UNDER_CONTRACT',
      price: 2800000,
      currency: 'KES',
      area: 1200,
      areaUnit: 'sqft',
      location: 'Westlands',
      address: 'Westgate Mall, Mwanzi Road',
      city: 'Nairobi',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.commercial),
      features: JSON.stringify(['Ground Floor', 'High Footfall', 'AC', 'Storage Room', 'Signage Rights', 'Parking']),
      featured: false,
    },
    {
      title: 'Penthouse — Parklands',
      slug: 'penthouse-parklands',
      description: 'An iconic duplex penthouse crowning a boutique 10-storey building in Parklands. Three terraces, private lift access, bespoke Italian kitchen, and 360-degree city views.',
      type: 'LUXURY',
      status: 'AVAILABLE',
      price: 320000000,
      currency: 'KES',
      bedrooms: 4,
      bathrooms: 5,
      area: 8200,
      areaUnit: 'sqft',
      location: 'Parklands',
      address: 'Parklands Road',
      city: 'Nairobi',
      country: 'Kenya',
      images: JSON.stringify(PLACEHOLDER_IMAGES.luxury),
      features: JSON.stringify(['Private Lift', '3 Terraces', '360° Views', 'Italian Kitchen', 'Wine Cellar', 'Smart Home']),
      featured: false,
    },
  ]

  for (const prop of properties) {
    await prisma.property.upsert({
      where: { slug: prop.slug },
      update: prop,
      create: prop,
    })
  }

  // Projects
  const projects = [
    {
      title: 'Maison Royale — Runda',
      slug: 'maison-royale-runda',
      description: 'An exclusive gated community of 24 ultra-luxury villas in the serene Runda area. Each villa features 5 bedrooms, private pool, and imported finishes. Completion Q4 2025.',
      status: 'IN_PROGRESS',
      completionDate: new Date('2025-12-31'),
      location: 'Runda',
      city: 'Nairobi',
      images: JSON.stringify(PLACEHOLDER_IMAGES.luxury),
      features: JSON.stringify(['24 Villas', 'Private Pools', 'Clubhouse', 'Tennis Court', 'Gated', 'Smart Homes']),
      totalUnits: 24,
      availableUnits: 18,
      priceFrom: 145000000,
      currency: 'KES',
    },
    {
      title: 'The Classic Towers — Upperhill',
      slug: 'classic-towers-upperhill',
      description: 'A landmark 32-storey mixed-use development in Upper Hill featuring Grade-A offices, luxury serviced apartments, and a 5-star hotel component. Completion Q2 2026.',
      status: 'PLANNED',
      completionDate: new Date('2026-06-30'),
      location: 'Upper Hill',
      city: 'Nairobi',
      images: JSON.stringify(PLACEHOLDER_IMAGES.commercial),
      features: JSON.stringify(['32 Floors', 'Grade-A Offices', 'Hotel', 'Sky Lounge', 'Conference Centre', 'Underground Parking']),
      totalUnits: 120,
      availableUnits: 120,
      priceFrom: 35000000,
      currency: 'KES',
    },
    {
      title: 'Garden Court — Syokimau',
      slug: 'garden-court-syokimau',
      description: 'Affordable luxury apartments in the growing Syokimau area. 1, 2, and 3-bedroom units with high-quality finishes, swimming pool, and green landscaped courts. Completion Q1 2025.',
      status: 'IN_PROGRESS',
      completionDate: new Date('2025-03-31'),
      location: 'Syokimau',
      city: 'Machakos',
      images: JSON.stringify(PLACEHOLDER_IMAGES.residential),
      features: JSON.stringify(['80 Units', 'Pool', 'Kids Play Area', 'Gym', 'Solar Water', 'Fibre Internet']),
      totalUnits: 80,
      availableUnits: 45,
      priceFrom: 8500000,
      currency: 'KES',
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
  }

  // Offers
  const offers = [
    {
      title: '10% Off — Move-In Ready Apartments',
      description: 'Get 10% off the listed price on select move-in ready apartments when you pay cash or arrange financing within 30 days. Limited units available.',
      discount: 10,
      terms: 'Valid on cash purchases or pre-approved mortgage only. Offer cannot be combined with other promotions.',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      active: true,
    },
    {
      title: 'Free Legal Fees — Land Purchases',
      description: 'Classic Maison covers all legal conveyancing fees on land purchases above KES 5M this quarter. Save up to KES 500,000.',
      discount: null,
      terms: 'Applicable to plots priced KES 5M and above. Legal fees capped at KES 500,000.',
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      active: true,
    },
    {
      title: 'Garden Court — Early Bird Pricing',
      description: 'Reserve your unit in Garden Court Syokimau at launch prices. Units increase by 15% upon completion. Secure yours with just 20% deposit.',
      discount: 15,
      terms: '20% deposit to reserve. Flexible payment plan over 24 months. Prices valid for first 20 buyers only.',
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      active: true,
    },
  ]

  for (const offer of offers) {
    await prisma.offer.create({ data: offer }).catch(() => {})
  }

  console.log('✅ Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

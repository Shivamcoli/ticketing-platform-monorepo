interface PriceInput {
  basePrice: number;
  floorPrice: number;
  ceilingPrice: number;
  totalTickets: number;
  bookedTickets: number;
  eventDate: string;
  recentBookings?: number;
}

export function calculateDynamicPrice({
  basePrice,
  floorPrice,
  ceilingPrice,
  totalTickets,
  bookedTickets,
  eventDate,
  recentBookings = 0,
}: PriceInput): number {
  const now = new Date();
  const eventTime = new Date(eventDate);
  const daysUntil = Math.max(
    1,
    Math.ceil((eventTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  // 1️⃣ Time-based rule
  let timeMultiplier = 1;
  if (daysUntil <= 1) timeMultiplier = 1.5;
  else if (daysUntil <= 7) timeMultiplier = 1.2;
  else if (daysUntil <= 30) timeMultiplier = 1.1;

  // 2️⃣ Demand-based rule
  const demandMultiplier = recentBookings > 10 ? 1.15 : 1;

  // 3️⃣ Inventory-based rule
  const remaining = totalTickets - bookedTickets;
  const inventoryMultiplier = remaining / totalTickets < 0.2 ? 1.25 : 1;

  const price =
    basePrice * timeMultiplier * demandMultiplier * inventoryMultiplier;

  return Math.min(Math.max(price, floorPrice), ceilingPrice);
}

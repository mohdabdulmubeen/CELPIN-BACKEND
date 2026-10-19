import { ZONES } from '../data/seatsData.js';

export function calculatePricing(seatZone: string, hours: number, orderItems: any[], discount = 0) {
  const zoneInfo = ZONES[seatZone];
  const hourlyRate = zoneInfo ? zoneInfo.hourlyRate : 60;
  const rawSeatCost = hourlyRate * hours;
  
  const dailyCap = 399;
  const dailyCapApplied = rawSeatCost > dailyCap;
  const seatCost = dailyCapApplied ? dailyCap : rawSeatCost;

  const foodCost = orderItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const totalCost = Math.max(0, seatCost + foodCost - discount);

  return {
    hourlyRate,
    rawSeatCost,
    seatCost,
    foodCost,
    discount,
    totalCost,
    dailyCapApplied
  };
}

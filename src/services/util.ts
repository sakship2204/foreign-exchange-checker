export async function get24hRateChange(item: LiveRateData) {
  try {
    const yesterdayRateResponse = await fetch(
      `https://api.frankfurter.dev/v2/rates?quotes=${item.quote}&base=${item.base}&date=${yesterdayDate(item.date)}`,
    );

    const yesterdayRate: LiveRateData = await yesterdayRateResponse.json();

    const percentageChange = calculatePercentage(
      Number(item.rate) - Number(yesterdayRate[0].rate),
      Number(item.rate),
    );

    return percentageChange;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function calculatePercentage(
  value: number,
  total: number,
  decimals = 2,
) {
  if (total === 0) return 0;
  const percentage = (value / total) * 100;

  return Number(percentage.toFixed(decimals));
}

export const yesterdayDate = (today: string) => {
  const date = new Date(today);
  const previousDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);

  return previousDate.toISOString().split("T")[0];
};

export type LiveRateData = {
  date: string;
  rate?: string;
  base: string;
  quote: string;
  percentageChange?: string;
};

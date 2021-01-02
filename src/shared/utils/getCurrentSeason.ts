export default function getCurrentSeason(): number {
  const today = new Date();

  const currentMonth = today.getMonth() + 1;

  const season = Math.floor(currentMonth / 4) + 1;

  return season;
}

export function generateInsights(results: any[]) {
  const failures = results.filter(r => r.status === 'failed');

  const map: any = {};

  failures.forEach(r => {
    map[r.module] = (map[r.module] || 0) + 1;
  });

  return map;
}
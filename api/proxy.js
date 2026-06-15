export default async function handler(req, res) {
  const date = req.query.date || todayUTC();
  const upstream = await fetch(`https://james-allen.in1woord.nl/daily.php?date=${date}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PastoralSuiteProxy/1.0)' }
  });
  const text = await upstream.text();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(text);
}

function todayUTC() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}

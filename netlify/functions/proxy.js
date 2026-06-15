exports.handler = async function(event) {
  const date = (event.queryStringParameters && event.queryStringParameters.date) || todayUTC();
  try {
    const response = await fetch(`https://james-allen.in1woord.nl/daily.php?date=${date}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PastoralSuiteProxy/1.0)' }
    });
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
        'Content-Type': 'text/plain; charset=utf-8'
      },
      body: text
    };
  } catch(err) {
    return { statusCode: 502, body: 'Fetch failed: ' + err.message };
  }
};

function todayUTC() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}

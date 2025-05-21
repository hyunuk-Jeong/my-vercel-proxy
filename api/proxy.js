export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "url query parameter is required" });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
        'Accept': 'application/json',
      },
    });

    const contentType = response.headers.get('content-type') || 'text/plain';
    const headersObj = {};
    response.headers.forEach((value, key) => {
      headersObj[key] = value;
    });

    const body = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).json({
      headers: headersObj,
      body: body
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  const fullUrl = req.query.url;
  if (!fullUrl) {
    return res.status(400).json({ error: 'url 쿼리 파라미터가 필요합니다.' });
  }

  try {
    const decodedUrl = decodeURIComponent(fullUrl);
    const response = await fetch(decodedUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: '원본 API 호출 실패' });
    }

    const data = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

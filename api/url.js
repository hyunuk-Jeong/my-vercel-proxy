import fetch from 'node-fetch';

export default async function handler(req, res) {
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

    const data = await response.text(); // JSON이 아닐 수도 있으니 일단 텍스트로 받음
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS 허용
    res.status(200).send(data); // 원본 그대로 클라이언트에 반환

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

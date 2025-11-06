export default async function handler(req, res) {
  // CORS hlavičky pro všechny požadavky
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Odpověď na preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Zpracování POST požadavku
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Použij POST metodu' });
  }

  const { email, sqm, productTitle, productId } = req.body;

  const response = await fetch('https://2gkbbm-ky.myshopify.com/admin/api/2023-10/customers.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
    },
    body: JSON.stringify({
      customer: {
        email,
        note: `Poptávka na ${sqm} m² produktu ${productTitle} (ID: ${productId})`
      }
    })
  });

  const result = await response.json();
  res.status(200).json(result);
}

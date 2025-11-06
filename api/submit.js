export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Použij POST metodu' });
  }

  const { email, sqm, productTitle, productId } = req.body;

  const response = await fetch('https://TVŮJ-OBCHOD.myshopify.com/admin/api/2023-10/customers.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': 'TVŮJ_ACCESS_TOKEN'
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

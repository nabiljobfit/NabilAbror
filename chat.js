// api/chat.js
export default async function handler(req, res) {
    // 1. Ambil API Key dari "Brankas" Vercel (Environment Variable)
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: "API Key belum disetting di Vercel!" });
    }

    // 2. Cek apakah method-nya POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { contents } = req.body;

        // 3. Kirim request ke Google Gemini dari server (Bukan dari browser user)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contents }),
            }
        );

        const data = await response.json();

        // 4. Kirim balik jawaban Google ke website kamu
        res.status(200).json(data);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Gagal mengambil data dari AI" });
    }
}
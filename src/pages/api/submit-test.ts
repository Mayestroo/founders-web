import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { registrationData } = req.body;

    if (!registrationData) {
      return res.status(400).json({ error: 'Registration data is required' });
    }

    // Telegram bot credentials
    const token = process.env.TELEGRAM_BOT_TOKEN || '7753612890:AAGI_u4Slr5ABK1IX2T4asGh01BBvayCSYw';
    const chat_id = process.env.TELEGRAM_CHAT_ID || '-1002585473961';
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Format message content
    let messageContent = `📝 New Registration Submission\n\n`;
    messageContent += `👤 Name: ${registrationData.name}\n`;
    messageContent += `🎂 Birth Date: ${registrationData.birthdate}\n`;
    messageContent += `📞 Phone: ${registrationData.phone}\n`;
    messageContent += `📢 Where Heard: ${registrationData.heard}\n`;
    messageContent += `❓ English Issue: ${registrationData.problem}\n`;
    messageContent += `📍 Region: ${registrationData.region}\n\n`;

    messageContent += `✅ Submission completed on: ${new Date().toLocaleString()}\n`;

    // Send to Telegram
    try {
      await axios.post(url, {
        chat_id,
        text: messageContent,
        parse_mode: 'HTML',
      });
    } catch (telegramError: any) {
      console.error('Telegram API Error:', telegramError.response?.data || telegramError.message);
      // Don't fail the request if Telegram fails, just log it
    }

    return res.status(200).json({ success: true, message: 'Test results submitted successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

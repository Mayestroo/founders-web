import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
};

type TelegramTestResult = {
  score?: number;
  total?: number;
  level?: string;
  dominant?: string;
};

type SubmitPayload = {
  registrationData?: {
    name?: string;
    phone?: string;
    region?: string;
  };
  category?: 'kids' | 'general' | null;
  testResults?: {
    level?: TelegramTestResult | null;
    temperament?: TelegramTestResult | null;
    memory?: TelegramTestResult | null;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { registrationData, category, testResults } = req.body as SubmitPayload;

    if (!registrationData) {
      return res.status(400).json({ error: 'Registration data is required' });
    }

    // Telegram bot credentials
    const token = process.env.TELEGRAM_BOT_TOKEN || '7753612890:AAGI_u4Slr5ABK1IX2T4asGh01BBvayCSYw';
    const chat_id = process.env.TELEGRAM_CHAT_ID || '-1002585473961';
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Format message content
    let messageContent = `📝 New Registration Submission\n\n`;
    messageContent += `👥 Category: ${category || '-'}\n`;
    messageContent += `👤 Name: ${registrationData.name}\n`;
    messageContent += `📞 Phone: ${registrationData.phone}\n`;
    messageContent += `📍 Region: ${registrationData.region}\n\n`;

    messageContent += `🧪 Test Results (order: Level -> Temperament -> Memory)\n`;

    const level = testResults?.level;
    if (level) {
      messageContent += `1) Level: ${level.score ?? '-'} / ${level.total ?? '-'} (${level.level ?? '-'})\n`;
    } else {
      messageContent += `1) Level: -\n`;
    }

    const temperament = testResults?.temperament;
    if (temperament) {
      messageContent += `2) Temperament: dominant ${temperament.dominant ?? '-'}\n`;
    } else {
      messageContent += `2) Temperament: -\n`;
    }

    const memory = testResults?.memory;
    if (memory) {
      messageContent += `3) Memory Type: ${memory.score ?? '-'} / ${memory.total ?? '-'} (${memory.level ?? '-'})\n\n`;
    } else {
      messageContent += `3) Memory Type: -\n\n`;
    }

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

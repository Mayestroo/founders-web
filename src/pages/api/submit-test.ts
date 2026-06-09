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
  counts?: {
    A?: number;
    B?: number;
    C?: number;
    choleric?: number;
    sanguine?: number;
    phlegmatic?: number;
    melancholic?: number;
  };
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

    const formatTemperamentName = (dominant?: string) => {
      if (!dominant) return '-';
      const map: Record<string, string> = {
        choleric: 'Xolerik',
        sanguine: 'Sangvinik',
        phlegmatic: 'Flegmatik',
        melancholic: 'Melanxolik',
      };
      return map[dominant] || dominant;
    };

    const formatLevelLabel = (level?: string) => {
      if (!level) return '-';
      const map: Record<string, string> = {
        'tests.level_beginner': 'Beginner',
        'tests.level_elementary': 'Elementary',
        'tests.level_pre_intermediate': 'Pre-Intermediate',
        'tests.level_intermediate': 'Intermediate',
        'tests.level_upper_intermediate': 'Upper-Intermediate',
        'tests.level_advanced': 'Advanced',
        'tests.level_01': 'Level 01',
        'tests.level_02': 'Level 02',
        'tests.level_03': 'Level 03',
        'tests.level_04': 'Level 04',
        'tests.level_05': 'Level 05',
        'tests.level_06': 'Level 06',
      };
      return map[level] || level;
    };

    const level = testResults?.level;
    const temperament = testResults?.temperament;
    const memory = testResults?.memory;

    const memoryLabel = memory?.level || '-';
    const memoryStyles: Record<string, 'A' | 'B' | 'C'> = {
      "Vizual (ko'ruv orqali)": 'A',
      "Audial (eshitish orqali)": 'B',
      "Kinestetik (harakat va his orqali)": 'C',
    };
    const memoryChoiceCounts = memory?.counts;

    const temperamentCounts = (temperament as any)?.counts as
      | { choleric?: number; sanguine?: number; phlegmatic?: number; melancholic?: number }
      | undefined;

    // Human-readable Telegram format (same style as before), keeping order: Level -> Temperament -> Memory
    let messageContent = `📝 Yangi test topshirig'i\n\n`;
    messageContent += `👤 Ism: ${registrationData.name || '-'}\n`;
    messageContent += `📞 Telefon: ${registrationData.phone || '-'}\n`;
    messageContent += `📍 Hudud: ${registrationData.region || '-'}\n`;
    messageContent += `👥 Toifa: ${category || '-'}\n\n`;

    messageContent += `📘 Level test natijasi:\n`;
    messageContent += `🧮 Ball: ${level?.score ?? '-'} / ${level?.total ?? '-'}\n`;
    messageContent += `⭐ Daraja: ${formatLevelLabel(level?.level)}\n\n`;

    messageContent += `📊 Temperament testi natijasi:\n`;
    messageContent += `🔥 Xolerik: ${temperamentCounts?.choleric ?? '-'}\n`;
    messageContent += `😊 Sangvinik: ${temperamentCounts?.sanguine ?? '-'}\n`;
    messageContent += `🌿 Flegmatik: ${temperamentCounts?.phlegmatic ?? '-'}\n`;
    messageContent += `☁️ Melanxolik: ${temperamentCounts?.melancholic ?? '-'}\n`;
    messageContent += `⭐ Temperament: ${formatTemperamentName(temperament?.dominant)}\n\n`;

    messageContent += `👁️ Axborotni qabul qilish uslubi testi:\n`;
    if (memoryChoiceCounts) {
      messageContent += `👁️ Vizual: ${memoryChoiceCounts.A ?? '-'}\n`;
      messageContent += `🎧 Audial: ${memoryChoiceCounts.B ?? '-'}\n`;
      messageContent += `✋ Kinestetik: ${memoryChoiceCounts.C ?? '-'}\n`;
    } else {
      messageContent += `👁️ Vizual: -\n`;
      messageContent += `🎧 Audial: -\n`;
      messageContent += `✋ Kinestetik: -\n`;
    }
    messageContent += `⭐ Dominant uslub: ${memoryLabel}\n\n`;

    messageContent += `✅ Yuborilgan vaqt: ${new Date().toLocaleString()}\n`;

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

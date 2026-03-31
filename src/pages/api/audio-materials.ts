import type { NextApiRequest, NextApiResponse } from "next";
import type { AudioMaterialsData } from "@/lib/audioMaterials";
import audioMaterials from "@/public/audio-materials.json";

type AudioMaterialsResponse =
  | {
      success: true;
      data: AudioMaterialsData;
    }
  | {
      success: false;
      error: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AudioMaterialsResponse>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    return res.status(200).json({
      success: true,
      data: audioMaterials as AudioMaterialsData,
    });
  } catch (error) {
    console.error("Failed to load audio materials:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to load audio materials",
    });
  }
}

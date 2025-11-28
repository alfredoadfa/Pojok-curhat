export interface Story {
  id: string;
  content: string;
  timestamp: Date;
  color: string;
  rotation: number;
  sentiment?: 'sad' | 'angry' | 'hopeful' | 'neutral';
  aiResponse?: string;
}

export interface XBannerData {
  title: string;
  subgroupName: string;
  intro: string;
  goals: string[];
  summary: string;
}

export const BANNER_DATA: XBannerData = {
  title: "Pojok Curhat: Suara Hati Non-Perokok",
  subgroupName: "Kelompok 5 - TPB Unpad 2025",
  intro: "Asap rokok bukan hanya masalah kesehatan pribadi, tapi juga pelanggaran terhadap hak udara bersih orang lain. Banyak mahasiswa non-perokok merasa terganggu namun sungkan untuk menegur. Data menunjukkan perokok pasif memiliki risiko penyakit jantung dan paru-paru yang signifikan.",
  goals: [
    "Membangun empati antar mahasiswa.",
    "Menyediakan ruang aman (safe space) untuk bercerita.",
    "Meningkatkan kesadaran akan dampak asap rokok di lingkungan kampus.",
    "Mengumpulkan data kualitatif untuk advokasi kawasan bebas asap rokok."
  ],
  summary: "Kegiatan ini menggabungkan instalasi fisik 'Pohon Harapan' dan platform digital. Kami mengumpulkan cerita anonim dari civitas akademika yang terganggu asap rokok, lalu mengolahnya menjadi kampanye visual yang menyentuh hati demi kampus yang lebih sehat."
};
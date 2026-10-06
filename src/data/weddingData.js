// ===== SATU-SATUNYA tempat untuk mengganti data pernikahan =====
// Nilai di bawah masih placeholder dari mockup. Ganti sesuai data asli.
export const weddingData = {
  groom: {
    name: "Nuhgroho Budi Setiawan",
    short: "Wawan",
    parents: ["Putra dari", "Bpk. Imam Wahyudi & Ibu Indah Nanik Ningsih"],
    photo: "/images/couple/Wawan.webp", // contoh: '/images/couple/arka.webp' (kosong = placeholder)
  },
  bride: {
    name: "Hilda Faizah Elhani",
    short: "Hilda",
    parents: ["Putri dari", "Alm. Bpk. Haryo Suwondo & Almh. Ibu Nidhomah"],
    photo: "/images/couple/Hilda.webp", // contoh: '/images/couple/naya.webp'
  },
  monogram: "W&H",
  city: "Mojokerto",
  dateLabel: "Minggu, 18 Oktober 2026",
  footerDate: "18 OKTOBER 2026",
  // ISO 8601 + zona waktu (WIB = +07:00). Acuan countdown (waktu akad).
  weddingDate: "2026-10-18T10:00:00+07:00",
  // Jam selesai acara (untuk tombol "Simpan ke Kalender"). Boleh dihapus; default +3 jam.
  weddingEnd: "2026-10-18T21:00:00+07:00",
  coverImage: "/images/couple/hero-cover.jpg",
  countdownImage: "/images/couple/countdown.jpeg",

  heroImage: "/images/couple/hero-image.jpeg", // contoh: '/images/couple/hero.webp'
  heroTitle: ["Dengan penuh syukur,", "kami mengundang Anda"],
  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan pasangan untukmu agar kamu merasa tenteram.",
    source: "QS. Ar-Rum: 21",
  },
  events: [
    {
      label: "RESEPSI",
      date: "Minggu, 18 Oktober 2026",
      time: "10.00 – 21.00 WIB",
      venue: "Lapangan Desa Lebaksono, Kec. Pungging, Kab. Mojokerto",
    },
  ],
  location: {
    venue: "Lapangan Desa Lebaksono",
    address: "Lapangan Desa Lebaksono, Kec. Pungging, Kab. Mojokerto",
    // Ganti dengan link Google Maps lokasi acara yang sebenarnya
    googleMapsUrl: "https://maps.app.goo.gl/asXju1koyXbojpDg8",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=-7.5365705,112.560463&z=17&output=embed",
  },
  gift: {
    accounts: [
      {
        bank: "Mandiri",
        logo: "images/bank/mandiri-logo.svg",
        number: "1410025590845",
        name: "Hilda Faizah Elhani",
      },
      {
        bank: "BRI",
        logo: "images/bank/bri-logo.svg",
        number: "641001013392538",
        name: "Nuhgroho Budi Setiawan",
      },
    ],

    shipping: {
      recipient: "Wawan & Hilda",
      address:
        "Dusun Lebaksono RT.01/ RW.05, Jalan Lebaksono,depan lapangan lebaksono ke timur pagar coklat, Kec.Pungging, Kab.Mojokerto, Jawa Timur 61384",
    },
  },
  // Kosongkan src untuk placeholder. 'tall' = item setinggi 2 baris (sesuai mockup).
  gallery: [
    { src: "/images/gallery/Galeri-1.jpg", alt: "Hilda dan Wawan 1" },
    { src: "/images/gallery/Galeri-2.jpg", alt: "Hilda dan Wawan 2" },
    { src: "/images/gallery/Galeri-3.jpg", alt: "Hilda dan Wawan 3" },
    { src: "/images/gallery/Galeri-4.jpg", alt: "Hilda dan Wawan 4" },
    { src: "/images/gallery/Galeri-5.jpg", alt: "Hilda dan Wawan 5" },
    { src: "/images/gallery/Galeri-6.jpg", alt: "Hilda dan Wawan 6" },
  ],
  music: "/audio/wedding-music.mp3",
  thanks:
    "Terima kasih atas doa dan restu yang Anda berikan untuk hari bahagia kami.",
};

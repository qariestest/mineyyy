/* ============================================================
   SEMUA ISI WEBSITE ADA DI SINI.
   Ganti teks, tanggal, dan nama file foto/lagu di bawah ini —
   kamu tidak perlu menyentuh file lain untuk personalisasi.
   ============================================================ */

const giftData = {
  recipientName: "Yasmine",
  senderName: "Gilang",
  occasion: "Anniversary",

  // Tanggal jadian & tanggal anniversary yang dirayakan
  startDate: "08 September 2022",
  anniversaryLabel: "08 September 2022 — 08 September 2026",
  yearsTogether: 4,

  // Foto utama untuk opening & hero. Taruh file aslinya di folder images/
  heroImage: "images/hero.jpg",

  // Pesan di halaman pembuka, sebelum website "dibuka"
  opening: {
    line: "Orang yang lebih sering bilang putus daripada aku sayang kamu.",
    cta: "Sentuh untuk membuka",
  },

  hero: {
    title: "Happy Anniversary, Yasmine",
    subtitle: "Empat tahun, dan masih terus gamau putus dari kamu :p",
    cta: "Mulai cerita kita",
  },

  // Timeline "Our Story" — urutkan dari paling lama ke paling baru
  story: [
    {
      year: "2022",
      title: "Ketemu pertama kali",
      text: "Kenal gara-gara kamu itu sepupunya temenku. Awalnya cuma numpang kenalan di sela-sela kumpul, nggak nyangka bakal sampe sekarang.",
    },
    {
      year: "2022",
      title: "Mulai deket",
      text: "Sering ikut makan/main bareng kamu sama sepupumu. Awalnya cuma nongkrong ampir tiap hari, lama-lama malah nungguin chat kamu tiap hari.",
    },
    {
      year: "2022",
      title: "First date",
      text: "Gue menganggap waktu ke merapi pagi pagi adalah first date kita dan disitulah kamu pertama kali kamu meluk aku after solid pacaran hihihi.",
    },
    {
      year: "2024",
      title: "LDR pertama",
      text: "Dari sering ketemu sampe jadi beda pulau, jujur rasanya disini titik terberat dari hubungan kita kali ya? tapi lolos kok sampe skrg!? :D.",
    },
    {
      year: "2025",
      title: "Our First Job",
      text: "Mungkin ini tahun pembalasan kali ya? akhirnya kita dipertemukan hampir tiap hari cuma untuk dinner dateu after office :( jadi kangen masa itu.",
    },
    {
      year: "2026",
      title: "Empat tahun",
      text: "Masih di kota yang beda, masih ribet soal jadwal ketemu. Tapi masih milih kamu, dan gamau putus sampai seterusnya.",
    },
  ],

  // Galeri foto. Semua foto akan di-display sebagai portrait.
  // Size "large" (3:4) untuk 3 foto, size "tall" (9:16) untuk 4 foto.
  memories: [
    {
      src: "images/memory-01.jpg",
      alt: "Momen kenangan 1",
      caption: "First gunung merapi after jadian.",
      size: "large",
    },
    {
      src: "images/memory-02.jpg",
      alt: "Momen kenangan 2",
      caption: "First Concert!!!! tp jusi lusi anjing skrg.",
      size: "large",
    },
    {
      src: "images/memory-03.jpg",
      alt: "Momen kenangan 3",
      caption: "Asikk Pantai Pertamaaa.",
      size: "large",
    },
    {
      src: "images/memory-04.jpg",
      alt: "Momen kenangan 4",
      caption: "Sepeda-an pertama di GBK yeayy!.",
      size: "tall",
    },
    {
      src: "images/memory-05.jpg",
      alt: "Momen kenangan 5",
      caption: "Curug Pertamaa, enak bisa dapet banyak hehe",
      size: "tall",
    },
    {
      src: "images/memory-06.jpg",
      alt: "Momen kenangan 6",
      caption: "Finally Raditttt Sayangkuuuu!.",
      size: "tall",
    },
    {
      src: "images/memory-07.jpg",
      alt: "Momen kenangan 7",
      caption: "Ini kucing sebelah mana yak? gtw tp lucu.",
      size: "tall",
    },
  ],

  // Surat cinta — pakai baris baru untuk ganti paragraf
  letter: {
    title: "Sepucuk surat buat kamu.",
    body: `Yasmine,

Kadang aku mikir, gimana ceritanya satu orang bisa jadi bagian yang sangat besar di hidup aku. Terima kasih untuk setiap tawa, setiap obrolan, setiap momen sederhana, dan semua memori yang udah kita buat bareng selama 4 tahun ini.

Empat tahun ini nggak selalu gampang, ngajak putus berkali kali, hampir beneran putus bahkan juga pernah.

Makasih untuk selalu berusaha masih "mau" sama aku meskipun kadang banyak hal yang bikin kamu mau putus juga berkali kali, setidaknya kamu harus tau kalau aku nggak pernah mau putus dari kamu, dan aku nggak pernah nyesel buat milih kamu.

Aku cuma berharap hubungan ini bisa segera semakin serius, dan kita bisa terus bareng sampe tua nanti. Aku mau terus bikin kamu bahagia, dan aku mau terus jadi bagian dari hidup kamu.

Happy anniversary, sayang. Makasih udah selalu ada buat aku..`,
    signature: "Gilang",
  },

  // "Things I love about you" — tampil satu per satu saat discroll
  reasons: [
    "Your smile that lights up my day",
    "Makin lama makin mirip una",
    "Ketawa kamu mirip malih tong tong tp aku sukak",
    "Kadang bisa cantik banget kaya tiktoker, kadang jelek juga wokwok :V",
    "Simply... you",
  ],

  // Lagu kalian. Taruh file mp3 di folder audio/
  // Mulai otomatis begitu tombol "Sentuh untuk membuka" ditekan,
  // lalu bisa dikontrol dari floating player di pojok kanan bawah.
  song: {
    title: "Timeless",
    artist: "Taylor Swift",
    audio: "audio/our-song.mp3",
  },

  // Kejutan kecil sebelum penutup
  surprise: {
    prompt: "Tunggu... ada satu hal lagi.",
    buttonLabel: "Buka kejutannya",
    reveal: "Satu tahun lagi bareng kamu, dan aku tetep pilih kamu — di lifetime manapun.",
  },

  // ============================================================
  // UNDANGAN RAHASIA — GANTI SEMUA NILAI DI BAWAH SEBELUM DIKIRIM
  // ============================================================
  invitation: {
    enabled: true,

    // GANTI: judul acara
    eventTitle: "Anniversary & Birthday Dinner",

    // GANTI: tanggal & jam acara sebenarnya, format ISO dengan zona waktu WIB (+07:00)
    eventDateTime: "2026-09-19T14:00:00+07:00",

    // GANTI: lokasi acara
    location: {
      name: "PBTP: Urban Trattoria",
      address: "BXC MALL 1",
      mapsUrl: "https://maps.app.goo.gl/MoEQDepsW8NpBjb18",
    },

    // GANTI: dress code & pesan kecil
    dressCode: "Something cute",
    message: "Be ready. Aku ajak kamu ke tempat yang spesial.",

    // GANTI: tanggal & jam kapan undangan dibuka (bisa beda dari eventDateTime)
    // Contoh: event 19 Sept jam 14:00, unlock 15 Sept jam 00:00
    unlockDateTime: "2026-09-15T00:00:00+07:00",
  },

  // Bagian penutup
  final: {
    image: "images/favorite-photo.jpg",
    line1: "Makasih udah jadi bagian dari cerita ini.",
    line2: "Ke lebih banyak senja, ketawa, drama receh, dan kita.",
    line3: "Happy Anniversary, Yasmine.",
    dateLine: "08 September 2026",
  },
};

window.giftData = giftData;

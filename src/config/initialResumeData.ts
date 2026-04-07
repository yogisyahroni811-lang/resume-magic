import { DEFAULT_FIELD_ORDER } from "./constants";
import { GlobalSettings, DEFAULT_CONFIG, ResumeData } from "../types/resume";
const initialGlobalSettings: GlobalSettings = {
  baseFontSize: 16,
  pagePadding: 32,
  paragraphSpacing: 12,
  lineHeight: 1.5,
  sectionSpacing: 10,
  headerSize: 18,
  subheaderSize: 16,
  useIconMode: true,
  themeColor: "#000000",
  centerSubtitle: true,
};

export const initialResumeState = {
  title: "Resume Baru",
  basic: {
    name: "Budi Santoso",
    title: "Senior Frontend Engineer",
    employementStatus: "Aktif Mencari",
    email: "budi@example.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta, Indonesia",
    birthDate: "1995-06",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin",
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [
      {
        id: "personal",
        label: "Portfolio",
        value: "https://budi.dev",
        icon: "Globe",
      },
    ],
    photo: "/avatar.png",
    githubKey: "",
    githubUseName: "",
    githubContributionsVisible: false,
  },
  education: [
    {
      id: "1",
      school: "Universitas Indonesia",
      major: "Teknik Informatika",
      degree: "",
      startDate: "2013-09",
      endDate: "2017-06",
      visible: true,
      gpa: "",
      description: `<ul>
        <li>Mata kuliah utama: Struktur Data, Algoritma, Sistem Operasi, Jaringan Komputer, Pengembangan Web</li>
        <li>Peringkat 5% teratas, penerima beasiswa prestasi selama 3 tahun berturut-turut</li>
        <li>Ketua Divisi Teknologi Komunitas Komputer, menyelenggarakan berbagai sharing session teknis</li>
        <li>Kontributor proyek open-source, tersertifikasi GitHub Campus Expert</li>
      </ul>`,
    },
  ],
  skillContent: `<div class="skill-content">
  <ul>
    <li>Frontend Framework: Familiar dengan React, Vue.js, Next.js, Nuxt.js dan SSR framework lainnya</li>
    <li>Bahasa Pemrograman: TypeScript, JavaScript(ES6+), HTML5, CSS3</li>
    <li>UI/Styling: Familiar dengan TailwindCSS, Sass/Less, CSS Module, Styled-components</li>
    <li>State Management: Redux, Vuex, Zustand, Jotai, React Query</li>
    <li>Tooling: Webpack, Vite, Rollup, Babel, ESLint</li>
    <li>Testing: Jest, React Testing Library, Cypress</li>
    <li>Optimasi Performa: Familiar dengan rendering browser, monitoring metrik performa, code splitting, lazy loading</li>
    <li>Version Control: Git, SVN</li>
    <li>Technical Leadership: Berpengalaman memimpin tim teknis, memimpin technology selection dan arsitektur berbagai proyek besar</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "PT Teknologi Nusantara",
      position: "Senior Frontend Engineer",
      date: "2021.07 - 2024.12",
      visible: true,
      details: `<ul>
      <li>Bertanggung jawab atas pengembangan dan pemeliharaan platform creator, memimpin desain arsitektur fitur-fitur utama</li>
      <li>Mengoptimalkan konfigurasi engineering project, mengurangi waktu build dari 8 menit menjadi 2 menit, meningkatkan efisiensi tim</li>
      <li>Mendesain dan mengimplementasi component library, meningkatkan reuse code hingga 70%, secara signifikan mengurangi waktu development</li>
      <li>Memimpin proyek optimasi performa, mengurangi waktu first screen load sebesar 50%, mengintegrasikan sistem monitoring APM</li>
      <li>Membimbing engineer junior, menyelenggarakan technical sharing session, meningkatkan level teknis tim secara keseluruhan</li>
    </ul>`,
    },
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "Platform Creator Dashboard",
      role: "Frontend Lead",
      date: "2023.01 - 2024.06",
      visible: true,
      link: "",
      linkLabel: "",
      description: `<ul>
        <li>Mengembangkan dashboard creator yang mendukung jutaan creator dalam mengelola konten dan analisis data</li>
        <li>Menerapkan arsitektur micro-frontend, mencapai independent deployment untuk setiap modul bisnis</li>
        <li>Memimpin optimasi performa, mengurangi waktu load halaman pertama dari 8 detik menjadi 1.5 detik</li>
        <li>Mendesain dan mengimplementasi universal component library, mendukung pengembangan cepat 5 tim bisnis</li>
        <li>Menyelenggarakan technical review dan code review, memastikan kualitas kode dan best practices</li>
      </ul>`,
    },
    {
      id: "p2",
      name: "Sistem Manajemen Konten",
      role: "Core Developer",
      date: "2022.03 - 2023.01",
      visible: true,
      link: "",
      linkLabel: "",
      description: `<ul>
        <li>Mengembangkan platform CMS yang mendukung berbagai format konten: teks, gambar, video, audio</li>
        <li>Menerapkan rich text editor berbasis contenteditable, mendukung berbagai plugin kustom</li>
        <li>Mendesain sistem manajemen asset yang efisien, mencapai upload cepat dan kompresi otomatis</li>
        <li>Menyelesaikan berbagai masalah kompatibilitas browser, memastikan pengalaman konsisten di berbagai browser</li>
        <li>Menulis unit test dan integration test, mencapai code coverage di atas 80%</li>
      </ul>`,
    },
    {
      id: "p3",
      name: "Platform Monitoring Performa",
      role: "Technical Lead",
      date: "2021.07 - 2022.03",
      visible: true,
      link: "",
      linkLabel: "",
      description: `<ul>
        <li>Membangun sistem monitoring performa real-time, mengumpulkan dan menganalisis metrik performa halaman</li>
        <li>Menerapkan采集 otomatis berbagai metrik performa: FCP, LCP, CLS, FID, TTI</li>
        <li>Mendesain dashboard visualisasi data, membantu tim memahami status performa project</li>
        <li>Berdasarkan data monitoring, mengusulkan dan mengimplementasi berbagai strategi optimasi</li>
        <li>Menulis berbagai technical document dan best practices, membangun knowledge base tim</li>
      </ul>`,
    },
  ],
  certificates: [
    {
      id: "c1",
      src: "/default.png",
      width: 100,
      height: 100,
    },
  ],
  draggingEducationId: null,
  draggingExperienceId: null,
  draggingProjectIdForExperience: null,
};

export const createEmptyResume = (): ResumeData => {
  return JSON.parse(JSON.stringify(initialResumeState)) as ResumeData;
};

// English version for i18n
export const initialResumeStateEn = {
  ...initialResumeState,
  title: "New Resume",
  basic: {
    ...initialResumeState.basic,
    name: "John Doe",
    title: "Senior Frontend Engineer",
    employementStatus: "Actively Looking",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, CA",
    birthDate: "1995-06",
    customFields: [
      {
        id: "personal",
        label: "Portfolio",
        value: "https://john.dev",
        icon: "Globe",
      },
    ],
  },
};

// Blank template (Indonesian)
export const blankResumeState = {
  ...initialResumeState,
  title: "Resume Kosong",
  basic: {
    ...initialResumeState.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    customFields: [],
  },
  education: [],
  experience: [],
  projects: [],
  certificates: [],
  skillContent: "",
  selfEvaluationContent: "",
};

// Blank template (English)
export const blankResumeStateEn = {
  ...blankResumeState,
  title: "Blank Resume",
  basic: {
    ...blankResumeState.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    customFields: [],
  },
};

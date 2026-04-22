import "./styles.css";

const STORAGE_KEY = "kizuna-eu-web-mvp-v3";

const locationTree = {
  uk: ["london", "manchester"],
  denmark: ["copenhagen"],
  netherlands: ["amsterdam"],
  germany: ["berlin", "munich"],
  france: ["paris"],
  spain: ["barcelona", "madrid"],
  italy: ["milan"],
};

const countryLabels = {
  uk: "イギリス",
  denmark: "デンマーク",
  netherlands: "オランダ",
  germany: "ドイツ",
  france: "フランス",
  spain: "スペイン",
  italy: "イタリア",
};

const cityLabels = {
  london: "ロンドン",
  manchester: "マンチェスター",
  copenhagen: "コペンハーゲン",
  amsterdam: "アムステルダム",
  berlin: "ベルリン",
  munich: "ミュンヘン",
  paris: "パリ",
  barcelona: "バルセロナ",
  madrid: "マドリード",
  milan: "ミラノ",
};

const roleLabels = {
  student: "学生",
  working_holiday: "ワーホリ",
  expat: "駐在・現地勤務",
  traveler: "旅行者",
};

const categoryLabels = {
  general: "一般",
  marketplace: "マーケット",
};

const users = [
  {
    id: "user-haru",
    email: "haru@example.com",
    password: "password123",
    nickname: "はる",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    bio: "パリ在住の学生です。日常の悩みや生活情報を気軽に相談できる場がほしくて使っています。",
    role: "student",
    country: "france",
    city: "paris",
  },
  {
    id: "user-yuki",
    email: "yuki@example.com",
    password: "password123",
    nickname: "ゆき",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    bio: "ベルリン在住。海外生活で安心できる日本人コミュニティを探しています。",
    role: "expat",
    country: "germany",
    city: "berlin",
  },
  {
    id: "user-mei",
    email: "mei@example.com",
    password: "password123",
    nickname: "めい",
    profileImage:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
    bio: "ワーホリ中。生活用品を手放したり、現地の暮らし情報を交換したいです。",
    role: "working_holiday",
    country: "germany",
    city: "berlin",
  },
  {
    id: "user-ren",
    email: "ren@example.com",
    password: "password123",
    nickname: "れん",
    profileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    bio: "ロンドンで働いています。仕事と生活のバランスを探り中。",
    role: "expat",
    country: "uk",
    city: "london",
  },
  {
    id: "user-sora",
    email: "sora@example.com",
    password: "password123",
    nickname: "そら",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    bio: "旅行ベースでヨーロッパを回っています。短期滞在の情報が知りたいです。",
    role: "traveler",
    country: "netherlands",
    city: "amsterdam",
  },
  {
    id: "user-anna",
    email: "anna@example.com",
    password: "password123",
    nickname: "あんな",
    profileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    bio: "パリ在住。美術館巡りとカフェが好きです。",
    role: "student",
    country: "france",
    city: "paris",
  },
];

const postBlueprints = [
  {
    userId: "user-haru",
    category: "general",
    country: "france",
    city: "paris",
    content: "パリでおすすめの安い携帯プランがあれば教えてください。",
    hashtags: ["生活相談", "パリ"],
  },
  {
    userId: "user-anna",
    category: "general",
    country: "france",
    city: "paris",
    content: "今週どこかで日本語で話せる交流会があれば行ってみたいです。",
    hashtags: ["交流", "パリ"],
  },
  {
    userId: "user-haru",
    category: "general",
    country: "france",
    city: "paris",
    content: "学生ビザ更新の流れが不安です。最近やった方いますか？",
    hashtags: ["ビザ", "生活相談"],
  },
  {
    userId: "user-anna",
    category: "general",
    country: "france",
    city: "paris",
    content: "パリで日本の食材が比較的安く買える場所を知りたいです。",
    hashtags: ["買い物", "パリ"],
  },
  {
    userId: "user-haru",
    category: "general",
    country: "france",
    city: "paris",
    content: "日本人の美容院でおすすめがあれば教えてください。",
    hashtags: ["美容", "生活相談"],
  },
  {
    userId: "user-anna",
    category: "general",
    country: "france",
    city: "paris",
    content: "夜でも比較的安全に帰りやすいエリアってどこですか？",
    hashtags: ["安全", "パリ"],
  },
  {
    userId: "user-haru",
    category: "general",
    country: "france",
    city: "paris",
    content: "明日の夕方に軽くカフェで話せる方がいたらうれしいです。",
    hashtags: ["交流", "カフェ"],
  },
  {
    userId: "user-anna",
    category: "general",
    country: "france",
    city: "paris",
    content: "パリで部屋探しするときに注意した方がいいことはありますか？",
    hashtags: ["住まい", "生活相談"],
  },
  {
    userId: "user-haru",
    category: "general",
    country: "france",
    city: "paris",
    content: "語学学校の選び方で迷っています。経験談が聞きたいです。",
    hashtags: ["学校", "学生"],
  },
  {
    userId: "user-anna",
    category: "general",
    country: "france",
    city: "paris",
    content: "最近ちょっと気分が落ちるので、安心できる過ごし方があれば知りたいです。",
    hashtags: ["メンタル", "生活相談"],
  },
  {
    userId: "user-haru",
    category: "general",
    country: "france",
    city: "paris",
    content: "日本人向けの病院やクリニック情報をまとめたいです。",
    hashtags: ["病院", "パリ"],
  },
  {
    userId: "user-anna",
    category: "general",
    country: "france",
    city: "paris",
    content: "パリ生活で『これ持ってきてよかった』と思う物ありますか？",
    hashtags: ["持ち物", "パリ"],
  },
  {
    userId: "user-haru",
    category: "marketplace",
    country: "france",
    city: "paris",
    content: "引っ越しでダイニングチェアを手放します。2脚まとめて受け取れる方を探しています。",
    hashtags: ["家具", "パリ", "受け渡し"],
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    marketplace: {
      itemName: "ダイニングチェア 2脚",
      price: "€30",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      sellerNote: "4月末に15区で受け渡し希望です。座面に少し使用感がありますが、がたつきはありません。",
      deadline: "4/30まで",
    },
  },
  {
    userId: "user-anna",
    category: "marketplace",
    country: "france",
    city: "paris",
    content: "北欧っぽいフロアランプを譲ります。部屋の雰囲気を変えたい人におすすめです。",
    hashtags: ["インテリア", "パリ", "一人暮らし"],
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    marketplace: {
      itemName: "フロアランプ",
      price: "€18",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      sellerNote: "電球つきです。高さは約150cmで、5区のカフェ付近で夕方受け渡しできます。",
      deadline: "5/2まで",
    },
  },
  {
    userId: "user-haru",
    category: "marketplace",
    country: "france",
    city: "paris",
    content: "日本から持ってきたレトルト食品をまとめて出します。賞味期限はまだ十分あります。",
    hashtags: ["食料", "日本食品", "パリ"],
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    marketplace: {
      itemName: "日本のレトルト食品セット",
      price: "€12",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
      sellerNote: "カレー、味噌汁、パスタソースのセットです。中身の詳細はコメントで送れます。",
      deadline: "4/27まで",
    },
  },
  {
    userId: "user-yuki",
    category: "marketplace",
    country: "germany",
    city: "berlin",
    content: "デスクライトを手放します。状態はかなりきれいです。",
    hashtags: ["売ります", "ベルリン生活"],
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    marketplace: {
      itemName: "デスクライト",
      price: "€18",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    },
  },
  {
    userId: "user-mei",
    category: "marketplace",
    country: "germany",
    city: "berlin",
    content: "炊飯器をお譲りします。ベルリン受け渡しです。",
    hashtags: ["売ります", "ベルリン生活"],
    image:
      "https://images.unsplash.com/photo-1585515656823-1b43f4f8458d?auto=format&fit=crop&w=900&q=80",
    marketplace: {
      itemName: "炊飯器",
      price: "€35",
      image:
        "https://images.unsplash.com/photo-1585515656823-1b43f4f8458d?auto=format&fit=crop&w=900&q=80",
    },
  },
  {
    userId: "user-sora",
    category: "general",
    country: "netherlands",
    city: "amsterdam",
    content: "アムステルダムで短期滞在向けの洗濯事情ってどんな感じですか？",
    hashtags: ["旅行", "アムステルダム"],
  },
  {
    userId: "user-ren",
    category: "general",
    country: "uk",
    city: "london",
    content: "ロンドンで平日夜に集まれる日本人コミュニティを探しています。",
    hashtags: ["ロンドン", "交流"],
  },
  {
    userId: "user-yuki",
    category: "general",
    country: "germany",
    city: "berlin",
    content: "ベルリンで日本語対応の税理士さんを探しています。",
    hashtags: ["仕事", "ベルリン生活"],
  },
  {
    userId: "user-sora",
    category: "marketplace",
    country: "spain",
    city: "madrid",
    content: "スーツケースを一時的にお貸しできる方を探しています。",
    hashtags: ["探しています", "マドリード"],
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80",
    marketplace: {
      itemName: "スーツケース",
      price: "相談",
      image:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80",
    },
  },
  {
    userId: "user-anna",
    category: "general",
    country: "france",
    city: "paris",
    content: "パリで日本語の本が置いてある図書館や本屋はありますか？",
    hashtags: ["本", "パリ"],
  },
  {
    userId: "user-haru",
    category: "general",
    country: "france",
    city: "paris",
    content: "同じ学生の方で週末に一緒に勉強できる人がいたら声かけてください。",
    hashtags: ["学生", "交流"],
  },
];

const messages = [
  {
    id: "thread-yuki",
    userId: "user-yuki",
    preview: "ベルリンの病院情報、まとめたら送るね。",
    updatedAt: Date.now() - 1000 * 60 * 35,
    messages: [
      { from: "user-yuki", text: "こんにちは、最近パリどう？" },
      { from: "user-haru", text: "だいぶ慣れてきたけど、まだ不安なことも多いです。" },
      { from: "user-yuki", text: "ベルリンの病院情報、まとめたら送るね。" },
    ],
  },
  {
    id: "thread-anna",
    userId: "user-anna",
    preview: "明日の夕方ならカフェ行けそう！",
    updatedAt: Date.now() - 1000 * 60 * 90,
    messages: [
      { from: "user-anna", text: "交流会気になってた！" },
      { from: "user-haru", text: "私も最近人と話したくて。" },
      { from: "user-anna", text: "明日の夕方ならカフェ行けそう！" },
    ],
  },
  {
    id: "thread-mei",
    userId: "user-mei",
    preview: "炊飯器、写真追加しておくね。",
    updatedAt: Date.now() - 1000 * 60 * 240,
    messages: [
      { from: "user-haru", text: "炊飯器、まだありますか？" },
      { from: "user-mei", text: "まだあります！" },
      { from: "user-mei", text: "炊飯器、写真追加しておくね。" },
    ],
  },
];

const initialData = {
  currentUserId: "user-haru",
  currentTab: "home",
  currentScreen: "home",
  composeKind: "home",
  selectedCountry: "france",
  selectedCity: "paris",
  drawerOpen: false,
  activeCommentsPostId: null,
  activeMessageThreadId: null,
  joinedLocations: [
    { country: "france", city: "paris" },
    { country: "germany", city: "berlin" },
    { country: "uk", city: "london" },
  ],
  authMode: "signin",
  users,
  posts: postBlueprints.map((post, index) => ({
    id: `post-${index + 1}`,
    image: "",
    likeUserIds: index % 3 === 0 ? ["user-yuki", "user-mei"] : index % 2 === 0 ? ["user-anna"] : [],
    commentCount: index % 4 === 0 ? 2 : index % 3 === 0 ? 1 : 0,
    createdAt: Date.now() - 1000 * 60 * (index + 1) * 32,
    marketplace: null,
    ...post,
  })),
  comments: [
    {
      id: "comment-1",
      postId: "post-1",
      userId: "user-anna",
      content: "私も気になっていました。情報ほしいです。",
      createdAt: Date.now() - 1000 * 60 * 25,
    },
    {
      id: "comment-2",
      postId: "post-1",
      userId: "user-yuki",
      content: "携帯プランならOrangeを使ってる友人が多いです。",
      createdAt: Date.now() - 1000 * 60 * 20,
    },
    {
      id: "comment-3",
      postId: "post-4",
      userId: "user-haru",
      content: "そこ私も知りたいです。",
      createdAt: Date.now() - 1000 * 60 * 18,
    },
    {
      id: "comment-4",
      postId: "post-14",
      userId: "user-yuki",
      content: "明日なら受け渡し可能です！",
      createdAt: Date.now() - 1000 * 60 * 14,
    },
  ],
  reports: [],
  messageThreads: messages,
};

let state = loadState();
let composeDelegationBound = false;

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(initialData);

  try {
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(initialData),
      ...parsed,
      currentTab: parsed.currentTab || "home",
      currentScreen: parsed.currentScreen || "home",
      composeKind: parsed.composeKind || parsed.currentTab || "home",
      drawerOpen: false,
    };
  } catch {
    return structuredClone(initialData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getCurrentUser() {
  return state.users.find((user) => user.id === state.currentUserId) || null;
}

function getUser(userId) {
  return state.users.find((user) => user.id === userId);
}

function locationKey(country, city) {
  return `${country}:${city}`;
}

function formatCountry(country) {
  return countryLabels[country] || country;
}

function formatCity(city) {
  return cityLabels[city] || city;
}

function formatRole(role) {
  return roleLabels[role] || role;
}

function formatCategory(category) {
  return categoryLabels[category] || category;
}

function avatarText(user) {
  return (user.nickname || "?").trim().charAt(0).toUpperCase() || "?";
}

function relativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.round(hours / 24);
  return `${days}日前`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isJoined(country, city) {
  return state.joinedLocations.some(
    (location) => location.country === country && location.city === city,
  );
}

function getVisiblePosts() {
  return [...state.posts]
    .filter((post) => post.country === state.selectedCountry && post.city === state.selectedCity)
    .filter((post) => {
      if (state.currentTab === "market") return post.category === "marketplace";
      if (state.currentTab === "home") return post.category === "general";
      return true;
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

function getTopHashtag(posts) {
  const counts = new Map();

  posts.forEach((post) => {
    post.hashtags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function getMyPosts() {
  return [...state.posts]
    .filter((post) => post.userId === state.currentUserId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

function getCurrentThread() {
  return state.messageThreads.find((thread) => thread.id === state.activeMessageThreadId) || null;
}

function parseHashtags(value) {
  return String(value || "")
    .split(/[\s,、]+/)
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean);
}

function render() {
  const app = document.querySelector("#app");
  const currentUser = getCurrentUser();
  app.innerHTML = currentUser ? renderAuthedApp(currentUser) : renderAuthApp();
  bindEvents();
}

function renderAuthApp() {
  return `
    <div class="phone-shell auth-screen">
      <section class="auth-card">
        <div class="logo-mark">K</div>
        <p class="eyebrow">KizunaEU</p>
        <h1>ヨーロッパで暮らす日本人のための、安心できる場所。</h1>
        <p class="auth-copy">
          同じ都市の人とつながって、生活の悩みを相談して、必要な情報をすぐに見つけられるシンプルなコミュニティです。
        </p>

        <div class="segment-control">
          <button class="${state.authMode === "signin" ? "active" : ""}" data-auth-mode="signin">ログイン</button>
          <button class="${state.authMode === "signup" ? "active" : ""}" data-auth-mode="signup">新規登録</button>
        </div>

        <form id="auth-form" class="form-stack">
          <label>
            <span>メールアドレス</span>
            <input type="email" name="email" placeholder="name@example.com" required />
          </label>
          <label>
            <span>パスワード</span>
            <input type="password" name="password" placeholder="password123" required />
          </label>

          ${
            state.authMode === "signup"
              ? `
                <label>
                  <span>ニックネーム</span>
                  <input type="text" name="nickname" placeholder="ゆき" required />
                </label>
                <label>
                  <span>ロール</span>
                  <select name="role">
                    ${Object.entries(roleLabels)
                      .map(
                        ([value, label]) =>
                          `<option value="${value}">${escapeHtml(label)}</option>`,
                      )
                      .join("")}
                  </select>
                </label>
                <label>
                  <span>国</span>
                  <select name="country" id="auth-country">
                    ${Object.entries(countryLabels)
                      .map(
                        ([value, label]) =>
                          `<option value="${value}" ${value === "france" ? "selected" : ""}>${escapeHtml(label)}</option>`,
                      )
                      .join("")}
                  </select>
                </label>
                <label>
                  <span>都市</span>
                  <select name="city" id="auth-city">
                    ${locationTree.france
                      .map(
                        (city) =>
                          `<option value="${city}" ${city === "paris" ? "selected" : ""}>${escapeHtml(formatCity(city))}</option>`,
                      )
                      .join("")}
                  </select>
                </label>
              `
              : ""
          }

          <button class="primary-button" type="submit">
            ${state.authMode === "signin" ? "ログイン" : "アカウント作成"}
          </button>
        </form>

        <button class="subtle-button" id="google-login">Googleでログイン（デモ）</button>
        <p class="helper-text">デモ: haru@example.com / password123</p>
      </section>
    </div>
  `;
}

function renderAuthedApp(currentUser) {
  return `
    <div class="app-layout ${state.drawerOpen ? "drawer-visible" : ""}">
      <aside class="drawer">
        ${renderDrawer(currentUser)}
      </aside>
      <button class="drawer-backdrop" data-close-drawer aria-label="閉じる"></button>

      <div class="phone-shell app-screen">
        ${renderScreen(currentUser)}
        ${renderBottomNav()}
      </div>
    </div>
  `;
}

function renderScreen(currentUser) {
  switch (state.currentScreen) {
    case "compose":
      return renderComposeScreen(currentUser);
    case "messages":
      return renderMessagesScreen();
    case "chat":
      return renderChatScreen();
    case "profile":
      return renderProfileScreen(currentUser);
    case "market":
      return renderFeedScreen(currentUser, "market");
    case "home":
    default:
      return renderFeedScreen(currentUser, "home");
  }
}

function renderFeedScreen(currentUser, kind) {
  const posts = getVisiblePosts();
  const homeCount = state.posts.filter(
    (post) =>
      post.country === state.selectedCountry &&
      post.city === state.selectedCity &&
      post.category === "general",
  ).length;
  const marketCount = state.posts.filter(
    (post) =>
      post.country === state.selectedCountry &&
      post.city === state.selectedCity &&
      post.category === "marketplace",
  ).length;
  const topTag = getTopHashtag(posts);
  const title =
    kind === "market"
      ? `${formatCity(state.selectedCity)} のマーケット`
      : `${formatCity(state.selectedCity)} のタイムライン`;
  const description =
    kind === "market"
      ? "売ります・譲りますの投稿だけを見られます。"
      : "同じ都市で暮らす日本人の投稿が、縦に流れて見られます。";

  return `
    <header class="app-topbar">
      <button class="icon-button" data-open-drawer aria-label="メニュー">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="location-summary">
        <p>現在のタイムライン</p>
        <strong>${escapeHtml(formatCountry(state.selectedCountry))} / ${escapeHtml(formatCity(state.selectedCity))}</strong>
      </div>
      <div class="topbar-actions">
        <button class="round-icon" data-open-messages aria-label="DM">✉</button>
        <button class="compose-button" data-compose>${kind === "market" ? "出品" : "投稿"}</button>
      </div>
    </header>

    <main class="content-area">
      <section class="panel panel-feed">
        <div class="feed-mode-switch" aria-label="フィード切り替え">
          <button class="feed-mode-button ${kind === "home" ? "active" : ""}" data-switch-feed="home">ホーム</button>
          <button class="feed-mode-button ${kind === "market" ? "active" : ""}" data-switch-feed="market">マーケット</button>
        </div>

        <section class="feed-spotlight ${kind === "market" ? "market" : "home"}">
          <div class="feed-spotlight-copy">
            <p class="eyebrow">${kind === "market" ? "注目の出品" : "いまの会話"}</p>
            <h3>${kind === "market" ? `${formatCity(state.selectedCity)} で見つける` : `${formatCity(state.selectedCity)} でつながる`}</h3>
            <p>
              ${
                kind === "market"
                  ? "売ります・譲ります・探していますをすぐ見つけられるように、マーケットもホームと同じ強さで前面に出しています。"
                  : "暮らしの相談、学校、仕事、生活情報をそのまま流し読みできる都市タイムラインです。"
              }
            </p>
          </div>
          <div class="feed-spotlight-stats">
            <div class="spotlight-stat">
              <strong>${kind === "market" ? marketCount : homeCount}</strong>
              <span>${kind === "market" ? "この都市の出品" : "この都市の投稿"}</span>
            </div>
            <div class="spotlight-stat">
              <strong>${topTag ? `#${topTag}` : "最新順"}</strong>
              <span>${topTag ? "よく使われるタグ" : "表示順"}</span>
            </div>
          </div>
        </section>

        <div class="panel-head">
          <div>
            <p class="eyebrow">${kind === "market" ? "マーケット" : "ホーム"}</p>
            <h2>${escapeHtml(title)}</h2>
          </div>
          <p class="helper-text">${escapeHtml(description)}</p>
        </div>

        <div class="feed-stream">
          ${posts.length ? posts.map((post) => renderPostCard(post, currentUser)).join("") : renderEmpty("まだ投稿がありません", "最初の投稿をしてコミュニティを動かしてみましょう。")}
        </div>
      </section>
    </main>
  `;
}

function renderComposeScreen(currentUser) {
  const isMarket = state.composeKind === "market";

  return `
    <header class="messages-topbar">
      <button class="back-button" data-back-feed aria-label="戻る">←</button>
      <div>
        <p class="eyebrow">${isMarket ? "マーケット出品" : "投稿作成"}</p>
        <h2>${isMarket ? "出品する" : "投稿する"}</h2>
      </div>
      <div></div>
    </header>

    <main class="content-area">
      <section class="panel">
        <div class="compose-kind-switch">
          <button class="compose-kind-button ${!isMarket ? "active" : ""}" data-compose-kind="home">投稿</button>
          <button class="compose-kind-button ${isMarket ? "active" : ""}" data-compose-kind="market">出品</button>
        </div>

        <div class="compose-author">
          ${renderAvatar(currentUser, "avatar")}
          <div>
            <strong>${escapeHtml(currentUser.nickname)}</strong>
            <p class="helper-text">${escapeHtml(formatCountry(state.selectedCountry))} / ${escapeHtml(formatCity(state.selectedCity))}</p>
          </div>
        </div>

        <form id="compose-form" class="form-stack">
          ${
            isMarket
              ? `
                <label>
                  <span>商品名</span>
                  <input type="text" name="itemName" placeholder="例: ダイニングチェア 2脚セット" required />
                </label>

                <label>
                  <span>価格</span>
                  <input type="text" name="price" placeholder="例: €25 / 無料" />
                </label>
              `
              : ""
          }

          <label>
            <span>${isMarket ? "出品内容" : "投稿内容"}</span>
            <textarea name="content" rows="5" placeholder="${isMarket ? "商品の状態、受け渡し場所、気になる点を書いてください" : "相談したいことや共有したいことを書いてください"}" required></textarea>
          </label>

          ${
            isMarket
              ? `
                <label>
                  <span>詳しい話</span>
                  <textarea name="sellerNote" rows="4" placeholder="使用期間、受け渡し方法、質問してほしいことなど" required></textarea>
                </label>

                <label>
                  <span>掲載期限</span>
                  <input type="text" name="deadline" placeholder="例: 4/30まで" required />
                </label>
              `
              : ""
          }

          <label>
            <span>ハッシュタグ</span>
            <input type="text" name="hashtags" placeholder="例: #家具 #パリ #食料" />
          </label>

          <label>
            <span>${isMarket ? "商品画像URL" : "画像URL"}</span>
            <input type="url" name="image" placeholder="https://..." ${isMarket ? "required" : ""} />
          </label>

          <button class="primary-button" type="submit">${isMarket ? "出品を公開" : "投稿を公開"}</button>
        </form>
      </section>
    </main>
  `;
}

function renderProfileScreen(currentUser) {
  const myPosts = getMyPosts();

  return `
    <header class="profile-topbar">
      <div class="status-row">
        <button class="icon-button light" data-open-drawer aria-label="メニュー">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="topbar-actions">
          <button class="round-icon" data-open-messages aria-label="DM">✉</button>
        </div>
      </div>

      <section class="profile-hero">
        <div class="profile-avatar-wrap">
          ${renderAvatar(currentUser, "avatar hero")}
        </div>
        <div class="profile-hero-copy">
          <h1>${escapeHtml(currentUser.nickname)}</h1>
          <p class="profile-handle">${escapeHtml(currentUser.email)}</p>
          <p class="profile-bio">${escapeHtml(currentUser.bio || "自己紹介はまだありません。")}</p>
          <div class="profile-tags">
            <span class="tag role">${escapeHtml(formatRole(currentUser.role))}</span>
            <span class="tag category">${escapeHtml(formatCountry(currentUser.country))} / ${escapeHtml(formatCity(currentUser.city))}</span>
          </div>
        </div>
      </section>
    </header>

    <main class="content-area">
      <section class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">プロフィール</p>
            <h2>プロフィールを編集</h2>
          </div>
        </div>

        <form id="profile-form" class="profile-form">
          <label>
            <span>ニックネーム</span>
            <input type="text" name="nickname" value="${escapeHtml(currentUser.nickname)}" required />
          </label>

          <label>
            <span>自己紹介</span>
            <textarea name="bio" rows="4" placeholder="簡単な自己紹介">${escapeHtml(currentUser.bio || "")}</textarea>
          </label>

          <label>
            <span>プロフィール画像URL</span>
            <input type="url" name="profileImage" value="${escapeHtml(currentUser.profileImage || "")}" placeholder="https://..." />
          </label>

          <label>
            <span>ロール</span>
            <select name="role">
              ${Object.entries(roleLabels)
                .map(
                  ([value, label]) =>
                    `<option value="${value}" ${value === currentUser.role ? "selected" : ""}>${escapeHtml(label)}</option>`,
                )
                .join("")}
            </select>
          </label>

          <label>
            <span>国</span>
            <select name="country" id="profile-country">
              ${Object.entries(countryLabels)
                .map(
                  ([value, label]) =>
                    `<option value="${value}" ${value === currentUser.country ? "selected" : ""}>${escapeHtml(label)}</option>`,
                )
                .join("")}
            </select>
          </label>

          <label>
            <span>都市</span>
            <select name="city" id="profile-city">
              ${locationTree[currentUser.country]
                .map(
                  (city) =>
                    `<option value="${city}" ${city === currentUser.city ? "selected" : ""}>${escapeHtml(formatCity(city))}</option>`,
                )
                .join("")}
            </select>
          </label>

          <div class="button-stack">
            <button class="primary-button" type="submit">保存する</button>
            <button class="subtle-button" type="button" id="sign-out">ログアウト</button>
          </div>
        </form>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">これまでの投稿</p>
            <h2>自分の投稿一覧</h2>
          </div>
        </div>
        <div class="feed-stream">
          ${myPosts.length ? myPosts.map((post) => renderPostCard(post, currentUser)).join("") : renderEmpty("投稿はまだありません", "ホームから最初の投稿をしてみましょう。")}
        </div>
      </section>
    </main>
  `;
}

function renderMessagesScreen() {
  return `
    <header class="messages-topbar">
      <button class="back-button" data-go-home>←</button>
      <div>
        <p class="eyebrow">DM</p>
        <h2>メッセージ</h2>
      </div>
      <button class="round-icon disabled" aria-label="新規メッセージ">＋</button>
    </header>

    <main class="content-area">
      <section class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">受信箱</p>
            <h2>やり取り一覧</h2>
          </div>
        </div>

        <div class="message-list">
          ${state.messageThreads
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((thread) => {
              const user = getUser(thread.userId);
              return `
                <button class="message-row" data-open-thread="${thread.id}">
                  ${renderAvatar(user, "avatar")}
                  <div class="message-copy">
                    <strong>${escapeHtml(user.nickname)}</strong>
                    <p>${escapeHtml(thread.preview)}</p>
                  </div>
                  <span>${escapeHtml(relativeTime(thread.updatedAt))}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      </section>
    </main>
  `;
}

function renderChatScreen() {
  const thread = getCurrentThread();
  if (!thread) {
    state.currentScreen = "messages";
    saveState();
    return renderMessagesScreen();
  }

  const user = getUser(thread.userId);
  return `
    <header class="messages-topbar">
      <button class="back-button" data-open-messages-list>←</button>
      <div class="chat-title">
        ${renderAvatar(user, "avatar")}
        <div>
          <p class="eyebrow">DM</p>
          <h2>${escapeHtml(user.nickname)}</h2>
        </div>
      </div>
      <div></div>
    </header>

    <main class="content-area">
      <section class="panel chat-panel">
        <div class="chat-stream">
          ${thread.messages
            .map((message) => {
              const mine = message.from === state.currentUserId;
              return `
                <div class="chat-bubble ${mine ? "mine" : ""}">
                  ${escapeHtml(message.text)}
                </div>
              `;
            })
            .join("")}
        </div>

        <form id="chat-form" class="chat-form">
          <input type="text" name="message" placeholder="メッセージを書く" required />
          <button class="primary-button compact" type="submit">送信</button>
        </form>
      </section>
    </main>
  `;
}

function renderDrawer(currentUser) {
  const joined = state.joinedLocations;
  const available = Object.entries(locationTree).flatMap(([country, cities]) =>
    cities
      .filter((city) => !isJoined(country, city))
      .map((city) => ({ country, city })),
  );

  return `
    <div class="drawer-header">
      ${renderAvatar(currentUser, "avatar large")}
      <div>
        <strong>${escapeHtml(currentUser.nickname)}</strong>
        <p>${escapeHtml(formatRole(currentUser.role))}</p>
      </div>
    </div>

    <section class="drawer-section">
      <p class="drawer-title">参加中のタイムライン</p>
      <div class="drawer-list">
        ${joined
          .map(
            (location) => `
              <button
                class="drawer-item ${
                  state.selectedCountry === location.country && state.selectedCity === location.city ? "active" : ""
                }"
                data-switch-location="${locationKey(location.country, location.city)}"
              >
                <span>${escapeHtml(formatCity(location.city))}</span>
                <small>${escapeHtml(formatCountry(location.country))}</small>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="drawer-section">
      <p class="drawer-title">他の都市に参加する</p>
      <div class="drawer-list">
        ${available
          .map(
            (location) => `
              <button class="drawer-item join" data-join-location="${locationKey(location.country, location.city)}">
                <span>${escapeHtml(formatCity(location.city))}</span>
                <small>${escapeHtml(formatCountry(location.country))}</small>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderBottomNav() {
  return `
    <nav class="bottom-nav">
      <button class="nav-item ${state.currentScreen === "profile" ? "active" : ""}" data-nav="profile" aria-label="プロフィール">
        ${iconProfile()}
      </button>
      <button class="nav-item ${state.currentScreen === "home" ? "active" : ""}" data-nav="home" aria-label="ホーム">
        ${iconHome()}
      </button>
      <button class="nav-item ${state.currentScreen === "market" ? "active" : ""}" data-nav="market" aria-label="マーケット">
        ${iconBag()}
      </button>
    </nav>
  `;
}

function renderPostCard(post, currentUser) {
  const author = getUser(post.userId);
  const comments = state.comments
    .filter((comment) => comment.postId === post.id)
    .sort((a, b) => a.createdAt - b.createdAt);
  const isLiked = post.likeUserIds.includes(currentUser.id);

  return `
    <article class="post-card">
      <div class="post-head">
        ${renderAvatar(author, "avatar")}
        <div class="post-meta">
          <div class="post-main-line">
            <strong>${escapeHtml(author.nickname)}</strong>
            <span class="tag role">${escapeHtml(formatRole(author.role))}</span>
            <span class="tag category">${escapeHtml(formatCategory(post.category))}</span>
          </div>
          <div class="post-sub-line">
            <span>${escapeHtml(formatCountry(post.country))} / ${escapeHtml(formatCity(post.city))}</span>
            <span>${escapeHtml(relativeTime(post.createdAt))}</span>
          </div>
        </div>
        <button class="more-button" data-report-post="${post.id}" aria-label="その他">•••</button>
      </div>

      <p class="post-text">${escapeHtml(post.content)}</p>

      ${
        post.marketplace
          ? `
            <div class="market-card">
              <div>
                <strong>${escapeHtml(post.marketplace.itemName)}</strong>
                ${post.marketplace.price ? `<p>${escapeHtml(post.marketplace.price)}</p>` : ""}
                <div class="market-meta">
                  <div class="market-meta-row">
                    <span>出品者</span>
                    <strong>${escapeHtml(author.nickname)} / ${escapeHtml(formatRole(author.role))}</strong>
                  </div>
                  ${
                    post.marketplace.sellerNote
                      ? `
                        <div class="market-meta-row stacked">
                          <span>詳しい話</span>
                          <strong>${escapeHtml(post.marketplace.sellerNote)}</strong>
                        </div>
                      `
                      : ""
                  }
                  ${
                    post.marketplace.deadline
                      ? `
                        <div class="market-meta-row">
                          <span>期限</span>
                          <strong>${escapeHtml(post.marketplace.deadline)}</strong>
                        </div>
                      `
                      : ""
                  }
                </div>
              </div>
              ${
                post.marketplace.image
                  ? `<img src="${escapeHtml(post.marketplace.image)}" alt="${escapeHtml(post.marketplace.itemName)}" />`
                  : ""
              }
            </div>
          `
          : ""
      }

      ${
        post.image && !post.marketplace
          ? `<img class="post-image" src="${escapeHtml(post.image)}" alt="投稿画像" />`
          : ""
      }

      ${
        post.hashtags.length
          ? `
            <div class="hashtag-row">
              ${post.hashtags
                .map((hashtag) => `<span class="hashtag">#${escapeHtml(hashtag)}</span>`)
                .join("")}
            </div>
          `
          : ""
      }

      <div class="post-actions">
        <button class="text-button ${isLiked ? "liked" : ""}" data-like="${post.id}">
          ${iconHeart(isLiked)}<span>${post.likeUserIds.length}</span>
        </button>
        <button class="text-button" data-comment-toggle="${post.id}">
          ${iconComment()}<span>${comments.length}</span>
        </button>
      </div>

      ${
        state.activeCommentsPostId === post.id
          ? `
            <div class="comments-card">
              <div class="comments-list">
                ${
                  comments.length
                    ? comments
                        .map((comment) => {
                          const commentUser = getUser(comment.userId);
                          return `
                            <div class="comment-item">
                              <div class="comment-meta">
                                <strong>${escapeHtml(commentUser.nickname)}</strong>
                                <span>${escapeHtml(relativeTime(comment.createdAt))}</span>
                              </div>
                              <p>${escapeHtml(comment.content)}</p>
                            </div>
                          `;
                        })
                        .join("")
                    : `<p class="helper-text">まだコメントはありません。</p>`
                }
              </div>
              <form class="comment-form" data-comment-form="${post.id}">
                <input type="text" name="content" placeholder="コメントを書く" required />
                <button class="primary-button compact" type="submit">送信</button>
              </form>
            </div>
          `
          : ""
      }
    </article>
  `;
}

function renderAvatar(user, className) {
  if (user.profileImage) {
    return `<img class="${className}" src="${escapeHtml(user.profileImage)}" alt="${escapeHtml(user.nickname)}" />`;
  }

  return `<div class="${className}">${escapeHtml(avatarText(user))}</div>`;
}

function renderEmpty(title, message) {
  return `
    <div class="empty-card">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.authMode = button.dataset.authMode;
      render();
    });
  });

  document.querySelector("#auth-form")?.addEventListener("submit", handleAuthSubmit);
  document.querySelector("#google-login")?.addEventListener("click", handleGoogleLogin);
  document.querySelector("#auth-country")?.addEventListener("change", (event) => {
    syncCitySelect(event.target.value, document.querySelector("#auth-city"));
  });

  document.querySelector("[data-open-drawer]")?.addEventListener("click", () => {
    state.drawerOpen = true;
    saveState();
    render();
  });

  document.querySelector("[data-close-drawer]")?.addEventListener("click", () => {
    state.drawerOpen = false;
    saveState();
    render();
  });

  document.querySelectorAll("[data-switch-location]").forEach((button) => {
    button.addEventListener("click", () => {
      const [country, city] = button.dataset.switchLocation.split(":");
      state.selectedCountry = country;
      state.selectedCity = city;
      state.currentTab = "home";
      state.currentScreen = "home";
      state.drawerOpen = false;
      state.activeCommentsPostId = null;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-join-location]").forEach((button) => {
    button.addEventListener("click", () => {
      const [country, city] = button.dataset.joinLocation.split(":");
      state.joinedLocations.push({ country, city });
      state.selectedCountry = country;
      state.selectedCity = city;
      state.currentTab = "home";
      state.currentScreen = "home";
      state.drawerOpen = false;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.nav;
      state.currentTab = next === "market" ? "market" : "home";
      state.currentScreen = next;
      state.activeCommentsPostId = null;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-switch-feed]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.switchFeed;
      state.currentTab = next === "market" ? "market" : "home";
      state.currentScreen = state.currentTab;
      state.activeCommentsPostId = null;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-open-messages]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentScreen = "messages";
      state.activeCommentsPostId = null;
      saveState();
      render();
    });
  });

  document.querySelector("[data-go-home]")?.addEventListener("click", () => {
    state.currentScreen = state.currentTab === "market" ? "market" : "home";
    saveState();
    render();
  });

  document.querySelector("[data-open-messages-list]")?.addEventListener("click", () => {
    state.currentScreen = "messages";
    saveState();
    render();
  });

  document.querySelectorAll("[data-open-thread]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMessageThreadId = button.dataset.openThread;
      state.currentScreen = "chat";
      saveState();
      render();
    });
  });

  document.querySelector("#chat-form")?.addEventListener("submit", handleChatSubmit);
  document.querySelector("#compose-form")?.addEventListener("submit", handleComposeSubmit);
  if (!composeDelegationBound) {
    document.addEventListener(
      "click",
      (event) => {
        const composeButton = event.target.closest("[data-compose]");
        if (composeButton) {
          event.preventDefault();
          event.stopImmediatePropagation();
          state.composeKind = state.currentTab === "market" ? "market" : "home";
          state.currentScreen = "compose";
          state.activeCommentsPostId = null;
          saveState();
          render();
          return;
        }

        const backButton = event.target.closest("[data-back-feed]");
        if (backButton) {
          event.preventDefault();
          state.currentTab = state.composeKind === "market" ? "market" : "home";
          state.currentScreen = state.currentTab;
          saveState();
          render();
          return;
        }

        const composeKindButton = event.target.closest("[data-compose-kind]");
        if (composeKindButton) {
          event.preventDefault();
          state.composeKind = composeKindButton.dataset.composeKind === "market" ? "market" : "home";
          saveState();
          render();
        }
      },
      true,
    );
    composeDelegationBound = true;
  }

  document.querySelector("[data-compose]")?.addEventListener("click", () => {
    const content = window.prompt("投稿内容を入力してください");
    if (!content || !content.trim()) return;

    const currentUser = getCurrentUser();
    const isMarket = state.currentTab === "market";
    state.posts.unshift({
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      category: isMarket ? "marketplace" : "general",
      content: content.trim(),
      hashtags: [],
      image: "",
      country: state.selectedCountry,
      city: state.selectedCity,
      createdAt: Date.now(),
      likeUserIds: [],
      commentCount: 0,
      marketplace: isMarket
        ? {
            itemName: window.prompt("商品名を入力してください") || "商品名未設定",
            price: window.prompt("価格を入力してください（任意）") || "",
            image: window.prompt("画像URLを入力してください") || "",
          }
        : null,
    });
    saveState();
    render();
  });

  document.querySelectorAll("[data-like]").forEach((button) => {
    button.addEventListener("click", () => toggleLike(button.dataset.like));
  });

  document.querySelectorAll("[data-comment-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCommentsPostId =
        state.activeCommentsPostId === button.dataset.commentToggle
          ? null
          : button.dataset.commentToggle;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-comment-form]").forEach((form) => {
    form.addEventListener("submit", handleCommentSubmit);
  });

  document.querySelectorAll("[data-report-post]").forEach((button) => {
    button.addEventListener("click", () => report(button.dataset.reportPost));
  });

  document.querySelector("#profile-form")?.addEventListener("submit", handleProfileSubmit);
  document.querySelector("#profile-country")?.addEventListener("change", (event) => {
    syncCitySelect(event.target.value, document.querySelector("#profile-city"));
  });
  document.querySelector("#sign-out")?.addEventListener("click", handleSignOut);
}

function syncCitySelect(country, citySelect) {
  if (!citySelect) return;
  citySelect.innerHTML = locationTree[country]
    .map((city) => `<option value="${city}">${escapeHtml(formatCity(city))}</option>`)
    .join("");
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const email = form.get("email").trim().toLowerCase();
  const password = form.get("password").trim();

  if (state.authMode === "signin") {
    const user = state.users.find(
      (candidate) => candidate.email === email && candidate.password === password,
    );

    if (!user) {
      alert("メールアドレスまたはパスワードが違います。");
      return;
    }

    state.currentUserId = user.id;
    state.selectedCountry = user.country;
    state.selectedCity = user.city;
  } else {
    if (state.users.some((user) => user.email === email)) {
      alert("このメールアドレスはすでに登録されています。");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      nickname: form.get("nickname").trim(),
      profileImage: "",
      bio: "",
      role: form.get("role"),
      country: form.get("country"),
      city: form.get("city"),
    };

    state.users.unshift(newUser);
    state.currentUserId = newUser.id;
    state.selectedCountry = newUser.country;
    state.selectedCity = newUser.city;

    if (!isJoined(newUser.country, newUser.city)) {
      state.joinedLocations.unshift({ country: newUser.country, city: newUser.city });
    }
  }

  saveState();
  render();
}

function handleGoogleLogin() {
  const demoUser = state.users.find((user) => user.email === "haru@example.com");
  state.currentUserId = demoUser.id;
  state.selectedCountry = demoUser.country;
  state.selectedCity = demoUser.city;
  saveState();
  render();
}

function handleCommentSubmit(event) {
  event.preventDefault();
  const currentUser = getCurrentUser();
  const postId = event.currentTarget.dataset.commentForm;
  const form = new FormData(event.currentTarget);
  const content = form.get("content").trim();
  if (!content) return;

  state.comments.push({
    id: crypto.randomUUID(),
    postId,
    userId: currentUser.id,
    content,
    createdAt: Date.now(),
  });

  const post = state.posts.find((item) => item.id === postId);
  if (post) post.commentCount += 1;

  saveState();
  render();
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const currentUser = getCurrentUser();
  const form = new FormData(event.currentTarget);

  currentUser.nickname = form.get("nickname").trim();
  currentUser.bio = form.get("bio").trim();
  currentUser.profileImage = form.get("profileImage").trim();
  currentUser.role = form.get("role");
  currentUser.country = form.get("country");
  currentUser.city = form.get("city");

  state.selectedCountry = currentUser.country;
  state.selectedCity = currentUser.city;

  if (!isJoined(currentUser.country, currentUser.city)) {
    state.joinedLocations.unshift({ country: currentUser.country, city: currentUser.city });
  }

  saveState();
  render();
}

function handleChatSubmit(event) {
  event.preventDefault();
  const thread = getCurrentThread();
  if (!thread) return;

  const form = new FormData(event.currentTarget);
  const message = form.get("message").trim();
  if (!message) return;

  thread.messages.push({
    from: state.currentUserId,
    text: message,
  });
  thread.preview = message;
  thread.updatedAt = Date.now();

  saveState();
  render();
}

function handleComposeSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const currentUser = getCurrentUser();
  const isMarket = state.composeKind === "market";
  const image = String(formData.get("image") || "").trim();

  state.posts.unshift({
    id: `post-${Date.now()}`,
    userId: currentUser.id,
    category: isMarket ? "marketplace" : "general",
    content: String(formData.get("content") || "").trim(),
    hashtags: parseHashtags(formData.get("hashtags")),
    image,
    country: state.selectedCountry,
    city: state.selectedCity,
    createdAt: Date.now(),
    likeUserIds: [],
    commentCount: 0,
    marketplace: isMarket
      ? {
          itemName: String(formData.get("itemName") || "").trim(),
          price: String(formData.get("price") || "").trim(),
          image,
          sellerNote: String(formData.get("sellerNote") || "").trim(),
          deadline: String(formData.get("deadline") || "").trim(),
        }
      : null,
  });

  state.currentTab = isMarket ? "market" : "home";
  state.currentScreen = state.currentTab;
  saveState();
  render();
}

function handleSignOut() {
  state.currentUserId = null;
  state.drawerOpen = false;
  state.activeCommentsPostId = null;
  state.currentScreen = "home";
  state.currentTab = "home";
  saveState();
  render();
}

function toggleLike(postId) {
  const currentUser = getCurrentUser();
  const post = state.posts.find((item) => item.id === postId);
  if (!post) return;

  if (post.likeUserIds.includes(currentUser.id)) {
    post.likeUserIds = post.likeUserIds.filter((userId) => userId !== currentUser.id);
  } else {
    post.likeUserIds.push(currentUser.id);
  }

  saveState();
  render();
}

function report(postId) {
  state.reports.push({
    id: crypto.randomUUID(),
    type: "post",
    targetId: postId,
    reportedBy: state.currentUserId,
    createdAt: Date.now(),
  });
  saveState();
  alert("投稿を通報しました。");
}

function iconHome() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.6 12 4l9 6.6V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>
  `;
}

function iconProfile() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <path d="M5.5 20c1.6-3.2 4-4.8 6.5-4.8s4.9 1.6 6.5 4.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;
}

function iconBag() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9h12l-1 11H7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 9V7.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;
}

function iconHeart(filled) {
  return filled
    ? `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.5 4.8 13.6a4.7 4.7 0 0 1 6.7-6.6L12 7.4l.5-.4a4.7 4.7 0 1 1 6.7 6.6z" fill="currentColor"/>
      </svg>
    `
    : `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.5 4.8 13.6a4.7 4.7 0 0 1 6.7-6.6L12 7.4l.5-.4a4.7 4.7 0 1 1 6.7 6.6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>
    `;
}

function iconComment() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6.5h14v9H9l-4 3v-12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>
  `;
}

render();

import "./styles.css";

const STORAGE_KEY = "kizuna-eu-web-mvp";

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
  uk: "UK",
  denmark: "Denmark",
  netherlands: "Netherlands",
  germany: "Germany",
  france: "France",
  spain: "Spain",
  italy: "Italy",
};

const cityLabels = {
  london: "London",
  manchester: "Manchester",
  copenhagen: "Copenhagen",
  amsterdam: "Amsterdam",
  berlin: "Berlin",
  munich: "Munich",
  paris: "Paris",
  barcelona: "Barcelona",
  madrid: "Madrid",
  milan: "Milan",
};

const roleLabels = {
  student: "Student",
  working_holiday: "Working Holiday",
  expat: "Expat",
  traveler: "Traveler",
};

const categoryLabels = {
  general: "General",
  marketplace: "Marketplace",
};

const initialData = {
  currentUserId: "user-yuki",
  currentTab: "home",
  homeScope: "city",
  selectedCountry: "germany",
  selectedCity: "berlin",
  searchQuery: "berlinlife",
  activeCommentsPostId: null,
  authMode: "signin",
  users: [
    {
      id: "user-yuki",
      email: "yuki@example.com",
      password: "password123",
      nickname: "Yuki",
      profileImage: "",
      bio: "Software engineer in Berlin. Looking for a calm Japanese community abroad.",
      role: "expat",
      country: "germany",
      city: "berlin",
    },
    {
      id: "user-haru",
      email: "haru@example.com",
      password: "password123",
      nickname: "Haru",
      profileImage: "",
      bio: "Student in Paris. Asking daily-life questions and sharing study tips.",
      role: "student",
      country: "france",
      city: "paris",
    },
    {
      id: "user-mei",
      email: "mei@example.com",
      password: "password123",
      nickname: "Mei",
      profileImage: "",
      bio: "Working holiday in Berlin. Selling home items before moving.",
      role: "working_holiday",
      country: "germany",
      city: "berlin",
    },
  ],
  posts: [
    {
      id: "post-1",
      userId: "user-yuki",
      category: "general",
      content: "Anyone want to join a Japanese coffee meetup in Mitte this Saturday?",
      hashtags: ["meetup", "berlinlife"],
      image: "",
      country: "germany",
      city: "berlin",
      createdAt: Date.now() - 1000 * 60 * 45,
      likeUserIds: ["user-haru"],
      commentCount: 2,
      marketplace: null,
    },
    {
      id: "post-2",
      userId: "user-mei",
      category: "marketplace",
      content: "Selling a rice cooker before I move apartments. Pickup in Berlin.",
      hashtags: ["marketplace", "moving"],
      image: "https://images.unsplash.com/photo-1585515656823-1b43f4f8458d?auto=format&fit=crop&w=900&q=80",
      country: "germany",
      city: "berlin",
      createdAt: Date.now() - 1000 * 60 * 120,
      likeUserIds: [],
      commentCount: 1,
      marketplace: {
        itemName: "Tiger Rice Cooker",
        price: "€35",
        image: "https://images.unsplash.com/photo-1585515656823-1b43f4f8458d?auto=format&fit=crop&w=900&q=80",
      },
    },
    {
      id: "post-3",
      userId: "user-haru",
      category: "general",
      content: "Any recommendations for affordable phone plans in Paris?",
      hashtags: ["lifehelp", "paris"],
      image: "",
      country: "france",
      city: "paris",
      createdAt: Date.now() - 1000 * 60 * 180,
      likeUserIds: ["user-yuki", "user-mei"],
      commentCount: 0,
      marketplace: null,
    },
  ],
  comments: [
    {
      id: "comment-1",
      postId: "post-1",
      userId: "user-haru",
      content: "I can join after lunch.",
      createdAt: Date.now() - 1000 * 60 * 35,
    },
    {
      id: "comment-2",
      postId: "post-1",
      userId: "user-mei",
      content: "Count me in too.",
      createdAt: Date.now() - 1000 * 60 * 28,
    },
    {
      id: "comment-3",
      postId: "post-2",
      userId: "user-yuki",
      content: "Does it still have the original box?",
      createdAt: Date.now() - 1000 * 60 * 80,
    },
  ],
  reports: [],
};

let state = loadState();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(initialData);

  try {
    return { ...structuredClone(initialData), ...JSON.parse(raw) };
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

function formatRole(role) {
  return roleLabels[role] || role;
}

function formatCategory(category) {
  return categoryLabels[category] || category;
}

function formatCountry(country) {
  return countryLabels[country] || country;
}

function formatCity(city) {
  return cityLabels[city] || city;
}

function avatarText(user) {
  return (user.nickname || "?").trim().charAt(0).toUpperCase() || "?";
}

function relativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeHashtags(input) {
  return input
    .split(/\s+/)
    .map((tag) => tag.replace(/^#/, "").trim().toLowerCase())
    .filter(Boolean);
}

function getVisiblePosts() {
  let posts = [...state.posts].sort((a, b) => b.createdAt - a.createdAt);

  if (state.currentTab === "search") {
    const query = state.searchQuery.trim().replace(/^#/, "").toLowerCase();
    if (!query) return [];
    return posts.filter((post) => post.hashtags.includes(query));
  }

  if (state.homeScope === "city") {
    posts = posts.filter(
      (post) => post.country === state.selectedCountry && post.city === state.selectedCity,
    );
  }

  return posts;
}

function render() {
  const app = document.querySelector("#app");
  const currentUser = getCurrentUser();

  app.innerHTML = currentUser ? renderAuthedApp(currentUser) : renderAuthApp();
  bindEvents();
}

function renderAuthApp() {
  return `
    <div class="shell auth-shell">
      <section class="auth-hero">
        <div class="brand-row">
          <div class="brand-badge">K</div>
          <div>
            <p class="eyebrow">KizunaEU</p>
            <h1>Japanese community in Europe</h1>
          </div>
        </div>
        <p class="lede">
          A calm and safe social space for Japanese students, working holiday users, expats, and travelers living across Europe.
        </p>
        <div class="feature-list">
          <div class="mini-card">City and global timelines</div>
          <div class="mini-card">Marketplace posts</div>
          <div class="mini-card">Hashtag search</div>
          <div class="mini-card">Profile editing</div>
        </div>
      </section>

      <section class="auth-card card">
        <div class="segmented">
          <button class="${state.authMode === "signin" ? "active" : ""}" data-auth-mode="signin">Sign In</button>
          <button class="${state.authMode === "signup" ? "active" : ""}" data-auth-mode="signup">Create Account</button>
        </div>

        <form id="auth-form" class="form-stack">
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="name@example.com" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" placeholder="password123" required />
          </label>

          ${
            state.authMode === "signup"
              ? `
                <label>
                  <span>Nickname</span>
                  <input type="text" name="nickname" placeholder="Yuki" required />
                </label>
                <label>
                  <span>Role</span>
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
                  <span>Country</span>
                  <select name="country" id="auth-country">
                    ${Object.entries(countryLabels)
                      .map(
                        ([value, label]) =>
                          `<option value="${value}" ${value === "germany" ? "selected" : ""}>${escapeHtml(label)}</option>`,
                      )
                      .join("")}
                  </select>
                </label>
                <label>
                  <span>City</span>
                  <select name="city" id="auth-city">
                    ${locationTree.germany
                      .map(
                        (city) =>
                          `<option value="${city}" ${city === "berlin" ? "selected" : ""}>${escapeHtml(formatCity(city))}</option>`,
                      )
                      .join("")}
                  </select>
                </label>
              `
              : ""
          }

          <button class="primary-button" type="submit">
            ${state.authMode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button class="ghost-button" id="google-login">Continue with Google (demo)</button>
        <p class="helper-text">Demo accounts: yuki@example.com / password123, haru@example.com / password123</p>
      </section>
    </div>
  `;
}

function renderAuthedApp(currentUser) {
  const visiblePosts = getVisiblePosts();

  return `
    <div class="shell app-shell">
      <header class="topbar card">
        <div>
          <p class="eyebrow">KizunaEU MVP</p>
          <h2>安心できる、ヨーロッパの日本人コミュニティ</h2>
        </div>
        <div class="topbar-meta">
          <span class="pill">${escapeHtml(currentUser.nickname)}</span>
          <span class="pill">${escapeHtml(formatCity(currentUser.city))}</span>
        </div>
      </header>

      <main class="main-grid">
        <section class="content">
          ${renderTabNav()}
          ${renderCurrentPanel(currentUser, visiblePosts)}
        </section>
      </main>
    </div>
  `;
}

function renderTabNav() {
  const tabs = [
    ["home", "Home"],
    ["post", "Post"],
    ["search", "Search"],
    ["profile", "Profile"],
  ];

  return `
    <nav class="tabbar card">
      ${tabs
        .map(
          ([key, label]) =>
            `<button class="tab-button ${state.currentTab === key ? "active" : ""}" data-tab="${key}">${label}</button>`,
        )
        .join("")}
    </nav>
  `;
}

function renderCurrentPanel(currentUser, visiblePosts) {
  switch (state.currentTab) {
    case "post":
      return renderPostComposer(currentUser);
    case "search":
      return renderSearch(visiblePosts);
    case "profile":
      return renderProfile(currentUser);
    case "home":
    default:
      return renderHome(currentUser, visiblePosts);
  }
}

function renderHome(currentUser, posts) {
  return `
    <section class="panel-stack">
      <div class="card panel-header">
        <div>
          <p class="eyebrow">Home</p>
          <h3>${state.homeScope === "city" ? "City timeline" : "Global timeline"}</h3>
        </div>
        <div class="segmented compact">
          <button class="${state.homeScope === "city" ? "active" : ""}" data-scope="city">City</button>
          <button class="${state.homeScope === "global" ? "active" : ""}" data-scope="global">Global</button>
        </div>
      </div>

      ${
        state.homeScope === "city"
          ? `
            <div class="card filters">
              <label>
                <span>Country</span>
                <select id="home-country">
                  ${Object.entries(countryLabels)
                    .map(
                      ([value, label]) =>
                        `<option value="${value}" ${value === state.selectedCountry ? "selected" : ""}>${escapeHtml(label)}</option>`,
                    )
                    .join("")}
                </select>
              </label>
              <label>
                <span>City</span>
                <select id="home-city">
                  ${locationTree[state.selectedCountry]
                    .map(
                      (city) =>
                        `<option value="${city}" ${city === state.selectedCity ? "selected" : ""}>${escapeHtml(formatCity(city))}</option>`,
                    )
                    .join("")}
                </select>
              </label>
            </div>
          `
          : ""
      }

      <div class="feed">
        ${posts.length ? posts.map((post) => renderPostCard(post, currentUser)).join("") : renderEmpty("No posts yet", "This timeline is quiet. Your first post can set the tone.")}
      </div>
    </section>
  `;
}

function renderPostCard(post, currentUser) {
  const author = getUser(post.userId);
  const comments = state.comments
    .filter((comment) => comment.postId === post.id)
    .sort((a, b) => a.createdAt - b.createdAt);
  const isLiked = post.likeUserIds.includes(currentUser.id);

  return `
    <article class="card post-card">
      <div class="post-top">
        <div class="avatar">${escapeHtml(avatarText(author))}</div>
        <div class="post-meta">
          <div class="post-title-row">
            <strong>${escapeHtml(author.nickname)}</strong>
            <span class="tag soft">${escapeHtml(formatRole(author.role))}</span>
            <span class="tag">${escapeHtml(formatCategory(post.category))}</span>
          </div>
          <div class="post-subline">
            <span>${escapeHtml(formatCity(post.city))}, ${escapeHtml(formatCountry(post.country))}</span>
            <span>${escapeHtml(relativeTime(post.createdAt))}</span>
          </div>
        </div>
        <div class="post-report-actions">
          <button class="inline-button" data-report-post="${post.id}">Report post</button>
          <button class="inline-button" data-report-user="${author.id}">Report user</button>
        </div>
      </div>

      <p class="post-content">${escapeHtml(post.content)}</p>

      ${
        post.marketplace
          ? `
            <div class="market-box">
              <div>
                <strong>${escapeHtml(post.marketplace.itemName)}</strong>
                ${post.marketplace.price ? `<p>${escapeHtml(post.marketplace.price)}</p>` : ""}
              </div>
              ${post.marketplace.image ? `<img src="${escapeHtml(post.marketplace.image)}" alt="${escapeHtml(post.marketplace.itemName)}" />` : ""}
            </div>
          `
          : ""
      }

      ${
        post.image && !post.marketplace
          ? `<img class="post-image" src="${escapeHtml(post.image)}" alt="Post image" />`
          : ""
      }

      ${
        post.hashtags.length
          ? `<div class="hashtag-row">${post.hashtags
              .map(
                (hashtag) =>
                  `<button class="tag clickable" data-hashtag="${escapeHtml(hashtag)}">#${escapeHtml(hashtag)}</button>`,
              )
              .join("")}</div>`
          : ""
      }

      <div class="post-actions">
        <button class="inline-button ${isLiked ? "liked" : ""}" data-like="${post.id}">
          ${isLiked ? "♥" : "♡"} ${post.likeUserIds.length}
        </button>
        <button class="inline-button" data-comment-toggle="${post.id}">
          Comment ${comments.length}
        </button>
      </div>

      ${
        state.activeCommentsPostId === post.id
          ? `
            <div class="comments-panel">
              <div class="comments-list">
                ${comments.length
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
                  : `<p class="helper-text">No comments yet.</p>`}
              </div>
              <form class="comment-form" data-comment-form="${post.id}">
                <input type="text" name="content" placeholder="Write a comment" required />
                <button class="primary-button small" type="submit">Send</button>
              </form>
            </div>
          `
          : ""
      }
    </article>
  `;
}

function renderPostComposer(currentUser) {
  return `
    <section class="panel-stack">
      <div class="card panel-header">
        <div>
          <p class="eyebrow">Post</p>
          <h3>Create a new post</h3>
        </div>
      </div>

      <form id="post-form" class="card form-stack">
        <label>
          <span>Category</span>
          <select name="category" id="post-category">
            <option value="general">General</option>
            <option value="marketplace">Marketplace</option>
          </select>
        </label>

        <div class="form-grid">
          <label>
            <span>Country</span>
            <select name="country" id="post-country">
              ${Object.entries(countryLabels)
                .map(
                  ([value, label]) =>
                    `<option value="${value}" ${value === currentUser.country ? "selected" : ""}>${escapeHtml(label)}</option>`,
                )
                .join("")}
            </select>
          </label>
          <label>
            <span>City</span>
            <select name="city" id="post-city">
              ${locationTree[currentUser.country]
                .map(
                  (city) =>
                    `<option value="${city}" ${city === currentUser.city ? "selected" : ""}>${escapeHtml(formatCity(city))}</option>`,
                )
                .join("")}
            </select>
          </label>
        </div>

        <label>
          <span>Content</span>
          <textarea name="content" rows="5" placeholder="What do you want to share?" required></textarea>
        </label>

        <label>
          <span>Hashtags</span>
          <input type="text" name="hashtags" placeholder="#lifehelp #berlinlife" />
        </label>

        <label>
          <span>Image URL (optional)</span>
          <input type="url" name="image" placeholder="https://..." />
        </label>

        <div id="marketplace-fields" class="marketplace-fields hidden">
          <label>
            <span>Item name</span>
            <input type="text" name="itemName" placeholder="Rice cooker" />
          </label>
          <label>
            <span>Price (optional)</span>
            <input type="text" name="price" placeholder="€35" />
          </label>
          <label>
            <span>Marketplace image URL (required)</span>
            <input type="url" name="marketplaceImage" placeholder="https://..." />
          </label>
        </div>

        <button class="primary-button" type="submit">Publish</button>
      </form>
    </section>
  `;
}

function renderSearch(posts) {
  return `
    <section class="panel-stack">
      <div class="card panel-header">
        <div>
          <p class="eyebrow">Search</p>
          <h3>Search by hashtag</h3>
        </div>
      </div>

      <form id="search-form" class="card search-bar">
        <input type="text" name="query" value="${escapeHtml(state.searchQuery)}" placeholder="#berlinlife" />
        <button class="primary-button small" type="submit">Search</button>
      </form>

      <div class="feed">
        ${posts.length ? posts.map((post) => renderPostCard(post, getCurrentUser())).join("") : renderEmpty("No results", "Try hashtags like #marketplace or #lifehelp.")}
      </div>
    </section>
  `;
}

function renderProfile(currentUser) {
  return `
    <section class="panel-stack">
      <div class="card panel-header">
        <div>
          <p class="eyebrow">Profile</p>
          <h3>View and edit profile</h3>
        </div>
      </div>

      <form id="profile-form" class="card form-stack">
        <div class="profile-head">
          <div class="avatar large">${escapeHtml(avatarText(currentUser))}</div>
          <div>
            <strong>${escapeHtml(currentUser.email)}</strong>
            <p class="helper-text">${escapeHtml(formatCity(currentUser.city))}, ${escapeHtml(formatCountry(currentUser.country))}</p>
          </div>
        </div>

        <label>
          <span>Nickname</span>
          <input type="text" name="nickname" value="${escapeHtml(currentUser.nickname)}" required />
        </label>

        <label>
          <span>Bio</span>
          <textarea name="bio" rows="4" placeholder="Short self-introduction">${escapeHtml(currentUser.bio || "")}</textarea>
        </label>

        <label>
          <span>Profile image URL</span>
          <input type="url" name="profileImage" value="${escapeHtml(currentUser.profileImage || "")}" placeholder="https://..." />
        </label>

        <div class="form-grid">
          <label>
            <span>Role</span>
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
            <span>Country</span>
            <select name="country" id="profile-country">
              ${Object.entries(countryLabels)
                .map(
                  ([value, label]) =>
                    `<option value="${value}" ${value === currentUser.country ? "selected" : ""}>${escapeHtml(label)}</option>`,
                )
                .join("")}
            </select>
          </label>
        </div>

        <label>
          <span>City</span>
          <select name="city" id="profile-city">
            ${locationTree[currentUser.country]
              .map(
                (city) =>
                  `<option value="${city}" ${city === currentUser.city ? "selected" : ""}>${escapeHtml(formatCity(city))}</option>`,
              )
              .join("")}
          </select>
        </label>

        <div class="button-row">
          <button class="primary-button" type="submit">Save profile</button>
          <button class="ghost-button" type="button" id="sign-out">Sign out</button>
        </div>
      </form>
    </section>
  `;
}

function renderEmpty(title, message) {
  return `
    <div class="card empty-state">
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

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentTab = button.dataset.tab;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-scope]").forEach((button) => {
    button.addEventListener("click", () => {
      state.homeScope = button.dataset.scope;
      saveState();
      render();
    });
  });

  document.querySelector("#auth-form")?.addEventListener("submit", handleAuthSubmit);
  document.querySelector("#google-login")?.addEventListener("click", handleGoogleLogin);
  document.querySelector("#search-form")?.addEventListener("submit", handleSearchSubmit);
  document.querySelector("#post-form")?.addEventListener("submit", handlePostSubmit);
  document.querySelector("#profile-form")?.addEventListener("submit", handleProfileSubmit);
  document.querySelector("#sign-out")?.addEventListener("click", handleSignOut);

  document.querySelector("#auth-country")?.addEventListener("change", (event) => {
    syncCitySelect(event.target.value, document.querySelector("#auth-city"));
  });

  document.querySelector("#home-country")?.addEventListener("change", (event) => {
    state.selectedCountry = event.target.value;
    state.selectedCity = locationTree[state.selectedCountry][0];
    saveState();
    render();
  });

  document.querySelector("#home-city")?.addEventListener("change", (event) => {
    state.selectedCity = event.target.value;
    saveState();
    render();
  });

  document.querySelector("#post-country")?.addEventListener("change", (event) => {
    syncCitySelect(event.target.value, document.querySelector("#post-city"));
  });

  document.querySelector("#profile-country")?.addEventListener("change", (event) => {
    syncCitySelect(event.target.value, document.querySelector("#profile-city"));
  });

  document.querySelector("#post-category")?.addEventListener("change", (event) => {
    const marketplaceFields = document.querySelector("#marketplace-fields");
    marketplaceFields.classList.toggle("hidden", event.target.value !== "marketplace");
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

  document.querySelectorAll("[data-hashtag]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentTab = "search";
      state.searchQuery = button.dataset.hashtag;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-report-post]").forEach((button) => {
    button.addEventListener("click", () => report("post", button.dataset.reportPost));
  });

  document.querySelectorAll("[data-report-user]").forEach((button) => {
    button.addEventListener("click", () => report("user", button.dataset.reportUser));
  });
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
      alert("Email または password が違います。");
      return;
    }

    state.currentUserId = user.id;
  } else {
    const nickname = form.get("nickname").trim();
    const role = form.get("role");
    const country = form.get("country");
    const city = form.get("city");

    if (state.users.some((user) => user.email === email)) {
      alert("その email は既に使われています。");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      nickname,
      profileImage: "",
      bio: "",
      role,
      country,
      city,
    };

    state.users.unshift(newUser);
    state.currentUserId = newUser.id;
    state.selectedCountry = country;
    state.selectedCity = city;
  }

  saveState();
  render();
}

function handleGoogleLogin() {
  const demoUser = state.users.find((user) => user.email === "yuki@example.com");
  state.currentUserId = demoUser.id;
  state.selectedCountry = demoUser.country;
  state.selectedCity = demoUser.city;
  saveState();
  render();
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  state.searchQuery = form.get("query").trim();
  saveState();
  render();
}

function handlePostSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const currentUser = getCurrentUser();
  const category = form.get("category");
  const image = form.get("image").trim();
  const marketplaceImage = form.get("marketplaceImage")?.trim() || "";
  const itemName = form.get("itemName")?.trim() || "";

  if (category === "marketplace" && (!itemName || !marketplaceImage)) {
    alert("Marketplace post では item name と image が必要です。");
    return;
  }

  const post = {
    id: crypto.randomUUID(),
    userId: currentUser.id,
    category,
    content: form.get("content").trim(),
    hashtags: normalizeHashtags(form.get("hashtags").trim()),
    image: category === "marketplace" ? marketplaceImage : image,
    country: form.get("country"),
    city: form.get("city"),
    createdAt: Date.now(),
    likeUserIds: [],
    commentCount: 0,
    marketplace:
      category === "marketplace"
        ? {
            itemName,
            price: form.get("price").trim(),
            image: marketplaceImage,
          }
        : null,
  };

  state.posts.unshift(post);
  state.currentTab = "home";
  state.homeScope = "city";
  state.selectedCountry = post.country;
  state.selectedCity = post.city;
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

  if (state.currentUserId === currentUser.id) {
    state.selectedCountry = currentUser.country;
    state.selectedCity = currentUser.city;
  }

  saveState();
  render();
}

function handleSignOut() {
  state.currentUserId = null;
  state.activeCommentsPostId = null;
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

function report(type, targetId) {
  const currentUser = getCurrentUser();
  state.reports.push({
    id: crypto.randomUUID(),
    type,
    targetId,
    reportedBy: currentUser.id,
    createdAt: Date.now(),
  });
  saveState();
  alert(type === "post" ? "Post reported." : "User reported.");
}

render();

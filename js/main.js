const SITE_URL = "https://super-group.eu";
const SITE_MODE_STORAGE_KEY = "siteMode";
const TEMPORARY_WEBSITE = getInitialTemporaryWebsiteMode();
const MANIFEST_URL = "/assets/work/manifest.json?v=20260608-v2-compact-story";
const LOGO_MANIFEST_URL = "/info/logos/manifest.json?v=20260606-asset-structure";
const INFO_MARKDOWN_VERSION = "20260608-experience-links";
const FLOCKING_LOGO_URL = "/assets/supergroup/supergroup-logo.svg";
const MENU_2_VERSION_STORAGE_KEY = "supergroup_menu2_version";
const INTRO_VOCABULARY_URL = "/assets/vocabulary/vocabulary.json?v=20260609-no-wrap";
const VOCAB_ANIMATION_VERSION_STORAGE_KEY = "supergroup_vocab_animation_version";
const MATERIAL_SYMBOLS_STYLESHEET_URL = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap";
const INCLUDED_SCOPES = new Set(["all", "supergroup"]);
const CONTAINED_ROLES = new Set(["system", "strategy", "diagram", "study", "model", "presentation"]);
const FULLSCREEN_ROLES = new Set(["cover", "result", "campaign", "detail"]);
const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "m4v"]);
const FALLBACK_BACKGROUND = "#f4f4f1";
const NORMAL_SLIDE_DURATION_MS = 5000;
const RESUME_CONFIRMATION_DELAY_MS = 1000;
const GIF_FALLBACK_DURATION_MS = 8000;
const MEDIA_ERROR_FALLBACK_DURATION_MS = NORMAL_SLIDE_DURATION_MS;
const AUTOPLAY_DELAY = NORMAL_SLIDE_DURATION_MS;
const CONTACT_SHEET_AUTOPLAY_DELAY = 10000;
const ANIMATION_MS = 720;
const NAV_MENU_POSITION_STORAGE_KEY = "supergroupNavMenuPosition";
const META_MENU_POSITION_STORAGE_KEY = "supergroupMetaMenuPosition";
const FLOCKING_LOGO_SETTINGS = {
  mouseForce: 0.045,
  homeForce: 0.045,
  hoverHomeForce: 0.012,
  separationForce: 0.055,
  cohesionForce: 0.004,
  alignmentForce: 0.008,
  damping: 0.82,
  maxSpeed: 6,
  neighborRadius: 80,
  separationRadius: 34,
  mouseRadius: 240,
  returnThreshold: 0.5,
  boundaryForce: 0.018,
  rotationForce: 0.09,
  scaleForce: 0.0018,
  transitionDuration: 750,
  spreadPhase: 220,
  regroupPhase: 530
};
const INTRO_VOCABULARY_FALLBACK = {
  firstPhrase: ["Navigating", "complex", "environments"],
  verbs: {
    primary: ["Navigating"],
    alternative: ["Mapping"]
  },
  adjectives: ["complex"],
  nouns: ["environments"]
};
const INFO_MENU_ANCHORS = [
  { id: "about", label: "About" },
  { id: "practice", label: "Practice" },
  { id: "recognition", label: "Recognition" },
  { id: "partners", label: "Partners" }
];
const TEMPORARY_INFO_MENU_ANCHORS = [
  { id: "about", label: "About" },
  { id: "practice", label: "Clients" },
  { id: "recognition", label: "Recognition" },
  { id: "partners", label: "Partners" }
];
const TEMPORARY_INFO_PRIMARY_TEXT = `Complexity is everywhere.

Supergroup is a design studio for complex environments.
We use design to make organisations, information, brands, buildings and systems easier to understand, navigate and use.

Our work moves between brand identity, signage, wayfinding, spatial graphics, digital design and visual strategy - often in close relation to architecture, real estate and public space.

From complexity to clarity, through design.`;
const TEMPORARY_INFO_ENVIRONMENTS = [
  {
    title: "Complex environments",
    description: "Strategy, systems and clarity"
  },
  {
    title: "Spatial environments",
    description: "Wayfinding, graphics and interventions"
  },
  {
    title: "Digital environments",
    description: "Websites, interfaces and information"
  },
  {
    title: "Brand environments",
    description: "Identity, language and visual systems"
  }
];
const TEMPORARY_INFO_CTA_TEXT = "For inquiries, collaborations or project requests: hello@super-group.eu or +31 (0)6 47 123 556.";
const TEMPORARY_INFO_CLIENTS_TEXT = `Selected Clients

Culture & Knowledge
Amsterdam Museum, Amsterdam
Beeld en Geluid, Hilversum
Centraal Museum, Utrecht
De Appel, Amsterdam
De Fundering, Amsterdam
Jan van Eyck Academie, Maastricht
Kunsthal, Rotterdam
Mauritshuis, Den Haag
NDSM Werf, Amsterdam
Nationaal Glasmuseum, Leerdam
Paleis Het Loo, Apeldoorn
Rotterdamse Academie voor Bouwkunst, Rotterdam
Spoorwegmuseum, Utrecht
Stedelijk Museum, Amsterdam
Stedelijk Museum, Alkmaar
Theater De Veste, Delft
Unseen, Amsterdam
Van Abbemuseum, Eindhoven

Public & Institutional
Gemeente Amsterdam, Amsterdam
PostNL, Netherlands
TU Delft, Delft
Universiteit van Amsterdam, Amsterdam
UNESCO
WHO
ZonMw, Den Haag

Architecture & Place
Beyond Space Architects
Braaksma & Roos Architectenbureau
Civic Architects
G&S&
INSPIRA developers
KondorWessels Vastgoed
NEOO Developers
Raumplan Architects
Stadsherstel
Superlofts
Vereniging Deltametropool
XML Architects

Commercial & Brand
Ace & Tate, Amsterdam
BBC, Amsterdam / London
Buddelship, Hamburg
DPG Media, Amsterdam
Filosoof Jenever, Hamburg
Karl Lagerfeld Jeans, Global
Marktplaats, Amsterdam
Morentz, Waalwijk
NearSt, London
Neoderma, Amsterdam
PLAYNOMORE, Seoul

Energy & Industry
AVR Energy, Netherlands
LOOC eCloud, Netherlands`;
const TEMPORARY_INFO_STATIC_CONTENT = {
  publications: `Publications

Allure Korea | https://www.allurekorea.com/2017/02/02/%ED%98%91%EC%97%85-%EC%95%84%EC%9D%B4%ED%85%9C%EC%9C%BC%EB%A1%9C-%EC%A3%BC%EB%AA%A9%EB%B0%9B%EB%8A%94-%ED%94%8C%EB%A0%88%EC%9D%B4-%EB%85%B8%EB%AA%A8%EC%96%B4%EC%99%80-sjyp/
Architectenweb | https://architectenweb.nl/nieuws/artikel.aspx?id=48039
BBC | https://www.bbc.co.uk/programmes/b006mjxb
De Groene Amsterdammer | https://www.groene.nl/artikel/recht-voor-zijn-raap--2
Designboom | https://www.designboom.com/architecture/xml-bright-red-signage-facilitate-orientation-parking-garage-amsterdam-08-26-2020/
Design Museum London | https://designmuseum.org/exhibitions/redesign-of-the-uk-passport/
Dezeen | https://www.dezeen.com/2017/07/06/design-museum-london-exhibition-dezeen-brexit-passport-competition-winners/
Domus | https://www.domusweb.it/en/news/2016/06/10/european_council_xml.html
Fast Company | https://www.fastcompany.com/3047547/why-cant-the-us-governments-graphic-design-be-this-beautiful/
Frameweb | https://frameweb.com/project/ace-tate-van-woustraat-store-amsterdam
Hypebeast | https://hypebeast.com/2016/4/mark-maker
Inc. | https://www.inc.com/kevin-j-ryan/need-a-startup-logo-this-machine-will-design-one-for-you.html
It's Nice That | https://www.itsnicethat.com/news/markmaker-logo-generator-algorithm-140416
Lifehacker Japan | https://www.lifehacker.jp/article/160419markmaker/
The Guardian | https://www.facebook.com/theguardian/videos/brexit-passport-design-competition/664746173713149/
Volkskrant | https://www.volkskrant.nl/cultuur-media/jonge-kunstenaars-met-knellend-thema~babae044/`,
  exhibitions: `Exhibitions

BOZAR, Brussels
Centraal Museum Utrecht
Design Museum London
Festival de l'Affiche de Chaumont
Graphic Design Festival Breda
Graphic Design Festival Glasgow
Lothringer13 Halle, Munich
Malta Design Week
Museum Arnhem
Serralves Foundation, Porto`,
  lectures: `Lectures & Teaching

ArtEZ Arnhem
Design Academy Eindhoven
Dongdaemun Design Plaza, Seoul
HKU Utrecht
Nieuwe Instituut, Rotterdam
Premsela Institute for Design
Sandberg Instituut, Amsterdam
St. Joost School of Art & Design
TU Delft / Berlage Institute`,
  partners: `Long-term Partners

Studiostaak | https://www.studiostaak.nl/
AABB | https://aabb-commits.github.io/os/`,
  brands: `Brands & Labels

Emblemmatic | https://emblemmatic.org/
Goldilocks
Hooikaas
Pilotgroup
Playbot | https://playbot.space
ReMedi
Storybuilders`,
  experience: `Built on Experience

Built on experience gained through projects, collaborations and roles across cultural, public and commercial organisations.

2x4|https://2x4.org/
Fondazione Prada
Prada
Miu Miu
Harrods
Nike
Samsung
Hyundai Motors
MoMA PS1
New York Public Library
Qatar Museums Authority

Gretel|https://gretelny.com/
21st Century Fox
Kickstarter
WeWork
MTV Global
Noma

Project Projects, New York|https://www.wkshps.com/
Columbia University GSAPP
Jewish Museum
Seattle Art Fair

Total Design|https://www.totaldesign.com/
De Nederlandsche Bank
Royal FloraHolland

Nick Bell Design|https://nickbelldesign.co.uk/
Eye Magazine
Imperial War Museum`,
  contact: `Contact

alfons@super-group.eu
+31 (0)6 47 123 556

Weesperzijde 33V
1091 ED Amsterdam
The Netherlands`
};
const TEMPORARY_CONTACT_EMAIL = "hello@super-group.eu";
const TEMPORARY_NOTICE_LINK_LABEL = TEMPORARY_CONTACT_EMAIL;

function isProductionHost() {
  const hostname = window.location.hostname;

  return (
    hostname === "super-group.eu" ||
    hostname === "www.super-group.eu" ||
    hostname.endsWith(".vercel.app")
  );
}

function isIndexLikePath() {
  const path = window.location.pathname;
  return path === "/" || path.endsWith("/index.html");
}

function getInitialTemporaryWebsiteMode() {
  try {
    if (isProductionHost()) {
      window.localStorage.setItem(SITE_MODE_STORAGE_KEY, "temporary");
      return true;
    }

    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    if (mode === "temp" || mode === "temporary") {
      window.localStorage.setItem(SITE_MODE_STORAGE_KEY, "temporary");
      return true;
    }

    if (mode === "full") {
      window.localStorage.setItem(SITE_MODE_STORAGE_KEY, "full");
      return false;
    }

    if (isIndexLikePath()) return true;

    const savedMode = window.localStorage.getItem(SITE_MODE_STORAGE_KEY);
    if (savedMode === "full") return false;
    if (savedMode === "temporary") return true;
  } catch (error) {
    return true;
  }

  return true;
}

const slideshow = document.getElementById("supergroupSlideshow");
const navPanel = document.getElementById("supergroup-island-panel");
const metadataPanel = document.getElementById("supergroup-meta-panel");
const viewButtons = Array.from(document.querySelectorAll("[data-view]"));
const temporaryInfoButton = document.querySelector(".temporary-info-button");
const slideshowToggle = document.getElementById("slideshowToggle");
const slideshowToggleIcon = document.getElementById("slideshowToggleIcon");
const disciplineWord = document.getElementById("disciplineWord");
const metadataProjectViewport = document.getElementById("metadataProjectViewport");
const metadataProjectBlock = document.getElementById("metadataProjectBlock");
const metadataAssetViewport = document.getElementById("metadataAssetViewport");
const menu2SlideshowMode = document.getElementById("menu2SlideshowMode");
const menu2InfoMode = document.getElementById("menu2InfoMode");
const menu2GridMode = document.getElementById("menu2GridMode");
const metadataProjectTitle = document.getElementById("metadataProjectTitle");
const metadataProjectClient = document.getElementById("metadataProjectClient");
const metadataAssetInfo = document.getElementById("metadataAssetInfo");
const aboutOverlay = document.getElementById("aboutOverlay");
const aboutClose = document.getElementById("aboutClose");
const infoEnglishContent = document.getElementById("infoEnglishContent");
const infoDutchContent = document.getElementById("infoDutchContent");
const infoKoreanContent = document.getElementById("infoKoreanContent");
const infoTemporaryEnvironmentsContent = document.getElementById("infoTemporaryEnvironmentsContent");
const infoTemporaryCtaContent = document.getElementById("infoTemporaryCtaContent");
const infoClientsContent = document.getElementById("infoClientsContent");
const infoPublicationsContent = document.getElementById("infoPublicationsContent");
const infoExhibitionsContent = document.getElementById("infoExhibitionsContent");
const infoLecturesContent = document.getElementById("infoLecturesContent");
const infoPartnersContent = document.getElementById("infoPartnersContent");
const infoBrandsContent = document.getElementById("infoBrandsContent");
const infoExperienceContent = document.getElementById("infoExperienceContent");
const infoContactContent = document.getElementById("infoContactContent");
const contactSheetOverlay = document.getElementById("contactSheetOverlay");
const contactSheetClose = document.getElementById("contactSheetClose");
const contactSheetGrid = document.getElementById("contactSheetGrid");
const infoWorkList = document.getElementById("infoWorkList");
const contactToggle = document.getElementById("contactToggle");
const contactBlob = document.getElementById("contactBlob");
const homeLogoButton = document.getElementById("homeLogoButton");
const menu2VersionToggle = document.getElementById("menu2VersionToggle");
const vocabAnimationToggle = document.getElementById("vocabAnimationToggle");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let slides = [];
let slideshowAssets = [];
let currentIndex = 0;
let autoplayTimer = 0;
let activeVideoCleanup = null;
let slideTimingToken = 0;
let lastFocusedElement = null;
let pointerStart = null;
let currentView = "slideshow";
let isSlideshowPaused = false;
let isSlideshowToggleHoverSuppressed = false;
let currentMenu2Mode = "slideshow";
let currentGridFilter = "all";
let hasUserInteractedWithMedia = false;
let clientLogos = [];
let disciplineAnimationTimers = [];
let hasSetDisciplineTitle = false;
let metadataAnimationTimers = [];
let infoSectionObserver = null;
let infoSectionScrollHandler = null;
let flockingLogoController = null;
let introVocabularyCleanup = null;
let projectStoryRequestToken = 0;
let currentMenu2Version = getMenu2Version();
let currentVocabAnimationVersion = getVocabAnimationVersion();
let currentMenu2StoryProjectKey = null;
let temporaryIntroFirstWordPickCount = 0;
let temporaryLogoParticleController = null;
let temporaryFloatingFaviconController = null;
let hasRenderedTemporaryInfoPage = false;
const projectStoryCache = new Map();

function isTemporaryWebsiteActive() {
  return TEMPORARY_WEBSITE === true;
}

function isFullMode() {
  return !isTemporaryWebsiteActive();
}

function getMenu2Version() {
  try {
    const version = window.localStorage.getItem(MENU_2_VERSION_STORAGE_KEY);
    return version === "v2" || version === "v3" || version === "v4" ? version : "v1";
  } catch (error) {
    return "v1";
  }
}

function setMenu2Version(version) {
  const normalizedVersion = version === "v2" || version === "v3" || version === "v4" ? version : "v1";

  try {
    window.localStorage.setItem(MENU_2_VERSION_STORAGE_KEY, normalizedVersion);
  } catch (error) {
    // localStorage can be unavailable in some privacy contexts.
  }

  currentMenu2Version = normalizedVersion;
}

function getVocabAnimationVersion() {
  try {
    const version = window.localStorage.getItem(VOCAB_ANIMATION_VERSION_STORAGE_KEY);
    return ["v2", "v3a", "v3b", "v3c"].includes(version) ? version : "v1";
  } catch (error) {
    return "v1";
  }
}

function setVocabAnimationVersion(version) {
  const normalizedVersion = ["v2", "v3a", "v3b", "v3c"].includes(version) ? version : "v1";

  try {
    window.localStorage.setItem(VOCAB_ANIMATION_VERSION_STORAGE_KEY, normalizedVersion);
  } catch (error) {
    // localStorage can be unavailable in some privacy contexts.
  }

  currentVocabAnimationVersion = normalizedVersion;
}

function setContactBlobOpen(isOpen) {
  const wasOpen = contactBlob.classList.contains("is-open");
  contactBlob.classList.toggle("is-open", isOpen);
  contactBlob.setAttribute("aria-hidden", String(!isOpen));
  contactToggle.classList.toggle("is-active", isOpen);
  contactToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen !== wasOpen) triggerLogoTransition();
}

function toggleContactBlob() {
  setContactBlobOpen(!contactBlob.classList.contains("is-open"));
}

function appendMarkdownParagraph(target, lines) {
  const text = lines.join("\n").trim();
  if (!text) return;

  const paragraph = document.createElement("p");
  text.split("\n").forEach((line, index) => {
    if (index > 0) paragraph.append(document.createElement("br"));
    paragraph.append(document.createTextNode(line.trim()));
  });
  target.append(paragraph);
}

function appendMarkdownList(target, lines) {
  if (!lines.length) return;

  const list = document.createElement("ul");
  lines.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line.replace(/^-\s*/, "").trim();
    list.append(item);
  });
  target.append(list);
}

function renderMarkdown(target, markdown) {
  if (!target) return;

  const lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
  let paragraphLines = [];
  let listLines = [];

  target.textContent = "";

  function flushParagraph() {
    appendMarkdownParagraph(target, paragraphLines);
    paragraphLines = [];
  }

  function flushList() {
    appendMarkdownList(target, listLines);
    listLines = [];
  }

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      return;
    }

    if (trimmedLine.startsWith("- ")) {
      flushParagraph();
      listLines.push(trimmedLine);
      return;
    }

    flushList();
    paragraphLines.push(trimmedLine);
  });

  flushParagraph();
  flushList();
}

function renderPlainTextIndex(target, text, options = {}) {
  if (!target) return;

  const hiddenFirstLine = options.hiddenFirstLine || "";
  const groupHeadings = new Set(options.groupHeadings || []);
  const secondaryHeadings = new Set(options.secondaryHeadings || []);
  const rowClassName = options.rowClassName || "info-clients-row";
  const spacerClassName = options.spacerClassName || "info-clients-spacer";
  const lines = String(text || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  let hasRenderedRow = false;
  let pendingSpacer = false;

  target.textContent = "";

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const isHiddenHeading =
      index === 0 &&
      hiddenFirstLine &&
      trimmedLine.toLowerCase() === hiddenFirstLine.toLowerCase();

    if (isHiddenHeading) return;
    if (!trimmedLine) {
      if (hasRenderedRow) pendingSpacer = true;
      return;
    }

    const isHeading = groupHeadings.has(trimmedLine) || secondaryHeadings.has(trimmedLine);

    if (pendingSpacer && !isHeading) {
      const spacer = document.createElement("div");
      spacer.className = spacerClassName;
      target.append(spacer);
    }
    pendingSpacer = false;

    const row = document.createElement("div");
    row.className = rowClassName;
    row.classList.toggle("is-group-heading", isHeading && groupHeadings.has(trimmedLine));
    row.classList.toggle("is-secondary-heading", secondaryHeadings.has(trimmedLine));
    row.textContent = trimmedLine;
    target.append(row);
    hasRenderedRow = true;
  });
}

function renderPublicationIndex(target, text, options = {}) {
  if (!target) return;

  const hiddenFirstLine = options.hiddenFirstLine || "";
  const lines = String(text || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");

  target.textContent = "";

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const isHiddenHeading =
      index === 0 &&
      hiddenFirstLine &&
      trimmedLine.toLowerCase() === hiddenFirstLine.toLowerCase();

    if (isHiddenHeading || !trimmedLine) return;

    const [label, url] = trimmedLine.split("|").map((part) => part.trim());
    if (!label || !url) return;

    const link = document.createElement("a");
    link.className = "info-publication-link";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    appendExternalLinkIcon(link);
    target.append(link);
  });
}

function appendExternalLinkIcon(link) {
  loadMaterialSymbolsIfNeeded();

  const icon = document.createElement("span");
  icon.className = "material-symbols-outlined info-external-link-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "arrow_outward";
  link.append(icon);
}

function renderLinkedTextIndex(target, text, options = {}) {
  if (!target) return;

  const hiddenFirstLine = options.hiddenFirstLine || "";
  const rowClassName = options.rowClassName || "info-link-row";
  const spacerClassName = options.spacerClassName || "info-link-spacer";
  const lines = String(text || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  let hasRenderedRow = false;
  let pendingSpacer = false;

  target.textContent = "";

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const isHiddenHeading =
      index === 0 &&
      hiddenFirstLine &&
      trimmedLine.toLowerCase() === hiddenFirstLine.toLowerCase();

    if (isHiddenHeading) return;
    if (!trimmedLine) {
      if (hasRenderedRow) pendingSpacer = true;
      return;
    }

    if (pendingSpacer) {
      const spacer = document.createElement("div");
      spacer.className = spacerClassName;
      target.append(spacer);
      pendingSpacer = false;
    }

    const row = document.createElement("div");
    row.className = rowClassName;

    const [label, url] = trimmedLine.split("|").map((part) => part.trim());

    if (label && url) {
      const link = document.createElement("a");
      link.className = "info-text-link";
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label;
      appendExternalLinkIcon(link);
      row.append(link);
    } else {
      row.textContent = label || trimmedLine;
    }

    target.append(row);
    hasRenderedRow = true;
  });
}

function renderExperienceIndex(target, text, options = {}) {
  if (!target) return;

  const hiddenFirstLine = options.hiddenFirstLine || "";
  const groupHeadings = new Set(options.groupHeadings || []);
  const lines = String(text || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  let hasRenderedIntro = false;
  let hasRenderedRow = false;
  let pendingSpacer = false;

  target.textContent = "";

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const isHiddenHeading =
      index === 0 &&
      hiddenFirstLine &&
      trimmedLine.toLowerCase() === hiddenFirstLine.toLowerCase();

    if (isHiddenHeading) return;
    if (!trimmedLine) {
      if (hasRenderedRow) pendingSpacer = true;
      return;
    }

    if (!hasRenderedIntro) {
      const intro = document.createElement("div");
      intro.className = "info-experience-row info-experience-intro";
      intro.textContent = trimmedLine;
      target.append(intro);
      hasRenderedIntro = true;
      hasRenderedRow = true;
      pendingSpacer = false;
      return;
    }

    const [label, url] = trimmedLine.split("|").map((part) => part.trim());
    const isHeading = groupHeadings.has(label || trimmedLine);

    if (pendingSpacer && !isHeading) {
      const spacer = document.createElement("div");
      spacer.className = "info-experience-spacer";
      target.append(spacer);
    }
    pendingSpacer = false;

    const row = document.createElement("div");
    row.className = "info-experience-row";
    row.classList.toggle("is-group-heading", isHeading);

    if (url) {
      const link = document.createElement("a");
      link.className = "info-text-link";
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label;
      appendExternalLinkIcon(link);
      row.append(link);
    } else {
      row.textContent = label || trimmedLine;
    }

    target.append(row);
    hasRenderedRow = true;
  });
}

function renderContactIndex(target, text) {
  if (!target) return;

  const lines = String(text || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  const blocks = [];
  let currentBlock = [];

  target.textContent = "";

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      if (currentBlock.length) {
        blocks.push(currentBlock);
        currentBlock = [];
      }
      return;
    }

    currentBlock.push(trimmedLine);
  });

  if (currentBlock.length) blocks.push(currentBlock);

  const logoColumn = document.createElement("div");
  logoColumn.className = "info-contact-block info-contact-logo-block";

  const logo = document.createElement("img");
  logo.className = "info-contact-logo";
  logo.src = "/assets/supergroup/supergroup-symbol.svg";
  logo.alt = "Supergroup";

  logoColumn.append(logo);
  target.append(logoColumn);

  const footerColumns = [
    [...(blocks[0] || []), ...(blocks[1] || [])],
    ...(blocks.length > 2 ? blocks.slice(2) : [])
  ];

  footerColumns.forEach((block) => {
    if (!block.length) return;

    const column = document.createElement("div");
    column.className = "info-contact-block";

    block.forEach((line, index) => {
      if (index > 0) column.append(document.createElement("br"));
      column.append(document.createTextNode(line));
    });

    target.append(column);
  });
}

function renderTemporaryInfoCta(target) {
  if (!target) return;

  target.textContent = "";

  const [prefixText] = TEMPORARY_INFO_CTA_TEXT.split("hello@super-group.eu");
  const prefix = document.createTextNode(prefixText);
  const emailLink = document.createElement("a");
  const phoneLink = document.createElement("a");

  emailLink.href = "mailto:hello@super-group.eu";
  emailLink.textContent = "hello@super-group.eu";

  phoneLink.href = "tel:+31647123556";
  phoneLink.textContent = "+31 (0)6 47 123 556";

  target.append(
    prefix,
    document.createElement("br"),
    emailLink,
    document.createTextNode(" or "),
    phoneLink,
    document.createTextNode(".")
  );
}

function renderTemporaryEnvironments(target) {
  if (!target) return;

  target.textContent = "";
  target.classList.add("info-environments-grid");

  TEMPORARY_INFO_ENVIRONMENTS.forEach((environment) => {
    const item = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");

    item.className = "info-environment-item";
    title.className = "info-environment-title";
    description.className = "info-environment-description";
    title.textContent = environment.title;
    description.textContent = environment.description;

    item.append(title, description);
    target.append(item);
  });
}

function setInfoSectionVisible(target, isVisible) {
  const section = target?.closest(".info-section");
  if (section) section.hidden = !isVisible;
}

function getInfoMenuAnchors() {
  return isTemporaryWebsiteActive() ? TEMPORARY_INFO_MENU_ANCHORS : INFO_MENU_ANCHORS;
}

function renderDefaultInfoPage(content) {
  renderMarkdown(infoEnglishContent, content.english);
  renderMarkdown(infoDutchContent, content.dutch);
  renderMarkdown(infoKoreanContent, content.korean);
  renderPlainTextIndex(infoClientsContent, content.clients, {
    hiddenFirstLine: "Selected Clients",
    groupHeadings: [
      "Culture & Knowledge",
      "Public & Institutional",
      "Architecture & Place",
      "Commercial & Brand",
      "Energy & Industry"
    ]
  });
  renderPublicationIndex(infoPublicationsContent, content.publications, {
    hiddenFirstLine: "Publications"
  });
  renderPlainTextIndex(infoExhibitionsContent, content.exhibitions, {
    hiddenFirstLine: "Exhibitions",
    rowClassName: "info-simple-row",
    spacerClassName: "info-simple-spacer"
  });
  renderPlainTextIndex(infoLecturesContent, content.lectures, {
    hiddenFirstLine: "Lectures & Teaching",
    rowClassName: "info-simple-row",
    spacerClassName: "info-simple-spacer"
  });
  renderLinkedTextIndex(infoPartnersContent, content.partners, {
    hiddenFirstLine: "Long-term Partners"
  });
  renderLinkedTextIndex(infoBrandsContent, content.brands, {
    hiddenFirstLine: "Brands & Labels"
  });
  renderExperienceIndex(infoExperienceContent, content.experience, {
    hiddenFirstLine: "Built on Experience",
    groupHeadings: [
      "2x4",
      "Gretel",
      "Project Projects, New York",
      "Total Design",
      "Nick Bell Design"
    ]
  });
  renderContactIndex(infoContactContent, content.contact);

  [
    infoTemporaryEnvironmentsContent,
    infoTemporaryCtaContent,
    infoClientsContent,
    infoPublicationsContent,
    infoExhibitionsContent,
    infoLecturesContent,
    infoPartnersContent,
    infoBrandsContent,
    infoExperienceContent,
    infoContactContent
  ].forEach((target) => setInfoSectionVisible(target, true));
  setInfoSectionVisible(infoTemporaryEnvironmentsContent, false);
  setInfoSectionVisible(infoTemporaryCtaContent, false);
}

function renderTemporaryInfoPage(content) {
  renderPlainTextIndex(infoClientsContent, TEMPORARY_INFO_CLIENTS_TEXT, {
    hiddenFirstLine: "Selected Clients",
    groupHeadings: [
      "Culture & Knowledge",
      "Public & Institutional",
      "Architecture & Place",
      "Commercial & Brand",
      "Energy & Industry"
    ]
  });
  renderPublicationIndex(infoPublicationsContent, content.publications, {
    hiddenFirstLine: "Publications"
  });
  renderPlainTextIndex(infoExhibitionsContent, content.exhibitions, {
    hiddenFirstLine: "Exhibitions",
    rowClassName: "info-simple-row",
    spacerClassName: "info-simple-spacer"
  });
  renderPlainTextIndex(infoLecturesContent, content.lectures, {
    hiddenFirstLine: "Lectures & Teaching",
    rowClassName: "info-simple-row",
    spacerClassName: "info-simple-spacer"
  });
  renderLinkedTextIndex(infoPartnersContent, content.partners, {
    hiddenFirstLine: "Long-term Partners"
  });
  renderLinkedTextIndex(infoBrandsContent, content.brands, {
    hiddenFirstLine: "Brands & Labels"
  });
  renderExperienceIndex(infoExperienceContent, content.experience, {
    hiddenFirstLine: "Built on Experience",
    groupHeadings: [
      "2x4",
      "Gretel",
      "Project Projects, New York",
      "Total Design",
      "Nick Bell Design"
    ]
  });
  renderContactIndex(infoContactContent, content.contact);

  [
    infoTemporaryEnvironmentsContent,
    infoTemporaryCtaContent,
    infoClientsContent
  ].forEach((target) => setInfoSectionVisible(target, true));
  setInfoSectionVisible(infoPublicationsContent, Boolean(content.publications));
  setInfoSectionVisible(infoExhibitionsContent, Boolean(content.exhibitions));
  setInfoSectionVisible(infoLecturesContent, Boolean(content.lectures));
  setInfoSectionVisible(infoPartnersContent, Boolean(content.partners));
  setInfoSectionVisible(infoBrandsContent, Boolean(content.brands));
  setInfoSectionVisible(infoExperienceContent, Boolean(content.experience));
  setInfoSectionVisible(infoContactContent, Boolean(content.contact));
}

async function fetchMarkdown(path) {
  if (!isFullMode()) return "";

  try {
    const response = await fetch(`${path}?v=${INFO_MARKDOWN_VERSION}`);
    if (!response.ok) return "";
    return response.text();
  } catch (error) {
    return "";
  }
}

async function loadInfoMarkdownContent() {
  const [
    english,
    dutch,
    korean,
    clients,
    publications,
    exhibitions,
    lectures,
    partners,
    brands,
    experience,
    contact
  ] = await Promise.all([
    fetchMarkdown("/info/en.md"),
    fetchMarkdown("/info/nl.md"),
    fetchMarkdown("/info/kr.md"),
    fetchMarkdown("/info/clients.md"),
    fetchMarkdown("/info/publications.md"),
    fetchMarkdown("/info/exhibitions.md"),
    fetchMarkdown("/info/lectures.md"),
    fetchMarkdown("/info/partners.md"),
    fetchMarkdown("/info/brands.md"),
    fetchMarkdown("/info/experience.md"),
    fetchMarkdown("/info/contact.md")
  ]);

  return {
    english,
    dutch,
    korean,
    clients,
    publications,
    exhibitions,
    lectures,
    partners,
    brands,
    experience,
    contact
  };
}

async function loadInfoMarkdown() {
  if (!isFullMode()) return;

  const content = await loadInfoMarkdownContent();
  renderDefaultInfoPage(content);
}

function ensureTemporaryInfoPageRendered() {
  if (!isTemporaryWebsiteActive() || hasRenderedTemporaryInfoPage) return;

  hasRenderedTemporaryInfoPage = true;
  renderTemporaryInfoPage(TEMPORARY_INFO_STATIC_CONTENT);
}

function getAbsoluteUrl(path) {
  return new URL(path, SITE_URL).href;
}

function slugify(value, fallback = "item") {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function parseProjectFolderForUrls(folder, fallback = {}) {
  const parts = String(folder || "").split("__");
  const client = parts[0] || fallback.client || "supergroup";
  const projectTitle = parts[1] || fallback.title || "project";

  return {
    clientSlug: slugify(client, "client"),
    projectSlug: slugify(projectTitle, "project")
  };
}

function getImageSlug(asset) {
  return slugify(asset.numericBase || asset.nr || getNumberSegmentFromFile(asset.file), "image");
}

function createIntroSlideItem() {
  return {
    file: "",
    src: "",
    nr: "intro",
    role: "intro",
    assetRole: "intro",
    folder: "supergroup__intro__2026__complex",
    projectIndex: -1,
    assetIndex: -1,
    projectKey: "supergroup__intro__2026__complex",
    projectFolder: "supergroup__intro__2026__complex",
    numericBase: "intro",
    pairSuffix: "",
    sortNumber: -1,
    client: "Supergroup",
    title: "Intro",
    period: "2026",
    year: "2026",
    discipline: "complex",
    disciplineKey: "complex",
    disciplineLabel: "complex",
    clientSlug: "supergroup",
    projectSlug: "intro",
    imageSlug: "intro",
    projectUrlPath: "/project/supergroup/intro",
    imageUrlPath: "/intro",
    projectUrl: getAbsoluteUrl("/project/supergroup/intro"),
    imageUrl: getAbsoluteUrl("/intro"),
    assetFileUrl: "",
    canonicalUrl: getAbsoluteUrl("/intro"),
    descriptor: "supergroup navigating complex environments",
    alt: "Supergroup, navigating complex environments",
    isIntro: true,
    isPair: false,
    pairAssets: [],
    representativeAsset: null
  };
}

function normalizeScopes(siteScope) {
  if (Array.isArray(siteScope)) return siteScope;
  if (typeof siteScope === "string") return siteScope.split("+");
  return [];
}

function getFileExtension(file) {
  const extension = file.split(".").pop();
  return extension ? extension.toLowerCase() : "";
}

function isImageFile(file) {
  return IMAGE_EXTENSIONS.has(getFileExtension(file));
}

function isVideoFile(file) {
  return VIDEO_EXTENSIONS.has(getFileExtension(file));
}

function isGifFile(file) {
  return getFileExtension(file) === "gif";
}

function isMediaFile(file) {
  return isImageFile(file) || isVideoFile(file);
}

function getMediaType(file) {
  if (isVideoFile(file)) return "video";
  if (isImageFile(file)) return "image";
  return "";
}

function parseSlideNumber(nr) {
  const match = String(nr || "").match(/^(\d+)([a-z])?$/i);

  if (!match) {
    return {
      numericBase: String(nr || ""),
      pairSuffix: "",
      sortNumber: Number(nr) || 0
    };
  }

  return {
    numericBase: match[1],
    pairSuffix: match[2] ? match[2].toLowerCase() : "",
    sortNumber: Number(match[1])
  };
}

function getNumberSegmentFromFile(file) {
  return String(file || "").split("__")[0] || "";
}

function getDisciplineFromFolder(folder) {
  const parts = String(folder || "").split("__");
  if (parts.length >= 4) return parts[3];

  const periodPart = parts[2] || "";
  const periodDisciplineMatch = periodPart.match(/_(.+)$/);
  return periodDisciplineMatch ? periodDisciplineMatch[1] : "";
}

function getFilterDisciplineFromFolder(folder) {
  const rawDiscipline = getDisciplineFromFolder(folder);
  return rawDiscipline
    ? rawDiscipline.replace(/-/g, " ").replace(/_/g, " ").trim().toLowerCase()
    : "uncategorized";
}

function mapDiscipline(value) {
  const normalized = String(value || "").trim().toLowerCase();
  const disciplineMap = {
    wayfinding: "spatial",
    digital: "digital",
    spatial: "spatial",
    spacial: "spatial",
    brand: "brand",
    organisational: "organisational",
    organizational: "organisational"
  };

  return disciplineMap[normalized] || "complex";
}

function formatDiscipline(value) {
  const discipline = String(value || "").trim().toLowerCase();
  if (!discipline) return "complex";

  const mappedValues = discipline
    .split("-")
    .map(mapDiscipline)
    .filter(Boolean);

  return mappedValues.length ? mappedValues.join(" & ") : "complex";
}

function toAssetSource(project, asset, projectIndex, assetIndex) {
  const role = asset.role || asset.assetRole || "";
  const file = asset.file || "";
  const src = asset.src || `/assets/work/${project.folder}/${file}`;
  const mediaType = asset.type || asset.mediaType || getMediaType(src || file);
  const numberSegment = getNumberSegmentFromFile(file) || asset.nr;
  const parsedNumber = parseSlideNumber(numberSegment);
  const rawDiscipline = project.discipline || getDisciplineFromFolder(project.folder);
  const disciplineKey = getFilterDisciplineFromFolder(project.folder);
  const urlParts = parseProjectFolderForUrls(project.folder, project);
  const descriptor = asset.descriptor || file
    .replace(/\.[^.]+$/, "")
    .split("__")
    .pop()
    .replace(/-/g, " ");
  const projectUrlPath = `/project/${urlParts.clientSlug}/${urlParts.projectSlug}`;
  const imageUrlPath = `${projectUrlPath}/image/${slugify(parsedNumber.numericBase || numberSegment, "image")}`;

  return {
    ...asset,
    src,
    file,
    type: mediaType,
    mediaType,
    nr: numberSegment,
    role,
    assetRole: role,
    folder: project.folder || "",
    projectKey: project.folder || "",
    projectFolder: project.folder || "",
    projectIndex,
    assetIndex,
    numericBase: parsedNumber.numericBase,
    pairSuffix: parsedNumber.pairSuffix,
    sortNumber: parsedNumber.sortNumber,
    client: project.client || "",
    title: project.title || "",
    period: project.period || "",
    year: project.period || "",
    discipline: formatDiscipline(rawDiscipline),
    disciplineKey,
    disciplineLabel: disciplineKey,
    clientSlug: urlParts.clientSlug,
    projectSlug: urlParts.projectSlug,
    imageSlug: slugify(parsedNumber.numericBase || numberSegment, "image"),
    projectUrlPath,
    imageUrlPath,
    projectUrl: getAbsoluteUrl(projectUrlPath),
    imageUrl: getAbsoluteUrl(imageUrlPath),
    assetFileUrl: getAbsoluteUrl(src),
    canonicalUrl: getAbsoluteUrl(imageUrlPath),
    descriptor,
    alt: asset.alt || [project.client, project.title, descriptor]
      .filter(Boolean)
      .join(" — ")
  };
}

function flattenManifestAssets(manifest) {
  if (!Array.isArray(manifest)) return [];

  if (manifest.some((item) => Array.isArray(item.assets))) {
    return manifest.flatMap((project, projectIndex) => {
      if (!Array.isArray(project.assets)) return [];

      return project.assets.map((asset, assetIndex) => {
        return toAssetSource(project, asset, projectIndex, assetIndex);
      });
    });
  }

  return manifest.map((asset, assetIndex) => {
    const numberSegment = getNumberSegmentFromFile(asset.file) || asset.nr;
    const parsedNumber = parseSlideNumber(numberSegment);
    const rawDiscipline = asset.discipline || getDisciplineFromFolder(asset.folder);
    const disciplineKey = getFilterDisciplineFromFolder(asset.folder);
    const urlParts = parseProjectFolderForUrls(asset.folder, asset);
    const projectUrlPath = `/project/${urlParts.clientSlug}/${urlParts.projectSlug}`;
    const imageSlug = slugify(parsedNumber.numericBase || numberSegment, "image");
    const imageUrlPath = `${projectUrlPath}/image/${imageSlug}`;
    const mediaType = asset.type || asset.mediaType || getMediaType(asset.src || asset.file || "");

    return {
      ...asset,
      type: mediaType,
      mediaType,
      nr: numberSegment,
      role: asset.role || asset.assetRole || "",
      assetRole: asset.assetRole || asset.role || "",
      numericBase: parsedNumber.numericBase,
      pairSuffix: parsedNumber.pairSuffix,
      sortNumber: parsedNumber.sortNumber,
      projectIndex: 0,
      assetIndex,
      projectKey: asset.folder || "",
      projectFolder: asset.folder || "",
      year: asset.period || "",
      discipline: formatDiscipline(rawDiscipline),
      disciplineKey,
      disciplineLabel: disciplineKey,
      clientSlug: urlParts.clientSlug,
      projectSlug: urlParts.projectSlug,
      imageSlug,
      projectUrlPath,
      imageUrlPath,
      projectUrl: getAbsoluteUrl(projectUrlPath),
      imageUrl: getAbsoluteUrl(imageUrlPath),
      assetFileUrl: asset.src ? getAbsoluteUrl(asset.src) : "",
      canonicalUrl: getAbsoluteUrl(imageUrlPath)
    };
  });
}

function filterAndSortAssets(items) {
  return items
    .filter((item) => isMediaFile(item.src || item.file || ""))
    .filter((item) => normalizeScopes(item.siteScope).some((scope) => INCLUDED_SCOPES.has(scope)))
    .sort((a, b) => {
      if (a.projectIndex !== b.projectIndex) return a.projectIndex - b.projectIndex;

      const nrDifference = a.sortNumber - b.sortNumber;
      if (nrDifference !== 0) return nrDifference;

      const suffixDifference = getPairSuffixOrder(a.pairSuffix) - getPairSuffixOrder(b.pairSuffix);
      if (suffixDifference !== 0) return suffixDifference;

      return a.assetIndex - b.assetIndex;
    });
}

function getPairSuffixOrder(suffix) {
  if (suffix === "a") return 0;
  if (suffix === "b") return 1;
  return 2;
}

function getPairKey(asset) {
  return `${asset.projectIndex}::${asset.folder || ""}::${asset.numericBase}`;
}

function createSingleSlideItem(asset) {
  return {
    ...asset,
    projectKey: asset.projectKey || asset.folder || "",
    projectFolder: asset.projectFolder || asset.folder || "",
    isPair: false,
    pairAssets: [asset],
    representativeAsset: asset
  };
}

function createPairSlideItem(assetA, assetB) {
  return {
    ...assetA,
    isPair: true,
    pairAssets: [assetA, assetB],
    representativeAsset: assetA,
    role: assetA.role || assetB.role,
    assetRole: assetA.assetRole || assetB.assetRole,
    projectKey: assetA.projectKey || assetA.folder || "",
    projectFolder: assetA.projectFolder || assetA.folder || "",
    descriptor: [assetA.descriptor, assetB.descriptor]
      .filter(Boolean)
      .join(" / "),
    alt: [assetA.alt, assetB.alt]
      .filter(Boolean)
      .join(" and ")
  };
}

function buildSlideshowItems(assets) {
  const groupedAssets = new Map();
  const normalItems = [];

  assets.forEach((asset) => {
    if (asset.mediaType === "image" && (asset.pairSuffix === "a" || asset.pairSuffix === "b")) {
      const key = getPairKey(asset);
      const group = groupedAssets.get(key) || { a: [], b: [], extras: [] };

      group[asset.pairSuffix].push(asset);
      groupedAssets.set(key, group);
      return;
    }

    normalItems.push(createSingleSlideItem(asset));
  });

  groupedAssets.forEach((group) => {
    if (group.a.length && group.b.length) {
      normalItems.push(createPairSlideItem(group.a[0], group.b[0]));

      group.a.slice(1).forEach((asset) => normalItems.push(createSingleSlideItem(asset)));
      group.b.slice(1).forEach((asset) => normalItems.push(createSingleSlideItem(asset)));
      group.extras.forEach((asset) => normalItems.push(createSingleSlideItem(asset)));
      return;
    }

    group.a.forEach((asset) => normalItems.push(createSingleSlideItem(asset)));
    group.b.forEach((asset) => normalItems.push(createSingleSlideItem(asset)));
    group.extras.forEach((asset) => normalItems.push(createSingleSlideItem(asset)));
  });

  return normalItems.sort((a, b) => {
    if (a.projectIndex !== b.projectIndex) return a.projectIndex - b.projectIndex;

    const nrDifference = a.sortNumber - b.sortNumber;
    if (nrDifference !== 0) return nrDifference;

    const suffixDifference = getPairSuffixOrder(a.pairSuffix) - getPairSuffixOrder(b.pairSuffix);
    if (suffixDifference !== 0) return suffixDifference;

    return a.assetIndex - b.assetIndex;
  });
}

function getLayoutRole(assetRole) {
  if (CONTAINED_ROLES.has(assetRole)) return "slide-contained";
  if (FULLSCREEN_ROLES.has(assetRole)) return "slide-fullscreen";
  return "slide-fullscreen";
}

function resetSlideClasses(slide) {
  slide.classList.remove("active", "enter-next", "exit-next", "enter-prev", "exit-prev");
}

function updateDocumentBackground() {
  const activeSlide = slides[currentIndex];
  const color = activeSlide ? activeSlide.style.getPropertyValue("--slide-bg") : FALLBACK_BACKGROUND;
  document.body.style.backgroundColor = color || FALLBACK_BACKGROUND;
}

function formatMetadataValue(value) {
  return String(value || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatMachineLabel(value, options = {}) {
  const label = String(value || "")
    .replace(/\.[^.]+$/, "")
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .trim();

  if (options.titleCase) return formatMetadataValue(label);
  return label.toLowerCase();
}

function parseFolderDisplayData(folder, fallback = {}) {
  const parts = String(folder || "").split("__");
  const client = parts[0] || fallback.client || "Supergroup";
  const projectTitle = parts[1] || fallback.title || "Supergroup";
  const periodPart = parts[2] || fallback.period || "";
  const periodPieces = String(periodPart).split("_");
  const period = periodPieces[0] || periodPart;
  const xValue = parts.length >= 4
    ? parts[parts.length - 1]
    : periodPieces[1] || "work";

  return {
    client: formatMachineLabel(client, { titleCase: true }),
    projectTitle: formatMachineLabel(projectTitle, { titleCase: true }),
    period,
    x: formatMachineLabel(xValue)
  };
}

function getDescriptorFromFile(file, fallback = "") {
  const stem = String(file || "").replace(/\.[^.]+$/, "");
  const parts = stem.split("__");
  return parts.length >= 4 ? parts.slice(3).join("__") : fallback;
}

function getAssetDescription(asset) {
  const representative = asset.representativeAsset || asset;
  const descriptor = getDescriptorFromFile(
    representative.file,
    representative.descriptor ? String(representative.descriptor).replace(/\s+/g, "-") : ""
  );

  return formatMachineLabel(descriptor);
}

function clearDisciplineAnimation() {
  disciplineAnimationTimers.forEach((timer) => window.clearTimeout(timer));
  disciplineAnimationTimers = [];
  disciplineWord.classList.remove("is-leaving", "is-entering");
}

function updateDisciplineTitle(asset, fallbackDiscipline = "complex") {
  const representative = asset ? asset.representativeAsset || asset : null;
  const discipline = representative
    ? representative.discipline || asset.discipline || fallbackDiscipline
    : fallbackDiscipline;
  const currentDiscipline = disciplineWord.textContent.trim();

  if (currentDiscipline === discipline) {
    hasSetDisciplineTitle = true;
    return;
  }

  clearDisciplineAnimation();

  if (!hasSetDisciplineTitle) {
    disciplineWord.textContent = discipline;
    hasSetDisciplineTitle = true;
    return;
  }

  disciplineWord.classList.add("is-leaving");

  disciplineAnimationTimers.push(window.setTimeout(() => {
    disciplineWord.textContent = discipline;
    disciplineWord.classList.remove("is-leaving");
    disciplineWord.classList.add("is-entering");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        disciplineWord.classList.remove("is-entering");
      });
    });
  }, 180));
}

function clearMetadataAnimation() {
  metadataAnimationTimers.forEach((timer) => window.clearTimeout(timer));
  metadataAnimationTimers = [];
  if (metadataPanel.dataset.projectTitle) {
    setProjectMetadata({
      projectTitle: metadataPanel.dataset.projectTitle,
      clientYear: metadataPanel.dataset.clientYear || "Supergroup"
    });
  }
  if (metadataPanel.dataset.assetInfo !== undefined) {
    metadataAssetInfo.textContent = metadataPanel.dataset.assetInfo;
  }
  metadataProjectViewport.querySelectorAll(".metadata-project-block-temp").forEach((node) => node.remove());
  metadataAssetViewport.querySelectorAll(".metadata-asset-temp").forEach((node) => node.remove());
  metadataProjectBlock.classList.remove("is-static-hidden");
  metadataAssetInfo.classList.remove("is-static-hidden");
}

function getMetadataData(asset) {
  const representative = asset.representativeAsset || asset;
  const folderData = parseFolderDisplayData(representative.folder || asset.folder, {
    client: representative.client || asset.client,
    title: representative.title || asset.title,
    period: representative.period || asset.period
  });
  const secondLine = [
    `${folderData.x} for ${folderData.client}`,
    folderData.period
  ].filter(Boolean).join(", ");

  return {
    folder: representative.folder || asset.folder || "",
    projectTitle: folderData.projectTitle,
    clientYear: secondLine || "work for Supergroup",
    assetInfo: getAssetDescription(asset)
  };
}

function isMenu2StoryMode() {
  return currentMenu2Version === "v2" || currentMenu2Version === "v3" || currentMenu2Version === "v4";
}

function isMenu2UltraCompactStoryMode() {
  return currentMenu2Version === "v3";
}

function isMenu2InfoBlobStoryMode() {
  return currentMenu2Version === "v4";
}

function getStoryAsset(asset) {
  return asset?.representativeAsset || asset;
}

function getProjectKey(asset) {
  const representative = getStoryAsset(asset);
  return representative?.projectKey || asset?.projectKey || representative?.folder || asset?.folder || "";
}

function getProjectStoryUrls(projectKey) {
  const cacheBust = Date.now();
  const baseUrl = `/assets/work/${projectKey}`;

  return {
    index: `${baseUrl}/index.md?v=${INFO_MARKDOWN_VERSION}&ts=${cacheBust}`,
    project: `${baseUrl}/project.md?v=${INFO_MARKDOWN_VERSION}&ts=${cacheBust}`
  };
}

function parseProjectStoryMarkdown(markdown) {
  const fields = {
    title: "",
    from: "",
    to: "",
    complexity: "",
    complexityShort: "",
    clarity: "",
    clarityShort: "",
    idea: "",
    work: []
  };
  const fieldNames = new Set(["title", "from", "to", "complexity", "complexityshort", "clarity", "clarityshort", "idea", "work"]);
  const fieldAliases = {
    complexityshort: "complexityShort",
    clarityshort: "clarityShort"
  };
  let currentField = "";

  String(markdown || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .forEach((line) => {
      const match = line.match(/^([A-Za-z ]+):\s*(.*)$/);

      if (match && fieldNames.has(match[1].trim().toLowerCase())) {
        currentField = fieldAliases[match[1].trim().toLowerCase()] || match[1].trim().toLowerCase();
        const value = match[2].trim();

        if (currentField === "title") {
          fields.title = value;
        } else if (currentField === "work") {
          if (value) fields.work.push(value);
        } else if (value) {
          fields[currentField] = value;
        }
        return;
      }

      const value = line.trim();
      if (!value || !currentField) return;

      if (currentField === "title") {
        fields.title = [fields.title, value].filter(Boolean).join(" ");
      } else if (currentField === "work") {
        fields.work.push(value.replace(/^-\s*/, ""));
      } else {
        fields[currentField] = [fields[currentField], value].filter(Boolean).join(" ");
      }
    });

  return fields;
}

function getFallbackProjectStory(asset) {
  const representative = getStoryAsset(asset);
  const folderData = parseFolderDisplayData(representative?.folder || asset?.folder, {
    client: representative?.client || asset?.client,
    title: representative?.title || asset?.title,
    period: representative?.period || asset?.period
  });

  return {
    title: folderData.projectTitle,
    from: "",
    to: "",
    complexity: "",
    complexityShort: "",
    clarity: "",
    clarityShort: "",
    idea: "",
    work: []
  };
}

async function fetchProjectStory(projectKey) {
  if (!isFullMode()) return {};
  if (!projectKey) return {};

  if (projectStoryCache.has(projectKey)) {
    console.log("[Menu2 V2] using cached story", projectKey);
    return projectStoryCache.get(projectKey);
  }

  const storyPromise = (async () => {
    const urls = getProjectStoryUrls(projectKey);

    // TEMP DEV NOTE: localhost reads files directly from this workspace; deployed changes need a git push.
    console.log("[Menu2 V2] loading story for", projectKey);
    console.log("[Menu2 V2] trying index.md", urls.index);

    try {
      let response = await fetch(urls.index);

      if (!response.ok) {
        console.log("[Menu2 V2] trying project.md", urls.project);
        response = await fetch(urls.project);
      }

      if (!response.ok) {
        console.warn("[Menu2 V2] story markdown not found", projectKey);
        return {};
      }

      const markdownText = await response.text();
      const parsedStory = parseProjectStoryMarkdown(markdownText);

      console.log("[Menu2 V2] loaded markdown", markdownText);
      console.log("[Menu2 V2] parsed story", parsedStory);

      return parsedStory;
    } catch (error) {
      console.warn("[Menu2 V2] story markdown not found", projectKey);
      return {};
    }
  })();

  projectStoryCache.set(projectKey, storyPromise);
  return storyPromise;
}

function createStorySection(title, text) {
  if (!text) return null;

  const section = document.createElement("section");
  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");

  heading.textContent = title;
  paragraph.textContent = text;
  section.append(heading, paragraph);
  return section;
}

function getProjectImageAssets(folder) {
  const images = [];
  const seenFiles = new Set();

  slideshowAssets.forEach((item) => {
    const assets = item.pairAssets?.length ? item.pairAssets : [getStoryAsset(item)];

    assets.forEach((asset) => {
      if (!asset || asset.folder !== folder || asset.mediaType !== "image") return;
      if (seenFiles.has(asset.file)) return;

      seenFiles.add(asset.file);
      images.push(asset);
    });
  });

  if (!images.length && folder) {
    console.warn("[Menu2 V2] no project images found in manifest", folder);
  }

  return images;
}

function pickProjectStoryImage(folder, preferredRoles, fallbackIndex = 0, excludeFile = "") {
  const images = getProjectImageAssets(folder);
  const roleMatch = images.find((asset) => {
    const role = asset.role || asset.assetRole || "";
    return asset.file !== excludeFile && preferredRoles.includes(role);
  });

  if (roleMatch) return roleMatch;

  return images.find((asset, index) => index >= fallbackIndex && asset.file !== excludeFile)
    || images.find((asset) => asset.file !== excludeFile)
    || null;
}

function createStoryColumn(title, text, imageAsset) {
  const section = document.createElement("section");
  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");

  section.className = "menu2-story-column";

  if (imageAsset) {
    const image = document.createElement("img");
    image.className = "menu2-story-image";
    image.src = imageAsset.src;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    section.append(image);
  }

  heading.textContent = title;
  paragraph.textContent = text || "";
  section.append(heading, paragraph);
  return section;
}

function normalizeStorySentence(text) {
  return String(text || "").trim().replace(/[.;:\s]+$/g, "");
}

function combineStoryContext(story) {
  const complexity = normalizeStorySentence(story.complexityShort || story.complexity);
  const clarity = normalizeStorySentence(story.clarityShort || story.clarity);

  if (complexity && clarity) return `${complexity}; ${clarity}.`;
  if (complexity) return `${complexity}.`;
  if (clarity) return `${clarity}.`;
  return "";
}

function formatV4Discipline(asset) {
  const representative = getStoryAsset(asset);
  const folder = representative?.folder || asset?.folder || "";
  const parts = String(folder || "").split("__");
  const discipline = parts.length >= 4 ? parts[parts.length - 1] : representative?.discipline || asset?.discipline || "";

  return String(discipline || "")
    .split("-")
    .map((part) => formatMachineLabel(part))
    .filter(Boolean)
    .join(" & ");
}

function formatV4Client(asset) {
  const representative = getStoryAsset(asset);
  const folder = representative?.folder || asset?.folder || "";
  const client = String(folder || "").split("__")[0] || representative?.client || asset?.client || "Supergroup";

  return formatMachineLabel(client, { titleCase: true })
    .replace(/\bNdsm\b/g, "NDSM")
    .replace(/\bNDSM Werf\b/g, "NDSM-Werf");
}

function createV4TransformationText(story) {
  const fromText = normalizeStorySentence(story.from || story.complexityShort || story.complexity);
  const toText = normalizeStorySentence(story.to || story.clarityShort || story.clarity);

  if (fromText && toText) return `From ${fromText}\nTo ${toText}`;
  if (fromText) return `From ${fromText}.`;
  if (toText) return `To ${toText}.`;
  return "";
}

function createV4FromLine(story) {
  const fromText = normalizeStorySentence(story.from || story.complexityShort || story.complexity);
  return fromText ? `From ${fromText}` : "";
}

function createV4ToLine(story) {
  const toText = normalizeStorySentence(story.to || story.clarityShort || story.clarity);
  return toText ? `To ${toText}` : "";
}

function createMenu2StoryElement(story, asset) {
  const representative = getStoryAsset(asset);
  const folder = representative?.folder || asset?.folder || "";
  const folderData = parseFolderDisplayData(folder, {
    client: representative?.client || asset?.client,
    title: representative?.title || asset?.title,
    period: representative?.period || asset?.period
  });
  const storyElement = document.createElement("div");
  const header = document.createElement("header");
  const title = document.createElement("h2");
  const meta = document.createElement("p");
  const columns = document.createElement("div");
  const complexityText = story.complexityShort || story.complexity || "";
  const clarityText = story.clarityShort || story.clarity || "";
  const complexityImage = pickProjectStoryImage(folder, ["reference", "study", "process"], 0);
  const clarityImage = pickProjectStoryImage(folder, ["diagram", "system", "result"], 1, complexityImage?.file || "");
  const item = createStorySection("Item", getAssetDescription(asset));
  const itemCaption = item?.querySelector("p");

  storyElement.className = "menu2-story menu2-story-v2";
  storyElement.dataset.folder = folder;
  header.className = "menu2-story-header";
  title.className = "menu2-story-title";
  title.textContent = folderData.projectTitle;
  meta.className = "menu2-story-meta";
  meta.textContent = [
    `${folderData.x} for ${folderData.client}`,
    folderData.period
  ].filter(Boolean).join(", ");
  header.append(title, meta);
  columns.className = "menu2-story-columns";
  columns.append(
    createStoryColumn("Complexity", complexityText, complexityImage),
    createStoryColumn("Clarity", clarityText, clarityImage)
  );
  storyElement.append(header, columns);

  if (item && itemCaption) {
    item.classList.add("menu2-story-item", "menu2-item");
    itemCaption.className = "menu2-item-caption";
    storyElement.append(item);
  }

  return storyElement;
}

function createMenu2StoryV3Element(story, asset) {
  const representative = getStoryAsset(asset);
  const folder = representative?.folder || asset?.folder || "";
  const folderData = parseFolderDisplayData(folder, {
    client: representative?.client || asset?.client,
    title: representative?.title || asset?.title,
    period: representative?.period || asset?.period
  });
  const storyElement = document.createElement("div");
  const header = document.createElement("header");
  const title = document.createElement("h2");
  const meta = document.createElement("p");
  const context = document.createElement("p");
  const item = createStorySection("Item", getAssetDescription(asset));
  const itemCaption = item?.querySelector("p");

  storyElement.className = "menu2-story menu2-story-v3";
  storyElement.dataset.folder = folder;
  header.className = "menu2-story-header";
  title.className = "menu2-story-title";
  title.textContent = folderData.projectTitle;
  meta.className = "menu2-story-meta";
  meta.textContent = [
    `${folderData.x} for ${folderData.client}`,
    folderData.period
  ].filter(Boolean).join(", ");
  context.className = "menu2-story-context";
  context.textContent = combineStoryContext(story);
  header.append(title, meta);
  storyElement.append(header, context);

  if (item && itemCaption) {
    item.classList.add("menu2-story-item", "menu2-item");
    itemCaption.className = "menu2-item-caption";
    storyElement.append(item);
  }

  return storyElement;
}

function setMenu2V4BlobOpen(storyElement, isOpen) {
  const button = storyElement.querySelector(".menu2-v4-info-button");
  const blob = storyElement.querySelector(".menu2-v4-blob");
  if (!button || !blob) return;

  blob.classList.remove("opens-up", "opens-down");

  if (isOpen) {
    const rect = metadataPanel.getBoundingClientRect();
    const opensDown = rect.top + rect.height / 2 < window.innerHeight / 2;
    blob.classList.add(opensDown ? "opens-down" : "opens-up");
  }

  button.classList.toggle("is-active", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  blob.classList.toggle("is-open", isOpen);
}

function closeMenu2V4Blob() {
  const storyElement = menu2SlideshowMode.querySelector(".menu2-story-v4");
  if (storyElement) setMenu2V4BlobOpen(storyElement, false);
}

function getMenu2StoryVersionLabel() {
  if (isMenu2InfoBlobStoryMode()) return "V4";
  if (isMenu2UltraCompactStoryMode()) return "V3";
  return "V2";
}

function createMenu2StoryElementForVersion(story, asset) {
  if (isMenu2InfoBlobStoryMode()) return createMenu2StoryV4Element(story, asset);
  if (isMenu2UltraCompactStoryMode()) return createMenu2StoryV3Element(story, asset);
  return createMenu2StoryElement(story, asset);
}

function createMenu2StoryV4Element(story, asset) {
  if (asset?.isIntro) return createMenu2StoryV4IntroElement();

  const representative = getStoryAsset(asset);
  const folder = representative?.folder || asset?.folder || "";
  const folderData = parseFolderDisplayData(folder, {
    client: representative?.client || asset?.client,
    title: representative?.title || asset?.title,
    period: representative?.period || asset?.period
  });
  const storyElement = document.createElement("div");
  const transform = document.createElement("div");
  const fromLine = document.createElement("div");
  const toLine = document.createElement("div");
  const project = document.createElement("div");
  const title = document.createElement("div");
  const meta = document.createElement("div");
  const infoButton = document.createElement("button");
  const blob = document.createElement("div");

  storyElement.className = "menu2-story menu2-story-v4";
  storyElement.dataset.folder = folder;
  transform.className = "menu2-v4-transform";
  fromLine.textContent = createV4FromLine(story);
  toLine.textContent = createV4ToLine(story);
  transform.append(fromLine, toLine);
  project.className = "menu2-v4-project";
  title.className = "menu2-v4-title";
  title.textContent = story.title || folderData.projectTitle;
  meta.className = "menu2-v4-meta";
  meta.textContent = `${formatV4Discipline(asset)} for ${formatV4Client(asset)}`;
  infoButton.className = "menu2-v4-info-button";
  infoButton.type = "button";
  infoButton.setAttribute("aria-label", "More project information");
  infoButton.setAttribute("aria-expanded", "false");
  infoButton.textContent = "ⓘ";
  blob.className = "menu2-v4-blob";
  blob.textContent = "More information coming soon.";
  infoButton.addEventListener("click", () => {
    setMenu2V4BlobOpen(storyElement, !blob.classList.contains("is-open"));
  });
  project.append(title, meta);
  storyElement.append(transform, project, infoButton, blob);
  return storyElement;
}

function createMenu2StoryV4IntroElement() {
  const storyElement = document.createElement("div");
  const transformation = document.createElement("div");
  const fromLine = document.createElement("div");
  const toLine = document.createElement("div");
  const intro = document.createElement("div");

  storyElement.className = "menu2-story menu2-story-v4 menu2-story-v4-intro";
  storyElement.dataset.folder = "supergroup__intro__2026__complex";
  transformation.className = "menu2-v4-transform";
  fromLine.textContent = "From complexity";
  toLine.textContent = "To clarity";
  transformation.append(fromLine, toLine);
  intro.className = "menu2-v4-intro";
  intro.textContent = "Across culture, strategy, organisation, information and design.";
  storyElement.append(transformation, intro);
  return storyElement;
}

function ensureMenu2StoryViewport() {
  let viewport = menu2SlideshowMode.querySelector(".menu2-story-viewport");

  if (!viewport) {
    viewport = document.createElement("div");
    viewport.className = "menu2-story-viewport";
    menu2SlideshowMode.append(viewport);
  }

  return viewport;
}

function setMenu2V1Visible(isVisible) {
  metadataProjectViewport.hidden = !isVisible;
  metadataAssetViewport.hidden = !isVisible;
  menu2SlideshowMode.classList.toggle("is-story-mode", !isVisible);
  menu2SlideshowMode.classList.toggle("is-story-v2", !isVisible && currentMenu2Version === "v2");
  menu2SlideshowMode.classList.toggle("is-story-v3", !isVisible && currentMenu2Version === "v3");
  menu2SlideshowMode.classList.toggle("is-story-v4", !isVisible && currentMenu2Version === "v4");
  metadataPanel.classList.toggle("is-story-mode", !isVisible);
  metadataPanel.classList.toggle("is-story-v2", !isVisible && currentMenu2Version === "v2");
  metadataPanel.classList.toggle("is-story-v3", !isVisible && currentMenu2Version === "v3");
  metadataPanel.classList.toggle("is-story-v4", !isVisible && currentMenu2Version === "v4");

  if (isVisible) {
    const viewport = menu2SlideshowMode.querySelector(".menu2-story-viewport");
    if (viewport) viewport.textContent = "";
    currentMenu2StoryProjectKey = null;
    menu2SlideshowMode.classList.remove("is-story-v2", "is-story-v3", "is-story-v4");
    metadataPanel.classList.remove("is-story-v2", "is-story-v3", "is-story-v4");
  }
}

function updateMenu2StoryItem(asset, direction = "forward") {
  const caption = menu2SlideshowMode.querySelector(".menu2-item-caption");
  if (!caption) return;

  const nextText = getAssetDescription(asset);
  if (caption.textContent === nextText) return;

  const normalizedDirection = normalizeMetadataDirection(direction);
  caption.classList.remove(
    "item-enter-forward",
    "item-enter-backward",
    "item-exit-forward",
    "item-exit-backward",
    "is-active"
  );
  caption.classList.add(`item-exit-${normalizedDirection}`);

  metadataAnimationTimers.push(window.setTimeout(() => {
    caption.textContent = nextText;
    caption.classList.remove(`item-exit-${normalizedDirection}`);
    caption.classList.add(`item-enter-${normalizedDirection}`);
    void caption.offsetWidth;

    window.requestAnimationFrame(() => {
      caption.classList.add("is-active");
    });

    metadataAnimationTimers.push(window.setTimeout(() => {
      caption.classList.remove(`item-enter-${normalizedDirection}`, "is-active");
    }, 220));
  }, 160));
}

async function updateMenu2Story(direction = "forward", options = {}) {
  if (!isFullMode()) return;

  const asset = slideshowAssets[currentIndex];
  if (!asset) return;

  setMenu2V1Visible(false);
  const viewport = ensureMenu2StoryViewport();
  const projectKey = getProjectKey(asset);
  const previousProjectKey = currentMenu2StoryProjectKey;
  const shouldAnimate = options.animate !== false && Boolean(previousProjectKey) && previousProjectKey !== projectKey;
  const storyVersion = getMenu2StoryVersionLabel();

  console.log(`[Menu2 ${storyVersion}] slide changed`, {
    index: currentIndex,
    projectKey,
    previousProjectKey
  });

  if (previousProjectKey === projectKey && viewport.querySelector(".menu2-story")) {
    console.log(`[Menu2 ${storyVersion}] updating item only`);
    if (!isMenu2InfoBlobStoryMode()) updateMenu2StoryItem(asset, direction);
    metadataPanel.dataset.storyItem = getAssetDescription(asset);
    return;
  }

  console.log(`[Menu2 ${storyVersion}] updating full story`);
  if (isMenu2InfoBlobStoryMode()) closeMenu2V4Blob();
  currentMenu2StoryProjectKey = projectKey;
  metadataPanel.dataset.storyFolder = projectKey;
  metadataPanel.dataset.storyItem = getAssetDescription(asset);

  const requestToken = projectStoryRequestToken + 1;
  projectStoryRequestToken = requestToken;
  const fallbackStory = getFallbackProjectStory(asset);
  const renderStory = (story, shouldAnimateStory = shouldAnimate) => {
    const incoming = createMenu2StoryElementForVersion(story, asset);
    const outgoing = viewport.querySelector(".menu2-story");

    if (!outgoing || !shouldAnimateStory) {
      viewport.textContent = "";
      viewport.append(incoming);
      return;
    }

    const normalizedDirection = normalizeMetadataDirection(direction);
    incoming.classList.add(`story-enter-${normalizedDirection}`);
    outgoing.classList.add("is-active", `story-exit-${normalizedDirection}`);
    viewport.append(incoming);
    void incoming.offsetWidth;

    window.requestAnimationFrame(() => {
      incoming.classList.add("is-active");
    });

    metadataAnimationTimers.push(window.setTimeout(() => {
      outgoing.remove();
      incoming.classList.remove(`story-enter-${normalizedDirection}`, "is-active");
    }, 420));
  };

  renderStory(fallbackStory);

  const fetchedStory = await fetchProjectStory(projectKey);
  if (requestToken !== projectStoryRequestToken || currentMenu2StoryProjectKey !== projectKey) return;

  const story = {
    ...fallbackStory,
    ...fetchedStory,
    title: fetchedStory.title || fallbackStory.title
  };
  renderStory(story, false);
}

function setProjectMetadata(data) {
  metadataProjectBlock.classList.remove("is-intro-metadata");
  metadataProjectBlock.querySelector(".metadata-intro-symbol")?.remove();
  metadataProjectTitle.textContent = data.projectTitle;
  metadataProjectClient.textContent = data.clientYear;
}

function setIntroMetadata() {
  metadataProjectBlock.classList.add("is-intro-metadata");
  metadataProjectTitle.textContent = "";
  metadataProjectClient.textContent = "";

  if (!metadataProjectBlock.querySelector(".metadata-intro-symbol")) {
    const symbol = document.createElement("img");
    symbol.className = "metadata-intro-symbol";
    symbol.src = "/assets/supergroup/supergroup-symbol-long.svg";
    symbol.alt = "Supergroup";
    metadataProjectBlock.append(symbol);
  }
}

function createProjectMetadataBlock(data) {
  const block = document.createElement("div");
  const title = document.createElement("p");
  const client = document.createElement("p");

  block.className = "metadata-project-block metadata-project-block-temp";
  title.className = "metadata-title";
  client.className = "metadata-client";
  title.textContent = data.projectTitle;
  client.textContent = data.clientYear;
  block.append(title, client);
  return block;
}

function createAssetMetadataLine(data) {
  const line = document.createElement("p");
  line.className = "metadata-asset metadata-asset-temp";
  line.textContent = data.assetInfo;
  return line;
}

function getCurrentMetadataData() {
  return {
    folder: metadataPanel.dataset.folder || "",
    projectTitle: metadataProjectTitle.textContent || "Supergroup",
    clientYear: metadataProjectClient.textContent || "Supergroup",
    assetInfo: metadataAssetInfo.textContent || ""
  };
}

function normalizeMetadataDirection(direction) {
  return direction === "backward" || direction === "prev" ? "backward" : "forward";
}

function animateProjectMetadata(data, direction) {
  const normalizedDirection = normalizeMetadataDirection(direction);
  const outgoing = createProjectMetadataBlock(getCurrentMetadataData());
  const incoming = createProjectMetadataBlock(data);
  const exitClass = `project-exit-${normalizedDirection}`;
  const enterClass = `project-enter-${normalizedDirection}`;

  outgoing.classList.add("is-active");
  incoming.classList.add(enterClass);
  metadataProjectBlock.classList.add("is-static-hidden");
  metadataProjectViewport.append(outgoing, incoming);
  void incoming.offsetWidth;

  window.requestAnimationFrame(() => {
    outgoing.classList.add(exitClass);
    incoming.classList.add("is-active");
  });

  metadataAnimationTimers.push(window.setTimeout(() => {
    setProjectMetadata(data);
    metadataProjectBlock.classList.remove("is-static-hidden");
    outgoing.remove();
    incoming.remove();
  }, 420));
}

function animateAssetMetadata(data, direction) {
  const normalizedDirection = normalizeMetadataDirection(direction);
  const outgoing = createAssetMetadataLine(getCurrentMetadataData());
  const incoming = createAssetMetadataLine(data);
  const exitClass = `asset-exit-${normalizedDirection}`;
  const enterClass = `asset-enter-${normalizedDirection}`;

  outgoing.classList.add("is-active");
  incoming.classList.add(enterClass);
  metadataAssetInfo.classList.add("is-static-hidden");
  metadataAssetViewport.append(outgoing, incoming);
  void incoming.offsetWidth;

  window.requestAnimationFrame(() => {
    outgoing.classList.add(exitClass);
    incoming.classList.add("is-active");
  });

  metadataAnimationTimers.push(window.setTimeout(() => {
    metadataAssetInfo.textContent = data.assetInfo;
    metadataAssetInfo.classList.remove("is-static-hidden");
    outgoing.remove();
    incoming.remove();
  }, 420));
}

function updateMetadataMenu(direction = "forward", options = {}) {
  if (!isFullMode()) return;

  const asset = slideshowAssets[currentIndex];
  if (!asset) return;

  if (isMenu2StoryMode()) {
    updateMenu2Story(direction, options);
    if (currentView === "slideshow") updateDisciplineTitle(asset);
    return;
  }

  if (asset.isIntro) {
    clearMetadataAnimation();
    setIntroMetadata();
    metadataAssetInfo.textContent = "";
    metadataPanel.dataset.folder = asset.folder || "supergroup-intro";
    metadataPanel.dataset.projectTitle = "";
    metadataPanel.dataset.clientYear = "";
    metadataPanel.dataset.assetInfo = "";
    if (currentView === "slideshow") updateDisciplineTitle(asset);
    return;
  }

  const data = getMetadataData(asset);
  const previousFolder = metadataPanel.dataset.folder || "";
  const previousAssetInfo = metadataPanel.dataset.assetInfo || "";
  const shouldAnimate = options.animate !== false && Boolean(previousFolder);

  clearMetadataAnimation();

  if (!shouldAnimate) {
    setProjectMetadata(data);
    metadataAssetInfo.textContent = data.assetInfo;
  } else if (previousFolder !== data.folder) {
    animateProjectMetadata(data, direction);
    animateAssetMetadata(data, direction);
  } else if (previousAssetInfo !== data.assetInfo) {
    animateAssetMetadata(data, direction);
  }

  metadataPanel.dataset.folder = data.folder;
  metadataPanel.dataset.projectTitle = data.projectTitle;
  metadataPanel.dataset.clientYear = data.clientYear;
  metadataPanel.dataset.assetInfo = data.assetInfo;
  if (currentView === "slideshow") updateDisciplineTitle(asset);
}

function getCanonicalElement() {
  return document.querySelector("link[rel='canonical']");
}

function setCanonicalUrl(url) {
  const canonical = getCanonicalElement();
  if (canonical) canonical.href = url;
}

function replaceBrowserPath(path, state = {}) {
  if (!window.history || !window.history.replaceState) return;

  const nextPath = path || "/";
  const currentPath = `${window.location.pathname}${window.location.search}`;
  if (currentPath === nextPath) return;

  window.history.replaceState(state, "", nextPath);
}

function getCurrentSlideAsset() {
  return slideshowAssets[currentIndex] || null;
}

function updateBrowserUrlForView(view) {
  if (view === "info") {
    setCanonicalUrl(getAbsoluteUrl("/info"));
    replaceBrowserPath("/info", { view: "info" });
    return;
  }

  if (view === "grid") {
    setCanonicalUrl(getAbsoluteUrl("/grid"));
    replaceBrowserPath("/grid", { view: "grid" });
    return;
  }

  const asset = getCurrentSlideAsset();
  const path = asset ? asset.imageUrlPath : "/";
  const url = asset ? asset.imageUrl : getAbsoluteUrl("/");
  setCanonicalUrl(url);
  replaceBrowserPath(path, { view: "slideshow", index: currentIndex });
}

function parseRouteFromLocation() {
  const redirectedPath = getRedirectedRoutePath();
  const routeUrl = redirectedPath ? new URL(redirectedPath, window.location.origin) : window.location;
  const path = routeUrl.pathname.replace(/\/+$/, "") || "/";
  const params = new URLSearchParams(routeUrl.search);
  const queryView = params.get("view");
  const imageMatch = path.match(/^\/project\/([^/]+)\/([^/]+)\/image\/([^/]+)$/);
  const projectMatch = path.match(/^\/project\/([^/]+)\/([^/]+)$/);

  if (path === "/intro") {
    return {
      view: "slideshow",
      clientSlug: "supergroup",
      projectSlug: "intro",
      imageSlug: "intro"
    };
  }

  if (imageMatch) {
    return {
      view: "slideshow",
      clientSlug: imageMatch[1],
      projectSlug: imageMatch[2],
      imageSlug: imageMatch[3]
    };
  }

  if (projectMatch) {
    return {
      view: "slideshow",
      clientSlug: projectMatch[1],
      projectSlug: projectMatch[2]
    };
  }

  if (path === "/info" || queryView === "info") return { view: "info" };
  if (path === "/grid" || queryView === "grid") return { view: "grid" };
  return { view: "slideshow" };
}

function getRedirectedRoutePath() {
  try {
    const redirectedPath = window.sessionStorage.getItem("supergroupRedirectPath");
    if (redirectedPath) window.sessionStorage.removeItem("supergroupRedirectPath");
    return redirectedPath;
  } catch (error) {
    return "";
  }
}

function findSlideIndexForRoute(route) {
  if (!route || !route.projectSlug) return -1;

  return slideshowAssets.findIndex((asset) => {
    const representative = asset.representativeAsset || asset;
    return (
      representative.clientSlug === route.clientSlug &&
      representative.projectSlug === route.projectSlug &&
      (!route.imageSlug || representative.imageSlug === route.imageSlug)
    );
  });
}

function applyRoute(route, options = {}) {
  if (!slides.length) return;

  const shouldUpdateUrl = options.updateUrl !== false;

  if (route.view === "info" || route.view === "grid") {
    setView(route.view, { focus: false, updateUrl: shouldUpdateUrl });
    return;
  }

  const routeIndex = findSlideIndexForRoute(route);
  if (routeIndex >= 0) {
    jumpToSlide(routeIndex, AUTOPLAY_DELAY, { updateUrl: shouldUpdateUrl });
    return;
  }

  setView("slideshow", { focus: false, updateUrl: shouldUpdateUrl });
}

function getMenu2ModeElement(mode) {
  if (mode === "info") return menu2InfoMode;
  if (mode === "grid") return menu2GridMode;
  return menu2SlideshowMode;
}

function setMenu2Mode(mode, options = {}) {
  const nextMode = mode || "slideshow";
  const shouldAnimate = options.animate !== false;
  const currentModeElement = getMenu2ModeElement(currentMenu2Mode);
  const nextModeElement = getMenu2ModeElement(nextMode);

  if (currentMenu2Mode === nextMode) {
    nextModeElement.classList.add("is-current");
    return;
  }

  currentMenu2Mode = nextMode;

  if (!shouldAnimate) {
    currentModeElement.classList.remove("is-current", "is-exiting");
    nextModeElement.classList.add("is-current");
    return;
  }

  currentModeElement.classList.add("is-exiting");
  nextModeElement.classList.remove("is-exiting");
  void nextModeElement.offsetWidth;
  nextModeElement.classList.add("is-current");

  metadataAnimationTimers.push(window.setTimeout(() => {
    currentModeElement.classList.remove("is-current", "is-exiting");
  }, 420));
}

function renderTemporaryNotice() {
  menu2SlideshowMode.textContent = "";
  menu2SlideshowMode.classList.remove("is-story-mode");

  const notice = document.createElement("div");
  const text = document.createElement("p");
  const contactLink = document.createElement("a");

  notice.className = "temporary-notice";
  text.append(
    "We are currently updating our website.",
    document.createElement("br"),
    document.createElement("br"),
    "For inquiries, collaborations or project requests, please "
  );
  contactLink.href = `mailto:${TEMPORARY_CONTACT_EMAIL}`;
  contactLink.textContent = TEMPORARY_NOTICE_LINK_LABEL;
  text.append(contactLink);
  notice.append(text);
  menu2SlideshowMode.append(notice);
}

function applyTemporaryWebsiteMode() {
  document.body.classList.add("temporary-website", "temporary-v1", "is-slideshow-view");
  document.body.classList.remove("is-info-view", "is-grid-view");
  slideshow.setAttribute("aria-label", "Supergroup temporary homepage");
  slideshow.classList.remove("loading");
  slideshow.removeAttribute("aria-live");
  isSlideshowPaused = true;
  currentView = "slideshow";
  currentIndex = 0;

  clearSlideTiming();
  pauseAllSlideVideos();
  slides.forEach(resetSlideClasses);
  if (slides[0]) slides[0].classList.add("active");

  contactSheetOverlay.classList.remove("visible");
  contactSheetOverlay.setAttribute("aria-hidden", "true");
  aboutOverlay.classList.remove("visible");
  aboutOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
  metadataPanel.classList.remove("is-story-mode", "is-story-v3", "is-story-v4");
  setMenu2V1Visible(true);
  renderTemporaryNotice();
  setMenu2Mode("slideshow", { animate: false });
  updateDisciplineTitle(slideshowAssets[0], "complex");
  if (slides.length) {
    updateDocumentBackground();
  } else {
    document.body.style.backgroundColor = "#000";
  }
  syncViewButtons();
  syncTemporaryHomepageEffects();
  replaceBrowserPath("/", { view: "slideshow", mode: "temporary" });
  setCanonicalUrl(getAbsoluteUrl("/"));
}

function shouldRunTemporaryHomepageEffect() {
  return (
    isTemporaryWebsiteActive() &&
    currentView === "slideshow" &&
    !document.hidden &&
    !reducedMotionQuery.matches
  );
}

function shouldRunTemporaryLogoParticles() {
  return (
    shouldRunTemporaryHomepageEffect() &&
    window.matchMedia("(max-width: 768px)").matches &&
    !reducedMotionQuery.matches
  );
}

function syncTemporaryHomepageEffects() {
  syncTemporaryLogoParticles();
  syncTemporaryFloatingFavicon();
}

function syncTemporaryLogoParticles() {
  if (shouldRunTemporaryLogoParticles()) {
    if (!temporaryLogoParticleController) {
      temporaryLogoParticleController = createTemporaryLogoParticleController();
    }
    temporaryLogoParticleController.start();
    return;
  }

  if (temporaryLogoParticleController) temporaryLogoParticleController.stop();
}

function syncTemporaryFloatingFavicon() {
  if (shouldRunTemporaryHomepageEffect()) {
    if (!temporaryFloatingFaviconController) {
      temporaryFloatingFaviconController = createTemporaryFloatingFaviconController();
    }
    temporaryFloatingFaviconController.start();
    return;
  }

  if (temporaryFloatingFaviconController) temporaryFloatingFaviconController.stop();
}

function createTemporaryLogoParticleController() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const particles = [];
  let animationFrame = 0;
  let isRunning = false;
  let isLoaded = false;
  let width = 0;
  let height = 0;
  let settledAt = 0;
  let startToken = 0;
  let logoViewBox = { x: 0, y: 0, width: 841.9, height: 405.9 };
  const pointer = {
    x: 0,
    y: 0,
    isActive: false
  };

  svg.classList.add("temporary-logo-particles");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  document.body.append(svg);

  function parseViewBox(value) {
    const parts = String(value || "")
      .trim()
      .split(/\s+/)
      .map(Number);

    if (parts.length !== 4 || parts.some((part) => !Number.isFinite(part))) return logoViewBox;

    return {
      x: parts[0],
      y: parts[1],
      width: parts[2],
      height: parts[3]
    };
  }

  async function loadLogoParts() {
    if (isLoaded) return;

    try {
      const response = await fetch(FLOCKING_LOGO_URL);
      if (!response.ok) throw new Error(`Logo failed: ${response.status}`);

      const markup = await response.text();
      const template = document.createElement("template");
      template.innerHTML = markup.trim();
      const sourceSvg = template.content.querySelector("svg");
      if (!sourceSvg) throw new Error("Logo SVG missing");

      logoViewBox = parseViewBox(sourceSvg.getAttribute("viewBox"));
      sourceSvg.querySelectorAll("path").forEach((path) => {
        const clone = path.cloneNode(true);
        clone.removeAttribute("class");
        clone.setAttribute("fill", "#fff");
        clone.setAttribute("vector-effect", "non-scaling-stroke");
        svg.append(clone);
      });

      isLoaded = true;
    } catch (error) {
      isLoaded = true;
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    seedParticles();
  }

  function seedParticles() {
    if (width <= 0 || height <= 0 || !isLoaded) return;

    particles.length = 0;
    const paths = Array.from(svg.querySelectorAll("path"));
    const scale = Math.min(width * 0.82 / logoViewBox.width, height * 0.42 / logoViewBox.height);
    const offsetX = (width - logoViewBox.width * scale) / 2 - logoViewBox.x * scale;
    const offsetY = height * 0.45 - logoViewBox.height * scale / 2 - logoViewBox.y * scale;

    paths.forEach((path) => {
      let box = null;
      try {
        box = path.getBBox();
      } catch (error) {
        box = { x: 0, y: 0, width: 24, height: 24 };
      }

      const radius = Math.max(18, Math.max(box.width, box.height) * scale * 0.42);
      particles.push({
        element: path,
        x: offsetX,
        y: offsetY,
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
        tx: offsetX,
        ty: offsetY,
        scale,
        box,
        radius
      });
    });

    settledAt = performance.now();
  }

  function getParticleCenter(particle) {
    return {
      x: particle.x + (particle.box.x + particle.box.width / 2) * particle.scale,
      y: particle.y + (particle.box.y + particle.box.height / 2) * particle.scale
    };
  }

  function keepParticleInBounds(particle) {
    const left = particle.x + particle.box.x * particle.scale;
    const right = left + particle.box.width * particle.scale;
    const top = particle.y + particle.box.y * particle.scale;
    const bottom = top + particle.box.height * particle.scale;

    if (left < 0) {
      particle.x -= left;
      particle.vx = Math.abs(particle.vx);
    } else if (right > width) {
      particle.x -= right - width;
      particle.vx = -Math.abs(particle.vx);
    }

    if (top < 0) {
      particle.y -= top;
      particle.vy = Math.abs(particle.vy);
    } else if (bottom > height) {
      particle.y -= bottom - height;
      particle.vy = -Math.abs(particle.vy);
    }
  }

  function step() {
    if (!isRunning) return;

    const now = performance.now();
    const isBreaking = now - settledAt < 900;

    particles.forEach((particle, index) => {
      if (isBreaking) {
        particle.x += (particle.tx - particle.x) * 0.08;
        particle.y += (particle.ty - particle.y) * 0.08;
      } else {
        particle.x += particle.vx;
        particle.y += particle.vy;
      }

      for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
        const other = particles[otherIndex];
        const particleCenter = getParticleCenter(particle);
        const otherCenter = getParticleCenter(other);
        const dx = otherCenter.x - particleCenter.x;
        const dy = otherCenter.y - particleCenter.y;
        const distance = Math.hypot(dx, dy);
        const minDistance = particle.radius + other.radius;
        if (distance <= 0 || distance >= minDistance) continue;

        const nx = dx / distance;
        const ny = dy / distance;
        const overlap = (minDistance - distance) * 0.34;
        particle.x -= nx * overlap;
        particle.y -= ny * overlap;
        other.x += nx * overlap;
        other.y += ny * overlap;
        const impulse = (particle.vx - other.vx) * nx + (particle.vy - other.vy) * ny;
        particle.vx -= impulse * nx * 0.82;
        particle.vy -= impulse * ny * 0.82;
        other.vx += impulse * nx * 0.82;
        other.vy += impulse * ny * 0.82;
      }

      if (pointer.isActive && !isBreaking) {
        const center = getParticleCenter(particle);
        const dx = center.x - pointer.x;
        const dy = center.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = 140;

        if (distance > 0 && distance < radius) {
          const force = (1 - distance / radius) * 1.45;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
      }

      keepParticleInBounds(particle);

      if (!isBreaking) {
        particle.vx = Math.max(-3.2, Math.min(3.2, particle.vx * 0.998));
        particle.vy = Math.max(-3.2, Math.min(3.2, particle.vy * 0.998));
      }

      particle.element.setAttribute("transform", `translate(${particle.x} ${particle.y}) scale(${particle.scale})`);
    });

    animationFrame = window.requestAnimationFrame(step);
  }

  async function start() {
    const token = startToken + 1;
    startToken = token;
    svg.classList.add("is-visible");
    if (isRunning) return;
    await loadLogoParts();
    if (token !== startToken || !shouldRunTemporaryLogoParticles()) return;
    isRunning = true;
    resize();
    animationFrame = window.requestAnimationFrame(step);
  }

  function stop() {
    startToken += 1;
    svg.classList.remove("is-visible");
    isRunning = false;
    window.cancelAnimationFrame(animationFrame);
  }

  svg.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.isActive = true;
  });
  svg.addEventListener("pointerdown", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.isActive = true;
  });
  svg.addEventListener("pointerleave", () => {
    pointer.isActive = false;
  });
  svg.addEventListener("pointercancel", () => {
    pointer.isActive = false;
  });
  window.addEventListener("resize", () => {
    if (isRunning) resize();
    syncTemporaryLogoParticles();
  });
  reducedMotionQuery.addEventListener("change", syncTemporaryLogoParticles);

  return { start, stop };
}

function createTemporaryFloatingFaviconController() {
  const image = document.createElement("img");
  let animationFrame = 0;
  let isRunning = false;
  let x = 0;
  let y = 0;
  let vx = 0.72;
  let vy = 0.58;
  let rotation = 0;
  let vr = 0.28;
  let width = 0;
  let height = 0;
  let objectWidth = 0;
  let objectHeight = 0;

  image.className = "temporary-v1-floating-favicon";
  image.src = "/assets/supergroup/favicon-dark.svg";
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  document.body.append(image);

  function cancelFrame() {
    if (!animationFrame) return;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }

  function measure() {
    width = window.innerWidth;
    height = window.innerHeight;
    const rect = image.getBoundingClientRect();
    objectWidth = rect.width || 56;
    objectHeight = rect.height || objectWidth;
    x = Math.min(Math.max(0, x), Math.max(0, width - objectWidth));
    y = Math.min(Math.max(0, y), Math.max(0, height - objectHeight));
  }

  function seed() {
    measure();
    if (x === 0 && y === 0) {
      x = Math.max(0, width * 0.68 - objectWidth / 2);
      y = Math.max(0, height * 0.28 - objectHeight / 2);
    }
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    vx = isMobile ? 0.52 : 0.72;
    vy = isMobile ? 0.44 : 0.58;
    vr = isMobile ? 0.22 : 0.28;
  }

  function step() {
    if (!isRunning) return;

    x += vx;
    y += vy;
    rotation += vr;

    if (x <= 0 || x >= width - objectWidth) {
      x = Math.min(Math.max(0, x), Math.max(0, width - objectWidth));
      vx *= -1;
      vr *= -1;
    }

    if (y <= 0 || y >= height - objectHeight) {
      y = Math.min(Math.max(0, y), Math.max(0, height - objectHeight));
      vy *= -1;
      vr *= -1;
    }

    image.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    animationFrame = window.requestAnimationFrame(step);
  }

  function start() {
    if (!shouldRunTemporaryHomepageEffect()) {
      stop();
      return;
    }
    image.classList.add("is-visible");
    if (isRunning) return;
    isRunning = true;
    seed();
    cancelFrame();
    animationFrame = window.requestAnimationFrame(step);
  }

  function stop() {
    image.classList.remove("is-visible");
    isRunning = false;
    cancelFrame();
  }

  window.addEventListener("resize", () => {
    if (isRunning) measure();
    syncTemporaryFloatingFavicon();
  });
  reducedMotionQuery.addEventListener("change", syncTemporaryFloatingFavicon);
  document.addEventListener("visibilitychange", syncTemporaryFloatingFavicon);

  return { start, stop };
}

function setActiveInfoMenuAnchor(anchorId) {
  menu2InfoMode.querySelectorAll(".menu2-info-anchor").forEach((button) => {
    const isActive = button.dataset.anchor === anchorId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function getInfoAnchorSections() {
  return getInfoMenuAnchors()
    .map((anchor) => document.getElementById(anchor.id))
    .filter(Boolean);
}

function updateActiveInfoAnchorFromScroll() {
  const sections = getInfoAnchorSections();
  if (!sections.length) return;

  const overlayRect = aboutOverlay.getBoundingClientRect();
  const anchorLine = overlayRect.top + Math.min(overlayRect.height * 0.32, 220);
  const activeSection = sections.reduce((current, section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top > anchorLine) return current;
    if (!current) return section;
    return rect.top > current.getBoundingClientRect().top ? section : current;
  }, null) || sections[0];

  setActiveInfoMenuAnchor(activeSection.id);
}

function disconnectInfoSectionObserver() {
  if (infoSectionObserver) {
    infoSectionObserver.disconnect();
    infoSectionObserver = null;
  }

  if (infoSectionScrollHandler) {
    aboutOverlay.removeEventListener("scroll", infoSectionScrollHandler);
    infoSectionScrollHandler = null;
  }
}

function initInfoSectionNavigation() {
  disconnectInfoSectionObserver();
  if (currentView !== "info") return;

  const sections = getInfoAnchorSections();
  if (!sections.length) return;

  if ("IntersectionObserver" in window) {
    infoSectionObserver = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections[0]) {
        setActiveInfoMenuAnchor(visibleSections[0].target.id);
      } else {
        updateActiveInfoAnchorFromScroll();
      }
    }, {
      root: aboutOverlay,
      rootMargin: "-12% 0px -62% 0px",
      threshold: [0, 0.2, 0.5, 0.8, 1]
    });

    sections.forEach((section) => infoSectionObserver.observe(section));
  } else {
    infoSectionScrollHandler = updateActiveInfoAnchorFromScroll;
    aboutOverlay.addEventListener("scroll", infoSectionScrollHandler, { passive: true });
  }

  window.requestAnimationFrame(updateActiveInfoAnchorFromScroll);
}

function createInfoSectionNav() {
  const nav = document.createElement("div");
  nav.className = "menu2-info-header";

  getInfoMenuAnchors().forEach((anchor) => {
    const button = document.createElement("button");
    button.className = "menu2-info-anchor";
    button.type = "button";
    button.dataset.anchor = anchor.id;
    button.textContent = anchor.label;
    button.setAttribute("aria-current", "false");
    nav.append(button);
  });

  return nav;
}

function renderInfoMenu() {
  menu2InfoMode.textContent = "";
  menu2InfoMode.append(createInfoSectionNav());
}

function getAvailableDisciplineFilters() {
  const filters = new Map();

  slideshowAssets.forEach((asset) => {
    const key = getAssetFilterKey(asset);
    if (!filters.has(key)) filters.set(key, key);
  });

  return Array.from(filters.keys()).sort((a, b) => a.localeCompare(b));
}

function updateFilterButtonStates() {
  menu2GridMode.querySelectorAll(".menu2-filter-button").forEach((button) => {
    const isActive = button.dataset.filter === currentGridFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderGridFilterMenu() {
  const filters = getAvailableDisciplineFilters();
  menu2GridMode.textContent = "";

  const title = document.createElement("p");
  const list = document.createElement("div");
  title.className = "menu2-mode-title";
  title.textContent = "discipline filter";
  list.className = "menu2-filter-list";

  ["all", ...filters].forEach((filter) => {
    const button = document.createElement("button");
    button.className = "menu2-filter-button";
    button.type = "button";
    button.dataset.filter = filter;
    button.setAttribute("aria-pressed", "false");
    button.textContent = filter === "all" ? "All" : formatMetadataValue(filter);
    list.append(button);
  });

  menu2GridMode.append(title, list);
  updateFilterButtonStates();
}

function setGridFilter(filter) {
  currentGridFilter = filter || "all";
  buildContactSheet(slideshowAssets, currentGridFilter);
  updateFilterButtonStates();
}

function updateMenu2VersionToggleState() {
  if (!menu2VersionToggle) return;

  menu2VersionToggle.querySelectorAll("[data-version]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.version === currentMenu2Version);
  });
}

function activateMenu2Version(version) {
  setMenu2Version(version);
  updateMenu2VersionToggleState();
  metadataPanel.dataset.storyFolder = "";
  metadataPanel.dataset.storyItem = "";
  currentMenu2StoryProjectKey = null;
  closeMenu2V4Blob();

  if (currentMenu2Mode === "slideshow") {
    updateMenu2ForView("slideshow", { animate: false });
  }
}

function initMenu2VersionToggle() {
  if (!menu2VersionToggle) return;

  updateMenu2VersionToggleState();
  menu2VersionToggle.addEventListener("click", (event) => {
    const button = event.target.closest("[data-version]");
    if (!button) return;

    activateMenu2Version(button.dataset.version);
  });
}

function updateVocabAnimationToggleState() {
  if (!vocabAnimationToggle) return;

  vocabAnimationToggle.querySelectorAll("[data-vocab-version]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.vocabVersion === currentVocabAnimationVersion);
  });
}

function restartIntroVocabularyEngine() {
  const lineElements = Array.from(document.querySelectorAll(".intro-vocabulary-line"));
  if (!lineElements.length) return;

  if (introVocabularyCleanup) introVocabularyCleanup();
  introVocabularyCleanup = startIntroVocabularyEngine(lineElements);
}

function activateVocabAnimationVersion(version) {
  setVocabAnimationVersion(version);
  updateVocabAnimationToggleState();
  restartIntroVocabularyEngine();
}

function initVocabAnimationToggle() {
  if (!vocabAnimationToggle) return;

  updateVocabAnimationToggleState();
  vocabAnimationToggle.addEventListener("click", (event) => {
    const button = event.target.closest("[data-vocab-version]");
    if (!button) return;

    activateVocabAnimationVersion(button.dataset.vocabVersion);
  });
}

function updateMenu2ForView(view, options = {}) {
  if (!isFullMode() && view !== "info") {
    renderTemporaryNotice();
    setMenu2Mode("slideshow", options);
    return;
  }

  if (view === "info") {
    setMenu2V1Visible(true);
    renderInfoMenu();
    setMenu2Mode("info", options);
    window.requestAnimationFrame(initInfoSectionNavigation);
    return;
  }

  disconnectInfoSectionObserver();

  if (view === "grid") {
    setMenu2V1Visible(true);
    currentGridFilter = "all";
    buildContactSheet(slideshowAssets, currentGridFilter);
    renderGridFilterMenu();
    setMenu2Mode("grid", options);
    return;
  }

  if (isTemporaryWebsiteActive()) {
    renderTemporaryNotice();
    setMenu2Mode("slideshow", options);
    return;
  }

  buildContactSheet(slideshowAssets, "all");
  setMenu2V1Visible(!isMenu2StoryMode());
  updateMetadataMenu("forward", { animate: false });
  setMenu2Mode("slideshow", options);
}

async function loadLogoManifest() {
  if (!isFullMode()) return;

  try {
    const response = await fetch(LOGO_MANIFEST_URL);
    if (!response.ok) throw new Error(`Logo manifest failed: ${response.status}`);
    const logos = await response.json();
    clientLogos = Array.isArray(logos) ? logos.filter((logo) => logo.file) : [];
  } catch (error) {
    clientLogos = [];
  }

  if (currentView === "info") {
    renderInfoMenu();
    window.requestAnimationFrame(initInfoSectionNavigation);
  }
}

function goToSlide(index, direction = "next") {
  if (!slides.length) return;

  const nextIndex = (index + slides.length) % slides.length;
  if (nextIndex === currentIndex) return;
  if (slideshow.dataset.animating === "true") return;

  clearSlideTiming();

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];
  const enterClass = direction === "prev" ? "enter-prev" : "enter-next";
  const exitClass = direction === "prev" ? "exit-prev" : "exit-next";

  slideshow.dataset.animating = "true";
  resetSlideClasses(nextSlide);
  nextSlide.classList.add(enterClass);
  currentSlide.classList.add(exitClass);

  window.setTimeout(() => {
    resetSlideClasses(currentSlide);
    resetSlideClasses(nextSlide);
    nextSlide.classList.add("active");
    currentIndex = nextIndex;
    slideshow.dataset.animating = "false";
    updateDocumentBackground();
    updateMetadataMenu(direction === "prev" ? "backward" : "forward");
    syncActiveVideo();
    if (currentView === "slideshow") updateBrowserUrlForView("slideshow");
    restartSlideTimingIfRunning();
  }, ANIMATION_MS);
}

function showRelativeSlide(direction) {
  if (isTemporaryWebsiteActive()) return;
  const offset = direction === "prev" ? -1 : 1;
  goToSlide(currentIndex + offset, direction);
}

function clearSlideTiming() {
  slideTimingToken += 1;
  window.clearTimeout(autoplayTimer);
  autoplayTimer = 0;

  if (activeVideoCleanup) {
    activeVideoCleanup();
    activeVideoCleanup = null;
  }
}

function pauseAllSlideVideos() {
  slides.forEach((slide) => {
    const video = slide.querySelector("video");
    if (video) video.pause();
  });
}

function scheduleSlideAdvance(delay, token) {
  window.clearTimeout(autoplayTimer);
  autoplayTimer = window.setTimeout(() => {
    if (token !== slideTimingToken) return;
    showRelativeSlide("next");
  }, delay);
}

function getSlideTimingType(asset) {
  const representative = asset?.representativeAsset || asset;
  const source = representative?.src || representative?.file || "";

  if (representative?.mediaType === "video") return "video";
  if (isGifFile(source)) return "gif";
  return "image";
}

function getGifDuration(asset) {
  const representative = asset?.representativeAsset || asset;
  const duration = Number(
    representative?.gifDurationMs ||
    representative?.durationMs ||
    representative?.duration
  );

  return Number.isFinite(duration) && duration > 0
    ? duration
    : GIF_FALLBACK_DURATION_MS;
}

function startAutoplay(delay = NORMAL_SLIDE_DURATION_MS, options = {}) {
  const shouldRestartMedia = options.restartMedia !== false;
  const shouldForceDelay = options.forceDelay === true;
  clearSlideTiming();

  if (
    isTemporaryWebsiteActive() ||
    isSlideshowPaused ||
    slides.length < 2 ||
    slideshow.dataset.animating === "true" ||
    contactSheetOverlay.classList.contains("visible") ||
    aboutOverlay.classList.contains("visible")
  ) {
    return;
  }

  syncActiveVideo();
  const token = slideTimingToken;

  if (shouldForceDelay) {
    scheduleSlideAdvance(delay, token);
    return;
  }

  const asset = getCurrentSlideAsset();
  const timingType = getSlideTimingType(asset);

  if (timingType === "video") {
    const video = slides[currentIndex]?.querySelector("video");

    if (!video) {
      scheduleSlideAdvance(MEDIA_ERROR_FALLBACK_DURATION_MS, token);
      return;
    }

    const advanceFromVideo = () => {
      if (token !== slideTimingToken) return;
      showRelativeSlide("next");
    };
    const fallbackFromVideoError = () => {
      if (token !== slideTimingToken) return;
      scheduleSlideAdvance(MEDIA_ERROR_FALLBACK_DURATION_MS, token);
    };

    activeVideoCleanup = () => {
      video.removeEventListener("ended", advanceFromVideo);
      video.removeEventListener("error", fallbackFromVideoError);
      video.removeEventListener("stalled", fallbackFromVideoError);
    };

    video.addEventListener("ended", advanceFromVideo, { once: true });
    video.addEventListener("error", fallbackFromVideoError, { once: true });
    video.addEventListener("stalled", fallbackFromVideoError, { once: true });

    try {
      if (shouldRestartMedia && (video.currentTime > 0 || video.ended)) video.currentTime = 0;
    } catch (error) {
      // Some browsers restrict seeking before metadata is ready.
    }

    playVideoWithFallback(video).then((didPlay) => {
      if (didPlay || token !== slideTimingToken) return;
      scheduleSlideAdvance(MEDIA_ERROR_FALLBACK_DURATION_MS, token);
    });
    return;
  }

  if (timingType === "gif") {
    scheduleSlideAdvance(getGifDuration(asset), token);
    return;
  }

  scheduleSlideAdvance(delay, token);
}

function syncActiveVideo() {
  slides.forEach((slide, index) => {
    const video = slide.querySelector("video");
    if (!video) return;

    if (index === currentIndex && currentView === "slideshow") {
      if (hasUserInteractedWithMedia) video.muted = false;
      playVideoWithFallback(video);
      return;
    }

    video.pause();
  });
}

function updateSlideshowToggleButton() {
  if (!slideshowToggle || !slideshowToggleIcon) return;

  const isSlideshowView = currentView === "slideshow";
  slideshowToggle.classList.toggle("is-playing", isSlideshowView && !isSlideshowPaused);
  slideshowToggle.classList.toggle("is-paused", isSlideshowView && isSlideshowPaused);
  slideshowToggle.classList.toggle(
    "is-icon-hovered",
    isSlideshowView &&
      slideshowToggle.matches(":hover") &&
      !isSlideshowToggleHoverSuppressed
  );

  slideshowToggle.setAttribute(
    "aria-label",
    isSlideshowView
      ? (isSlideshowPaused ? "Play slideshow" : "Pause slideshow")
      : "Show slideshow"
  );
}

function setSlideshowPaused(isPaused) {
  isSlideshowPaused = isPaused;

  if (isSlideshowPaused) {
    clearSlideTiming();
    syncActiveVideo();
  } else if (currentView === "slideshow") {
    startAutoplay(RESUME_CONFIRMATION_DELAY_MS, {
      restartMedia: false,
      forceDelay: true
    });
  }

  updateSlideshowToggleButton();
}

function restartSlideTimingIfRunning() {
  if (currentView === "slideshow" && !isSlideshowPaused) {
    startAutoplay();
  }
}

function jumpToSlide(index, autoplayDelay = AUTOPLAY_DELAY, options = {}) {
  const nextSlide = slides[index];
  if (!nextSlide) return;
  clearSlideTiming();

  const shouldUpdateUrl = options.updateUrl !== false;
  const metadataDirection = index < currentIndex ? "backward" : "forward";

  slides.forEach(resetSlideClasses);
  nextSlide.classList.add("active");
  currentIndex = index;
  slideshow.dataset.animating = "false";
  updateDocumentBackground();
  updateMetadataMenu(metadataDirection);
  syncActiveVideo();
  if (currentView === "slideshow" && shouldUpdateUrl) updateBrowserUrlForView("slideshow");
  if (!isSlideshowPaused) startAutoplay(autoplayDelay);
}

function goToHomepage() {
  setView("slideshow", { focus: false, startAutoplay: false, updateUrl: false });
  jumpToSlide(0, AUTOPLAY_DELAY, { updateUrl: false });
  setCanonicalUrl(getAbsoluteUrl("/"));
  replaceBrowserPath("/", { view: "slideshow" });
}

function hasOpenOverlay() {
  return (
    contactSheetOverlay.classList.contains("visible") ||
    aboutOverlay.classList.contains("visible")
  );
}

function setSlideshowCursor(event) {
  if (isTemporaryWebsiteActive() || hasOpenOverlay()) {
    slideshow.classList.remove("cursor-prev", "cursor-next");
    return;
  }

  const rect = slideshow.getBoundingClientRect();
  const isPreviousSide = event.clientX - rect.left < rect.width / 2;

  slideshow.classList.toggle("cursor-prev", isPreviousSide);
  slideshow.classList.toggle("cursor-next", !isPreviousSide);
}

function handleSlideshowClick(event) {
  if (event.target.closest(".island-panel") || hasOpenOverlay()) return;
  if (isTemporaryWebsiteActive()) return;
  if (slideshow.dataset.suppressClick === "true") {
    slideshow.dataset.suppressClick = "false";
    return;
  }

  const rect = slideshow.getBoundingClientRect();
  const direction = event.clientX - rect.left < rect.width / 2 ? "prev" : "next";

  showRelativeSlide(direction);
  restartSlideTimingIfRunning();
}

function handleSlideshowPointerDown(event) {
  if (isTemporaryWebsiteActive() || hasOpenOverlay()) return;

  pointerStart = {
    x: event.clientX,
    y: event.clientY,
    pointerId: event.pointerId
  };
  slideshow.setPointerCapture(event.pointerId);
}

function handleSlideshowPointerUp(event) {
  if (!pointerStart || hasOpenOverlay()) return;

  const deltaX = event.clientX - pointerStart.x;
  const deltaY = event.clientY - pointerStart.y;
  const isSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY);

  if (isSwipe) {
    showRelativeSlide(deltaX < 0 ? "next" : "prev");
    restartSlideTimingIfRunning();
    slideshow.dataset.suppressClick = "true";
  }

  pointerStart = null;
}

function handleKeydown(event) {
  hasUserInteractedWithMedia = true;
  syncActiveVideo();

  if (event.key === "Escape" && contactBlob.classList.contains("is-open")) {
    setContactBlobOpen(false);
    event.preventDefault();
    return;
  }

  if (hasOpenOverlay()) {
    return;
  }

  if (isTemporaryWebsiteActive()) return;

  if (event.key === "ArrowLeft") {
    showRelativeSlide("prev");
    restartSlideTimingIfRunning();
    event.preventDefault();
  }

  if (event.key === "ArrowRight") {
    showRelativeSlide("next");
    restartSlideTimingIfRunning();
    event.preventDefault();
  }
}

function handleMediaInteraction() {
  hasUserInteractedWithMedia = true;
  syncActiveVideo();
}

function getDominantColor(image) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) return FALLBACK_BACKGROUND;

  const sampleSize = 48;
  const ratio = image.naturalWidth / image.naturalHeight || 1;
  canvas.width = ratio >= 1 ? sampleSize : Math.max(1, Math.round(sampleSize * ratio));
  canvas.height = ratio >= 1 ? Math.max(1, Math.round(sampleSize / ratio)) : sampleSize;

  try {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const buckets = new Map();

    for (let i = 0; i < pixels.length; i += 4) {
      const alpha = pixels[i + 3];
      if (alpha < 16) continue;

      const red = Math.round(pixels[i] / 16) * 16;
      const green = Math.round(pixels[i + 1] / 16) * 16;
      const blue = Math.round(pixels[i + 2] / 16) * 16;
      const key = `${red},${green},${blue}`;

      buckets.set(key, (buckets.get(key) || 0) + 1);
    }

    let dominant = "";
    let count = 0;
    buckets.forEach((value, key) => {
      if (value > count) {
        dominant = key;
        count = value;
      }
    });

    return dominant ? `rgb(${dominant})` : FALLBACK_BACKGROUND;
  } catch (error) {
    return FALLBACK_BACKGROUND;
  }
}

function applyDominantBackground(slide, image) {
  if (!slide.classList.contains("slide-contained")) return;

  const setColor = () => {
    const color = getDominantColor(image);
    slide.style.setProperty("--slide-bg", color);
    if (slide.classList.contains("active")) updateDocumentBackground();
  };

  if (image.complete && image.naturalWidth) {
    setColor();
  } else {
    image.addEventListener("load", setColor, { once: true });
    image.addEventListener("error", () => {
      slide.style.setProperty("--slide-bg", FALLBACK_BACKGROUND);
    }, { once: true });
  }
}

function applyPortraitClass(slide, image) {
  const updatePortraitClass = () => {
    slide.classList.toggle("is-portrait", image.naturalHeight > image.naturalWidth);
  };

  if (image.complete && image.naturalWidth) {
    updatePortraitClass();
  } else {
    image.addEventListener("load", updatePortraitClass, { once: true });
  }
}

function createSlideImage(asset, index) {
  const image = document.createElement("img");

  image.src = asset.src;
  image.width = asset.width || 1600;
  image.height = asset.height || 1200;
  image.alt = asset.alt || "Supergroup project image";
  image.decoding = "async";
  image.loading = index === 0 ? "eager" : "lazy";
  if (index === 0) image.fetchPriority = "high";

  return image;
}

function playVideoWithFallback(video) {
  const playAttempt = video.play();

  if (!playAttempt || typeof playAttempt.catch !== "function") {
    return Promise.resolve(true);
  }

  return playAttempt.then(
    () => true,
    () => {
      video.muted = true;
      return video.play().then(
        () => true,
        () => false
      );
    }
  );
}

function createSlideVideo(asset) {
  const video = document.createElement("video");

  video.src = asset.src;
  video.autoplay = true;
  video.playsInline = true;
  video.loop = false;
  video.controls = false;
  video.muted = false;
  video.preload = "metadata";
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("aria-label", asset.alt || "Supergroup project video");

  return video;
}

function createSlideMedia(asset, index) {
  return asset.mediaType === "video"
    ? createSlideVideo(asset)
    : createSlideImage(asset, index);
}

function createContactSheetVideo(asset) {
  const video = document.createElement("video");

  video.src = asset.src;
  video.autoplay = true;
  video.playsInline = true;
  video.loop = true;
  video.controls = false;
  video.muted = true;
  video.preload = "metadata";
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("aria-label", asset.alt || "Supergroup project video thumbnail");
  video.addEventListener("canplay", () => playVideoWithFallback(video), { once: true });

  return video;
}

function createContactSheetMedia(asset, index) {
  if (asset.mediaType === "video") return createContactSheetVideo(asset);

  const image = document.createElement("img");
  image.src = asset.src;
  image.alt = asset.alt || `Supergroup media ${index + 1}`;
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}

function createPairSlide(asset, index) {
  const slide = document.createElement("article");
  const role = asset.role || asset.assetRole;

  slide.className = "slideshow-slide slide-pair";
  slide.dataset.assetRole = role || "";

  if (index === 0) slide.classList.add("active");

  asset.pairAssets.forEach((pairAsset) => {
    const column = document.createElement("div");
    const image = createSlideImage(pairAsset, index);

    column.className = "slide-pair-column";
    column.append(image);
    slide.append(column);
  });

  return slide;
}

function pickRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function normalizeVocabularyData(data) {
  const fallback = INTRO_VOCABULARY_FALLBACK;
  const rawVerbs = data?.verbs;
  const verbList = Array.isArray(rawVerbs) ? rawVerbs : [];
  const structuredVerbs = rawVerbs && !Array.isArray(rawVerbs) ? rawVerbs : {};
  const primaryVerbs = structuredVerbs.primary || verbList.filter((verb) => verb === "Navigating");
  const alternativeVerbs = structuredVerbs.alternative || verbList.filter((verb) => verb !== "Navigating");

  return {
    firstPhrase: fallback.firstPhrase,
    verbs: {
      primary: Array.isArray(primaryVerbs) && primaryVerbs.length ? primaryVerbs : fallback.verbs.primary,
      alternative: Array.isArray(alternativeVerbs) && alternativeVerbs.length ? alternativeVerbs : fallback.verbs.alternative
    },
    adjectives: Array.isArray(data?.adjectives) && data.adjectives.length ? data.adjectives : fallback.adjectives,
    nouns: Array.isArray(data?.nouns) && data.nouns.length ? data.nouns : fallback.nouns
  };
}

function logVocabularyCounts(vocabulary) {
  const verbCount = new Set(getIntroVocabularyVerbs(vocabulary)).size;

  console.log(`Vocabulary loaded:\nVerbs: ${verbCount}\nAdjectives: ${vocabulary.adjectives.length}\nNouns: ${vocabulary.nouns.length}`);
}

async function loadIntroVocabulary() {
  try {
    const response = await fetch(INTRO_VOCABULARY_URL);
    if (!response.ok) throw new Error(`Vocabulary failed: ${response.status}`);
    const vocabulary = normalizeVocabularyData(await response.json());
    logVocabularyCounts(vocabulary);
    return vocabulary;
  } catch (error) {
    const vocabulary = normalizeVocabularyData(INTRO_VOCABULARY_FALLBACK);
    logVocabularyCounts(vocabulary);
    return vocabulary;
  }
}

function getIntroVocabularyVerbs(vocabulary) {
  return [
    ...vocabulary.verbs.primary,
    ...vocabulary.verbs.alternative
  ];
}

function pickIntroFirstWord(vocabulary, currentWord = "") {
  const verbs = getIntroVocabularyVerbs(vocabulary);
  if (!isTemporaryWebsiteActive()) return pickRandomItem(verbs);

  temporaryIntroFirstWordPickCount += 1;
  if (temporaryIntroFirstWordPickCount % 4 === 0 && currentWord !== "design") return "design";

  const temporaryVerbs = verbs.filter((verb) => verb !== "design");
  return pickRandomItem(temporaryVerbs.length ? temporaryVerbs : verbs);
}

function pickIntroAnchorType(recentAnchorTypes = []) {
  const anchorTypes = ["verb", "adjective", "noun"];
  const lastType = recentAnchorTypes[recentAnchorTypes.length - 1];
  const previousType = recentAnchorTypes[recentAnchorTypes.length - 2];
  const availableTypes = lastType && lastType === previousType
    ? anchorTypes.filter((type) => type !== lastType)
    : anchorTypes;

  return pickRandomItem(availableTypes);
}

function createIntroVocabularyTriple(vocabulary, previousTriple = [], recentAnchorTypes = []) {
  let triple = [];
  let anchorType = "free";
  const verbs = getIntroVocabularyVerbs(vocabulary);

  for (let attempts = 0; attempts < 8; attempts += 1) {
    const shouldUseAnchor = Math.random() < 0.8;

    if (shouldUseAnchor) {
      anchorType = pickIntroAnchorType(recentAnchorTypes);

      if (anchorType === "verb") {
        triple = [
          "Navigating",
          pickRandomItem(vocabulary.adjectives),
          pickRandomItem(vocabulary.nouns)
        ];
      } else if (anchorType === "adjective") {
        triple = [
          pickIntroFirstWord(vocabulary, previousTriple[0]),
          "complex",
          pickRandomItem(vocabulary.nouns)
        ];
      } else {
        triple = [
          pickIntroFirstWord(vocabulary, previousTriple[0]),
          pickRandomItem(vocabulary.adjectives),
          "environments"
        ];
      }
    } else {
      anchorType = "free";
      triple = [
        pickIntroFirstWord(vocabulary, previousTriple[0]),
        pickRandomItem(vocabulary.adjectives),
        pickRandomItem(vocabulary.nouns)
      ];
    }

    if (triple.join("|") !== previousTriple.join("|")) {
      return { triple, anchorType };
    }
  }

  return {
    triple: triple.length ? triple : vocabulary.firstPhrase,
    anchorType
  };
}

function getIntroVocabularyPoolForLine(vocabulary, index) {
  if (index === 0) return getIntroVocabularyVerbs(vocabulary);
  if (index === 1) return vocabulary.adjectives;
  return vocabulary.nouns;
}

function getIntroAnchorLineIndexes(triple) {
  return [
    triple[0] === "Navigating" ? 0 : -1,
    triple[1] === "complex" ? 1 : -1,
    triple[2] === "environments" ? 2 : -1
  ].filter((index) => index >= 0);
}

function getIntroAnchorWordForLine(index) {
  if (index === 0) return "Navigating";
  if (index === 1) return "complex";
  return "environments";
}

function hasIntroAnchor(triple) {
  return getIntroAnchorLineIndexes(triple).length > 0;
}

function createIntroV2AnchorRepair(currentTriple) {
  const repairableIndexes = [0, 1, 2].filter((index) => currentTriple[index] !== getIntroAnchorWordForLine(index));
  const lineIndex = pickRandomItem(repairableIndexes);

  return {
    lineIndex,
    word: getIntroAnchorWordForLine(lineIndex)
  };
}

function createIntroV2RandomWordChange(vocabulary, currentTriple, options = {}) {
  let lineIndex = options.lineIndex ?? pickRandomItem([0, 1, 2]);
  let pool = getIntroVocabularyPoolForLine(vocabulary, lineIndex);
  let availableWords = pool.filter((word) => word && word !== currentTriple[lineIndex]);

  if (lineIndex === 0 && isTemporaryWebsiteActive()) {
    const word = pickIntroFirstWord(vocabulary, currentTriple[0]);
    const nextTriple = [...currentTriple];
    nextTriple[lineIndex] = word;
    if (word && word !== currentTriple[0] && (!options.requireAnchorAfterChange || hasIntroAnchor(nextTriple))) {
      return { lineIndex, word };
    }
  }

  if (options.requireAnchorAfterChange) {
    availableWords = availableWords.filter((word) => {
      const nextTriple = [...currentTriple];
      nextTriple[lineIndex] = word;
      return hasIntroAnchor(nextTriple);
    });
  }

  if (!availableWords.length) {
    const fallbackIndexes = [0, 1, 2].filter((index) => index !== lineIndex);
    for (const fallbackIndex of fallbackIndexes) {
      pool = getIntroVocabularyPoolForLine(vocabulary, fallbackIndex);
      availableWords = pool.filter((word) => word && word !== currentTriple[fallbackIndex]);

      if (options.requireAnchorAfterChange) {
        availableWords = availableWords.filter((word) => {
          const nextTriple = [...currentTriple];
          nextTriple[fallbackIndex] = word;
          return hasIntroAnchor(nextTriple);
        });
      }

      if (availableWords.length) {
        lineIndex = fallbackIndex;
        break;
      }
    }
  }

  if (!availableWords.length) return null;

  return {
    lineIndex,
    word: pickRandomItem(availableWords)
  };
}

function createIntroVocabularyWordChange(vocabulary, currentTriple) {
  if (!hasIntroAnchor(currentTriple)) return createIntroV2AnchorRepair(currentTriple);

  return createIntroV2RandomWordChange(vocabulary, currentTriple, {
    requireAnchorAfterChange: Math.random() < 0.8
  });
}

function isIntroVocabularyBlobMode(version = currentVocabAnimationVersion) {
  return version === "v3a" || version === "v3b" || version === "v3c";
}

function getIntroVocabularyWordElement(line) {
  return line.querySelector(".intro-vocabulary-word") || line;
}

function renderIntroVocabularyTriple(lineElements, triple) {
  lineElements.forEach((line, index) => {
    getIntroVocabularyWordElement(line).textContent = triple[index] || "";
  });
}

function transitionIntroVocabularyLine(line, word, index, options = {}) {
  const wordElement = getIntroVocabularyWordElement(line);
  const exitClass = index === 1 ? "is-exiting-reverse" : "is-exiting";
  const enterClass = index === 1 ? "is-entering-reverse" : "is-entering";
  const duration = options.duration || 520;
  const stagger = options.stagger ?? index * 140;
  const swapDelay = Math.max(120, Math.round(duration * 0.72));

  window.setTimeout(() => {
    wordElement.style.setProperty("--intro-word-transition-duration", `${duration}ms`);
    wordElement.classList.add(exitClass);

    window.setTimeout(() => {
      wordElement.textContent = word;
      wordElement.classList.remove(exitClass);
      wordElement.classList.add(enterClass);
      void wordElement.offsetWidth;

      window.requestAnimationFrame(() => {
        wordElement.classList.remove(enterClass);
      });
    }, swapDelay);
  }, stagger);
}

function getIntroBlobMorphSettings(mode) {
  if (mode === "v3b") {
    return {
      className: "is-swarm",
      count: 10 + Math.floor(Math.random() * 11),
      duration: 600 + Math.floor(Math.random() * 301),
      spreadX: 1.25,
      spreadY: 0.48,
      minSize: 0.12,
      maxSize: 0.26
    };
  }

  if (mode === "v3c") {
    return {
      className: "is-island",
      count: 5 + Math.floor(Math.random() * 8),
      duration: 500 + Math.floor(Math.random() * 301),
      spreadX: 0.92,
      spreadY: 0.34,
      minSize: 0.2,
      maxSize: 0.42
    };
  }

  return {
    className: "is-blob",
    count: 8 + Math.floor(Math.random() * 9),
    duration: 400 + Math.floor(Math.random() * 301),
    spreadX: 0.75,
    spreadY: 0.4,
    minSize: 0.14,
    maxSize: 0.32
  };
}

function createLogoBlob(index, count, settings) {
  const blob = document.createElement("span");
  const progress = count <= 1 ? 0.5 : index / (count - 1);
  const islandArc = settings.className === "is-island" ? (progress - 0.5) * settings.spreadX : (Math.random() - 0.5) * settings.spreadX;
  const x = islandArc;
  const y = settings.className === "is-island"
    ? (Math.sin(progress * Math.PI * 2) * 0.12) + ((Math.random() - 0.5) * settings.spreadY)
    : (Math.random() - 0.5) * settings.spreadY;
  const startX = x * (0.45 + Math.random() * 0.35);
  const startY = y * (0.45 + Math.random() * 0.35);
  const endX = x * (0.25 + Math.random() * 0.35);
  const endY = y * (0.25 + Math.random() * 0.35);
  const size = settings.minSize + Math.random() * (settings.maxSize - settings.minSize);
  const rotation = Math.round((Math.random() - 0.5) * 130);
  const radiusA = 38 + Math.round(Math.random() * 34);
  const radiusB = 36 + Math.round(Math.random() * 36);
  const radiusC = 40 + Math.round(Math.random() * 32);
  const radiusD = 34 + Math.round(Math.random() * 38);
  const delay = Math.round(Math.random() * 90);

  blob.className = "intro-logo-blob";
  blob.style.setProperty("--blob-size", `${size}em`);
  blob.style.setProperty("--blob-radius", `${radiusA}% ${radiusB}% ${radiusC}% ${radiusD}% / ${radiusD}% ${radiusC}% ${radiusA}% ${radiusB}%`);
  blob.style.setProperty("--blob-x-start", `${startX}em`);
  blob.style.setProperty("--blob-y-start", `${startY}em`);
  blob.style.setProperty("--blob-x-mid", `${x}em`);
  blob.style.setProperty("--blob-y-mid", `${y}em`);
  blob.style.setProperty("--blob-x-end", `${endX}em`);
  blob.style.setProperty("--blob-y-end", `${endY}em`);
  blob.style.setProperty("--blob-rotation", `${rotation}deg`);
  blob.style.setProperty("--blob-duration", `${settings.duration}ms`);
  blob.style.setProperty("--blob-delay", `${delay}ms`);

  return blob;
}

function renderBlobCluster(line, mode) {
  const settings = getIntroBlobMorphSettings(mode);
  const cluster = document.createElement("span");

  cluster.className = `intro-blob-cluster ${settings.className}`;
  cluster.setAttribute("aria-hidden", "true");

  for (let index = 0; index < settings.count; index += 1) {
    cluster.append(createLogoBlob(index, settings.count, settings));
  }

  line.append(cluster);
  window.requestAnimationFrame(() => {
    cluster.classList.add("is-active");
  });

  return {
    cluster,
    duration: settings.duration + 120
  };
}

function transitionIntroVocabularyLineWithBlobs(line, word, mode) {
  const wordElement = getIntroVocabularyWordElement(line);
  const { cluster, duration } = renderBlobCluster(line, mode);
  const swapDelay = Math.round(duration * 0.48);

  line.classList.add("is-blob-morphing");

  window.setTimeout(() => {
    wordElement.textContent = word;
  }, swapDelay);

  window.setTimeout(() => {
    cluster.remove();
    line.classList.remove("is-blob-morphing");
  }, duration + 80);
}

function startIntroVocabularyEngine(lineElements) {
  if (!lineElements.length) return null;

  let currentTriple = INTRO_VOCABULARY_FALLBACK.firstPhrase;
  let recentAnchorTypes = [];
  let timeoutId = 0;
  let isStopped = false;
  if (isTemporaryWebsiteActive()) temporaryIntroFirstWordPickCount = 0;
  renderIntroVocabularyTriple(lineElements, currentTriple);

  if (reducedMotionQuery.matches) return null;

  function scheduleNextV1Phrase(vocabulary) {
    const delay = 4000 + Math.random() * 1000;

    timeoutId = window.setTimeout(() => {
      if (currentVocabAnimationVersion !== "v1") {
        scheduleNextWordChange(vocabulary);
        return;
      }

      const nextPhrase = createIntroVocabularyTriple(vocabulary, currentTriple, recentAnchorTypes);
      currentTriple = nextPhrase.triple;
      recentAnchorTypes = nextPhrase.anchorType === "free"
        ? []
        : [...recentAnchorTypes, nextPhrase.anchorType].slice(-2);
      currentTriple.forEach((word, index) => {
        transitionIntroVocabularyLine(lineElements[index], word, index, {
          duration: 420,
          stagger: index * 120
        });
      });

      if (!isStopped) scheduleNextV1Phrase(vocabulary);
    }, delay);
  }

  function scheduleNextWordChange(vocabulary) {
    const isBlobMode = isIntroVocabularyBlobMode();
    const delay = isBlobMode ? 1200 : 1000;

    timeoutId = window.setTimeout(() => {
      if (currentVocabAnimationVersion === "v1") {
        scheduleNextV1Phrase(vocabulary);
        return;
      }

      const activeVersion = currentVocabAnimationVersion;
      const change = createIntroVocabularyWordChange(vocabulary, currentTriple);
      if (change) {
        currentTriple = [...currentTriple];
        currentTriple[change.lineIndex] = change.word;

        if (isIntroVocabularyBlobMode(activeVersion)) {
          transitionIntroVocabularyLineWithBlobs(lineElements[change.lineIndex], change.word, activeVersion);
        } else {
          transitionIntroVocabularyLine(lineElements[change.lineIndex], change.word, change.lineIndex, {
            duration: 300,
            stagger: 0
          });
        }
      }

      if (!isStopped) scheduleNextWordChange(vocabulary);
    }, delay);
  }

  loadIntroVocabulary().then((vocabulary) => {
    if (isStopped) return;
    if (currentVocabAnimationVersion === "v1") {
      scheduleNextV1Phrase(vocabulary);
    } else {
      scheduleNextWordChange(vocabulary);
    }
  });

  return () => {
    isStopped = true;
    window.clearTimeout(timeoutId);
    lineElements.forEach((line) => {
      line.classList.remove("is-blob-morphing");
      line.querySelectorAll(".intro-blob-cluster").forEach((cluster) => cluster.remove());
    });
  };
}

function createIntroSlide(asset, index) {
  const slide = document.createElement("article");
  const text = document.createElement("p");
  const lines = INTRO_VOCABULARY_FALLBACK.firstPhrase.map((word, wordIndex) => {
    const line = document.createElement("span");
    const wordElement = document.createElement("span");

    line.className = `intro-vocabulary-line line-${wordIndex + 1}`;
    wordElement.className = "intro-vocabulary-word";
    wordElement.textContent = word;
    line.append(wordElement);
    return line;
  });

  slide.className = "slideshow-slide slide-intro";
  slide.dataset.assetRole = "intro";
  slide.style.setProperty("--slide-bg", "#000");
  text.className = "intro-slide-text";
  text.append(...lines);
  if (introVocabularyCleanup) introVocabularyCleanup();
  introVocabularyCleanup = startIntroVocabularyEngine(lines);
  slide.vocabularyCleanup = introVocabularyCleanup;

  if (index === 0) slide.classList.add("active");

  slide.append(text);
  return slide;
}

function createSlide(asset, index) {
  if (asset.isIntro) return createIntroSlide(asset, index);
  if (asset.isPair) return createPairSlide(asset, index);

  const slide = document.createElement("article");
  const media = createSlideMedia(asset, index);
  const role = asset.role || asset.assetRole;
  const layout = getLayoutRole(role);

  slide.className = `slideshow-slide ${layout}`;
  slide.dataset.assetRole = role || "";
  slide.dataset.mediaType = asset.mediaType || "image";

  if (layout === "slide-contained") {
    slide.style.setProperty("--slide-bg", FALLBACK_BACKGROUND);
  }

  if (index === 0) slide.classList.add("active");

  slide.append(media);

  if (asset.mediaType === "image") {
    applyPortraitClass(slide, media);
    applyDominantBackground(slide, media);
  }

  return slide;
}

function getAssetFilterKey(asset) {
  const representative = asset.representativeAsset || asset;
  return representative.disciplineKey || asset.disciplineKey || "uncategorized";
}

function buildContactSheet(assets, filter = "all") {
  if (!isFullMode()) return;

  contactSheetGrid.textContent = "";

  assets
    .map((asset, index) => ({ asset, index }))
    .filter(({ asset }) => filter === "all" || getAssetFilterKey(asset) === filter)
    .forEach(({ asset, index }) => {
    const button = document.createElement("button");
    const frame = document.createElement("span");

    button.className = "contact-sheet-thumb";
    button.type = "button";
    button.dataset.slideIndex = index;
    button.setAttribute("aria-label", `Show media ${index + 1}`);
    frame.className = "contact-sheet-thumb-frame";

    if (asset.isIntro) {
      const label = document.createElement("span");
      frame.classList.add("contact-sheet-thumb-intro");
      label.textContent = "supergroup";
      frame.append(label);
      button.append(frame);
      contactSheetGrid.append(button);
      return;
    }

    const media = createContactSheetMedia(asset, index);

    frame.append(media);
    button.append(frame);
    contactSheetGrid.append(button);
  });
}

function buildInfoWorkList(assets) {
  if (!infoWorkList) return;

  const clients = new Map();
  infoWorkList.textContent = "";

  assets.forEach((asset, index) => {
    if (asset.isIntro) return;

    const representative = asset.representativeAsset || asset;
    const folderData = parseFolderDisplayData(representative.folder || asset.folder || "", asset);
    const clientName = folderData.client || asset.client || "Untitled";
    const key = slugify(clientName, "client");

    if (clients.has(key)) return;

    clients.set(key, {
      index,
      title: clientName,
      url: asset.projectUrlPath || "#"
    });
  });

  Array.from(clients.values())
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((client) => {
    const link = document.createElement("a");

    link.className = "info-work-link";
    link.href = client.url;
    link.dataset.slideIndex = client.index;
    link.textContent = client.title;
    infoWorkList.append(link);
  });
}

function syncViewButtons() {
  if (temporaryInfoButton) {
    const isInfoView = currentView === "info";
    temporaryInfoButton.dataset.view = isInfoView ? "slideshow" : "info";
    temporaryInfoButton.textContent = isInfoView ? "Home" : "Info";
    temporaryInfoButton.setAttribute("aria-label", isInfoView ? "Go to homepage" : "Show information");
  }

  viewButtons.forEach((button) => {
    const isActive = button.dataset.view === currentView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  updateSlideshowToggleButton();
}

function handleTemporaryNavPanelClick(event) {
  if (!isTemporaryWebsiteActive() || event.defaultPrevented) return;
  if (event.target.closest("a, button, input, select, textarea, [data-no-parent-click]")) return;

  if (currentView === "info") {
    setView("slideshow", { focus: false, startAutoplay: false });
    return;
  }

  if (currentView === "slideshow") {
    setView("info", { focus: false });
  }
}

function triggerLogoTransition() {
  if (!flockingLogoController) return;
  flockingLogoController.triggerTransition();
}

function setView(view, options = {}) {
  const nextView = view || "slideshow";
  const previousView = currentView;
  const shouldFocus = options.focus !== false;
  const shouldStartAutoplay = options.startAutoplay !== false;
  const shouldUpdateUrl = options.updateUrl !== false;

  setContactBlobOpen(false);
  currentView = nextView;
  document.body.classList.toggle("is-slideshow-view", nextView === "slideshow");
  document.body.classList.toggle("is-info-view", nextView === "info");
  document.body.classList.toggle("is-grid-view", nextView === "grid");
  syncTemporaryHomepageEffects();
  if (previousView !== nextView) triggerLogoTransition();
  contactSheetOverlay.classList.toggle("visible", nextView === "grid");
  contactSheetOverlay.setAttribute("aria-hidden", String(nextView !== "grid"));
  aboutOverlay.classList.toggle("visible", nextView === "info");
  aboutOverlay.setAttribute("aria-hidden", String(nextView !== "info"));
  document.body.classList.toggle("overlay-open", nextView !== "slideshow");
  syncViewButtons();

  if (nextView === "slideshow") {
    updateMenu2ForView("slideshow");
    updateDisciplineTitle(slideshowAssets[currentIndex]);
    if (shouldUpdateUrl) updateBrowserUrlForView("slideshow");
    if (shouldStartAutoplay && !isSlideshowPaused) startAutoplay();
    syncActiveVideo();
    if (lastFocusedElement && shouldFocus) lastFocusedElement.focus();
    updateSlideshowToggleButton();
    return;
  }

  isSlideshowPaused = true;
  if (nextView === "info") ensureTemporaryInfoPageRendered();
  updateMenu2ForView(nextView);
  if (shouldUpdateUrl) updateBrowserUrlForView(nextView);
  updateDisciplineTitle(null, "complex");
  lastFocusedElement = document.activeElement;
  clearSlideTiming();
  pauseAllSlideVideos();
  updateSlideshowToggleButton();

  if (shouldFocus) {
    const focusTarget = nextView === "grid" ? contactSheetClose : aboutClose;
    focusTarget.focus();
  }
}

function clampPanelPosition(panel, left, top) {
  const rect = panel.getBoundingClientRect();
  const margin = 12;
  const maxLeft = window.innerWidth - rect.width - margin;
  const maxTop = window.innerHeight - rect.height - margin;

  return {
    left: Math.min(Math.max(margin, left), Math.max(margin, maxLeft)),
    top: Math.min(Math.max(margin, top), Math.max(margin, maxTop))
  };
}

function savePanelPosition(storageKey, position) {
  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(position));
  } catch (error) {
    // Session storage can be unavailable in some privacy contexts.
  }
}

function getStoredPanelPosition(storageKey) {
  try {
    const storedPosition = window.sessionStorage.getItem(storageKey);
    return storedPosition ? JSON.parse(storedPosition) : null;
  } catch (error) {
    return null;
  }
}

function setPanelPosition(panel, storageKey, left, top, shouldSave = false) {
  const position = clampPanelPosition(panel, left, top);
  panel.style.left = `${position.left}px`;
  panel.style.top = `${position.top}px`;
  panel.style.right = "auto";
  panel.style.bottom = "auto";

  if (shouldSave) {
    savePanelPosition(storageKey, position);
  }
}

function initDraggablePanel(panel, handleSelector, storageKey, fallbackPosition) {
  let dragStart = null;

  function startDrag(event) {
    if (!event.target.closest(handleSelector)) return;
    if (event.target.closest("button, a")) return;

    const rect = panel.getBoundingClientRect();
    dragStart = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top
    };
    panel.setPointerCapture(event.pointerId);
  }

  function moveDrag(event) {
    if (!dragStart) return;

    const deltaX = event.clientX - dragStart.startX;
    const deltaY = event.clientY - dragStart.startY;

    setPanelPosition(panel, storageKey, dragStart.left + deltaX, dragStart.top + deltaY);
  }

  function endDrag() {
    if (!dragStart) return;

    const rect = panel.getBoundingClientRect();
    setPanelPosition(panel, storageKey, rect.left, rect.top, true);
    dragStart = null;
  }

  const storedPosition = getStoredPanelPosition(storageKey);
  if (storedPosition) {
    setPanelPosition(panel, storageKey, storedPosition.left, storedPosition.top);
  } else {
    setPanelPosition(panel, storageKey, fallbackPosition.left, fallbackPosition.top, true);
  }

  panel.addEventListener("pointerdown", startDrag);
  panel.addEventListener("pointermove", moveDrag);
  panel.addEventListener("pointerup", endDrag);
  panel.addEventListener("pointercancel", endDrag);
  window.addEventListener("resize", () => {
    const rect = panel.getBoundingClientRect();
    setPanelPosition(panel, storageKey, rect.left, rect.top, true);
  });
}

function initMenus() {
  if (isTemporaryWebsiteActive()) {
    syncViewButtons();
    return;
  }

  initDraggablePanel(navPanel, ".island-header", NAV_MENU_POSITION_STORAGE_KEY, { left: 24, top: 24 });
  initDraggablePanel(metadataPanel, ".metadata-content", META_MENU_POSITION_STORAGE_KEY, {
    left: 24,
    top: Math.max(24, window.innerHeight - 174)
  });
  syncViewButtons();
}

async function initFlockingLogo() {
  if (!homeLogoButton || reducedMotionQuery.matches) return;

  const fallbackImage = homeLogoButton.querySelector(".island-logo");
  if (!fallbackImage) return;

  try {
    const response = await fetch(FLOCKING_LOGO_URL);
    if (!response.ok) throw new Error(`Logo failed: ${response.status}`);

    const markup = await response.text();
    const template = document.createElement("template");
    template.innerHTML = markup.trim();
    const svg = template.content.querySelector("svg");
    if (!svg) return;

    svg.classList.add("island-logo", "flocking-logo");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    fallbackImage.replaceWith(svg);
    flockingLogoController = createFlockingLogoController(homeLogoButton, svg);
    window.logoFlock = flockingLogoController;
  } catch (error) {
    // Keep the static img fallback when inline SVG loading is unavailable.
  }
}

function createFlockingLogoController(container, svg) {
  const settings = FLOCKING_LOGO_SETTINGS;
  const paths = Array.from(svg.querySelectorAll("path"));
  const agents = paths.map((path, index) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const box = path.getBBox();
    const homeX = box.x + box.width / 2;
    const homeY = box.y + box.height / 2;

    group.classList.add("flocking-logo-agent");
    group.dataset.agentIndex = String(index);
    path.parentNode.insertBefore(group, path);
    group.append(path);

    return {
      element: group,
      homeX,
      homeY,
      x: homeX,
      y: homeY,
      vx: 0,
      vy: 0,
      rotation: 0,
      rotationVelocity: 0,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
      seedAngle: Math.random() * Math.PI * 2,
      seedRadius: 18 + Math.random() * 42,
      seedRotation: (Math.random() - 0.5) * 10,
      transitionStartX: homeX,
      transitionStartY: homeY,
      transitionMidX: homeX,
      transitionMidY: homeY,
      transitionEndX: homeX,
      transitionEndY: homeY,
      transitionStartRotation: 0,
      transitionMidRotation: 0,
      transitionStartScale: 1,
      transitionMidScale: 1
    };
  });

  let isActive = false;
  let frame = 0;
  let mouse = null;
  let hasSettled = true;
  let isTransitioning = false;
  let transitionStartTime = 0;
  const viewBox = svg.viewBox.baseVal;
  const center = {
    x: viewBox.x + viewBox.width / 2,
    y: viewBox.y + viewBox.height / 2
  };
  const bounds = {
    left: viewBox.x - 28,
    right: viewBox.x + viewBox.width + 28,
    top: viewBox.y - 28,
    bottom: viewBox.y + viewBox.height + 28
  };

  function toSvgPoint(event) {
    const rect = svg.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * viewBox.width + viewBox.x,
      y: ((event.clientY - rect.top) / rect.height) * viewBox.height + viewBox.y
    };
  }

  function limitVelocity(agent) {
    const speed = Math.hypot(agent.vx, agent.vy);
    if (speed <= settings.maxSpeed || speed === 0) return;
    const scale = settings.maxSpeed / speed;
    agent.vx *= scale;
    agent.vy *= scale;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function menuBoundsToSvgSpace(padding = 12) {
    const menuRect = navPanel.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const scaleX = viewBox.width / svgRect.width;
    const scaleY = viewBox.height / svgRect.height;

    return {
      left: viewBox.x + (menuRect.left + padding - svgRect.left) * scaleX,
      right: viewBox.x + (menuRect.right - padding - svgRect.left) * scaleX,
      top: viewBox.y + (menuRect.top + padding - svgRect.top) * scaleY,
      bottom: viewBox.y + (menuRect.bottom - padding - svgRect.top) * scaleY
    };
  }

  function clampPointToMenuBounds(point, menuBounds) {
    return {
      x: clamp(point.x, menuBounds.left, menuBounds.right),
      y: clamp(point.y, menuBounds.top, menuBounds.bottom)
    };
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  function prepareTransition(menuBounds) {
    agents.forEach((agent, index) => {
      const dx = agent.homeX - center.x;
      const dy = agent.homeY - center.y;
      const distance = Math.hypot(dx, dy) || 1;
      const normalizedX = dx / distance;
      const normalizedY = dy / distance;
      const midpoint = clampPointToMenuBounds({
        x: agent.homeX + normalizedX * 45 + Math.cos(agent.seedAngle) * agent.seedRadius,
        y: agent.homeY + normalizedY * 28 + Math.sin(agent.seedAngle) * agent.seedRadius
      }, menuBounds);

      agent.transitionStartX = agent.x;
      agent.transitionStartY = agent.y;
      agent.transitionMidX = midpoint.x;
      agent.transitionMidY = midpoint.y;
      agent.transitionEndX = agent.homeX;
      agent.transitionEndY = agent.homeY;
      agent.transitionStartRotation = agent.rotation;
      agent.transitionMidRotation = agent.seedRotation;
      agent.transitionStartScale = agent.scale;
      agent.transitionMidScale = 1.08;
      agent.vx = 0;
      agent.vy = 0;
      agent.rotationVelocity = 0;
    });
  }

  function applyTransform(agent) {
    agent.offsetX = agent.x - agent.homeX;
    agent.offsetY = agent.y - agent.homeY;
    agent.element.setAttribute(
      "transform",
      `translate(${agent.offsetX.toFixed(2)} ${agent.offsetY.toFixed(2)}) rotate(${agent.rotation.toFixed(2)} ${agent.homeX.toFixed(2)} ${agent.homeY.toFixed(2)}) translate(${agent.homeX.toFixed(2)} ${agent.homeY.toFixed(2)}) scale(${agent.scale.toFixed(4)}) translate(${-agent.homeX.toFixed(2)} ${-agent.homeY.toFixed(2)})`
    );
  }

  function step() {
    const now = performance.now();
    const transitionElapsed = isTransitioning ? now - transitionStartTime : 0;
    const isTransitionActive = isTransitioning && transitionElapsed < settings.transitionDuration;

    if (isTransitionActive) {
      agents.forEach((agent) => {
        if (transitionElapsed < settings.spreadPhase) {
          const t = easeOutCubic(clamp(transitionElapsed / settings.spreadPhase, 0, 1));
          agent.x = lerp(agent.transitionStartX, agent.transitionMidX, t);
          agent.y = lerp(agent.transitionStartY, agent.transitionMidY, t);
          agent.rotation = lerp(agent.transitionStartRotation, agent.transitionMidRotation, t);
          agent.scale = lerp(agent.transitionStartScale, agent.transitionMidScale, t);
        } else {
          const t = easeInOutCubic(clamp((transitionElapsed - settings.spreadPhase) / settings.regroupPhase, 0, 1));
          agent.x = lerp(agent.transitionMidX, agent.transitionEndX, t);
          agent.y = lerp(agent.transitionMidY, agent.transitionEndY, t);
          agent.rotation = lerp(agent.transitionMidRotation, 0, t);
          agent.scale = lerp(agent.transitionMidScale, 1, t);
        }

        applyTransform(agent);
      });

      frame = window.requestAnimationFrame(step);
      hasSettled = false;
      return;
    }

    if (isTransitioning) {
      isTransitioning = false;
      agents.forEach((agent) => {
        agent.x = agent.homeX;
        agent.y = agent.homeY;
        agent.vx = 0;
        agent.vy = 0;
        agent.rotation = 0;
        agent.rotationVelocity = 0;
        agent.scale = 1;
        applyTransform(agent);
      });
      svg.classList.remove("is-flocking");
      if (container.matches(":hover") && mouse) {
        isActive = true;
        svg.classList.add("is-flocking");
      }
    }

    let needsNextFrame = isActive;
    const homeForce = isActive ? settings.hoverHomeForce : settings.homeForce;
    const menuBounds = menuBoundsToSvgSpace();

    agents.forEach((agent) => {
      let fx = (agent.homeX - agent.x) * homeForce;
      let fy = (agent.homeY - agent.y) * homeForce;
      let neighborCount = 0;
      let cohesionX = 0;
      let cohesionY = 0;
      let alignmentX = 0;
      let alignmentY = 0;
      let separationX = 0;
      let separationY = 0;

      agents.forEach((other) => {
        if (other === agent) return;
        const dx = other.x - agent.x;
        const dy = other.y - agent.y;
        const distance = Math.hypot(dx, dy) || 1;

        if (distance < settings.neighborRadius) {
          neighborCount += 1;
          cohesionX += other.x;
          cohesionY += other.y;
          alignmentX += other.vx;
          alignmentY += other.vy;
        }

        if (distance < settings.separationRadius) {
          const strength = (settings.separationRadius - distance) / settings.separationRadius;
          separationX -= (dx / distance) * strength;
          separationY -= (dy / distance) * strength;
        }
      });

      if (neighborCount) {
        cohesionX = cohesionX / neighborCount - agent.x;
        cohesionY = cohesionY / neighborCount - agent.y;
        alignmentX = alignmentX / neighborCount - agent.vx;
        alignmentY = alignmentY / neighborCount - agent.vy;
        fx += cohesionX * settings.cohesionForce + alignmentX * settings.alignmentForce;
        fy += cohesionY * settings.cohesionForce + alignmentY * settings.alignmentForce;
      }

      fx += separationX * settings.separationForce;
      fy += separationY * settings.separationForce;

      if (isActive && mouse) {
        const dx = mouse.x - agent.x;
        const dy = mouse.y - agent.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < settings.mouseRadius) {
          const softness = 1 - distance / settings.mouseRadius;
          fx += dx * settings.mouseForce * softness;
          fy += dy * settings.mouseForce * softness;
        }

        fx += (center.x - agent.x) * settings.boundaryForce * 0.35;
        fy += (center.y - agent.y) * settings.boundaryForce * 0.35;
      }

      if (agent.x < menuBounds.left) fx += (menuBounds.left - agent.x) * settings.boundaryForce;
      if (agent.x > menuBounds.right) fx += (menuBounds.right - agent.x) * settings.boundaryForce;
      if (agent.y < menuBounds.top) fy += (menuBounds.top - agent.y) * settings.boundaryForce;
      if (agent.y > menuBounds.bottom) fy += (menuBounds.bottom - agent.y) * settings.boundaryForce;
      if (agent.x < bounds.left) fx += (bounds.left - agent.x) * settings.boundaryForce;
      if (agent.x > bounds.right) fx += (bounds.right - agent.x) * settings.boundaryForce;
      if (agent.y < bounds.top) fy += (bounds.top - agent.y) * settings.boundaryForce;
      if (agent.y > bounds.bottom) fy += (bounds.bottom - agent.y) * settings.boundaryForce;

      agent.vx = (agent.vx + fx) * settings.damping;
      agent.vy = (agent.vy + fy) * settings.damping;
      limitVelocity(agent);
      agent.x += agent.vx;
      agent.y += agent.vy;

      const isMovingState = isActive;
      const targetRotation = isMovingState ? Math.max(-7, Math.min(7, agent.vx * 1.8)) : 0;
      const targetScale = isMovingState ? 1 + Math.min(0.035, Math.hypot(agent.vx, agent.vy) * settings.scaleForce) : 1;
      agent.rotationVelocity = (agent.rotationVelocity + (targetRotation - agent.rotation) * settings.rotationForce) * 0.82;
      agent.rotation += agent.rotationVelocity;
      agent.scale += (targetScale - agent.scale) * 0.08;

      applyTransform(agent);

      const displacement = Math.hypot(agent.x - agent.homeX, agent.y - agent.homeY);
      const motion = Math.hypot(agent.vx, agent.vy) + Math.abs(agent.rotationVelocity) + Math.abs(agent.scale - 1);
      if (displacement > settings.returnThreshold || motion > 0.03) needsNextFrame = true;
    });

    if (needsNextFrame) {
      frame = window.requestAnimationFrame(step);
      hasSettled = false;
    } else {
      frame = 0;
      hasSettled = true;
      svg.classList.remove("is-flocking");
      agents.forEach((agent) => {
        agent.x = agent.homeX;
        agent.y = agent.homeY;
        agent.vx = 0;
        agent.vy = 0;
        agent.rotation = 0;
        agent.rotationVelocity = 0;
        agent.scale = 1;
        applyTransform(agent);
      });
    }
  }

  function requestTick() {
    if (!frame) frame = window.requestAnimationFrame(step);
  }

  function activate(event) {
    if (reducedMotionQuery.matches) return;
    if (isTransitioning) {
      mouse = toSvgPoint(event);
      return;
    }
    isActive = true;
    mouse = toSvgPoint(event);
    svg.classList.add("is-flocking");
    requestTick();
  }

  function move(event) {
    if (reducedMotionQuery.matches) return;
    if (isTransitioning) {
      mouse = toSvgPoint(event);
      return;
    }
    mouse = toSvgPoint(event);
    if (!isActive) isActive = true;
    svg.classList.add("is-flocking");
    requestTick();
  }

  function release() {
    isActive = false;
    mouse = null;
    svg.classList.remove("is-flocking");
    requestTick();
  }

  function reset() {
    isActive = false;
    mouse = null;
    isTransitioning = false;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    agents.forEach((agent) => {
      agent.x = agent.homeX;
      agent.y = agent.homeY;
      agent.vx = 0;
      agent.vy = 0;
      agent.rotation = 0;
      agent.rotationVelocity = 0;
      agent.scale = 1;
      applyTransform(agent);
    });
    hasSettled = true;
  }

  function triggerTransition() {
    if (reducedMotionQuery.matches) return;

    isActive = false;
    mouse = null;
    isTransitioning = true;
    transitionStartTime = performance.now();
    prepareTransition(menuBoundsToSvgSpace());
    svg.classList.add("is-flocking");
    requestTick();
  }

  container.addEventListener("pointerenter", activate);
  container.addEventListener("pointermove", move);
  container.addEventListener("pointerleave", release);
  container.addEventListener("blur", release);
  reducedMotionQuery.addEventListener("change", reset);
  agents.forEach(applyTransform);

  return {
    triggerTransition,
    reset,
    get hasSettled() {
      return hasSettled;
    }
  };
}

async function initSlideshow() {
  if (!isFullMode()) {
    slideshowAssets = [createIntroSlideItem()];
    slideshow.textContent = "";
    slideshow.append(createSlide(slideshowAssets[0], 0));
    slides = Array.from(slideshow.querySelectorAll(".slideshow-slide"));
    applyTemporaryWebsiteMode();
    return;
  }

  try {
    const response = await fetch(MANIFEST_URL);
    if (!response.ok) throw new Error(`Manifest failed: ${response.status}`);

    const manifest = await response.json();
    const assets = [
      createIntroSlideItem(),
      ...buildSlideshowItems(filterAndSortAssets(flattenManifestAssets(manifest)))
    ];

    if (!assets.length) throw new Error("No matching Supergroup images in manifest.");

    slideshowAssets = assets;
    slideshow.classList.remove("loading");
    slideshow.removeAttribute("aria-live");
    assets.forEach((asset, index) => {
      slideshow.append(createSlide(asset, index));
    });

    slides = Array.from(slideshow.querySelectorAll(".slideshow-slide"));
    buildContactSheet(assets);
    buildInfoWorkList(assets);
    updateDocumentBackground();
    updateMetadataMenu("forward", { animate: false });

    const initialRoute = parseRouteFromLocation();
    applyRoute(initialRoute, { updateUrl: false });
    if (currentView === "slideshow" && initialRoute.imageSlug) {
      updateBrowserUrlForView("slideshow");
    } else if (currentView === "slideshow") {
      setCanonicalUrl(getAbsoluteUrl(initialRoute.projectSlug ? window.location.pathname : "/"));
    }
    startAutoplay();
  } catch (error) {
    slideshow.classList.remove("loading");
    slideshow.classList.add("load-error");
    slideshow.setAttribute("aria-label", "Supergroup image slideshow. Images could not be loaded.");
    console.error(error);
  }
}

function initFullSiteEventListeners() {
  if (!isFullMode()) return;

  slideshow.addEventListener("mousemove", setSlideshowCursor);
  slideshow.addEventListener("mouseleave", () => {
    slideshow.classList.remove("cursor-prev", "cursor-next");
  });
  slideshow.addEventListener("click", handleSlideshowClick);
  slideshow.addEventListener("pointerdown", handleSlideshowPointerDown);
  slideshow.addEventListener("pointerup", handleSlideshowPointerUp);
  slideshow.addEventListener("pointercancel", () => {
    pointerStart = null;
  });
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("pointerdown", handleMediaInteraction, { capture: true });
  window.addEventListener("popstate", () => {
    applyRoute(parseRouteFromLocation(), { updateUrl: false });
  });

  slideshowToggle.addEventListener("pointerenter", () => {
    if (!isSlideshowToggleHoverSuppressed) {
      slideshowToggle.classList.add("is-icon-hovered");
    }
    updateSlideshowToggleButton();
  });
  slideshowToggle.addEventListener("pointerleave", () => {
    isSlideshowToggleHoverSuppressed = false;
    slideshowToggle.classList.remove("is-icon-hovered");
    updateSlideshowToggleButton();
  });
  slideshowToggle.addEventListener("focus", updateSlideshowToggleButton);
  slideshowToggle.addEventListener("blur", updateSlideshowToggleButton);

  contactToggle.addEventListener("click", toggleContactBlob);
  contactSheetClose.addEventListener("click", () => setView("slideshow"));
  contactSheetGrid.addEventListener("click", (event) => {
    const thumb = event.target.closest(".contact-sheet-thumb");
    if (!thumb) return;

    setView("slideshow", { startAutoplay: false, focus: false, updateUrl: false });
    jumpToSlide(Number(thumb.dataset.slideIndex), CONTACT_SHEET_AUTOPLAY_DELAY);
  });

  if (infoWorkList) {
    infoWorkList.addEventListener("click", (event) => {
      const link = event.target.closest(".info-work-link");
      if (!link) return;

      event.preventDefault();
      setView("slideshow", { startAutoplay: false, focus: false, updateUrl: false });
      jumpToSlide(Number(link.dataset.slideIndex), CONTACT_SHEET_AUTOPLAY_DELAY);
    });
  }

  menu2GridMode.addEventListener("click", (event) => {
    const button = event.target.closest(".menu2-filter-button");
    if (!button) return;
    setGridFilter(button.dataset.filter);
  });
}

function loadMaterialSymbolsIfNeeded() {
  if (document.querySelector("link[data-material-symbols]")) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = MATERIAL_SYMBOLS_STYLESHEET_URL;
  link.dataset.materialSymbols = "true";
  document.head.append(link);
}

function hydrateFullModeIconAssets() {
  if (!isFullMode()) return;

  slideshowToggleIcon?.querySelectorAll("img[data-src]").forEach((image) => {
    if (image.getAttribute("src")) return;
    image.src = image.dataset.src;
  });
}

viewButtons.forEach((button) => {
  if (isTemporaryWebsiteActive() && button !== temporaryInfoButton) return;

  button.addEventListener("click", () => {
    const view = button.dataset.view || "slideshow";

    if (view === "slideshow" && currentView === "slideshow") {
      isSlideshowToggleHoverSuppressed = true;
      slideshowToggle.classList.remove("is-icon-hovered");
      setSlideshowPaused(!isSlideshowPaused);
      return;
    }

    if (view === "slideshow") {
      isSlideshowToggleHoverSuppressed = true;
      slideshowToggle.classList.remove("is-icon-hovered");
      isSlideshowPaused = false;
      setView("slideshow", { focus: false, startAutoplay: true });
      updateSlideshowToggleButton();
      return;
    }

    setView(view, { focus: true });
  });
});

navPanel.addEventListener("click", handleTemporaryNavPanelClick);
homeLogoButton.addEventListener("click", goToHomepage);

aboutClose.addEventListener("click", () => setView("slideshow"));

menu2InfoMode.addEventListener("click", (event) => {
  const button = event.target.closest(".menu2-info-anchor");
  if (!button) return;

  const section = document.getElementById(button.dataset.anchor);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

initMenus();
initMenu2VersionToggle();
initVocabAnimationToggle();
initFlockingLogo();
if (isFullMode()) {
  loadMaterialSymbolsIfNeeded();
  hydrateFullModeIconAssets();
  initFullSiteEventListeners();
  loadLogoManifest();
  loadInfoMarkdown();
}
initSlideshow();

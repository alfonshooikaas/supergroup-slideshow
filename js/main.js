const SITE_URL = "https://super-group.eu";
const MANIFEST_URL = "/assets/work/manifest.json?v=20260606-media-support";
const LOGO_MANIFEST_URL = "/info/logos/manifest.json?v=20260606-asset-structure";
const INFO_MARKDOWN_VERSION = "20260608-info-page-final";
const FLOCKING_LOGO_URL = "/assets/supergroup/supergroup-logo.svg";
const MENU_2_VERSION_STORAGE_KEY = "supergroup_menu2_version";
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
const INFO_MENU_ANCHORS = [
  { id: "about", label: "About" },
  { id: "practice", label: "Practice" },
  { id: "recognition", label: "Recognition" },
  { id: "partners", label: "Partners" }
];

const slideshow = document.getElementById("supergroupSlideshow");
const navPanel = document.getElementById("supergroup-island-panel");
const metadataPanel = document.getElementById("supergroup-meta-panel");
const viewButtons = Array.from(document.querySelectorAll("[data-view]"));
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
let projectStoryRequestToken = 0;
let currentMenu2Version = getMenu2Version();
let currentMenu2V2ProjectKey = null;
const projectStoryCache = new Map();

function getMenu2Version() {
  try {
    const version = window.localStorage.getItem(MENU_2_VERSION_STORAGE_KEY);
    return version === "v2" ? "v2" : "v1";
  } catch (error) {
    return "v1";
  }
}

function setMenu2Version(version) {
  const normalizedVersion = version === "v2" ? "v2" : "v1";

  try {
    window.localStorage.setItem(MENU_2_VERSION_STORAGE_KEY, normalizedVersion);
  } catch (error) {
    // localStorage can be unavailable in some privacy contexts.
  }

  currentMenu2Version = normalizedVersion;
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

function renderContactIndex(target, text, options = {}) {
  if (!target) return;

  const hiddenFirstLine = options.hiddenFirstLine || "";
  const lines = String(text || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  const blocks = [];
  let currentBlock = [];

  target.textContent = "";

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const isHiddenHeading =
      index === 0 &&
      hiddenFirstLine &&
      trimmedLine.toLowerCase() === hiddenFirstLine.toLowerCase();

    if (isHiddenHeading) return;

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

  blocks.forEach((block) => {
    const column = document.createElement("div");
    column.className = "info-contact-block";

    block.forEach((line, index) => {
      if (index > 0) column.append(document.createElement("br"));
      column.append(document.createTextNode(line));
    });

    target.append(column);
  });
}

async function fetchMarkdown(path) {
  try {
    const response = await fetch(`${path}?v=${INFO_MARKDOWN_VERSION}`);
    if (!response.ok) return "";
    return response.text();
  } catch (error) {
    return "";
  }
}

async function loadInfoMarkdown() {
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

  renderMarkdown(infoEnglishContent, english);
  renderMarkdown(infoDutchContent, dutch);
  renderMarkdown(infoKoreanContent, korean);
  renderPlainTextIndex(infoClientsContent, clients, {
    hiddenFirstLine: "Selected Clients",
    groupHeadings: [
      "Culture & Knowledge",
      "Public & Institutional",
      "Architecture & Place",
      "Commercial & Brand",
      "Energy & Industry"
    ]
  });
  renderPublicationIndex(infoPublicationsContent, publications, {
    hiddenFirstLine: "Publications"
  });
  renderPlainTextIndex(infoExhibitionsContent, exhibitions, {
    hiddenFirstLine: "Exhibitions",
    rowClassName: "info-simple-row",
    spacerClassName: "info-simple-spacer"
  });
  renderPlainTextIndex(infoLecturesContent, lectures, {
    hiddenFirstLine: "Lectures & Teaching",
    rowClassName: "info-simple-row",
    spacerClassName: "info-simple-spacer"
  });
  renderLinkedTextIndex(infoPartnersContent, partners, {
    hiddenFirstLine: "Long-term Partners"
  });
  renderLinkedTextIndex(infoBrandsContent, brands, {
    hiddenFirstLine: "Brands & Labels"
  });
  renderPlainTextIndex(infoExperienceContent, experience, {
    hiddenFirstLine: "Built on experience from",
    rowClassName: "info-experience-row",
    spacerClassName: "info-experience-spacer",
    groupHeadings: [
      "2x4, New York",
      "Gretel, New York",
      "Project Projects, New York",
      "Total Design, Amsterdam",
      "Nick Bell Design, London"
    ]
  });
  renderContactIndex(infoContactContent, contact, {
    hiddenFirstLine: "Contact"
  });
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
  return currentMenu2Version === "v2";
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
    complexity: "",
    clarity: "",
    work: []
  };
  const fieldNames = new Set(["title", "complexity", "clarity", "work"]);
  let currentField = "";

  String(markdown || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .forEach((line) => {
      const match = line.match(/^([A-Za-z ]+):\s*(.*)$/);

      if (match && fieldNames.has(match[1].trim().toLowerCase())) {
        currentField = match[1].trim().toLowerCase();
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
    complexity: "",
    clarity: "",
    work: []
  };
}

async function fetchProjectStory(projectKey) {
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

function createMenu2StoryElement(story, asset) {
  const representative = getStoryAsset(asset);
  const folder = representative?.folder || asset?.folder || "";
  const folderData = parseFolderDisplayData(folder, {
    client: representative?.client || asset?.client,
    title: representative?.title || asset?.title,
    period: representative?.period || asset?.period
  });
  const storyElement = document.createElement("div");
  const title = document.createElement("h2");
  const meta = document.createElement("p");
  const sections = [
    createStorySection("Complexity", story.complexity),
    createStorySection("Clarity", story.clarity)
  ].filter(Boolean);
  const item = createStorySection("Item", getAssetDescription(asset));
  const itemCaption = item?.querySelector("p");

  storyElement.className = "menu2-story";
  storyElement.dataset.folder = folder;
  title.className = "menu2-story-title";
  title.textContent = folderData.projectTitle;
  meta.className = "menu2-story-meta";
  meta.textContent = [
    `${folderData.x} for ${folderData.client}`,
    folderData.period
  ].filter(Boolean).join(", ");
  storyElement.append(title, meta, ...sections);

  if (item && itemCaption) {
    item.classList.add("menu2-item");
    itemCaption.className = "menu2-item-caption";
    storyElement.append(item);
  }

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
  metadataPanel.classList.toggle("is-story-mode", !isVisible);

  if (isVisible) {
    const viewport = menu2SlideshowMode.querySelector(".menu2-story-viewport");
    if (viewport) viewport.textContent = "";
    currentMenu2V2ProjectKey = null;
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
  const asset = slideshowAssets[currentIndex];
  if (!asset) return;

  setMenu2V1Visible(false);
  const viewport = ensureMenu2StoryViewport();
  const projectKey = getProjectKey(asset);
  const previousProjectKey = currentMenu2V2ProjectKey;
  const shouldAnimate = options.animate !== false && Boolean(previousProjectKey) && previousProjectKey !== projectKey;

  console.log("[Menu2 V2] slide changed", {
    index: currentIndex,
    projectKey,
    previousProjectKey
  });

  if (previousProjectKey === projectKey && viewport.querySelector(".menu2-story")) {
    console.log("[Menu2 V2] updating item only");
    updateMenu2StoryItem(asset, direction);
    metadataPanel.dataset.storyItem = getAssetDescription(asset);
    return;
  }

  console.log("[Menu2 V2] updating full story");
  currentMenu2V2ProjectKey = projectKey;
  metadataPanel.dataset.storyFolder = projectKey;
  metadataPanel.dataset.storyItem = getAssetDescription(asset);

  const requestToken = projectStoryRequestToken + 1;
  projectStoryRequestToken = requestToken;
  const fallbackStory = getFallbackProjectStory(asset);
  const renderStory = (story, shouldAnimateStory = shouldAnimate) => {
    const incoming = createMenu2StoryElement(story, asset);
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
  if (requestToken !== projectStoryRequestToken || currentMenu2V2ProjectKey !== projectKey) return;

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

function setActiveInfoMenuAnchor(anchorId) {
  menu2InfoMode.querySelectorAll(".menu2-info-anchor").forEach((button) => {
    const isActive = button.dataset.anchor === anchorId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function getInfoAnchorSections() {
  return INFO_MENU_ANCHORS
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

  INFO_MENU_ANCHORS.forEach((anchor) => {
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
  currentMenu2V2ProjectKey = null;

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

function updateMenu2ForView(view, options = {}) {
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

  buildContactSheet(slideshowAssets, "all");
  setMenu2V1Visible(!isMenu2StoryMode());
  updateMetadataMenu("forward", { animate: false });
  setMenu2Mode("slideshow", options);
}

async function loadLogoManifest() {
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
  if (hasOpenOverlay()) return;

  const rect = slideshow.getBoundingClientRect();
  const isPreviousSide = event.clientX - rect.left < rect.width / 2;

  slideshow.classList.toggle("cursor-prev", isPreviousSide);
  slideshow.classList.toggle("cursor-next", !isPreviousSide);
}

function handleSlideshowClick(event) {
  if (event.target.closest(".island-panel") || hasOpenOverlay()) return;
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
  if (hasOpenOverlay()) return;

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

function createIntroSlide(asset, index) {
  const slide = document.createElement("article");
  const text = document.createElement("p");

  slide.className = "slideshow-slide slide-intro";
  slide.dataset.assetRole = "intro";
  slide.style.setProperty("--slide-bg", "#000");
  text.className = "intro-slide-text";
  text.textContent = "supergroup, navigating complex environments";

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
  viewButtons.forEach((button) => {
    const isActive = button.dataset.view === currentView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  updateSlideshowToggleButton();
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

viewButtons.forEach((button) => {
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
homeLogoButton.addEventListener("click", goToHomepage);

aboutClose.addEventListener("click", () => setView("slideshow"));
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
initFlockingLogo();
loadLogoManifest();
loadInfoMarkdown();
initSlideshow();

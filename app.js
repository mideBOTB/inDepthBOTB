const STORAGE_KEY = "battle-of-the-brains-pitch";

const defaultContent = {
  tagline: "Norfolk State University | HBCU BOTB 2026",
  ventureName: "inDepth for eBay",
  oneLiner:
    "A B2B monitoring copilot that helps eBay audit AI-assisted shopping answers for visibility, accuracy, trust, and conversion risk.",
  targetAudience: "eBay marketplace, merchant, and digital strategy teams",
  businessModel: "B2B SaaS with monitoring tiers, reporting, and enterprise support",
  stage: "Prototype demo with browser extension roadmap",
  problem:
    "Customers are starting product discovery inside AI assistants instead of traditional search, but brands like eBay can be omitted, inaccurately described, or unfairly compared before the customer ever reaches their platform.",
  urgency:
    "As AI-assisted shopping grows, product visibility, factual accuracy, and trust move upstream into the AI answer itself. If eBay is misrepresented there, clicks, conversions, and customer trust can all decline before the company sees the problem.",
  solution:
    "inDepth is a monitoring copilot for AI-assisted shopping. It ingests text prompts and uploaded screenshots, audits how eBay products appear in AI answers, flags misinformation or omission, and recommends corrective content or catalog actions.",
  valueProposition:
    "Instead of waiting for traffic loss or trust erosion, eBay gains an early-warning system that shows where AI shopping answers are helping, hurting, or ignoring the brand.",
  demoTitle: "inDepth Audit Flow",
  demoInstructions:
    "Use the pitch deck to explain the business case, then send judges and the crowd to the separate live demo to experience the audit flow directly.",
  mobileAppTitle: "inDepth Live Demo",
  mobileIntro:
    "The live demo lets users upload AI shopping evidence, describe the shopping query, and see how inDepth flags trust and visibility issues in real time.",
  mobilePresenterCue:
    "Keep this section as a preview only. During the pitch, use a QR code or direct link to move the audience into the standalone live demo.",
  mobileWhyItWorks:
    "The concept lands quickly because judges can see the business logic here, then watch the live app perform the audit instead of hearing it described abstractly.",
  mobileFlow:
    "Open the live app, upload AI evidence, submit the shopping prompt, review the audit, and track the recommended corrections or escalation steps.",
  qrPrompt: "Scan to launch the live inDepth demo",
  crowdPrompt:
    "Invite the audience to react to the problem, the trust risk, or the live demo and share where they think AI shopping needs more accountability.",
  journeyCustomer1:
    "Step 1: An eBay team member uploads a screenshot of an AI shopping answer and enters the prompt that triggered it.",
  journeyCustomer2:
    "Step 2: inDepth reviews the evidence, checks for omission, inaccurate facts, unfair comparisons, and trust risk, then generates a structured audit.",
  journeyCustomer3:
    "Step 3: The team receives recommended actions, monitoring insights, and escalation guidance before the issue grows into lost trust or conversion.",
  journeyOperations1:
    "Operations view: Each audit is logged into a monitoring workflow so eBay teams can detect recurring visibility gaps across product categories and prompts.",
  journeyOperations2:
    "Operations view: The platform validates product facts, highlights where content updates may be needed, and routes higher-risk cases to a strategist or trust reviewer.",
  journeyOperations3:
    "Operations view: Over time, teams use the data to improve accuracy, inclusion in AI answers, and customer trust across the marketplace.",
  journeyImpact1:
    "Impact snapshot: inDepth protects visibility in AI-assisted shopping by showing where eBay is missing, mischaracterized, or unfairly ranked.",
  journeyImpact2:
    "Impact snapshot: Monthly monitoring helps teams connect AI-answer quality to trust, traffic, and conversion outcomes.",
  journeyImpact3:
    "Impact snapshot: The product combines monitoring, ethics safeguards, and human escalation so AI commerce becomes more trustworthy and fair over time.",
  market:
    "The initial market is enterprise retail and marketplace teams that depend on product discovery, digital shelf visibility, and brand trust. eBay is the sponsor-aligned starting point, with expansion potential to other retail ecosystems.",
  customers:
    "Primary users include marketplace strategy teams, digital merchandising teams, trust and safety groups, and brand or category managers responsible for visibility and conversion.",
  competition:
    "Generic AI tools like ChatGPT can analyze text, but they are not built for ongoing AI-shopping monitoring, structured visibility audits, or sponsor-specific reporting. Competitors like Willow may address adjacent workflows, but inDepth is positioned around AI discovery trust, monitoring, and actionability.",
  revenue:
    "Revenue can come from SaaS subscriptions priced by monitoring volume, reporting depth, and enterprise support, with premium tiers for multi-category audits and human review workflows.",
  goToMarket:
    "The go-to-market strategy starts with sponsor-aligned pilot use cases at eBay, demonstrates value through monitored categories, then expands through enterprise retail partnerships and browser-extension adoption.",
  traction:
    "Current traction is concept validation, a working interactive prototype, and a clear sponsor-aligned use case tied to the 2026 HBCU Battle of the Brains prompt.",
  partnerships:
    "Potential partnerships include eBay internal teams, AI trust stakeholders, digital commerce advisors, and future retail partners interested in AI-discovery visibility.",
  roadmap:
    "Phase one is the monitoring chatbot demo. Phase two adds deeper reporting and validation workflows. Phase three evolves into a browser extension that lets teams audit AI-assisted shopping directly where discovery happens.",
  impact:
    "inDepth improves trust in AI-assisted shopping by helping businesses detect misinformation early, improve product inclusion, and create more accurate customer pathways to discovery.",
  team:
    "This team combines business strategy, storytelling, product vision, and user-centered thinking to translate a fast-moving AI-commerce problem into a practical sponsor-relevant solution.",
  roles:
    "Team roles can be framed around product lead, business strategy, market research, finance, storytelling, design, and technical prototype support.",
  askTitle: "Why inDepth Wins",
  askBody:
    "inDepth gives eBay a practical way to monitor AI-assisted product discovery before trust, traffic, and conversion are lost. It is sponsor-relevant, technically feasible, and built around the future of AI commerce.",
};

const panel = document.getElementById("editor-panel");
const openButton = document.getElementById("edit-toggle");
const closeButton = document.getElementById("close-editor");
const resetButton = document.getElementById("reset-button");
const form = document.getElementById("editor-form");
const journeyTitle = document.getElementById("journey-title");
const journeyCopy = document.getElementById("journey-copy");
const demoStatus = document.getElementById("demo-status");
const modeSummary = document.getElementById("mode-summary");
const prevStepButton = document.getElementById("prev-step");
const nextStepButton = document.getElementById("next-step");
const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
const scenarioForm = document.getElementById("scenario-form");
const generatedHeadline = document.getElementById("generated-headline");
const generatedSummary = document.getElementById("generated-summary");
const generatedProblem = document.getElementById("generated-problem");
const generatedSolution = document.getElementById("generated-solution");
const outputUser = document.getElementById("output-user");
const outputAction = document.getElementById("output-action");
const outputOutcome = document.getElementById("output-outcome");
const imageUpload = document.getElementById("image-upload");
const previewImage = document.getElementById("preview-image");
const previewText = document.getElementById("preview-text");
const imagePreview = document.getElementById("image-preview");
const chatForm = document.getElementById("chat-form");
const chatQuery = document.getElementById("chat-query");
const chatResponse = document.getElementById("chat-response");
const resultCount = document.getElementById("result-count");
const resultList = document.getElementById("result-list");
const crowdForm = document.getElementById("crowd-form");
const crowdCount = document.getElementById("crowd-count");
const crowdList = document.getElementById("crowd-list");

const journeyLabels = {
  customer: "Customer Journey",
  operations: "Operations View",
  impact: "Impact Snapshot",
};

const fallbackScenario = {
  user: "students",
  problem: "they struggle with a major challenge that current options handle poorly",
  solution: "a digital platform that improves access and simplifies the experience",
  action: "submit a request",
  outcome: "get a faster and better result",
};

let currentMode = "customer";
let currentStep = 0;
let uploadedImageName = "";
let uploadedImageUrl = "";
let crowdResponses = [];

function loadContent() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return { ...defaultContent };
  }

  try {
    return { ...defaultContent, ...JSON.parse(saved) };
  } catch {
    return { ...defaultContent };
  }
}

function saveContent(content) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

function renderContent(content) {
  document.querySelectorAll("[data-field]").forEach((node) => {
    const key = node.dataset.field;
    node.textContent = content[key] ?? "";
  });
}

function populateForm(content) {
  Object.entries(content).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) {
      field.value = value;
    }
  });
}

function setPanelState(isOpen) {
  panel.classList.toggle("open", isOpen);
  panel.setAttribute("aria-hidden", String(!isOpen));
}

function getJourneySteps(currentContent, mode) {
  if (mode === "operations") {
    return [
      currentContent.journeyOperations1,
      currentContent.journeyOperations2,
      currentContent.journeyOperations3,
    ];
  }

  if (mode === "impact") {
    return [
      currentContent.journeyImpact1,
      currentContent.journeyImpact2,
      currentContent.journeyImpact3,
    ];
  }

  return [
    currentContent.journeyCustomer1,
    currentContent.journeyCustomer2,
    currentContent.journeyCustomer3,
  ];
}

function renderJourney(currentContent) {
  const steps = getJourneySteps(currentContent, currentMode);
  const stepCount = steps.length;
  const stepNumber = currentStep + 1;
  journeyTitle.textContent = `${journeyLabels[currentMode]}: Step ${stepNumber}`;
  journeyCopy.textContent = steps[currentStep] ?? "";
  demoStatus.textContent = `Step ${stepNumber} of ${stepCount}`;
  modeSummary.textContent = `Use this mode to explain the ${journeyLabels[
    currentMode
  ].toLowerCase()} during the pitch.`;

  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === currentMode);
  });

  prevStepButton.disabled = currentStep === 0;
  nextStepButton.textContent =
    currentStep === stepCount - 1 ? "Restart Flow" : "Next Step";
}

function getScenarioValues() {
  if (!scenarioForm) {
    return { ...fallbackScenario };
  }

  const formData = new FormData(scenarioForm);
  return {
    user: formData.get("user")?.toString().trim() || fallbackScenario.user,
    problem:
      formData.get("problem")?.toString().trim() || fallbackScenario.problem,
    solution:
      formData.get("solution")?.toString().trim() || fallbackScenario.solution,
    action: formData.get("action")?.toString().trim() || fallbackScenario.action,
    outcome:
      formData.get("outcome")?.toString().trim() || fallbackScenario.outcome,
  };
}

function buildScenarioJourneys(scenario) {
  return {
    customer: [
      `${scenario.user} open the experience because ${scenario.problem}.`,
      `They ${scenario.action} using ${scenario.solution}.`,
      `The platform responds so they ${scenario.outcome}.`,
    ],
    operations: [
      `The business receives each request from ${scenario.user} in one shared workflow.`,
      `The team processes the request using ${scenario.solution} and tracks progress in real time.`,
      `Operations improve as the business learns which steps lead users to ${scenario.outcome}.`,
    ],
    impact: [
      `The impact dashboard shows how often ${scenario.user} engage with the service.`,
      `Each interaction is tied to the core problem: ${scenario.problem}.`,
      `The long-term result is clearer because users consistently ${scenario.outcome}.`,
    ],
  };
}

function applyScenarioOutput() {
  const scenario = getScenarioValues();
  const journeys = buildScenarioJourneys(scenario);
  const steps = journeys[currentMode];
  const stepCount = steps.length;
  const safeStep = Math.min(currentStep, stepCount - 1);

  generatedHeadline.textContent = `${scenario.user} -> ${scenario.outcome}`;
  generatedSummary.textContent = `${scenario.user} use ${scenario.solution} to ${scenario.action}, which helps them ${scenario.outcome}.`;
  generatedProblem.textContent = `${scenario.user} need help because ${scenario.problem}.`;
  generatedSolution.textContent = `${scenario.solution} makes it possible for them to ${scenario.action} and ${scenario.outcome}.`;
  outputUser.textContent = scenario.user;
  outputAction.textContent = scenario.action;
  outputOutcome.textContent = scenario.outcome;

  journeyTitle.textContent = `${journeyLabels[currentMode]}: Step ${safeStep + 1}`;
  journeyCopy.textContent = steps[safeStep];
  demoStatus.textContent = `Step ${safeStep + 1} of ${stepCount}`;
  modeSummary.textContent = `This mode now reflects the generated ${journeyLabels[
    currentMode
  ].toLowerCase()} for your latest input.`;

  prevStepButton.disabled = safeStep === 0;
  nextStepButton.textContent =
    safeStep === stepCount - 1 ? "Restart Flow" : "Next Step";
}

function formatKeyword(text, fallback) {
  const clean = text.trim();
  return clean || fallback;
}

function buildMockSearchResults(query, scenario) {
  const user = formatKeyword(scenario.user, "users");
  const solution = formatKeyword(scenario.solution, "the platform");
  const action = formatKeyword(scenario.action, "take action");
  const outcome = formatKeyword(scenario.outcome, "get results");
  const prompt = formatKeyword(query, "find the best match");

  return [
    {
      title: `Best match for ${prompt}`,
      body: `${solution} identifies the strongest option for ${user} so they can ${action} and ${outcome}.`,
    },
    {
      title: "Recommended next step",
      body: `The assistant suggests a follow-up based on the uploaded image and guides ${user} toward the most relevant choice.`,
    },
    {
      title: "Why this result matters",
      body: `This result connects the image to the problem space and shows how the business creates value in real time.`,
    },
  ];
}

function renderMockResults(results) {
  if (!resultList || !resultCount) {
    return;
  }

  resultCount.textContent = `${results.length} matches`;
  resultList.innerHTML = "";

  results.forEach((result) => {
    const card = document.createElement("article");
    card.className = "result-item";
    card.innerHTML = `<strong>${result.title}</strong><p>${result.body}</p>`;
    resultList.appendChild(card);
  });
}

function renderCrowdResponses() {
  if (!crowdList || !crowdCount) {
    return;
  }

  crowdCount.textContent = `${crowdResponses.length} responses`;
  crowdList.innerHTML = "";

  crowdResponses
    .slice()
    .reverse()
    .forEach((response) => {
      const item = document.createElement("article");
      item.className = "crowd-item";
      item.innerHTML = `<strong>${response.name}</strong><p>${response.reaction}</p>`;
      crowdList.appendChild(item);
    });
}

function updatePreview(file) {
  if (!file || !previewImage || !previewText || !imagePreview) {
    return;
  }

  uploadedImageName = file.name;

  if (uploadedImageUrl) {
    URL.revokeObjectURL(uploadedImageUrl);
  }

  uploadedImageUrl = URL.createObjectURL(file);
  previewImage.src = uploadedImageUrl;
  previewText.textContent = file.name;
  imagePreview.classList.remove("empty");
  imagePreview.classList.add("has-image");
}

function analyzeImageDemo() {
  if (!chatResponse) {
    return;
  }

  const scenario = getScenarioValues();
  const query = chatQuery?.value?.trim() || "find the best match";
  const imageName = uploadedImageName || "the uploaded image";
  const user = formatKeyword(scenario.user, "users");
  const problem = formatKeyword(scenario.problem, "solve a common problem");
  const solution = formatKeyword(scenario.solution, "the platform");
  const outcome = formatKeyword(scenario.outcome, "get the right result");

  chatResponse.textContent = `Based on ${imageName}, the assistant is treating this as a request to "${query}". For ${user}, the likely need is to ${problem}. ${solution} would now return guided matches so the user can ${outcome}.`;

  renderMockResults(buildMockSearchResults(query, scenario));
}

let content = loadContent();
renderContent(content);
populateForm(content);
renderJourney(content);
applyScenarioOutput();
renderMockResults([]);
renderCrowdResponses();

openButton.addEventListener("click", () => {
  setPanelState(true);
});

closeButton.addEventListener("click", () => {
  setPanelState(false);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  content = Object.fromEntries(formData.entries());
  saveContent(content);
  renderContent(content);
  currentStep = 0;
  renderJourney(content);
  applyScenarioOutput();
  setPanelState(false);
});

resetButton.addEventListener("click", () => {
  content = { ...defaultContent };
  saveContent(content);
  populateForm(content);
  renderContent(content);
  currentMode = "customer";
  currentStep = 0;
  renderJourney(content);
  if (scenarioForm) {
    scenarioForm.reset();
  }
  applyScenarioOutput();
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentMode = button.dataset.mode;
    currentStep = 0;
    applyScenarioOutput();
  });
});

prevStepButton.addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  applyScenarioOutput();
});

nextStepButton.addEventListener("click", () => {
  const lastStepIndex = buildScenarioJourneys(getScenarioValues())[currentMode]
    .length - 1;
  currentStep = currentStep >= lastStepIndex ? 0 : currentStep + 1;
  applyScenarioOutput();
});

if (scenarioForm) {
  scenarioForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentStep = 0;
    applyScenarioOutput();
    analyzeImageDemo();
  });

  scenarioForm.addEventListener("input", () => {
    currentStep = 0;
    applyScenarioOutput();
  });
}

if (imageUpload) {
  imageUpload.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) {
      updatePreview(file);
      analyzeImageDemo();
    }
  });
}

if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    analyzeImageDemo();
  });
}

if (crowdForm) {
  crowdForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(crowdForm);
    const name = formData.get("name")?.toString().trim() || "Audience guest";
    const reaction =
      formData.get("reaction")?.toString().trim() ||
      "Interested in trying the mobile demo.";

    crowdResponses.push({ name, reaction });
    renderCrowdResponses();
    crowdForm.reset();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setPanelState(false);
  }
});

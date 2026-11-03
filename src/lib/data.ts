import type { SceneId } from "@/graphics/engine/sceneRegistry";

export const brand = {
  id: "SARANSH.EXE",
  subtitle: "PERSONAL ENGINEERING PORTFOLIO / INDIA",
  name: "Saransh Jajoo",
  headline: "Engineering Intelligence Beyond Boundaries.",
  roleLine:
    "AI & Machine Learning Engineer | Computer Vision | Embedded Systems & IoT",
  disciplinesTag: "// AI • ML • COMPUTER VISION • EMBEDDED • IoT",
  disciplines: [
    "AI & Machine Learning",
    "Computer Vision",
    "Embedded Systems",
    "IoT",
    "Backend & Software Engineering",
  ],
  intro:
    "I build intelligent systems combining AI, computer vision, embedded hardware, and scalable software to solve real-world engineering problems.",
  resumeSummary:
    "Computer Science Engineering undergraduate with interests in Embedded Systems, IoT, Robotics, and Artificial Intelligence. Passionate about designing and developing innovative engineering solutions that combine hardware and software to address real-world challenges while continuously learning and applying emerging technologies.",
  aboutParagraphs: [
    "I build intelligent systems at the intersection of artificial intelligence, computer vision, embedded hardware, IoT, and software engineering.",
    "My work involves developing machine learning applications, intelligent video analytics, connected hardware systems, sensor-based monitoring solutions, and scalable software architectures.",
    "I enjoy understanding engineering problems from their fundamentals and translating ideas into practical, working implementations that connect digital intelligence with the physical world.",
  ],
  philosophy: [
    {
      code: "01",
      title: "First-Principles Systems Thinking",
      detail:
        "Understanding the full signal chain—from physical sensors and microcontroller registers to backend APIs, vector indexes, and model inference.",
    },
    {
      code: "02",
      title: "Hardware + Software Co-Design",
      detail:
        "Building architectures where embedded firmware (ESP32/ESP8266), edge telemetry (MQTT/WebRTC), and cloud AI services operate as one cohesive system.",
    },
    {
      code: "03",
      title: "Honest Engineering Execution",
      detail:
        "Prioritizing real prototypes, inspectable pipelines, and measured latency/readability gains over inflated claims.",
    },
  ],
  statusFooter: {
    disciplines: "AI / ML / CV / EMBEDDED / IOT",
    focus: "COMPUTER VISION & INTELLIGENT SYSTEMS",
    status: "STATUS: BUILDING",
  },
  education: {
    school:
      "Annasaheb Dange College of Engineering and Technology (ADCET), Ashta",
    degree: "B.Tech in Computer Science Engineering",
    years: "2023 – Present",
    cgpa: "8.35/10",
  },
  contact: {
    email: "saranshjajoo42@gmail.com",
    phone: "+91-8080301842",
    github: "https://github.com/Saransh-Jajoo",
    resumePdf: "/assets/Saransh_Resume_Saakh.pdf",
    portraitSrc: "/assets/saransh-original.jpg",
  },
} as const;

export const nav = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/skills", label: "SKILLS" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/achievements", label: "ACHIEVEMENTS" },
  { href: "/contact", label: "CONTACT" },
] as const;

export type ProjectMetric = {
  label: string;
  value: string;
  kind: "target" | "measured" | "architecture";
};

export type Project = {
  slug: string;
  code: string;
  name: string;
  subtitle: string;
  category: string;
  scene: SceneId;
  accent: string;
  status: string;
  summary: string;
  problem: string;
  approach: string[];
  architecture: string[];
  features: string[];
  contributions: string[];
  technologies: string[];
  resultsNote: string;
  metrics: ProjectMetric[];
  codeExcerpt: string;
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "aura-cx",
    code: "SYS // 01",
    name: "AURA-CX",
    subtitle: "AI-Powered Omnichannel Customer Experience Orchestrator",
    category: "AI • SaaS • Backend Engineering",
    scene: "omnichannel",
    accent: "#9B7CFF",
    status: "Architecture & Prototype Platform",
    summary:
      "An AI-powered customer support platform integrating 4+ communication channels into a unified support command center with vector-similarity identity resolution and hybrid RAG.",
    problem:
      "Customer conversations arrive fragmented across voice, email, chat, and messaging channels. Support teams lose context across channel switches, causing slow responses and repeated identity verification.",
    approach: [
      "Normalize events from 4+ communication channels into a unified ingestion pipeline.",
      "Use vector-similarity matching in Pinecone to resolve fragmented customer identities into a single 360-degree profile.",
      "Combine structured PostgreSQL/Redis state with semantic retrieval (hybrid RAG) before orchestrating AI-assisted responses with Gemini.",
    ],
    architecture: [
      "Multi-Channel Ingestion Adapters (4+ Channels)",
      "Vector-Similarity Identity Resolution Engine (Pinecone)",
      "360-Degree Customer Profile Store (PostgreSQL + Redis)",
      "Hybrid Retrieval-Augmented Generation Pipeline (Gemini + FastAPI)",
      "Sentiment Analytics & Customer Clustering Workflows",
      "Unified Operator Command Center",
    ],
    features: [
      "4+ communication channel integration into one command center",
      "Vector-similarity customer identity resolution",
      "Unified 360-degree customer context profiles",
      "Real-time sentiment analytics and customer clustering",
      "Hybrid RAG response assistance",
    ],
    contributions: [
      "Architected the omnichannel support platform integrating 4+ communication channels.",
      "Developed vector-similarity-based identity resolution to construct 360-degree customer profiles across fragmented channels.",
      "Engineered sentiment analytics and clustering workflows designed around clear response-time, automation, and retention targets.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Gemini",
      "Pinecone",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Vector Search",
    ],
    resultsNote:
      "Designed around engineering targets of ~180-second response time, 70% Tier-1 support automation, and 15% churn reduction. These are clearly labeled as design targets rather than verified production metrics.",
    metrics: [
      { label: "Response-Time Target", value: "~180s", kind: "target" },
      { label: "Tier-1 Automation Target", value: "70%", kind: "target" },
      { label: "Churn Reduction Target", value: "15%", kind: "target" },
    ],
    codeExcerpt: `// AURA-CX: Vector identity resolution + hybrid RAG orchestration
async function handleInboundChannelEvent(event: ChannelEvent) {
  const vector = await embedder.encode(event.transcript);
  const identity = await identityResolver.matchOrMerge(event.sender, vector);
  const profile360 = await profileStore.get360Profile(identity.customerId);
  const contextChunks = await pinecone.query({ vector, topK: 5 });
  return geminiOrchestrator.draftResponse({ event, profile360, contextChunks });
}`,
  },
  {
    slug: "computer-vision",
    code: "SYS // 02",
    name: "Computer Vision & CCTV Analytics",
    subtitle: "Multi-Object Tracking, Trajectory Analysis & WebRTC Streaming",
    category: "AI • Computer Vision • Video Analytics",
    scene: "computer-vision",
    accent: "#56D8FF",
    status: "Experimental Video Analytics Pipeline",
    summary:
      "Intelligent video analytics pipeline combining CCTV stream ingestion, YOLO object detection, Norfair multi-object tracking, trajectory/displacement analysis, and low-latency WebRTC delivery via MediaMTX.",
    problem:
      "Raw CCTV feeds generate continuous video streams without structured spatial telemetry. Turning raw frames into actionable movement intelligence requires coupling detection with persistent multi-object tracking and low-latency delivery.",
    approach: [
      "Ingest RTSP/CCTV feeds into an OpenCV frame processing pipeline.",
      "Run YOLO object detection for person and vehicle classes and pass centroids/boxes into Norfair for persistent multi-object tracking.",
      "Compute object trajectories and frame-to-frame displacement vectors, streaming annotated output via MediaMTX and WebRTC with AWS SageMaker inference integration.",
    ],
    architecture: [
      "CCTV / RTSP Video Stream Ingestion",
      "OpenCV Frame Decoding & Preprocessing",
      "YOLO Person & Vehicle Detection Stage",
      "Norfair Multi-Object Tracker & ID Persistence",
      "Trajectory & Displacement Vector Analytics",
      "MediaMTX + WebRTC Low-Latency Stream Delivery",
      "AWS SageMaker Cloud Inference Integration",
    ],
    features: [
      "Person and vehicle bounding-box detection with YOLO",
      "Persistent tracking IDs across frames using Norfair",
      "Object trajectory trails and displacement analysis",
      "Low-latency WebRTC video streaming through MediaMTX",
      "AWS SageMaker inference integration path",
    ],
    contributions: [
      "Built the CCTV ingestion, YOLO detection, and Norfair multi-object tracking pipeline.",
      "Implemented object trajectory history and movement displacement analysis.",
      "Integrated MediaMTX and WebRTC for real-time stream viewing alongside AWS SageMaker inference experiments.",
    ],
    technologies: [
      "Python",
      "YOLO",
      "Norfair",
      "OpenCV",
      "WebRTC",
      "MediaMTX",
      "AWS SageMaker",
    ],
    resultsNote:
      "Experimental engineering pipeline and interactive procedural simulation. No fabricated mAP percentages, FPS claims, or commercial deployment metrics are stated.",
    metrics: [
      { label: "Detection & Tracking", value: "YOLO + Norfair", kind: "architecture" },
      { label: "Stream Transport", value: "MediaMTX / WebRTC", kind: "architecture" },
      { label: "Cloud Inference", value: "AWS SageMaker", kind: "architecture" },
    ],
    codeExcerpt: `# YOLO detection -> Norfair tracking -> trajectory displacement
detections = yolo_detector(frame)
norfair_inputs = [Detection(points=bbox_center(d.box)) for d in detections]
tracked = tracker.update(detections=norfair_inputs)
for obj in tracked:
    trajectories[obj.id].append(obj.estimate[0])
    displacement = np.linalg.norm(trajectories[obj.id][-1] - trajectories[obj.id][0])`,
  },
  {
    slug: "punarjal",
    code: "SYS // 03",
    name: "PunarJAL",
    subtitle: "IoT-Enabled Greywater Management System",
    category: "IoT • Embedded Systems • Sustainability",
    scene: "water-treatment",
    accent: "#4285FF",
    status: "Award-Winning IoT Hardware Prototype",
    summary:
      "An IoT-enabled greywater treatment and 24×7 water-quality monitoring solution focused on sustainable water reuse across residential, institutional, and community deployments.",
    problem:
      "Domestic and institutional greywater is frequently wasted or discharged untreated because conventional systems lack affordable automated sensing, stage-wise treatment control, and continuous quality visibility.",
    approach: [
      "Integrate real-time environmental and water-quality sensors across filtration and treatment stages.",
      "Automate pump and valve actuation on the microcontroller while streaming 24×7 quality telemetry for supervision.",
      "Design a modular architecture scalable from single households to institutional and community installations.",
    ],
    architecture: [
      "Greywater Inlet & Primary Screening Stage",
      "Multi-Stage Filtration & Treatment Chambers",
      "Real-Time Environmental & Water-Quality Sensor Array",
      "Microcontroller Automated Treatment Control Unit",
      "24×7 IoT Telemetry & Quality Monitoring Dashboard",
      "Safe Reuse Storage & Discharge Routing",
    ],
    features: [
      "Automated sensing and stage-wise treatment control",
      "24×7 real-time water quality monitoring via environmental sensors",
      "Closed-loop valve/pump actuation for safe reuse routing",
      "Scalable architecture for residential, institutional, and community deployment",
    ],
    contributions: [
      "Developed the IoT-enabled greywater treatment and monitoring architecture focused on sustainable water reuse.",
      "Implemented automated sensing and treatment control supporting 24×7 water-quality monitoring through real-time environmental sensors.",
      "Designed a scalable deployment model suitable for residential, institutional, and community-scale use.",
    ],
    technologies: [
      "ESP32",
      "Embedded C/C++",
      "Environmental Sensors",
      "Sensor Interfacing",
      "GPIO / ADC",
      "MQTT / IoT Telemetry",
    ],
    resultsNote:
      "Validated in national and university hackathons (ADCET Hackathon 2025 Winner, SIH hardware prototyping). Telemetry values in the canvas preview are illustrative.",
    metrics: [
      { label: "Quality Monitoring", value: "24×7 Real-Time", kind: "architecture" },
      { label: "Deployment Scale", value: "3-Tier Scalable", kind: "architecture" },
    ],
    codeExcerpt: `// PunarJAL automated sensing & treatment routing loop
WaterMetrics m = sampleQualitySensors();
if (m.turbidity <= TURBIDITY_SAFE && m.ph >= 6.5f && m.ph <= 8.5f) {
  actuateValve(ROUTE_REUSE_TANK, HIGH);
} else {
  actuateValve(ROUTE_RECIRCULATE, HIGH);
}
publishTelemetry("punarjal/node01/quality", m);`,
  },
  {
    slug: "sensicold",
    code: "SYS // 04",
    name: "SensiCold",
    subtitle: "Smart Portable IoT-Based Cold Storage System",
    category: "IoT • Embedded Systems • AgriTech",
    scene: "cold-storage",
    accent: "#FFD477",
    status: "Embedded Control & Virtual Prototype",
    summary:
      "A modular portable cold-storage solution with a crop-specific, one-unit-per-crop design powered by ESP32 and 4+ environmental sensors for adaptive storage condition management.",
    problem:
      "Shared cold-storage facilities force different crops into a single temperature and humidity regime, causing premature spoilage for produce that requires isolated micro-climates.",
    approach: [
      "Architect a modular, one-unit-per-crop portable enclosure so each crop maintains an independent environmental envelope.",
      "Use an ESP32 embedded control system interfacing 4+ environmental sensors for real-time monitoring and adaptive actuator control.",
      "Pair the hardware controller with a cross-platform IoT monitoring app for crop configuration and multi-unit supervision, alongside a virtual engineering prototype for hardware validation.",
    ],
    architecture: [
      "Modular One-Unit-Per-Crop Insulated Chamber",
      "ESP32 Embedded Controller",
      "4+ Environmental Sensors (I2C / ADC)",
      "PWM Cooling & Airflow Actuator Drivers",
      "Adaptive Crop-Specific Setpoint Controller",
      "Cross-Platform Multi-Unit Supervision App & Virtual Prototype",
    ],
    features: [
      "Crop-specific, one-unit-per-crop modular cold storage design",
      "ESP32 embedded control interfacing 4+ environmental sensors",
      "Real-time actuator control and adaptive condition management",
      "Cross-platform IoT application with crop configuration and multi-unit supervision",
      "Virtual engineering prototype for hardware validation",
    ],
    contributions: [
      "Architected the modular portable cold-storage system with a crop-specific, one-unit-per-crop design.",
      "Built the ESP32-powered embedded control system interfacing 4+ environmental sensors for real-time monitoring and actuator control.",
      "Developed the cross-platform IoT monitoring application and virtual engineering prototype for hardware validation.",
    ],
    technologies: [
      "ESP32",
      "Embedded C/C++",
      "4+ Environmental Sensors",
      "I2C",
      "ADC",
      "PWM",
      "Actuator Control",
      "IoT Monitoring App",
    ],
    resultsNote:
      "Validated through embedded sensor/actuator prototyping and a virtual engineering prototype.",
    metrics: [
      { label: "Sensor Array", value: "4+ Env Sensors", kind: "architecture" },
      { label: "Storage Topology", value: "1 Unit / Crop", kind: "architecture" },
    ],
    codeExcerpt: `// SensiCold adaptive crop-envelope control loop
CropConfig cfg = loadCropProfile(activeCropId);
EnvState env = readEnvironmentalBus(); // 4+ sensors over I2C/ADC
float tempErr = env.temperature - cfg.targetTemp;
uint8_t coolingDuty = computeAdaptivePWM(tempErr, env.humidity, cfg);
pwmWrite(PELTIER_CH, coolingDuty);
syncSupervisorApp(unitId, env, coolingDuty);`,
  },
  {
    slug: "p10-rgb-display",
    code: "SYS // 05",
    name: "P10 RGB Display System",
    subtitle: "Industrial LED Matrix Driver & Sub-200ms Live Data Engine",
    category: "Embedded Systems • Firmware Optimization",
    scene: "p10-display",
    accent: "#FF5E5E",
    status: "Industrial Internship Deployment",
    summary:
      "Industrial P10 RGB LED display systems built on ESP8266 and ESP32 microcontrollers featuring custom pixel-level rendering optimization and sub-200 ms live web data feed integration.",
    problem:
      "Industrial P10 RGB LED panels driven by microcontrollers often suffer from poor glyph contrast, scanline ghosting, and display stutter when fetching live web data feeds.",
    approach: [
      "Engineer custom pixel-level glyph rendering and contrast tuning tailored to physical P10 RGB LED matrix geometry.",
      "Separate high-frequency HUB75 multiplex scanning from asynchronous web-feed ingestion on ESP8266 and ESP32.",
    ],
    architecture: [
      "Real-Time Web Data Feed Client",
      "ESP8266 / ESP32 Microcontroller Core",
      "Custom Pixel-Level Framebuffer & Font Renderer",
      "Multiplexed HUB75 High-Speed Row/Column Driver",
      "Industrial P10 RGB LED Matrix Array",
    ],
    features: [
      "ESP8266 and ESP32 firmware for industrial P10 RGB LED matrices",
      "Custom pixel-level rendering optimization (+30–40% readability)",
      "Real-time web data feed integration (< 200 ms refresh latency)",
      "Flicker-free multiplexed scan timing",
    ],
    contributions: [
      "Developed industrial P10 RGB LED display systems using ESP8266 and ESP32 microcontrollers at iThink Software Labs.",
      "Improved display readability by 30–40% through custom pixel-level rendering optimization.",
      "Integrated real-time web data feeds achieving sub-200 ms refresh latency.",
    ],
    technologies: [
      "ESP32",
      "ESP8266",
      "Embedded C/C++",
      "P10 RGB LED Matrix",
      "GPIO / SPI",
      "Pixel-Level Rendering",
      "Real-Time Web Feeds",
    ],
    resultsNote:
      "Completed during the Embedded Systems Internship at iThink Software Labs (Jun 2025 – Sept 2025) with reported 30–40% readability improvement and sub-200 ms refresh latency.",
    metrics: [
      { label: "Readability Improvement", value: "30–40%", kind: "measured" },
      { label: "Web Feed Refresh Latency", value: "< 200 ms", kind: "measured" },
    ],
    codeExcerpt: `// High-contrast pixel-buffer scan + sub-200ms web feed swap
void IRAM_ATTR refreshMatrixRow(uint8_t row) {
  selectAddressRow(row);
  pushRGBRowBuffer(activeFrame[row]);
  latchOutput(GAMMA_HIGH_CONTRAST);
}`,
  },
];

export const skillCategories = [
  {
    id: "programming",
    code: "DOM // 01",
    title: "Programming",
    accent: "#FECC1B",
    description:
      "Core systems, firmware, data processing, and backend programming languages.",
    items: ["C", "C++", "Python", "SQL", "Java"],
  },
  {
    id: "ai-ml",
    code: "DOM // 02",
    title: "AI & Machine Learning",
    accent: "#9B7CFF",
    description:
      "Classical machine learning, deep learning architectures, data pipelines, and predictive modeling.",
    items: [
      "Machine Learning",
      "Deep Learning",
      "PyTorch",
      "Scikit-learn",
      "XGBoost",
      "NumPy",
      "Pandas",
    ],
  },
  {
    id: "computer-vision",
    code: "DOM // 03",
    title: "Computer Vision",
    accent: "#56D8FF",
    description:
      "Real-time object detection, multi-object tracking, trajectory extraction, and intelligent video analytics.",
    items: [
      "OpenCV",
      "YOLO",
      "Object Detection",
      "Multi-object Tracking",
      "Video Analytics",
    ],
  },
  {
    id: "embedded-iot",
    code: "DOM // 04",
    title: "Embedded Systems & IoT",
    accent: "#4285FF",
    description:
      "Microcontroller firmware, low-level hardware buses, sensor interfacing, and connected IoT telemetry.",
    items: [
      "ESP32",
      "ESP8266",
      "Raspberry Pi",
      "Embedded C/C++",
      "GPIO",
      "I2C",
      "PWM",
      "ADC",
      "Sensor Interfacing",
      "MQTT",
    ],
  },
  {
    id: "backend-infra",
    code: "DOM // 05",
    title: "Backend & Infrastructure",
    accent: "#34D399",
    description:
      "APIs, vector/relational databases, low-latency streaming servers, and cloud ML deployment.",
    items: [
      "FastAPI",
      "React",
      "Streamlit",
      "Docker",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "WebRTC",
      "MediaMTX",
      "AWS SageMaker",
    ],
  },
  {
    id: "tools",
    code: "DOM // 06",
    title: "Tools & Platforms",
    accent: "#FFB35C",
    description:
      "Version control, Linux environments, embedded IDEs, and IoT cloud dashboards.",
    items: [
      "Git",
      "GitHub",
      "Linux",
      "Ubuntu",
      "Arduino IDE",
      "PlatformIO",
      "VS Code",
      "Jupyter",
      "Blynk",
      "ThingSpeak",
    ],
  },
] as const;

export const experience = [
  {
    id: "ithink",
    code: "EXP // 01",
    role: "Embedded Systems Intern",
    org: "iThink Software Labs",
    period: "June 2025 – September 2025",
    badge: "Industry Internship",
    accent: "#FECC1B",
    scene: "p10-display" as SceneId,
    summary:
      "Engineered industrial RGB LED matrix display hardware and low-latency web-feed firmware on ESP8266 and ESP32 microcontrollers.",
    highlights: [
      "Developed industrial P10 RGB LED display systems using ESP8266 and ESP32 microcontrollers.",
      "Improved display readability by 30–40% through custom pixel-level rendering optimization.",
      "Integrated real-time web data feeds with sub-200 ms refresh latency.",
    ],
    technologies: [
      "ESP32",
      "ESP8266",
      "Embedded C/C++",
      "P10 RGB LED",
      "Pixel-Level Rendering",
      "Real-Time Web Feeds",
    ],
  },
  {
    id: "eyantra",
    code: "EXP // 02",
    role: "Member",
    org: "e-Yantra Robotics Club, ADCET",
    period: "2024 – Present",
    badge: "Supporting Engineering Experience",
    accent: "#56D8FF",
    scene: "circuit-board" as SceneId,
    summary:
      "Hands-on embedded control, sensor fusion, and autonomous mobile robotics engineering.",
    highlights: [
      "Designed, built, and programmed autonomous mobile robots using embedded systems and sensor-based control.",
      "Developed line-following, obstacle avoidance, and autonomous navigation robots using microcontrollers and real-time sensor feedback.",
      "Implemented control algorithms for precise robot navigation, path tracking, and motor control.",
    ],
    technologies: [
      "Microcontrollers",
      "Sensor-Based Control",
      "Line Following",
      "Obstacle Avoidance",
      "Motor Control",
      "Path Tracking",
    ],
  },
] as const;

export const achievements = [
  {
    id: "M-01",
    year: "2025",
    title: "Samsung Solve for Tomorrow 2025 — Top 100",
    rank: "TOP 100 NATIONWIDE",
    accent: "#FECC1B",
    detail:
      "Selected among the Top 100 teams nationally in Samsung Solve for Tomorrow 2025 for sustainable technology innovation.",
  },
  {
    id: "M-02",
    year: "2025",
    title: "Smart India Hackathon 2025 — Grand Finalist",
    rank: "GRAND FINALIST",
    accent: "#56D8FF",
    detail:
      "Reached the Grand Finale of Smart India Hackathon (SIH) 2025 solving real-world hardware and software problem statements.",
  },
  {
    id: "M-03",
    year: "2026",
    title: "Anveshan 2026 — National Finalist",
    rank: "NATIONAL FINALIST",
    accent: "#9B7CFF",
    detail:
      "National Finalist at Anveshan 2026 student research and innovation convention.",
  },
  {
    id: "M-04",
    year: "2025",
    title: "ADCET Hackathon 2025 — Winner",
    rank: "1ST PLACE WINNER",
    accent: "#34D399",
    detail:
      "Won 1st Place at ADCET Hackathon 2025 after a 30-hour hardware and IoT engineering sprint.",
  },
  {
    id: "M-05",
    year: "2025",
    title: "PuneAgri Hackathon 2025 — Finalist",
    rank: "FINALIST",
    accent: "#FFB35C",
    detail:
      "Finalist at PuneAgri Hackathon 2025 for smart agricultural and environmental technology prototyping.",
  },
  {
    id: "M-06",
    year: "2025",
    title: "Idea 2.0 — Top 100",
    rank: "TOP 100",
    accent: "#4285FF",
    detail:
      "Shortlisted in the Top 100 entries at the Idea 2.0 innovation competition.",
  },
] as const;

export const signalRunCheckpoints = [
  {
    id: "ai",
    code: "NODE_01",
    title: "AI Intelligence",
    color: "#9B7CFF",
    x: 0.24,
    y: 0.35,
    summary:
      "AURA-CX omnichannel AI orchestration, Pinecone vector identity resolution, sentiment clustering, and hybrid RAG with Gemini & FastAPI.",
    route: "/projects/aura-cx",
  },
  {
    id: "cv",
    code: "NODE_02",
    title: "Computer Vision",
    color: "#56D8FF",
    x: 0.54,
    y: 0.62,
    summary:
      "YOLO person/vehicle detection, Norfair multi-object tracking, trajectory displacement analysis, and low-latency MediaMTX + WebRTC streaming.",
    route: "/projects/computer-vision",
  },
  {
    id: "hw",
    code: "NODE_03",
    title: "Connected Hardware",
    color: "#FECC1B",
    x: 0.8,
    y: 0.38,
    summary:
      "ESP32/ESP8266 firmware, PunarJAL 24×7 greywater IoT control, SensiCold modular cold storage, and sub-200 ms P10 RGB LED matrix displays.",
    route: "/projects/punarjal",
  },
] as const;

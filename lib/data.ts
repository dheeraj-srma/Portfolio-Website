export interface ProjectStory {
  idea: string;
  whyBuilt: string;
  howItWorks: string;
  techStack: string[];
  challenges: string;
  learnings: string;
  improvements: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: "ai" | "software" | "vision" | "ml" | "experiment";
  categoryLabel: string;
  tagline: string;
  summary: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  localPort?: number;
  featured: boolean;
  gradient: string;
  story: ProjectStory;
  architecture: {
    title: string;
    flow: string[];
    details: string;
  };
  metrics?: { label: string; value: string }[];
}

export const PERSONAL_INFO = {
  name: "Dheeraj Sharma",
  title: "Engineering Student · AI Builder · Software Developer",
  positioning: "Building with AI, software, data and curiosity.",
  username: "dheeraj-srma",
  githubUrl: "https://github.com/dheeraj-srma",
  linkedinUrl: "https://www.linkedin.com/in/dheerajsharma0025/",
  instagramUrl: "https://www.instagram.com/srma_g_ka_beta/",
  email: "dheerajkaushik136@gmail.com",
  avatarUrl: "https://github.com/dheeraj-srma.png",
  bio: "Engineering student with a deep fascination for artificial intelligence, mathematics, physics, space, and systems engineering. I learn by going past the surface: understanding mathematical mechanics rather than just importing libraries, and building complete, working software from the database layer to the user interface.",
  subBio: "From machine-learning experiments and computer-vision pipelines to production business software and real-time data tools, I turn ideas into functioning systems.",
  heroRoles: [
    "Engineering Student",
    "AI Builder",
    "Software Developer",
    "Systems Explorer"
  ]
};

export const ENGINEERING_PHILOSOPHY = [
  {
    id: "deep-learning",
    number: "01",
    title: "Learn deeply.",
    principle: "Don't just use the tool. Understand the system behind it.",
    description:
      "When encountering a machine learning model, a database query planner, or an operating system thread pool, I want to unpack the underlying mathematics and mechanics. Calling a black-box API gives a quick result, but understanding loss landscapes, backpropagation, and memory models gives engineering leverage.",
    motif: "∇L(θ) · Loss & Convergence"
  },
  {
    id: "build-practically",
    number: "02",
    title: "Build practically.",
    principle: "A concept becomes much more interesting when it becomes a working application.",
    description:
      "Theory without execution remains abstract. The fastest way to validate understanding is to implement it: spin up a backend, structure the schema, write the validation rules, and put it in front of real users or real data streams.",
    motif: "Architecture · End-to-End"
  },
  {
    id: "experiment-freely",
    number: "03",
    title: "Experiment.",
    principle: "Not every project needs to become a startup. Some projects exist because something was interesting enough to build.",
    description:
      "Curiosity thrives on freedom. Some projects are serious enterprise portals; others are late-night algorithmic experiments into celestial mechanics, time-series predictability, or computer-vision edge detection. The willingness to build and break things is the engine of discovery.",
    motif: "Trial · Empirical Data"
  },
  {
    id: "keep-improving",
    number: "04",
    title: "Keep improving.",
    principle: "A first implementation is rarely the final implementation.",
    description:
      "Building software is iterative refinement. The first pass proves the concept; the next refactors the architecture, handles edge cases, optimizes database queries, and tightens error handling. Software is a living artifact that matures with understanding.",
    motif: "Refactor · Optimize"
  },
  {
    id: "connect-disciplines",
    number: "05",
    title: "Connect disciplines.",
    principle: "AI, mathematics, physics, software, data and engineering don't exist in isolated boxes.",
    description:
      "The best insights happen at intersections: physics inspires optimization algorithms, linear algebra powers deep neural nets, and rigorous software engineering makes complex data science usable in production.",
    motif: "Math ⊗ Physics ⊗ Code"
  }
];

export const WHAT_I_BUILD = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    tagline: "Assistants, neural nets & predictive modeling",
    description:
      "Autonomous conversational assistants, fine-tuned transformer integrations, deep learning classifiers, and intelligent systems that reason over unstructured text, images, and audio.",
    icon: "BrainCircuit",
    examples: ["AURA Desktop Assistant", "Medical Image Classification", "NLP Document Extractors"],
    accent: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    id: "software",
    title: "Software Engineering",
    tagline: "Full-stack portals, desktop apps & APIs",
    description:
      "Production-grade business portals, reactive web apps, desktop interfaces, and robust REST APIs designed around data integrity, authentication, and user workflows.",
    icon: "Layers",
    examples: ["Order & Dealer Portals", "Inventory Intelligence Systems", "Desktop Automation Tools"],
    accent: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50"
  },
  {
    id: "data",
    title: "Data & Analytics",
    tagline: "Pipelines, visualization & telemetry",
    description:
      "Extracting signal from raw noise: building automated ETL pipelines, calculating business metrics, generating dynamic PDF/Excel reports, and designing interactive dashboards.",
    icon: "LineChart",
    examples: ["Sales Velocity Analytics", "Inventory Stock Forecasting", "Enterprise Reporting Dashboards"],
    accent: "from-purple-500/20 to-indigo-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: "automation",
    title: "Automation Systems",
    tagline: "Removing friction from workflows",
    description:
      "Background daemons, automated document parsers, stock synchronization with legacy ERPs like TallyPrime, and intelligent web scrapers that eliminate repetitive manual labor.",
    icon: "Zap",
    examples: ["TallyPrime Stock Sync", "Web Scrapers", "Invoice & Dispatch Automators"],
    accent: "from-amber-500/20 to-orange-500/20",
    border: "group-hover:border-amber-500/50"
  },
  {
    id: "experiments",
    title: "Algorithmic Experiments",
    tagline: "Testing ideas against reality",
    description:
      "Projects built to understand a concept: comparing time-series models against stochastic financial data, testing facial landmark telemetry, or building 3D lesion segmentations.",
    icon: "FlaskConical",
    examples: ["Financial Time-Series Analysis", "Facial Landmark Telemetry", "Grad-CAM Visualizations"],
    accent: "from-pink-500/20 to-rose-500/20",
    border: "group-hover:border-pink-500/50"
  },
  {
    id: "products",
    title: "Practical Products",
    tagline: "Systems engineered around real human needs",
    description:
      "Translating software into practical tools used by actual businesses: managing thousands of hardware SKUs, tracking dealer credit limits, and keeping teams synchronized.",
    icon: "PackageCheck",
    examples: ["Nalka Dealer Order App", "Hardware Billing Software", "Real-Time Stock Manager"],
    accent: "from-cyan-500/20 to-blue-500/20",
    border: "group-hover:border-cyan-500/50"
  }
];

export const PROJECTS: ProjectData[] = [
  {
    id: "nalka-dealer-portal",
    title: "Nalka Metals Order & Inventory Management Portal",
    category: "software",
    categoryLabel: "Business Software",
    tagline: "Enterprise catalog & mobile-first dealer order dispatch portal",
    summary:
      "A production business system built to streamline wholesale operations for industrial hardware and metal fittings. Handles 3,681+ active SKUs, live stock calculations, dealer credit limits, Supabase real-time sync, and automated PDF invoice generation.",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "jsPDF", "Google Sheets API"],
    githubUrl: "https://github.com/dheeraj-srma/Hardware-Order-App",
    liveUrl: "https://github.com/dheeraj-srma/Hardware-Order-App",
    localPort: 5173,
    featured: true,
    gradient: "from-purple-900/40 via-blue-900/30 to-indigo-950/50",
    metrics: [
      { label: "Catalog Scale", value: "3,681+ SKUs" },
      { label: "Backend", value: "Supabase / SQL" },
      { label: "Sync", value: "TallyPrime & Sheets" }
    ],
    story: {
      idea: "Wholesale industrial supply businesses often rely on fragmented WhatsApp messages, physical paper order slips, and manual Tally re-entry. The idea was to build a single mobile-first digital portal where salesmen and dealers select items directly from an up-to-date catalog, see stock availability, place validated orders, and instantly generate dispatch slips.",
      whyBuilt:
        "I built this to solve an urgent, real-world operational bottleneck for Nalka Metals. Orders were getting delayed, items were being ordered when out of stock, and calculating price tiers manually was error-prone.",
      howItWorks:
        "Built with React 19, TypeScript, and Vite on the frontend, with a Supabase PostgreSQL database handling products, dealers, order line items, and transaction logs. When an order is finalized, a client-side jsPDF pipeline formats professional multi-page dispatch orders with SKU codes, tax breakdowns, and payment terms, while syncing state with Google Sheets and Tally data structures.",
      techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Supabase (PostgreSQL)", "jsPDF / AutoTable", "PapaParse"],
      challenges:
        "Handling high catalog volume (over 3,600 product variations with distinct finishes and sizes) on mobile web browsers without UI sluggishness, and handling offline-first ordering when warehouse reception is spotty.",
      learnings:
        "Learned practical database schema normalization, indexing strategies for multi-field search, state management for complex cart workflows, and the reality that software ergonomics matter as much as technical architecture when end users are non-technical dealers.",
      improvements:
        "Currently working on automated bidirectional webhook sync directly into TallyPrime XML port to completely remove manual accounting imports."
    },
    architecture: {
      title: "Dealer Ordering & Stock Allocation Flow",
      flow: [
        "1. Dealer/Salesman authenticates via Role-Based Access (Sales / Admin)",
        "2. Catalog loads with cached SKU metadata & real-time stock thresholds",
        "3. Live price calculation applies dealer-specific discount tiers & tax rates",
        "4. Order submission triggers Supabase atomic transaction across Orders & OrderItems",
        "5. jsPDF engine generates formatted A4 invoice/dispatch slip locally",
        "6. Audit log records inventory reservation and notifies dispatch team"
      ],
      details:
        "The architecture is engineered for low latency and high data integrity. Products are indexed by category and SKU; orders are committed as relational transactions to prevent ghost stock allocations."
    }
  },
  {
    id: "aura-ai-assistant",
    title: "AURA Multimodal AI Desktop Assistant",
    category: "ai",
    categoryLabel: "Artificial Intelligence",
    tagline: "Voice, vision, and system-automation intelligent desktop copilot",
    summary:
      "A Python-based multimodal personal desktop assistant that integrates speech recognition, text-to-speech synthesis, computer-vision inputs, and LLM reasoning to execute local operating system tasks, search knowledge, and interact naturally.",
    tags: ["Python", "SpeechRecognition", "pyttsx3", "OpenCV", "Tkinter", "LLM APIs", "OS Automation"],
    githubUrl: "https://github.com/dheeraj-srma/AURA-AI-Assitant",
    liveUrl: "https://github.com/dheeraj-srma/AURA-AI-Assitant",
    featured: true,
    gradient: "from-blue-900/40 via-cyan-900/30 to-indigo-950/50",
    metrics: [
      { label: "Modalities", value: "Voice + Text + Vision" },
      { label: "Response Loop", value: "Real-Time Pipeline" },
      { label: "Environment", value: "Native Desktop OS" }
    ],
    story: {
      idea: "Rather than interacting with an AI through a browser tab, AURA was conceived as a persistent, native desktop intelligence assistant that can listen, talk back, view the screen or webcam, and manipulate system functions directly on the host machine.",
      whyBuilt:
        "I wanted to move beyond API wrapper chatbots. I wanted to understand how speech-to-text engines, audio buffers, natural language dispatching, and system automation scripts work together as a continuous, event-driven runtime.",
      howItWorks:
        "The application runs an asynchronous event loop in Python. Audio is captured via PyAudio/SpeechRecognition, transcribed, and parsed for intent. Commands trigger OS actions (application launch, browser control, system telemetry, media control), while contextual questions route to LLM backends with conversation history. Visual inputs can be captured via OpenCV for object/face analysis. Responses are synthesized into speech using pyttsx3 or online neural TTS.",
      techStack: ["Python", "SpeechRecognition", "pyttsx3", "OpenCV", "CustomTkinter", "Threading & Asyncio"],
      challenges:
        "Managing microphone audio buffering without freezing the UI thread, handling background acoustic noise, and maintaining low-latency conversational cadence.",
      learnings:
        "Deepened knowledge of concurrency (threading vs multiprocessing in Python), audio signal sampling rates, event loops, and how to structure modular command dispatchers.",
      improvements:
        "Transitioning to local quantized LLM inference (via Ollama/Llama.cpp) and Whisper tiny for 100% offline, privacy-first desktop voice interaction."
    },
    architecture: {
      title: "Audio & Command Processing Pipeline",
      flow: [
        "1. Background thread continuously samples microphone for wake condition",
        "2. Voice Activity Detection (VAD) captures speech buffer until silence detected",
        "3. Speech-to-Text engine decodes audio to text tokens",
        "4. Intent Classifier routes command (System Action vs Conversational Query)",
        "5. If Action: Native OS subsystem / PowerShell module executed",
        "6. If Query: Contextual prompt submitted to language model with memory buffer",
        "7. Response text piped simultaneously to GUI console and TTS audio synthesizer"
      ],
      details:
        "Modular architecture where UI, audio capture, intent classification, and TTS execution run on isolated threads to prevent GUI stutter."
    }
  },
  {
    id: "tb-3d-ai",
    title: "Tuberculosis Detection & 3D Lesion Segmentation (TB_3D_AI)",
    category: "vision",
    categoryLabel: "Deep Learning & Vision",
    tagline: "End-to-end medical ML pipeline with U-Net segmentation & Grad-CAM interpretability",
    summary:
      "A deep learning research project utilizing the TBX11K dataset. Implements pulmonary abnormality classification, U-Net semantic segmentation of tuberculosis lesions, Grad-CAM interpretability maps, and pseudo-3D spatial lung reconstruction.",
    tags: ["PyTorch", "U-Net", "Grad-CAM", "OpenCV", "TBX11K Dataset", "Medical AI", "NumPy"],
    githubUrl: "https://github.com/dheeraj-srma/TB_3D_AI",
    liveUrl: "https://github.com/dheeraj-srma",
    featured: true,
    gradient: "from-rose-900/40 via-pink-900/30 to-purple-950/50",
    metrics: [
      { label: "Dataset", value: "TBX11K (11,000+ X-rays)" },
      { label: "Architecture", value: "U-Net + CNN Backbone" },
      { label: "Explainability", value: "Grad-CAM Activation" }
    ],
    story: {
      idea: "Tuberculosis remains a major global health challenge where rapid radiological screening can save lives. The goal was to build a complete computer vision pipeline that not only classifies an X-ray as normal, sick, or TB, but also segments the precise lesion locations and projects the attention heatmaps into pseudo-3D space for clinical insight.",
      whyBuilt:
        "I wanted to explore the complete deep learning lifecycle on a non-trivial medical imaging task: from handling messy image annotations, addressing class imbalance, and training segmentation networks, to addressing the black-box problem through Grad-CAM interpretability.",
      howItWorks:
        "Chest radiographs from TBX11K are preprocessed (CLAHE contrast enhancement, normalization, spatial resizing). A convolutional classification model distinguishes pathological indicators. Simultaneously, a custom PyTorch U-Net with skip connections predicts binary lesion segmentation masks. Grad-CAM extracts gradients from the final convolutional layer to visualize attention, which is mapped into 3D voxel density plots for spatial visualization.",
      techStack: ["Python", "PyTorch", "Torchvision", "U-Net", "OpenCV", "Matplotlib", "NumPy", "Albumentations"],
      challenges:
        "Severely unbalanced datasets, subtle radiologic markers that overlap with bacterial pneumonia, and memory management when generating 3D volumetric projections on consumer hardware.",
      learnings:
        "Gained deep hands-on appreciation for why loss functions matter (Dice loss vs Binary Cross Entropy for imbalanced segmentation), how skip connections preserve fine spatial boundaries in U-Nets, and why interpretability (Grad-CAM) is mandatory for clinical AI credibility.",
      improvements:
        "Incorporate multi-view radiographs and evaluate self-supervised vision transformers (DINOv2) to extract richer pulmonary representations."
    },
    architecture: {
      title: "Medical Imaging Inference Pipeline",
      flow: [
        "1. Raw DICOM/PNG radiograph ingested and inspected for artifacts",
        "2. Preprocessing: CLAHE contrast normalization & anatomical crop (512x512)",
        "3. Classification branch calculates probability of TB vs Healthy vs Non-TB pulmonary illness",
        "4. U-Net segmentation branch processes feature map with skip connections",
        "5. Grad-CAM calculates gradient-weighted activation maps over lesion areas",
        "6. Volumetric slicer interpolates 2D intensity and heatmap into 3D spatial voxel coordinates",
        "7. Clinician visualizer renders overlay mask, confidence score, and 3D attention plot"
      ],
      details:
        "Honest limitation: The 3D view is an algorithmic depth interpolation based on radiodensity, not a native computed tomography (CT) scan."
    }
  },
  {
    id: "stock-prediction-experiments",
    title: "Financial Time-Series Forecasting & ML Model Exploration",
    category: "ml",
    categoryLabel: "Machine Learning Exploration",
    tagline: "Empirical study comparing statistical & neural models against market stochasticity",
    summary:
      "An honest, methodical exploration into stock price forecasting. Evaluated ARIMA, LSTM recurrent networks, Linear Regression, Decision Trees, Random Forests, and KNN across multi-year market data, studying feature engineering, lag metrics, and the limits of predictability.",
    tags: ["Python", "LSTM", "ARIMA", "Scikit-Learn", "TensorFlow", "Pandas", "Plotly", "Technical Indicators"],
    githubUrl: "https://github.com/dheeraj-srma/Trading-Bot",
    liveUrl: "https://github.com/dheeraj-srma",
    featured: true,
    gradient: "from-amber-900/40 via-orange-900/30 to-yellow-950/50",
    metrics: [
      { label: "Models Evaluated", value: "6 Architectures" },
      { label: "Techniques", value: "ARIMA, LSTM, RF, KNN" },
      { label: "Focus", value: "Empirical Limits of Prediction" }
    ],
    story: {
      idea: "Stock price prediction is often hyped with exaggerated claims of 'beating the market'. I wanted to approach it with scientific honesty: build multiple statistical and machine learning models, train them on real historical data, and rigorously measure where they succeed, where they fail, and why financial markets are fundamentally hard to predict.",
      whyBuilt:
        "To understand time-series modeling from the ground up: autocorrelation, stationarity, look-ahead bias, feature engineering with technical indicators (RSI, MACD, Bollinger Bands), and how LSTM recurrent units handle sequential dependencies compared to classical autoregressive models.",
      howItWorks:
        "Historical equity data is cleaned, checked for stationarity via the Augmented Dickey-Fuller (ADF) test, and differenced where required. Feature sets are engineered using moving averages, volatility bands, and momentum metrics. Models (ARIMA for baseline statistical forecasting; LSTM for non-linear temporal sequence learning; Random Forest & KNN for ensemble classification of direction) are trained and tested using walk-forward cross-validation to prevent data leakage.",
      techStack: ["Python", "Pandas", "NumPy", "Statsmodels (ARIMA)", "TensorFlow / Keras (LSTM)", "Scikit-Learn", "Matplotlib", "Plotly"],
      challenges:
        "Combating look-ahead bias and overfitting. In financial time-series, models easily memorize past noise (resulting in deceptively high training R²), only to fail completely on unseen out-of-sample data.",
      learnings:
        "Discovered that classical ARIMA excels at short-term mean-reversion modeling when series are stationary, while LSTMs capture non-linear patterns but tend to lag actual price spikes by exactly one timestep (predicting t as approximately equal to t-1). Understood the Efficient Market Hypothesis in practice.",
      improvements:
        "Combine order-flow orderbook microstructural data rather than relying solely on end-of-day OHLC prices, and frame the objective as volatility regime classification rather than exact price point prediction."
    },
    architecture: {
      title: "Time-Series Experimentation Workflow",
      flow: [
        "1. Historical tick/daily OHLC data ingestion via yfinance & AlphaVantage",
        "2. Stationarity testing (ADF test) and log-differencing transform",
        "3. Feature Engineering: EMA(12/26), RSI(14), ATR, Bollinger Volatility",
        "4. Strict temporal train-test split (walk-forward validation without lookahead)",
        "5. Model Training: ARIMA(p,d,q) vs 2-layer LSTM vs Random Forest Regressor",
        "6. Performance Evaluation: RMSE, MAE, Directional Accuracy, Sharpe Ratio backtest",
        "7. Residual Analysis to inspect auto-correlation of errors"
      ],
      details:
        "The project demonstrates that real engineering in machine learning is not claiming 99% accuracy on financial markets, but understanding why signal-to-noise ratio is low and quantifying uncertainty."
    }
  },
  {
    id: "nalka-stock-intelligence",
    title: "Nalka Inventory Management & Stock Intelligence Platform",
    category: "software",
    categoryLabel: "Business Software",
    tagline: "Industrial stock monitoring, replenishment planning, and Tally integration",
    summary:
      "A centralized inventory intelligence platform for managing thousands of physical hardware SKUs. Features real-time stock monitoring, replenishment planning, cost estimation, negative stock alerts, and integration with TallyPrime.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS", "Node.js", "TallyPrime XML API"],
    githubUrl: "https://github.com/dheeraj-srma/Stock-Management-App",
    liveUrl: "https://github.com/dheeraj-srma/Stock-Management-App",
    localPort: 5174,
    featured: true,
    gradient: "from-emerald-900/40 via-teal-900/30 to-slate-950/50",
    metrics: [
      { label: "SKU Tracking", value: "3,680+ Items" },
      { label: "ERP Link", value: "TallyPrime Integration" },
      { label: "Intelligence", value: "Automated Restock Matrix" }
    ],
    story: {
      idea: "Industrial warehouses cannot afford stockouts on key fasteners or fittings. This system transforms static spreadsheet lists into an intelligent stock cockpit that alerts warehouse managers before an item runs out, computes reorder quantities based on lead times, and keeps records synced with corporate accounts.",
      whyBuilt:
        "Built to provide warehouse operators with an intuitive interface that categorizes items into healthy, low, critical, and negative stock status, calculating exact purchase budget requirements for pending replenishment.",
      howItWorks:
        "Designed with a modular architecture connecting a responsive frontend with a relational database. It tracks minimum safe thresholds per SKU, computes negative balance corrections, and generates XML payloads formatted for direct ingestion into TallyPrime.",
      techStack: ["TypeScript", "React", "Node.js", "PostgreSQL / Supabase", "Tailwind CSS", "Lucide Icons"],
      challenges:
        "Designing an ergonomic UX that allows quick navigation across 3,600+ items with instant filtering by category, finish, and status without page reloads.",
      learnings:
        "Understood real-world inventory accounting rules (FIFO vs weighted average), audit trail design, and how to build software that non-technical warehouse staff find easy and reliable.",
      improvements:
        "Adding automated barcode/QR scanning integration for mobile receipt and dispatch logging directly from the warehouse floor."
    },
    architecture: {
      title: "Inventory Intelligence Architecture",
      flow: [
        "1. Real-time SKU registry with categorized thresholds (Minimum / Reorder / Critical)",
        "2. Stock delta capture via incoming shipments and outgoing dispatch slips",
        "3. Automated health assessment engine flags critical items and negative balances",
        "4. Replenishment Calculator estimates restock cost using latest supplier rates",
        "5. Sync daemon formats data payloads for TallyPrime integration",
        "6. Audit ledger logs every inventory movement with timestamp and operator ID"
      ],
      details:
        "Engineered for reliability in high-turnover industrial distribution environments."
    }
  },
  {
    id: "cognitive-behavior-analysis",
    title: "Real-Time Cognitive Behavioral Analytics & Vision System",
    category: "vision",
    categoryLabel: "Computer Vision & Telemetry",
    tagline: "Real-time attention, gaze, fatigue, and emotional state telemetry",
    summary:
      "An AI-powered computer vision system analyzing facial landmarks, eye aspect ratios, head poses, and micro-expressions in real time. Delivers live engagement and fatigue telemetry through a modular Python and CustomTkinter interface.",
    tags: ["Python", "OpenCV", "MediaPipe", "DeepFace", "CustomTkinter", "Real-Time Telemetry"],
    githubUrl: "https://github.com/dheeraj-srma/Cognitive-Behavior-Analysis",
    liveUrl: "https://github.com/dheeraj-srma/Cognitive-Behavior-Analysis",
    featured: false,
    gradient: "from-cyan-900/40 via-blue-900/30 to-purple-950/50",
    metrics: [
      { label: "Inference", value: "CPU Real-Time (30+ FPS)" },
      { label: "Telemetry", value: "Gaze, Blink, Pose, Emotion" },
      { label: "Framework", value: "OpenCV + MediaPipe" }
    ],
    story: {
      idea: "Can a standard consumer webcam quantify human cognitive engagement, fatigue, and focus in real time without needing expensive biometric sensors?",
      whyBuilt:
        "To explore real-time facial landmark extraction, geometric algorithms for eye blink and gaze tracking, and modular desktop dashboard architecture in Python.",
      howItWorks:
        "MediaPipe Face Mesh extracts 468 3D facial landmarks. The Eye Aspect Ratio (EAR) algorithm detects blink rates and prolonged eye closures (drowsiness indicator). Head pose (yaw, pitch, roll) is computed using SolvePnP on key facial anchor points. DeepFace classifies dominant emotional states. All telemetry feeds into a live real-time graph.",
      techStack: ["Python", "OpenCV", "MediaPipe", "DeepFace", "CustomTkinter", "NumPy"],
      challenges:
        "Maintaining high frame rates (30+ FPS) on CPU while performing landmark detection and expression inference simultaneously.",
      learnings:
        "Learned Euclidean geometric modeling on facial topology and efficient frame buffering techniques.",
      improvements:
        "Quantize the emotion classifier to MobileNetV3 to further reduce CPU utilization."
    },
    architecture: {
      title: "Real-Time Vision Telemetry Pipeline",
      flow: [
        "1. Webcam frame capture via OpenCV video thread",
        "2. MediaPipe Face Mesh detects 468 landmark coordinates",
        "3. Eye Aspect Ratio (EAR) calculated for blink & microsleep detection",
        "4. SolvePnP computes 3D head orientation (yaw, pitch, roll)",
        "5. Periodic emotion classification via DeepFace lightweight model",
        "6. Composite engagement score computed and rendered to real-time UI dashboard"
      ],
      details:
        "Zero GPU dependency — optimized to run smoothly on standard laptops."
    }
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume & Document Information Extractor",
    category: "ai",
    categoryLabel: "Document Processing & NLP",
    tagline: "Structured information extraction & skill matching from unstructured PDFs",
    summary:
      "A document parsing and resume analysis tool that extracts candidate contact info, educational qualifications, technical skills, and experience metrics from unstructured PDF/Word documents, matching them against job requirements.",
    tags: ["Python", "pyresparser", "pdfplumber", "Streamlit", "NLTK", "SpaCy", "Regex"],
    githubUrl: "https://github.com/dheeraj-srma/AI-Resume-Analyzer",
    liveUrl: "https://github.com/dheeraj-srma",
    featured: false,
    gradient: "from-indigo-900/40 via-purple-900/30 to-pink-950/50",
    metrics: [
      { label: "Formats", value: "PDF & DOCX" },
      { label: "NLP Engine", value: "SpaCy + NLTK" },
      { label: "Extraction", value: "Entities, Skills, Timeline" }
    ],
    story: {
      idea: "Resumes follow thousands of inconsistent layouts. This project builds a reliable extraction pipeline to parse unstructured candidate documents into structured JSON objects.",
      whyBuilt:
        "To explore natural language entity recognition (NER), regular expressions on document text streams, and the practical challenges of parsing PDF coordinate streams.",
      howItWorks:
        "Documents are parsed with pdfplumber and pyresparser. SpaCy NER identifies candidate names and organizations; tokenized text is filtered against skill ontologies; heuristic rules map graduation years and role tenures.",
      techStack: ["Python", "Streamlit", "pyresparser", "pdfplumber", "SpaCy", "NLTK"],
      challenges:
        "Handling multi-column PDF layouts and extracting text in correct reading order without combining unrelated columns.",
      learnings:
        "Gained deep appreciation for the fragility of regex-only approaches and the necessity of structural parsing in document intelligence.",
      improvements:
        "Implement modern vision-language models (e.g., LayoutLM) for table and multi-column visual document understanding."
    },
    architecture: {
      title: "Document Parsing & Entity Extraction Flow",
      flow: [
        "1. Candidate uploads PDF / DOCX file via web interface",
        "2. pdfplumber extracts layout-aware text streams and coordinates",
        "3. SpaCy Named Entity Recognizer tags names, locations, and institutions",
        "4. Custom skill vocabulary matcher extracts technical and soft competencies",
        "5. Gap analyzer compares extracted skills with target role requirements",
        "6. Summary report rendered with match score and skill breakdown"
      ],
      details:
        "Honest, rule-grounded document processing without overblown claims."
    }
  },
  {
    id: "binance-trading-bot",
    title: "Binance Futures Testnet Trading Engine",
    category: "software",
    categoryLabel: "Systems & APIs",
    tagline: "Automated order execution bot with CLI and Tkinter GUI",
    summary:
      "A robust Python trading client developed for the Binance Futures Testnet (USDT-M). Features Market and Limit order routing, strict input validation, comprehensive audit logging, error handling, and a dual CLI/GUI interface.",
    tags: ["Python", "Binance API", "REST", "Tkinter", "Logging", "Validation"],
    githubUrl: "https://github.com/dheeraj-srma/Trading-Bot",
    liveUrl: "https://github.com/dheeraj-srma/Trading-Bot",
    featured: false,
    gradient: "from-amber-900/40 via-yellow-900/30 to-stone-950/50",
    metrics: [
      { label: "Exchange", value: "Binance Futures Testnet" },
      { label: "Orders", value: "Market & Limit (BUY/SELL)" },
      { label: "Design", value: "Modular Architecture" }
    ],
    story: {
      idea: "Build a dependable order placement client that connects to Binance Futures Testnet, strictly validating parameters before hitting exchange endpoints.",
      whyBuilt:
        "Developed as a practical assignment to master API authentication (HMAC-SHA256 request signing), financial input validation, and structured error recovery.",
      howItWorks:
        "Modular Python packages handle client communication, order models, parameter validation, and logging. Users can execute via command-line arguments or an intuitive Tkinter window.",
      techStack: ["Python", "python-binance", "Tkinter", "Logging", "Dotenv"],
      challenges:
        "Handling exchange error codes, timestamp synchronization with Binance servers, and ensuring no invalid order reaches the network layer.",
      learnings:
        "Mastered HMAC authentication, defensive programming in financial systems, and writing modular Python packages.",
      improvements:
        "Add WebSocket support for real-time orderbook depth and execution fill feeds."
    },
    architecture: {
      title: "Order Execution & Validation Flow",
      flow: [
        "1. User specifies Symbol, Side (BUY/SELL), Type (MARKET/LIMIT), Quantity & Price",
        "2. Validator layer checks precision, balance sufficiency, and price bounds",
        "3. Client signs request payload with HMAC-SHA256 secret key",
        "4. Order dispatched to Binance Futures Testnet REST endpoint",
        "5. Response parsed, execution status verified, and transaction written to trading.log",
        "6. User notified via UI alert and terminal console output"
      ],
      details:
        "Focused on safety, validation, and zero unhandled exceptions."
    }
  }
];

export const CURRENTLY_BUILDING = [
  {
    title: "Bidirectional TallyPrime XML Sync Engine",
    domain: "Enterprise Software",
    status: "In Active Development",
    progress: 75,
    description:
      "Engineering a direct TCP/XML bridge between the Nalka inventory database and TallyPrime to eliminate manual accounting imports and ensure real-time ledger consistency.",
    tags: ["TypeScript", "XML", "Node.js", "PostgreSQL", "TallyPrime"]
  },
  {
    title: "Local LLM Orchestrator with Function Calling",
    domain: "Artificial Intelligence",
    status: "Prototyping",
    progress: 60,
    description:
      "Building a lightweight local agent framework running quantized models via Ollama to execute multi-step desktop file operations and web lookups without external cloud APIs.",
    tags: ["Python", "Ollama", "Llama 3.2", "Asyncio", "IPC"]
  },
  {
    title: "Edge Vision Telemetry for Worker Safety",
    domain: "Computer Vision",
    status: "Experimentation",
    progress: 40,
    description:
      "Adapting facial and posture telemetry to detect fatigue and PPE compliance in industrial workshops using low-power edge cameras.",
    tags: ["OpenCV", "YOLOv8-nano", "PyTorch", "CUDA"]
  }
];

export const CONTINUOUS_LEARNING = [
  {
    topic: "Deep Learning Foundations & Architectures",
    focus: "Transformer attention mechanisms, diffusion models, and loss landscape dynamics.",
    reading: "Vaswani et al., Goodfellow's Deep Learning, PyTorch internals",
    category: "Machine Learning"
  },
  {
    topic: "System Design & Distributed Databases",
    focus: "CAP theorem, Raft consensus, write-ahead logs, and schema optimization for transactional consistency.",
    reading: "Designing Data-Intensive Applications (Martin Kleppmann)",
    category: "Software Engineering"
  },
  {
    topic: "Mathematics: Linear Algebra & Multivariate Calculus",
    focus: "Eigendecomposition, Singular Value Decomposition (SVD), gradient vectors, and optimization theory for ML.",
    reading: "Gilbert Strang's Linear Algebra, MIT OCW",
    category: "Mathematics"
  },
  {
    topic: "Astrophysics & Celestial Mechanics",
    focus: "Gravitational N-body simulations, orbital dynamics, and computational astrophysics.",
    reading: "Astrophysics for People in a Hurry, Numerical Methods for Planetary Orbits",
    category: "Physics & Space"
  }
];

export const JOURNEY_MILESTONES = [
  {
    period: "2024",
    title: "The Genesis: Programming & Deep Curiosity",
    role: "Foundations & Exploration",
    organization: "Independent Learning",
    description:
      "Began studying core computer science and algorithms. Mastered Python, algorithms, data structures, and script automation. Developed a relentless habit of wanting to understand how software works under the hood rather than just copying code.",
    tags: ["Python", "C Fundamentals", "Data Structures", "Algorithms"]
  },
  {
    period: "2025",
    title: "AURA AI Assistant & Desktop Systems",
    role: "AI & System Integration",
    organization: "Personal Project",
    description:
      "Built AURA, a multimodal desktop assistant combining speech recognition, text-to-speech, and system automation. Explored concurrency, audio buffers, and desktop GUI engineering in Python.",
    tags: ["SpeechRecognition", "PyAudio", "OpenCV", "CustomTkinter"]
  },
  {
    period: "2025 - 2026",
    title: "Nalka Metals Order & Inventory Management Portal",
    role: "Full-Stack System Developer",
    organization: "Real-World Business Implementation",
    description:
      "Designed and deployed a full production business portal managing 3,681+ SKUs for industrial fittings. Implemented dealer order flows, live stock calculation, Supabase backend, and automated invoice generation.",
    tags: ["React 19", "TypeScript", "Supabase", "Tailwind CSS", "Enterprise SaaS"]
  },
  {
    period: "2026",
    title: "Data Science & Analytics Internship",
    role: "Data Science & Analytics Intern",
    organization: "Professional Internship",
    description:
      "Worked with business datasets to extract operational insights, build data processing pipelines, automate reporting, and analyze sales performance metrics. Experienced firsthand how data drives business decisions.",
    tags: ["Python", "Pandas", "SQL", "ETL Pipelines", "Power BI", "Data Visualization"]
  },
  {
    period: "2026",
    title: "Deep Learning Research & Computer Vision",
    role: "Medical AI & Vision Exploration",
    organization: "TBX11K Research Project",
    description:
      "Engineered TB_3D_AI: pulmonary tuberculosis detection, U-Net semantic segmentation, and Grad-CAM interpretability on the TBX11K dataset. Explored 3D spatial reconstruction of radiological attention.",
    tags: ["PyTorch", "U-Net", "Grad-CAM", "Computer Vision", "Medical Imaging"]
  },
  {
    period: "Ongoing",
    title: "Engineering Degree & Beyond the Classroom",
    role: "Undergraduate Engineering Student",
    organization: "Engineering University",
    description:
      "Pursuing formal engineering studies while dedicating nights and weekends to building production software, studying advanced mathematics, and experimenting with artificial intelligence. The classroom provides foundations; personal projects turn them into working systems.",
    tags: ["Engineering", "Linear Algebra", "Physics", "Autonomous Systems"]
  }
];

export const VERIFIED_STATS = [
  { label: "Active Repositories", value: "9", detail: "Public open-source code" },
  { label: "Inventory SKUs Managed", value: "3,681+", detail: "In production business portal" },
  { label: "ML Models Explored", value: "7+", detail: "ARIMA, LSTM, U-Net, RF, etc." },
  { label: "Core Disciplines", value: "5", detail: "AI, Software, Math, Physics, Data" }
];

export const OUTSIDE_INTERESTS = [
  {
    name: "Mathematics & Linear Algebra",
    description: "Fascinated by matrix transformations, vector spaces, and eigenvalues—the language of machine learning and modern physics."
  },
  {
    name: "Astrophysics & Space",
    description: "Deep interest in stellar evolution, orbital mechanics, black holes, and the sheer scale of the cosmos."
  },
  {
    name: "Physics",
    description: "Appreciating how physical laws govern information, thermodynamics, entropy, and computation."
  },
  {
    name: "European History & Literature",
    description: "Reading classical literature, philosophy, and history to understand how ideas shape civilizations."
  },
  {
    name: "Art & Poetry",
    description: "Finding aesthetic beauty in precision, typography, architecture, and language."
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "Programming Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "C / C++ Basics", "HTML5/CSS3"]
  },
  {
    name: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "OpenCV", "U-Net", "Grad-CAM", "Pandas", "NumPy"]
  },
  {
    name: "Data & Visualization",
    skills: ["Matplotlib", "Plotly", "Power BI", "Seaborn", "Streamlit", "SQL Analytics"]
  },
  {
    name: "Backend & Systems",
    skills: ["Node.js", "FastAPI", "Next.js", "Express", "REST APIs", "Asyncio / Multiprocessing"]
  },
  {
    name: "Databases & Storage",
    skills: ["PostgreSQL", "Supabase", "MySQL", "SQLite", "Google Sheets API"]
  },
  {
    name: "Engineering Tools",
    skills: ["Git", "GitHub", "Linux / Bash", "VS Code", "Vite", "npm / pnpm"]
  }
];


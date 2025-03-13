import { LucideIcon } from "lucide-react";
import {
  FileText,
  Code,
  Database,
  Palette,
  Clock,
  Shield,
  Globe,
  Star,
  Binary,
  FileJson,
  QrCode,
  Image,
  Regex,
  Type,
  Wand2,
  Key,
  Timer,
  Lock,
  Terminal,
  Hash,
  Wifi,
  Calendar,
  Cpu,
  Calculator,
  Calculator as CalcIcon,
  Heart,
  Droplet,
  Utensils,
  DollarSign,
  Weight,
  Ruler,
  Wallet,
  Clipboard,
  AlarmClock,
  Car,
  Home,
  ShoppingBag,
  Book,
  Music,
  Smartphone,
  Sun,
  Cloud,
  Thermometer,
  Wind,
  Umbrella,
  Map,
  Navigation,
  Coffee,
  Pizza,
  Briefcase,
  GraduationCap,
  Pencil,
  Moon,
  Check,
  Globe2,
  Folder,
  Activity,
  CheckSquare,
  TrendingUp,
  RefreshCw,
  Layers,
  HelpCircle,
  Server,
  Palette as PaletteIcon,
  Grid,
  Video,
  FileType,
  Network,
  Target,
  LayoutGrid as Trello,
  Bell,
  FolderOpen,
  Cookie,
  MessageSquare,
  Shuffle,
  GitFork,
  AlertTriangle,
  GitCommit,
  Webcam,
  Eye,
  BarChart,
  Filter,
  Search,
  Brain,
  Fingerprint,
  Edit,
  FileKey,
  FolderTree,
  FileEdit,
  Dna,
  Wrench
} from "lucide-react";

export interface Tool {
  name: string;
  description: string;
  path: string;
  icon?: LucideIcon;
  component?: React.ComponentType<any>;
}

export interface Category {
  name: string;
  icon: LucideIcon;
  tools: Tool[];
  description?: string;
}

const generateAllTools = (categories: Category[]): Tool[] => {
  const toolMap: Record<string, Tool> = {};

  for (let i = 1; i < categories.length; i++) {
    const category = categories[i];
    for (const tool of category.tools) {
      if (!toolMap[tool.path]) {
        toolMap[tool.path] = tool;
      }
    }
  }

  return Object.values(toolMap);
};

export const categories: Category[] = [
  {
    name: "All Tools",
    icon: Star,
    tools: [], // Will be populated by generateAllTools
  },
  {
    name: "Featured Tools",
    icon: Star,
    tools: [
      {
        name: "JSON Formatter",
        description: "Format and validate JSON",
        path: "/dev/json-formatter",
        icon: FileJson,
      },
      {
        name: "Markdown Editor",
        description: "Edit and preview Markdown",
        path: "/text/markdown-editor",
        icon: FileText,
      },
      {
        name: "Color Picker",
        description: "Pick and generate color palettes",
        path: "/visual/color-picker",
        icon: Palette,
      },
      {
        name: "Base64 Tools",
        description: "Encode/decode Base64 strings",
        path: "/data/base64",
        icon: Binary,
      },
      {
        name: "Regex Tester",
        description: "Test regular expressions",
        path: "/dev/regex",
        icon: Regex,
      },
      {
        name: "QR Code Generator",
        description: "Create QR codes",
        path: "/visual/qr-code",
        icon: QrCode,
      },
    ],
  },
  {
    name: "Health & Wellness",
    icon: Heart,
    tools: [
      {
        name: "BMI Calculator",
        description: "Calculate Body Mass Index",
        path: "/health/bmi-calculator",
        icon: Calculator,
      },
      {
        name: "Calorie Counter",
        description: "Track daily calorie intake",
        path: "/health/calorie-counter",
        icon: Clipboard,
      },
      {
        name: "Water Tracker",
        description: "Track daily water consumption",
        path: "/health/water-tracker",
        icon: Droplet,
      },
      {
        name: "Sleep Tracker",
        description: "Monitor sleep patterns",
        path: "/health/sleep-tracker",
        icon: Moon,
      },
      {
        name: "Meditation Timer",
        description: "Timer for meditation sessions",
        path: "/health/meditation",
        icon: Timer,
      },
      {
        name: "Exercise Tracker",
        description: "Track your workouts and exercises",
        path: "/health/exercise-tracker",
        icon: Activity,
      },
      {
        name: "Meal Planner",
        description: "Plan your weekly meals",
        path: "/health/meal-planner",
        icon: Utensils,
      },
      {
        name: "Habit Tracker",
        description: "Track your daily habits",
        path: "/health/habit-tracker",
        icon: CheckSquare,
      },
      {
        name: "Ergonomic Timer",
        description: "Smart breaks based on posture detection and screen time",
        path: "/health/ergonomic-timer",
        icon: Webcam,
      },
      {
        name: "Eye Strain Guard",
        description: "Monitor screen brightness and suggest breaks using ambient light",
        path: "/health/eye-guard",
        icon: Eye,
      },
      {
        name: "Focus Breath",
        description: "Breathing exercises synchronized with your heart rate",
        path: "/health/focus-breath",
        icon: Activity,
      },
    ],
  },
  {
    name: "Finance",
    icon: DollarSign,
    tools: [
      {
        name: "Expense Tracker",
        description: "Track your expenses",
        path: "/finance/expense-tracker",
        icon: Wallet,
      },
      {
        name: "Budget Planner",
        description: "Plan your monthly budget",
        path: "/finance/budget-planner",
        icon: Calculator,
      },
      {
        name: "Bill Reminder",
        description: "Set reminders for bills",
        path: "/finance/bill-reminder",
        icon: Calendar,
      },
      {
        name: "Savings Calculator",
        description: "Calculate your savings",
        path: "/finance/savings-calculator",
        icon: DollarSign,
      },
      {
        name: "Investment Calculator",
        description: "Calculate investment returns",
        path: "/finance/investment-calculator",
        icon: TrendingUp,
      },
      {
        name: "Loan Calculator",
        description: "Calculate loan payments",
        path: "/finance/loan-calculator",
        icon: Calculator,
      },
      {
        name: "Currency Converter",
        description: "Convert between currencies",
        path: "/finance/currency-converter",
        icon: RefreshCw,
      }
    ],
  },
  {
    name: "Travel & Transport",
    icon: Map,
    tools: [
      {
        name: "Fuel Calculator",
        description: "Calculate fuel costs",
        path: "/travel/fuel-calculator",
        icon: Car,
      },
      {
        name: "Trip Planner",
        description: "Plan your trip",
        path: "/travel/trip-planner",
        icon: Map,
      },
      {
        name: "Distance Calculator",
        description: "Calculate travel distance",
        path: "/travel/distance-calculator",
        icon: Navigation,
      }
    ],
  },
  {
    name: "Weather & Climate",
    icon: Cloud,
    tools: [
      {
        name: "Weather Converter",
        description: "Convert weather units",
        path: "/weather/weather-converter",
        icon: Thermometer,
      },
      {
        name: "Wind Calculator",
        description: "Calculate wind speed and direction",
        path: "/weather/wind-calculator",
        icon: Wind,
      },
      {
        name: "Rain Probability",
        description: "Calculate chance of rain",
        path: "/weather/rain-probability",
        icon: Umbrella,
      }
    ],
  },
  {
    name: "Food & Cooking",
    icon: Utensils,
    tools: [
      {
        name: "Recipe Converter",
        description: "Convert recipe measurements",
        path: "/food/recipe-converter",
        icon: Calculator,
      },
      {
        name: "Meal Planner",
        description: "Plan your weekly meals",
        path: "/food/meal-planner",
        icon: Calendar,
      },
      {
        name: "Cooking Timer",
        description: "Multiple timers for cooking",
        path: "/food/cooking-timer",
        icon: Timer,
      }
    ],
  },
  {
    name: "Education",
    icon: GraduationCap,
    tools: [
      {
        name: "Study Timer",
        description: "Pomodoro timer for studying",
        path: "/education/study-timer",
        icon: Timer
      },
      {
        name: "Flashcards",
        description: "Create and study flashcards",
        path: "/education/flashcards",
        icon: Layers
      },
      {
        name: "Note Taking",
        description: "Take and organize study notes",
        path: "/education/note-taking",
        icon: Pencil
      },
      {
        name: "Math Calculator",
        description: "Advanced mathematical calculations",
        path: "/education/math-calculator",
        icon: Calculator
      },
      {
        name: "Quiz Maker",
        description: "Create and take quizzes",
        path: "/education/quiz-maker",
        icon: HelpCircle
      }
    ]
  },
  {
    name: "Shopping",
    icon: ShoppingBag,
    tools: [
      {
        name: "Price Comparison",
        description: "Compare prices across different stores",
        path: "/shopping/price-comparison",
        icon: DollarSign,
      },
      {
        name: "Shopping List",
        description: "Create and manage your shopping lists",
        path: "/shopping/shopping-list",
        icon: ShoppingBag,
      },
      {
        name: "Discount Calculator",
        description: "Calculate discounts and final prices",
        path: "/shopping/discount-calculator",
        icon: Calculator,
      }
    ],
  },
  {
    name: "Productivity",
    icon: Brain,
    tools: [
      {
        name: "Todo List",
        description: "Manage your tasks",
        path: "/productivity/todo",
        icon: Check,
      },
      {
        name: "Quick Notes",
        description: "Take quick notes",
        path: "/productivity/notes",
        icon: Pencil,
      },
      {
        name: "Task Timer",
        description: "Track time spent on tasks",
        path: "/productivity/task-timer",
        icon: Timer,
      },
      {
        name: "Project Timer",
        description: "Track time spent on different projects",
        path: "/productivity/project-timer",
        icon: Clock,
      },
      {
        name: "Focus Timer",
        description: "Pomodoro timer for focused work",
        path: "/productivity/focus-timer",
        icon: Timer,
      },
      {
        name: "Mind Map",
        description: "Create visual mind maps",
        path: "/productivity/mind-map",
        icon: Grid,
      },
      {
        name: "Goal Tracker",
        description: "Track your goals and progress",
        path: "/productivity/goal-tracker",
        icon: Target,
      },
      {
        name: "Kanban Board",
        description: "Organize tasks in kanban style",
        path: "/productivity/kanban",
        icon: Trello,
      },
      {
        name: "Meeting Cost Calculator",
        description: "Calculate real-time cost of meetings",
        path: "/productivity/meeting-cost",
        icon: DollarSign,
      },
      {
        name: "Context Switcher",
        description: "Save and restore window layouts",
        path: "/productivity/context-switcher",
        icon: Layers,
      },
      {
        name: "Focus Flow",
        description: "AI-powered work session planner",
        path: "/productivity/focus-flow",
        icon: Brain,
      },
    ],
  },
  {
    name: "Everyday Utilities",
    icon: Home,
    tools: [
      {
        name: "Unit Converter",
        description: "Convert between different units",
        path: "/utility/unit-converter",
        icon: Calculator,
      },
      {
        name: "Calculator",
        description: "Basic and scientific calculator",
        path: "/utility/calculator",
        icon: CalcIcon,
      },
      {
        name: "Reminder",
        description: "Set reminders and notifications",
        path: "/utility/reminder",
        icon: Bell,
      }
    ],
  },
  {
    name: "Text & Content",
    icon: FileText,
    tools: [
      {
        name: "Text Case Converter",
        description: "Convert text case",
        path: "/text/case-converter",
        icon: Type,
      },
      {
        name: "Word Replacer",
        description: "Find and replace words in text",
        path: "/text/word-replacer",
        icon: FileText,
      },
      {
        name: "Word Counter",
        description: "Count words and characters in text",
        path: "/text/word-counter",
        icon: FileText,
      },
      {
        name: "Lorem Generator",
        description: "Generate Lorem Ipsum text",
        path: "/text/lorem-generator",
        icon: FileText,
      },
      {
        name: "Markdown Editor",
        description: "Edit and preview Markdown",
        path: "/text/markdown-editor",
        icon: FileText,
      },
      {
        name: "Text Diff",
        description: "Compare text differences",
        path: "/text/diff",
        icon: FileText,
      },
      {
        name: "Quote Generator",
        description: "Generate quotes",
        path: "/text/quotes",
        icon: FileText,
      },
      {
        name: "Code to Image",
        description: "Convert code to image",
        path: "/text/code-to-image",
        icon: Image,
      },
      {
        name: "ASCII Art",
        description: "Generate ASCII art",
        path: "/text/ascii-art",
        icon: FileText,
      }
    ],
  },
  {
    name: "Development Tools",
    icon: Code,
    tools: [
      {
        name: "JSON Formatter",
        description: "Format and validate JSON",
        path: "/dev/json-formatter",
        icon: FileJson,
      },
      {
        name: "Code Beautifier",
        description: "Beautify and format code",
        path: "/dev/code-beautifier",
        icon: Code,
      },
      {
        name: "Regex Tester",
        description: "Test regular expressions",
        path: "/dev/regex",
        icon: Regex,
      },
      {
        name: "API Tester",
        description: "Test API endpoints",
        path: "/dev/api-tester",
        icon: Server,
      },
      {
        name: "Color Palette Generator",
        description: "Generate color schemes",
        path: "/dev/color-palette",
        icon: PaletteIcon,
      },
      {
        name: "CSS Grid Generator",
        description: "Generate CSS grid layouts",
        path: "/dev/css-grid",
        icon: Grid,
      },
      {
        name: "SVG Editor",
        description: "Edit and optimize SVG files",
        path: "/dev/svg-editor",
        icon: Image,
      },
      {
        name: "Code Dependency Analyzer",
        description: "Analyze and visualize project dependencies, identify circular dependencies, and get insights into your codebase structure",
        path: "/dev/dependency-analyzer",
        icon: GitFork
      },
      {
        name: "Code Smell Detector",
        description: "Analyze code for common anti-patterns and complexity issues",
        path: "/dev/code-smell",
        icon: AlertTriangle,
      },
      {
        name: "API Mock Generator",
        description: "Generate mock APIs from OpenAPI/Swagger specs with realistic data",
        path: "/dev/api-mock",
        icon: Server,
      },
      {
        name: "Git Message Builder",
        description: "Build semantic commit messages with AI suggestions",
        path: "/dev/git-message",
        icon: GitCommit,
      },
    ],
  },
  {
    name: "Data & Conversion",
    icon: Database,
    tools: [
      {
        name: "Base64 Tools",
        description: "Encode/decode Base64 strings",
        path: "/data/base64",
        icon: Binary,
      },
      {
        name: "CSV to JSON",
        description: "Convert CSV to JSON",
        path: "/data/csv-json",
        icon: FileJson,
      },
      {
        name: "URL Tools",
        description: "Encode/decode URLs",
        path: "/data/url-tools",
        icon: Globe,
      },
      {
        name: "Hash Generator",
        description: "Generate file hashes",
        path: "/data/hash",
        icon: Hash,
      },
    ],
  },
  {
    name: "Visual & Media",
    icon: Palette,
    tools: [
      {
        name: "Color Picker",
        description: "Pick and generate color palettes",
        path: "/visual/color-picker",
        icon: Palette,
      },
      {
        name: "QR Code Generator",
        description: "Create QR codes",
        path: "/visual/qr-code",
        icon: QrCode,
      },
      {
        name: "Image Tools",
        description: "Basic image editing tools",
        path: "/visual/image-tools",
        icon: Image,
      },
    ],
  },
  {
    name: "Time & Date",
    icon: Clock,
    tools: [
      {
        name: "Timezone Converter",
        description: "Convert between timezones",
        path: "/time/timezone",
        icon: Clock,
      },
      {
        name: "Date Calculator",
        description: "Calculate date differences",
        path: "/time/date-calculator",
        icon: Calendar,
      },
      {
        name: "Countdown Timer",
        description: "Create countdown timers",
        path: "/time/countdown",
        icon: Timer,
      },
    ],
  },
  {
    name: "Security & Encryption",
    icon: Shield,
    tools: [
      {
        name: "Password Generator",
        description: "Generate secure passwords",
        path: "/security/password",
        icon: Lock,
      },
      {
        name: "Hash Generator",
        description: "Generate secure hashes",
        path: "/security/hash",
        icon: Hash,
      },
    ],
  },
  {
    name: "Utility",
    icon: Wrench,
    tools: [
      {
        name: "Unit Converter",
        description: "Convert between different units",
        path: "/utility/unit-converter",
        icon: Calculator,
      },
      {
        name: "Calculator",
        description: "Basic and scientific calculator",
        path: "/utility/calculator",
        icon: CalcIcon,
      },
      {
        name: "Reminder",
        description: "Set reminders and notifications",
        path: "/utility/reminder",
        icon: Bell,
      },
      {
        name: "File Organizer",
        description: "Organize and manage files",
        path: "/utility/file-organizer",
        icon: FolderOpen,
      },
      {
        name: "Password Manager",
        description: "Securely store and manage passwords",
        path: "/utility/password-manager",
        icon: Lock,
      },
      {
        name: "Note Encryption",
        description: "Encrypt and decrypt notes",
        path: "/utility/note-encryption",
        icon: FileKey,
      },
      {
        name: "QR Scanner",
        description: "Scan and decode QR codes",
        path: "/utility/qr-scanner",
        icon: QrCode,
      },
      {
        name: "Screen Recorder",
        description: "Record screen and audio",
        path: "/utility/screen-recorder",
        icon: Video,
      },
      {
        name: "File Converter",
        description: "Convert between file formats",
        path: "/utility/file-converter",
        icon: FileType,
      },
      {
        name: "File DNA",
        description: "Compare files and find duplicates",
        path: "/utility/file-dna",
        icon: Dna,
      }
    ]
  },
  {
    name: "Fun Tools",
    icon: Star,
    tools: [
      {
        name: "Yes/No Spinner",
        description: "Let fate decide with a spinning wheel",
        path: "/fun/yes-no-spinner",
        icon: RefreshCw,
      },
      {
        name: "Meeting Excuse Generator",
        description: "Generate creative excuses for missing meetings",
        path: "/fun/excuse-generator",
        icon: MessageSquare,
      },
      {
        name: "Random Decision Maker",
        description: "Let fate decide your choices",
        path: "/fun/decision-maker",
        icon: Shuffle,
      }
    ],
  },
  {
    name: "Data & Analysis",
    icon: Database,
    tools: [
      {
        name: "Text Insights",
        description: "Analyze text for readability, sentiment, and complexity",
        path: "/data/text-insights",
        icon: BarChart,
      },
      {
        name: "Data Cleaner",
        description: "Clean and normalize messy data with AI assistance",
        path: "/data/cleaner",
        icon: Filter,
      },
      {
        name: "Pattern Finder",
        description: "Discover patterns in numbers, text, or time series data",
        path: "/data/pattern-finder",
        icon: Search,
      },
    ],
  },
];

// Populate "All Tools" category
categories[0].tools = generateAllTools(categories);
import React from "react";
import { Route, Switch, RouteComponentProps } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "./components/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { RouteWrapper } from "@/components/route-wrapper";
import { SearchProvider } from "@/lib/search-context";
import SearchResults from "@/pages/search";

// Text & Content
import TextCaseConverter from "@/pages/text/case-converter";
import WordReplacer from "@/pages/text/word-replacer";
import WordCounter from "@/pages/text/word-counter";
import LoremGenerator from "@/pages/text/lorem-generator";
import MarkdownEditor from "@/pages/text/markdown-editor";
import TextDiff from "@/pages/text/diff";
import QuoteGenerator from "@/pages/text/quotes";
import CodeToImage from "@/pages/text/code-to-image";
import AsciiArt from "@/pages/text/ascii-art";

// Development Tools
import ApiStatus from "@/pages/dev/api-status";
import CurlBuilder from "@/pages/dev/curl-builder";
import JsonFormatter from "@/pages/dev/json-formatter";
import CodeBeautifier from "@/pages/dev/code-beautifier";
import RegexTester from "@/pages/dev/regex";
import ApiClient from "@/pages/dev/api-client";
import SqlFormatter from "@/pages/dev/sql-formatter";
import CronGenerator from "@/pages/dev/cron-generator";
import JwtDebugger from "@/pages/dev/jwt-debugger";
import GraphqlPlayground from "@/pages/dev/graphql";
import CssMinifier from "@/pages/dev/css-minifier";
import HtmlFormatter from "@/pages/dev/html-formatter";
import ApiTester from "@/pages/dev/api-tester";
import DependencyAnalyzer from "@/pages/dev/dependency-analyzer";
import CodeSmellDetector from "@/pages/dev/code-smell";
import ApiMockGenerator from "@/pages/dev/api-mock";
import GitMessageBuilder from "@/pages/dev/git-message";

// Data & Conversion
import Base64Tool from "@/pages/data/base64";
import CsvToJson from "@/pages/data/csv-json";
import UrlTools from "@/pages/data/url-tools";
import HashGenerator from "@/pages/data/hash";
import FormatConverter from "@/pages/data/format-converter";
import NumberBase from "@/pages/data/number-base";
import JsonYamlConverter from "@/pages/data/json-yaml";
import ExcelToJson from "@/pages/data/excel-json";
import XmlFormatter from "@/pages/data/xml-formatter";
import DataValidator from "@/pages/data/validator";

// Visual & Media
import ColorPicker from "@/pages/visual/color-picker";
import ImageTools from "@/pages/visual/image-tools";
import QrCode from "@/pages/visual/qr-code";
import SvgEditor from "@/pages/visual/svg-editor";
import GradientGenerator from "@/pages/visual/gradient";
import ImageCompressor from "@/pages/visual/image-compressor";
import SvgOptimizer from "@/pages/visual/svg-optimizer";
import FaviconGenerator from "@/pages/visual/favicon";
import ColorPaletteGenerator from "@/pages/visual/color-palette";

// Weather Tools
import WeatherConverter from "@/pages/weather/weather-converter";
import WindCalculator from "@/pages/weather/wind-calculator";
import RainProbability from "@/pages/weather/rain-probability";

// Food Tools
import RecipeConverter from "@/pages/food/recipe-converter";
import MealPlanner from "@/pages/food/meal-planner";
import CookingTimer from "@/pages/food/cooking-timer";

// Time & Date
import TimezoneConverter from "@/pages/time/timezone";
import DateCalculator from "@/pages/time/date-calculator";
import CountdownTimer from "@/pages/time/countdown";

// Security & Encryption
import PasswordGenerator from "@/pages/security/password";
import SecurityHashGenerator from "@/pages/security/hash";
import HashComparison from "@/pages/security/hash-compare";
import CertificateGenerator from "@/pages/security/certificate";

// Network & Web
import DnsLookup from "@/pages/network/dns";
import PortScanner from "@/pages/network/ports";
import HttpHeaders from "@/pages/network/headers";
import IpTools from "@/pages/network/ip";
import WebSocketTester from "@/pages/network/websocket";

// Travel Tools
import FuelCalculator from "@/pages/travel/fuel-calculator";
import TripPlanner from "@/pages/travel/trip-planner";
import DistanceCalculator from "@/pages/travel/distance-calculator";

// Static Pages
import Documentation from "./pages/docs";
import GettingStarted from "./pages/docs/getting-started";
import ApiReference from "./pages/docs/api";
import Examples from "./pages/docs/examples";
import FAQ from "./pages/docs/faq";
import Changelog from "@/pages/static/changelog";
import Roadmap from "@/pages/static/roadmap";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Cookies from "@/pages/static/cookies";
import License from "./pages/license";
import Introduction from "@/pages/introduction";
import CategoryPage from "@/pages/[category]";
import Community from "./pages/static/community";

// Health Tools
import BmiCalculator from "@/pages/health/bmi-calculator";
import CalorieCounter from "@/pages/health/calorie-counter";
import WaterTracker from "@/pages/health/water-tracker";
import SleepTracker from "@/pages/health/sleep-tracker";
import MeditationTimer from "@/pages/health/meditation";
import ExerciseTracker from "@/pages/health/exercise-tracker";
import HabitTracker from "@/pages/health/habit-tracker";
import ErgonomicTimer from "@/pages/health/ergonomic-timer";
import EyeStrainGuard from "@/pages/health/eye-strain-guard";
import FocusBreath from "@/pages/health/focus-breath";

// Finance Tools
import ExpenseTracker from "@/pages/finance/expense-tracker";
import BudgetPlanner from "@/pages/finance/budget-planner";
import BillReminder from "@/pages/finance/bill-reminder";
import SavingsCalculator from "@/pages/finance/savings-calculator";
import InvestmentCalculator from "@/pages/finance/investment-calculator";
import LoanCalculator from "@/pages/finance/loan-calculator";
import CurrencyConverter from "@/pages/finance/currency-converter";

// Productivity Tools
import TodoList from "@/pages/productivity/todo";
import QuickNotes from "@/pages/productivity/notes";
import TaskTimer from "@/pages/productivity/task-timer";
import ProjectTimer from "@/pages/productivity/project-timer";
import MindMap from "@/pages/productivity/mind-map";
import FocusTimer from "@/pages/productivity/focus-timer";
import GoalTracker from "@/pages/productivity/goal-tracker";
import KanbanBoard from "@/pages/productivity/kanban";
import MeetingCost from "./pages/productivity/meeting-cost";
import ContextSwitcher from "./pages/productivity/context-switcher";
import FocusFlow from "@/pages/productivity/focus-flow";

// Utility Tools
import UnitConverter from "@/pages/utility/unit-converter";
import Calculator from "@/pages/utility/calculator";
import Reminder from "@/pages/utility/reminder";
import FileOrganizer from "@/pages/utility/file-organizer";
import PasswordManager from "@/pages/utility/password-manager";
import NoteEncryption from "@/pages/utility/note-encryption";
import QRScanner from "@/pages/utility/qr-scanner";
import ScreenRecorder from "@/pages/utility/screen-recorder";
import FileConverter from "@/pages/utility/file-converter";
import FileDNA from "@/pages/utility/file-dna";

import { categories } from "@/lib/tool-categories";
import Flashcards from "@/pages/education/flashcards";
import PriceComparison from "@/pages/shopping/price-comparison";
import ShoppingList from "@/pages/shopping/shopping-list";
import DiscountCalculator from "@/pages/shopping/discount-calculator";
import StudyTimer from "@/pages/education/study-timer";
import NoteTaking from "@/pages/education/note-taking";
import MathCalculator from "@/pages/education/math-calculator";
import QuizMaker from "@/pages/education/quiz-maker";
import DecisionMaker from "./pages/fun/decision-maker";
import YesNoSpinner from "./pages/fun/yes-no-spinner";

type RouteParams = Record<string, string>;

// Static Page Wrappers
const createStaticRoute = (Component: React.ComponentType<RouteComponentProps<RouteParams>>) => {
  return (props: RouteComponentProps<RouteParams>) => (
    <RouteWrapper Component={Component} {...props} />
  );
};

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Introduction} />
        <Route path="/tools" component={Home} />
        <Route path="/search" component={SearchResults} />
        
        {/* Documentation and Legal Pages */}
        <Route path="/docs" component={Documentation} />
        <Route path="/docs/getting-started" component={GettingStarted} />
        <Route path="/docs/api" component={ApiReference} />
        <Route path="/docs/examples" component={Examples} />
        <Route path="/docs/faq" component={FAQ} />
        <Route path="/changelog" component={Changelog} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/license" component={License} />
        
        {/* Static Pages */}
        <Route path="/roadmap">
          <RouteWrapper Component={Roadmap} />
        </Route>
        <Route path="/cookies">
          <RouteWrapper Component={Cookies} />
        </Route>
        <Route path="/community">
          {(params) => <Community {...params} />}
        </Route>
        
        {/* Category route */}
        <Route path="/category/:category">
          {(params) => <CategoryPage {...params} />}
        </Route>
        
        {/* Text & Content routes */}
        <Route path="/text/case-converter" component={TextCaseConverter} />
        <Route path="/text/word-replacer" component={WordReplacer} />
        <Route path="/text/word-counter" component={WordCounter} />
        <Route path="/text/lorem-generator" component={LoremGenerator} />
        <Route path="/text/markdown-editor" component={MarkdownEditor} />
        <Route path="/text/diff" component={TextDiff} />
        <Route path="/text/quotes" component={QuoteGenerator} />
        <Route path="/text/code-to-image" component={CodeToImage} />
        <Route path="/text/ascii-art" component={AsciiArt} />

        {/* Development Tools routes */}
        <Route path="/dev/api-status" component={ApiStatus} />
        <Route path="/dev/dependency-analyzer" component={DependencyAnalyzer} />
        <Route path="/dev/curl-builder" component={CurlBuilder} />
        <Route path="/dev/json-formatter" component={JsonFormatter} />
        <Route path="/dev/code-beautifier" component={CodeBeautifier} />
        <Route path="/dev/regex" component={RegexTester} />
        <Route path="/dev/api-client" component={ApiClient} />
        <Route path="/dev/sql-formatter" component={SqlFormatter} />
        <Route path="/dev/cron-generator" component={CronGenerator} />
        <Route path="/dev/jwt-debugger" component={JwtDebugger} />
        <Route path="/dev/graphql" component={GraphqlPlayground} />
        <Route path="/dev/css-minifier" component={CssMinifier} />
        <Route path="/dev/html-formatter" component={HtmlFormatter} />
        <Route path="/dev/api-tester" component={ApiTester} />
        <Route path="/dev/code-smell" component={CodeSmellDetector} />
        <Route path="/dev/api-mock" component={ApiMockGenerator} />
        <Route path="/dev/git-message" component={GitMessageBuilder} />

        {/* Data & Conversion routes */}
        <Route path="/data/base64" component={Base64Tool} />
        <Route path="/data/csv-json" component={CsvToJson} />
        <Route path="/data/url-tools" component={UrlTools} />
        <Route path="/data/hash" component={HashGenerator} />
        <Route path="/data/format-converter" component={FormatConverter} />
        <Route path="/data/number-base" component={NumberBase} />
        <Route path="/data/json-yaml" component={JsonYamlConverter} />
        <Route path="/data/excel-json" component={ExcelToJson} />
        <Route path="/data/xml-formatter" component={XmlFormatter} />
        <Route path="/data/validator" component={DataValidator} />

        {/* Visual & Media routes */}
        <Route path="/visual/color-picker" component={ColorPicker} />
        <Route path="/visual/image-tools" component={ImageTools} />
        <Route path="/visual/qr-code" component={QrCode} />
        <Route path="/visual/svg-editor" component={SvgEditor} />
        <Route path="/visual/gradient" component={GradientGenerator} />
        <Route path="/visual/image-compressor" component={ImageCompressor} />
        <Route path="/visual/svg-optimizer" component={SvgOptimizer} />
        <Route path="/visual/favicon" component={FaviconGenerator} />
        <Route path="/visual/color-palette" component={ColorPaletteGenerator} />

        {/* Time & Date routes */}
        <Route path="/time/timezone" component={TimezoneConverter} />
        <Route path="/time/date-calculator" component={DateCalculator} />
        <Route path="/time/countdown" component={CountdownTimer} />

        {/* Security & Encryption routes */}
        <Route path="/security/password" component={PasswordGenerator} />
        <Route path="/security/hash" component={SecurityHashGenerator} />
        <Route path="/security/hash-compare" component={HashComparison} />
        <Route path="/security/certificate" component={CertificateGenerator} />

        {/* Network & Web routes */}
        <Route path="/network/dns" component={DnsLookup} />
        <Route path="/network/ports" component={PortScanner} />
        <Route path="/network/headers" component={HttpHeaders} />
        <Route path="/network/ip" component={IpTools} />
        <Route path="/network/websocket" component={WebSocketTester} />

        {/* Weather Tools routes */}
        <Route path="/weather/weather-converter" component={WeatherConverter} />
        <Route path="/weather/wind-calculator" component={WindCalculator} />
        <Route path="/weather/rain-probability" component={RainProbability} />

        {/* Food Tools routes */}
        <Route path="/food/recipe-converter" component={RecipeConverter} />
        <Route path="/food/meal-planner" component={MealPlanner} />
        <Route path="/food/cooking-timer" component={CookingTimer} />

        {/* Travel Tools routes */}
        <Route path="/travel/fuel-calculator" component={FuelCalculator} />
        <Route path="/travel/trip-planner" component={TripPlanner} />
        <Route path="/travel/distance-calculator" component={DistanceCalculator} />

        {/* Finance Tools routes */}
        <Route path="/finance/expense-tracker" component={ExpenseTracker} />
        <Route path="/finance/budget-planner" component={BudgetPlanner} />
        <Route path="/finance/bill-reminder" component={BillReminder} />
        <Route path="/finance/savings-calculator" component={SavingsCalculator} />
        <Route path="/finance/investment-calculator" component={InvestmentCalculator} />
        <Route path="/finance/loan-calculator" component={LoanCalculator} />
        <Route path="/finance/currency-converter" component={CurrencyConverter} />

        {/* Productivity Tools routes */}
        <Route path="/productivity/todo" component={TodoList} />
        <Route path="/productivity/notes" component={QuickNotes} />
        <Route path="/productivity/task-timer" component={TaskTimer} />
        <Route path="/productivity/project-timer" component={ProjectTimer} />
        <Route path="/productivity/mind-map" component={MindMap} />
        <Route path="/productivity/focus-timer" component={FocusTimer} />
        <Route path="/productivity/goal-tracker" component={GoalTracker} />
        <Route path="/productivity/kanban" component={KanbanBoard} />
        <Route path="/productivity/meeting-cost" component={MeetingCost} />
        <Route path="/productivity/context-switcher" component={ContextSwitcher} />
        <Route path="/productivity/focus-flow" component={FocusFlow} />

        {/* Utility Tools routes */}
        <Route path="/utility/unit-converter" component={UnitConverter} />
        <Route path="/utility/calculator" component={Calculator} />
        <Route path="/utility/reminder" component={Reminder} />
        <Route path="/utility/file-organizer" component={FileOrganizer} />
        <Route path="/utility/password-manager" component={PasswordManager} />
        <Route path="/utility/note-encryption">
          <NoteEncryption />
        </Route>
        <Route path="/utility/qr-scanner">
          <QRScanner />
        </Route>
        <Route path="/utility/screen-recorder">
          <ScreenRecorder />
        </Route>
        <Route path="/utility/file-converter">
          <FileConverter />
        </Route>
        <Route path="/utility/file-dna">
          <RouteWrapper Component={FileDNA} />
        </Route>

        {/* Shopping routes */}
        <Route path="/shopping/price-comparison" component={PriceComparison} />
        <Route path="/shopping/shopping-list" component={ShoppingList} />
        <Route path="/shopping/discount-calculator" component={DiscountCalculator} />

        {/* Education routes */}
        <Route path="/education/study-timer" component={StudyTimer} />
        <Route path="/education/flashcards" component={Flashcards} />
        <Route path="/education/note-taking" component={NoteTaking} />
        <Route path="/education/math-calculator" component={MathCalculator} />
        <Route path="/education/quiz-maker" component={QuizMaker} />

        {/* Fun routes */}
        <Route path="/fun/decision-maker">
          {(params) => <DecisionMaker {...params} />}
        </Route>
        <Route path="/fun/yes-no-spinner">
          {(params) => <YesNoSpinner {...params} />}
        </Route>

        {/* Catch-all route for 404 */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <Router />
        <Toaster />
      </SearchProvider>
    </QueryClientProvider>
  );
}
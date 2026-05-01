import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Film,
  Play,
  Loader2,
  Info,
  Sparkles,
  Wand2,
  Settings,
  X,
  Moon,
  Sun,
  MessageCircle,
  Send,
  Droplets,
  TrendingUp,
  ChevronRight,
  Layers,
  Calendar,
  Tags,
  Clapperboard,
  Users,
  PlayCircle,
  Tv,
  Database,
  StarHalf,
  Gamepad2,
} from 'lucide-react';

const locales = {
  en: {
    langName: 'English',
    titleMode: 'Exact Title',
    vibeMode: 'AI Vibe',
    placeholderTitle: 'Search movies, series...',
    placeholderVibe: 'Describe the plot or vibe...',
    searchBtn: 'Search',
    suggestBtn: 'Suggest',
    noResults: 'No media found.',
    topMatches: 'Top Matches',
    otherMedia: 'Other Media',
    info: 'Details',
    aiPitch: 'AI Pitch',
    playMovie: 'Play Now',
    year: 'Year',
    genre: 'Genre',
    director: 'Director',
    cast: 'Cast',
    imdbScore: 'IMDb Score',
    unknown: 'Unknown',
    settings: 'Settings',
    language: 'Language',
    theme: 'Appearance',
    light: 'Light Theme',
    dark: 'Dark Theme',
    close: 'Close',
    subtitle: 'Find direct streaming links by title or vibe description.',
    errorAI: 'Failed to generate response.',
    errorSearch: 'Search failed.',
    funFactTitle: 'Trivia',
    chat: 'Chat',
    typeMessage: 'Ask anything...',
    aiGreeting: "Hi! Let's talk about",
    generatingImg: 'Generating: ',
    trending: 'Trending Vibes',
    tryThese: 'Or try these titles',
    appearance: 'Appearance',
  },
  ru: {
    langName: 'Russian',
    titleMode: 'Точное название',
    vibeMode: 'ИИ Вайб',
    placeholderTitle: 'Поиск фильмов, сериалов...',
    placeholderVibe: 'Опишите сюжет или атмосферу...',
    searchBtn: 'Поиск',
    suggestBtn: 'Найти',
    noResults: 'Ничего не найдено.',
    topMatches: 'Лучшие',
    otherMedia: 'Другое',
    info: 'Детали',
    aiPitch: 'Питч',
    playMovie: 'Смотреть',
    year: 'Год',
    genre: 'Жанр',
    director: 'Режиссер',
    cast: 'В ролях',
    imdbScore: 'Оценка IMDb',
    unknown: 'Неизвестно',
    settings: 'Настройки',
    language: 'Язык',
    theme: 'Внешний вид',
    light: 'Светлая',
    dark: 'Темная',
    close: 'Закрыть',
    subtitle: 'Находите ссылки на стриминг по названию или описанию вайба.',
    errorAI: 'Ошибка ИИ.',
    errorSearch: 'Ошибка поиска.',
    funFactTitle: 'Факт',
    chat: 'Чат',
    typeMessage: 'Спросите что-нибудь...',
    aiGreeting: 'Привет! Обсудим',
    generatingImg: 'Рисую: ',
    trending: 'Популярные вайбы',
    tryThese: 'Или попробуйте',
    appearance: 'Оформление',
  },
  az: {
    langName: 'Azərbaycan',
    titleMode: 'Dəqiq Ad',
    vibeMode: 'Sİ Ab-hava',
    placeholderTitle: 'Film, serial axtar...',
    placeholderVibe: 'Süjeti və ya ab-havanı təsvir et...',
    searchBtn: 'Axtar',
    suggestBtn: 'Təklif',
    noResults: 'Heç nə tapılmadı.',
    topMatches: 'Əsas Nəticələr',
    otherMedia: 'Digər',
    info: 'Detallar',
    aiPitch: 'Sİ Xülasəsi',
    playMovie: 'İzlə',
    year: 'İl',
    genre: 'Janr',
    director: 'Rejissor',
    cast: 'Rollarda',
    imdbScore: 'IMDb Xalı',
    unknown: 'Məlum deyil',
    settings: 'Ayarlar',
    language: 'Dil',
    theme: 'Görünüş',
    light: 'Açıq',
    dark: 'Tünd',
    close: 'Bağla',
    subtitle: 'Ad və ya ab-hava ilə birbaşa izləmə linklərini tapın.',
    errorAI: 'Sİ xətası.',
    errorSearch: 'Axtarış xətası.',
    funFactTitle: 'Fakt',
    chat: 'Söhbət',
    typeMessage: 'Nəsə soruş...',
    aiGreeting: 'Salam! Gəl danışaq:',
    generatingImg: 'Yaradılır: ',
    trending: 'Trend Ab-havalar',
    tryThese: 'Yaxud bunları yoxla',
    appearance: 'Görünüş',
  },
};

const trendingVibes = [
  'A group of kids fighting aliens in the 80s',
  'Cyberpunk dystopian future with replicants',
  'A heist involving dreams within dreams',
];

const trendingTitles = [
  'Inception',
  'Breaking Bad',
  'The Matrix',
  'Interstellar',
];

const LiquidStyles = () => (
  <style>{`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(40px, -50px) scale(1.1); }
      66% { transform: translate(-30px, 30px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob { animation: blob 12s infinite alternate ease-in-out; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
    
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.4); border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(107, 114, 128, 0.7); }
    
    .glass-panel {
      backdrop-filter: blur(24px) saturate(150%);
      -webkit-backdrop-filter: blur(24px) saturate(150%);
    }
    .glass-panel-heavy {
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
    }

    .no-tap-highlight {
      -webkit-tap-highlight-color: transparent;
    }
  `}</style>
);

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [lastSearchMode, setLastSearchMode] = useState('title');
  const [searchMode, setSearchMode] = useState('title');

  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [showSettings, setShowSettings] = useState(false);

  const [expandedTab, setExpandedTab] = useState({});
  const [pitches, setPitches] = useState({});
  const [pitchLoading, setPitchLoading] = useState({});
  const [movieInfo, setMovieInfo] = useState({});
  const [infoLoading, setInfoLoading] = useState({});
  const [chatMessages, setChatMessages] = useState({});
  const [chatInput, setChatInput] = useState({});
  const [isChatLoading, setIsChatLoading] = useState({});

  const textareaRef = useRef(null);
  const chatContainerRefs = useRef({});

  const t = (key) => locales[language]?.[key] || locales['en'][key];
  const langName = locales[language]?.langName || locales['en'].langName;

  const isDark = theme === 'dark';
  const isGlass = true;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [query]);

  useEffect(() => {
    setResults([]);
    setSearched(false);
    setExpandedTab({});
    setPitches({});
    setMovieInfo({});
    setChatMessages({});
    setError(null);
  }, [language]);

  useEffect(() => {
    Object.values(chatContainerRefs.current).forEach((container) => {
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }
    });
  }, [chatMessages, isChatLoading]);

  const callGemini = async (prompt, isJson = false) => {
    let retries = 5, delay = 1000;
    while (retries > 0) {
      try {
        const response = await fetch('/api/gemini', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, isJson })
        });
  
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
  
        // Extract content from OpenAI-compatible schema returned by OpenRouter
        const text = data.choices?.[0]?.message?.content;
        if (!text) throw new Error('Invalid response structure');
  
        return isJson ? JSON.parse(text) : text;
      } catch (err) { 
        retries--; 
        if (retries === 0) throw new Error("API Limit or Network Error");
        await new Promise(r => setTimeout(r, delay)); 
        delay *= 2; 
      }
    }
  };
  

  const safeRender = (val) => {
    if (val === undefined || val === null) return '';
    if (typeof val === 'object' && !Array.isArray(val))
      return JSON.stringify(val);
    if (Array.isArray(val)) return val.join(', ');
    return String(val);
  };

  const fetchWikidataForTitle = async (searchTitle) => {
    try {
      const searchRes = await fetch(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
          searchTitle
        )}&language=${language}&format=json&origin=*`
      );
      const searchData = await searchRes.json();
      if (!searchData.search || searchData.search.length === 0) return [];

      const topResults = searchData.search.slice(0, 8);
      const ids = topResults.map((item) => item.id).join('|');
      const entitiesRes = await fetch(
        `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids}&props=claims&format=json&origin=*`
      );
      const entitiesData = await entitiesRes.json();

      return topResults
        .map((item) => {
          const entity = entitiesData.entities[item.id];
          const imdbId = entity?.claims?.P345?.[0]?.mainsnak?.datavalue?.value;
          const desc = item.description?.toLowerCase() || '';
          const isMain =
            /(film|movie|television|tv|series|miniseries|drama|sitcom|documentary|animation|anime|фильм|сериал|кино)/i.test(
              desc
            ) &&
            !/(episode|character|video game|franchise|album|song|эпизод|персонаж|игра)/i.test(
              desc
            );

          return {
            id: item.id,
            title: item.label,
            description: item.description || t('noResults'),
            imdbId: imdbId,
            isMain: isMain,
          };
        })
        .filter((item) => item.imdbId);
    } catch (e) {
      return [];
    }
  };

  const handleSearch = async (e, directQuery = null, forceMode = null) => {
    if (e) e.preventDefault();
    const activeQuery = directQuery || query;
    const activeMode = forceMode || searchMode;

    if (!activeQuery.trim()) return;
    if (directQuery) {
      setQuery(directQuery);
      setSearchMode(activeMode);
    }

    setLoading(true);
    setError(null);
    setSearched(true);
    setLastSearchMode(activeMode);
    setResults([]);

    try {
      let finalResults = [];
      if (activeMode === 'vibe') {
        const prompt = `User Query in ${langName}: "${activeQuery}". Suggest 3-4 famous ORIGINAL movie/TV show titles matching this description. If it's an exact title, put that first. Return JSON array of strings only.`;
        const suggested = await callGemini(prompt, true);
        const wikiPromises = (suggested || []).map((title) =>
          fetchWikidataForTitle(title)
        );
        const wikiResults = await Promise.all(wikiPromises);
        const seen = new Set();
        wikiResults.flat().forEach((item) => {
          if (!seen.has(item.imdbId)) {
            seen.add(item.imdbId);
            finalResults.push(item);
          }
        });
      } else {
        const raw = await fetchWikidataForTitle(activeQuery);
        const seen = new Set();
        raw.forEach((item) => {
          if (!seen.has(item.imdbId)) {
            seen.add(item.imdbId);
            finalResults.push(item);
          }
        });
      }
      setResults(finalResults);
    } catch (err) {
      setError(t('errorSearch'));
    } finally {
      setLoading(false);
    }
  };

  const fetchPitch = async (item) => {
    setPitchLoading((prev) => ({ ...prev, [item.id]: true }));
    try {
      const prompt = ` critic pitch for "${item.title}" (${
        item.description
      }) in ${langName}. 2 sentences + fun fact line starting with "**${t(
        'funFactTitle'
      )}:** ". No hallucination.`;
      const text = await callGemini(prompt, false);
      setPitches((prev) => ({ ...prev, [item.id]: text }));
    } catch (e) {
      setPitches((prev) => ({ ...prev, [item.id]: t('errorAI') }));
    } finally {
      setPitchLoading((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  const fetchInfo = async (item) => {
    setInfoLoading((prev) => ({ ...prev, [item.id]: true }));
    try {
      const prompt = `JSON facts for "${item.title}" (${item.description}) in ${langName}. Keys: year, genre, director, cast, imdbScore (e.g. "8.8/10").`;
      const data = await callGemini(prompt, true);
      setMovieInfo((prev) => ({ ...prev, [item.id]: data }));
    } catch (e) {
      setMovieInfo((prev) => ({ ...prev, [item.id]: { error: true } }));
    } finally {
      setInfoLoading((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  const handleSendMessage = async (e, item) => {
    e.preventDefault();
    const userMsg = chatInput[item.id]?.trim();
    if (!userMsg || isChatLoading[item.id]) return;

    setChatInput((prev) => ({ ...prev, [item.id]: '' }));
    setChatMessages((prev) => ({
      ...prev,
      [item.id]: [...(prev[item.id] || []), { role: 'user', text: userMsg }],
    }));
    setIsChatLoading((prev) => ({ ...prev, [item.id]: true }));

    try {
      const history = (chatMessages[item.id] || [])
        .map((m) => `${m.role}: ${m.text}`)
        .join('\n');
      const prompt = `Assistant about "${item.title}" (${item.description}) in ${langName}. If asked for image, return EXACTLY: [GENERATE_IMAGE: detailed prompt]. History: ${history} User: ${userMsg}`;

      let reply = await callGemini(prompt, false);
      const imgMatch = reply.match(/\[GENERATE_IMAGE:\s*(.*?)\]/i);

      if (imgMatch) {
        const imgP = imgMatch[1];
        setChatMessages((prev) => ({
          ...prev,
          [item.id]: [
            ...(prev[item.id] || []),
            { role: 'model', text: `*${t('generatingImg')}"${imgP}"...*` },
          ],
        }));

        let retries = 5,
          delay = 1000,
          imgSuccess = false;
        while (retries > 0 && !imgSuccess) {
          try {
            const res = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  instances: { prompt: imgP },
                  parameters: { sampleCount: 1 },
                }),
              }
            );
            if (!res.ok) throw new Error();
            const d = await res.json();
            if (d.predictions?.[0]) {
              reply = `![Generated Image](data:image/png;base64,${d.predictions[0].bytesBase64Encoded})`;
              imgSuccess = true;
            } else throw new Error();
          } catch (err) {
            retries--;
            await new Promise((r) => setTimeout(r, delay));
            delay *= 2;
          }
        }
        if (!imgSuccess) reply = '*(Image generation failed)*';

        setChatMessages((prev) => {
          const arr = [...(prev[item.id] || [])];
          arr[arr.length - 1] = { role: 'model', text: reply };
          return { ...prev, [item.id]: arr };
        });
        setIsChatLoading((prev) => ({ ...prev, [item.id]: false }));
        return;
      }
      setChatMessages((prev) => ({
        ...prev,
        [item.id]: [
          ...(prev[item.id] || []),
          { role: 'model', text: String(reply) },
        ],
      }));
    } catch (e) {
      setChatMessages((prev) => ({
        ...prev,
        [item.id]: [
          ...(prev[item.id] || []),
          { role: 'model', text: t('errorAI') },
        ],
      }));
    } finally {
      setIsChatLoading((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  const renderMarkdown = (text) => {
    if (!text || typeof text !== 'string') return null;
    return (
      <React.Fragment>
        {text
          .split('\n')
          .filter((p) => p.trim())
          .map((para, i) => {
            const imgMatch = para.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (imgMatch)
              return (
                <img
                  key={i}
                  src={imgMatch[2]}
                  alt={imgMatch[1]}
                  className="my-3 rounded-2xl w-full max-w-sm border dark:border-white/10 shadow-lg object-cover"
                />
              );
            let html = para
              .replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-bold text-indigo-600 dark:text-indigo-400">$1</strong>'
              )
              .replace(
                /\*(.*?)\*/g,
                '<em class="italic text-slate-500 dark:text-slate-400">$1</em>'
              );
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: html }}
                className="mb-3 leading-relaxed text-[15px]"
              />
            );
          })}
      </React.Fragment>
    );
  };

  const tBg = isDark ? 'bg-[#09090b]' : 'bg-[#f4f7f9]';
  const tText = isDark ? 'text-white' : 'text-slate-900';
  const tTextMuted = isDark ? 'text-slate-300' : 'text-slate-600';
  const tTextSubMuted = isDark ? 'text-slate-400' : 'text-slate-500';

  const tCard =
    'glass-panel bg-white/40 dark:bg-[#111115]/50 border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]';

  const tInput =
    'glass-panel bg-white/50 dark:bg-black/30 border border-white/60 dark:border-white/10 focus:bg-white/80 dark:focus:bg-black/50 focus:ring-4 ring-indigo-500/20 dark:ring-indigo-500/40';

  const tButtonGlass =
    'glass-panel bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 border border-white/40 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all duration-500';

  const tPlayButton =
    'glass-panel bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 border border-white/60 dark:border-white/20 text-indigo-700 dark:text-indigo-300 shadow-[0_4px_20px_rgb(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]';

  const tTopPlayButton =
    'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-900 border-none shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)]';

  const infoIcons = {
    [t('year')]: Calendar,
    [t('genre')]: Tags,
    [t('director')]: Clapperboard,
    [t('cast')]: Users,
    [t('imdbScore')]: StarHalf,
  };

  const SkeletonCard = () => (
    <div className={`p-6 rounded-[2rem] w-full mb-6 animate-pulse ${tCard}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-3 w-2/3">
          <div className="h-6 bg-slate-300/50 dark:bg-slate-700/50 rounded-lg w-3/4"></div>
          <div className="h-4 bg-slate-300/50 dark:bg-slate-700/50 rounded-lg w-full"></div>
        </div>
        <div className="h-10 w-28 bg-slate-300/50 dark:bg-slate-700/50 rounded-2xl"></div>
      </div>
      <div className="flex gap-2 border-t border-slate-200/30 dark:border-slate-700/30 pt-4">
        <div className="h-8 w-24 bg-slate-300/50 dark:bg-slate-700/50 rounded-xl"></div>
        <div className="h-8 w-20 bg-slate-300/50 dark:bg-slate-700/50 rounded-xl"></div>
      </div>
    </div>
  );

  const renderCard = (item, isTop = false) => {
    const active = expandedTab[item.id];

    const yearMatch = item.description?.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? yearMatch[0] : null;
    const desc = item.description?.toLowerCase() || '';

    let mediaType = 'Media';
    let MediaIcon = Film;

    if (/(series|tv|television|miniseries|sitcom|сериал)/i.test(desc)) {
      mediaType = 'Series';
      MediaIcon = Tv;
    } else if (/(film|movie|cinema|фильм|кино)/i.test(desc)) {
      mediaType = 'Movie';
      MediaIcon = Film;
    } else if (/(video game|game|игра)/i.test(desc)) {
      mediaType = 'Game';
      MediaIcon = Gamepad2;
    } else if (/(episode|эпизод)/i.test(desc)) {
      mediaType = 'Episode';
      MediaIcon = PlayCircle;
    } else if (/(character|персонаж)/i.test(desc)) {
      mediaType = 'Character';
      MediaIcon = Users;
    } else if (/(franchise|франшиза)/i.test(desc)) {
      mediaType = 'Franchise';
      MediaIcon = Database;
    }

    return (
      <div key={item.id} className="mb-6 relative group">
        {isTop && (
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-indigo-500/30 blur-2xl -z-10 transition-all duration-1000 opacity-60 dark:opacity-40" />
        )}

        <div
          className={`p-6 sm:p-8 rounded-[2rem] transition-shadow duration-500 ${tCard} ${
            isTop
              ? 'ring-1 ring-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.35)] dark:hover:shadow-[0_0_50px_rgba(16,185,129,0.45)] hover:ring-emerald-400/80'
              : 'ring-1 ring-white/60 dark:ring-white/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.35)] hover:ring-indigo-500/40 dark:hover:ring-indigo-500/30'
          }`}
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-5">
              <div className="flex-1">
                <h3
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${tText}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-base mt-2 line-clamp-2 font-medium ${tTextMuted}`}
                >
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  {year && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-white/40 border-white/60 text-slate-700 dark:bg-black/30 dark:border-white/10 dark:text-slate-300 backdrop-blur-md shadow-sm">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                      {year}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-white/40 border-white/60 text-slate-700 dark:bg-black/30 dark:border-white/10 dark:text-slate-300 backdrop-blur-md shadow-sm">
                    <MediaIcon className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                    {mediaType}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-white/40 border-white/60 text-slate-700 dark:bg-black/30 dark:border-white/10 dark:text-slate-300 backdrop-blur-md shadow-sm">
                    <Database className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    IMDb: {item.imdbId}
                  </span>
                </div>
              </div>

              {item.isMain && (
                <div className="shrink-0 pt-1 sm:pt-0">
                  <a
                    href={`https://www.playimdb.com/title/${item.imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold transition-all overflow-hidden ${
                      isTop ? tTopPlayButton : tPlayButton
                    }`}
                  >
                    {isTop ? (
                      <PlayCircle className="w-5 h-5" />
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                    <span className="relative z-10">{t('playMovie')}</span>
                  </a>
                </div>
              )}
            </div>

            <div
              className={`flex gap-3 flex-wrap border-t pt-6 border-slate-300/40 dark:border-white/10`}
            >
              {[
                ['pitch', Sparkles, t('aiPitch')],
                ['info', Info, t('info')],
                ['chat', MessageCircle, t('chat')],
              ].map(([id, Icon, label]) => {
                const isActive = active === id;
                const activeClasses =
                  'glass-panel bg-indigo-600/90 text-white border-indigo-400/50 shadow-[0_0_20px_rgba(79,70,229,0.5)]';

                return (
                  <button
                    key={id}
                    onClick={() => {
                      setExpandedTab((p) => ({
                        ...p,
                        [item.id]: p[item.id] === id ? null : id,
                      }));
                      if (id === 'pitch' && !pitches[item.id]) fetchPitch(item);
                      if (id === 'info' && !movieInfo[item.id]) fetchInfo(item);
                      if (id === 'chat' && !chatMessages[item.id]?.length)
                        setChatMessages((p) => ({
                          ...p,
                          [item.id]: [
                            {
                              role: 'model',
                              text: `${t('aiGreeting')} **${item.title}**!`,
                            },
                          ],
                        }));
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 outline-none focus:outline-none no-tap-highlight ${
                      isActive ? activeClasses : tButtonGlass
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                );
              })}
            </div>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                active
                  ? 'grid-rows-[1fr] opacity-100 mt-6'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`p-6 rounded-[1.5rem] transition-all glass-panel-heavy bg-white/30 dark:bg-black/30 border border-white/50 dark:border-white/10 shadow-inner`}
                >
                  {active === 'pitch' &&
                    (pitchLoading[item.id] ? (
                      <div className="py-8 flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                      </div>
                    ) : (
                      renderMarkdown(pitches[item.id])
                    ))}

                  {active === 'info' &&
                    (infoLoading[item.id] ? (
                      <div className="py-8 flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        {Object.entries({
                          [t('imdbScore')]: movieInfo[item.id]?.imdbScore,
                          [t('year')]: movieInfo[item.id]?.year,
                          [t('genre')]: movieInfo[item.id]?.genre,
                          [t('director')]: movieInfo[item.id]?.director,
                          [t('cast')]: movieInfo[item.id]?.cast,
                        }).map(([k, v]) => {
                          const InfoIcon = infoIcons[k] || Info;
                          return (
                            <div key={k} className="space-y-1.5">
                              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                <InfoIcon className="w-3.5 h-3.5" /> {k}
                              </span>
                              <span
                                className={`block font-semibold text-[15px] ${tText}`}
                              >
                                {safeRender(v) || t('unknown')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ))}

                  {active === 'chat' && (
                    <div className="flex flex-col h-[450px]">
                      <div
                        ref={(el) => (chatContainerRefs.current[item.id] = el)}
                        className="flex-1 overflow-y-auto space-y-5 pr-4 mb-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
                      >
                        {(chatMessages[item.id] || []).map((m, i) => (
                          <div
                            key={i}
                            className={`flex ${
                              m.role === 'user'
                                ? 'justify-end'
                                : 'justify-start'
                            } animate-in fade-in slide-in-from-bottom-2`}
                          >
                            <div
                              className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed max-w-[85%] shadow-sm ${
                                m.role === 'user'
                                  ? 'glass-panel bg-indigo-600/90 text-white border border-indigo-400/30 rounded-br-sm'
                                  : 'glass-panel bg-white/70 dark:bg-white/10 border border-white/60 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-bl-sm'
                              }`}
                            >
                              {m.role === 'model'
                                ? renderMarkdown(m.text)
                                : m.text}
                            </div>
                          </div>
                        ))}
                        {isChatLoading[item.id] && (
                          <div className="flex justify-start animate-in fade-in">
                            <div className="px-5 py-4 rounded-2xl rounded-bl-sm flex gap-1.5 items-center glass-panel bg-white/70 dark:bg-white/10 border border-white/60 dark:border-white/10">
                              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />{' '}
                              <span
                                className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                                style={{ animationDelay: '0.1s' }}
                              />{' '}
                              <span
                                className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                                style={{ animationDelay: '0.2s' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <form
                        onSubmit={(e) => handleSendMessage(e, item)}
                        className="relative flex items-end gap-3 p-2 rounded-[1.5rem] transition-all glass-panel bg-white/50 dark:bg-black/40 border border-white/60 dark:border-white/10"
                      >
                        <textarea
                          rows={1}
                          value={chatInput[item.id] || ''}
                          onChange={(e) => {
                            setChatInput((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }));
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(
                              e.target.scrollHeight,
                              120
                            )}px`;
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage(e, item);
                            }
                          }}
                          placeholder={t('typeMessage')}
                          className={`w-full bg-transparent px-4 py-3 text-[15px] outline-none resize-none max-h-[120px] scrollbar-thin ${tText} placeholder-slate-500 dark:placeholder-slate-400`}
                        />
                        <button
                          type="submit"
                          disabled={
                            isChatLoading[item.id] ||
                            !chatInput[item.id]?.trim()
                          }
                          className="p-3 mb-1 mr-1 bg-indigo-600 text-white rounded-xl disabled:opacity-50 disabled:bg-slate-400 hover:bg-indigo-500 active:scale-95 transition-all shrink-0 shadow-md"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${tBg} min-h-screen transition-colors duration-1000 font-sans selection:bg-indigo-500/30 overflow-x-hidden ${
        isDark ? 'dark' : ''
      }`}
    >
      <LiquidStyles />

      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-80 dark:opacity-40 z-0">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] ${
            isDark
              ? 'bg-indigo-600/40 mix-blend-screen'
              : 'bg-indigo-300/60 mix-blend-multiply'
          } filter blur-[100px] rounded-full animate-blob`}
        />
        <div
          className={`absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] ${
            isDark
              ? 'bg-purple-600/40 mix-blend-screen'
              : 'bg-purple-300/50 mix-blend-multiply'
          } filter blur-[120px] rounded-full animate-blob animation-delay-2000`}
        />
        <div
          className={`absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] ${
            isDark
              ? 'bg-emerald-600/30 mix-blend-screen'
              : 'bg-emerald-200/60 mix-blend-multiply'
          } filter blur-[130px] rounded-full animate-blob animation-delay-4000`}
        />
      </div>

      <div className="min-h-screen p-4 sm:p-6 md:p-10 relative z-10 flex flex-col items-center">
        <header className="w-full max-w-5xl flex justify-end mb-8 sm:mb-16">
          <button
            onClick={() => setShowSettings(true)}
            className={`p-3 rounded-full shadow-lg hover:rotate-90 transition-all duration-500 outline-none focus:outline-none no-tap-highlight glass-panel bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]`}
          >
            <Settings className={`w-5 h-5 ${tText}`} />
          </button>
        </header>

        <main className="w-full max-w-3xl flex-1">
          <div className="text-center mb-12 sm:mb-16 space-y-6 animate-in slide-in-from-top-8 duration-700">
            <div className="inline-flex p-5 sm:p-6 rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative glass-panel bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10">
              <Film className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400" />
              <div className="absolute -top-2 -right-2 flex h-8 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <Sparkles className="relative inline-flex w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <div>
              <h1
                className={`text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase drop-shadow-sm ${tText}`}
              >
                Play
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-emerald-500">
                  IMDB
                </span>
              </h1>
              <p
                className={`mt-4 sm:text-lg font-medium tracking-wide max-w-md mx-auto ${tTextSubMuted}`}
              >
                {t('subtitle')}
              </p>
            </div>
          </div>

          <div className="p-2 rounded-2xl flex gap-2 max-w-sm mx-auto mb-10 shadow-sm glass-panel bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10">
            {['title', 'vibe'].map((m) => (
              <button
                key={m}
                onClick={() => setSearchMode(m)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all capitalize tracking-wide outline-none focus:outline-none focus:ring-0 no-tap-highlight flex items-center justify-center gap-2 ${
                  searchMode === m
                    ? 'glass-panel bg-white/60 dark:bg-white/20 shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-white/60 dark:border-white/10 text-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/30 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                {m === 'title' ? (
                  <Search className="w-4 h-4" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                {m === 'title' ? t('titleMode') : t('vibeMode')}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSearch}
            className="relative mb-16 group w-full z-20"
          >
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500/70 dark:text-indigo-400/80 pointer-events-none group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 group-focus-within:scale-110 transition-all duration-300">
              {searchMode === 'title' ? (
                <Search size={28} strokeWidth={2.5} />
              ) : (
                <Wand2 size={28} strokeWidth={2.5} />
              )}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full border-2 rounded-[2rem] sm:rounded-[2.5rem] pl-16 pr-32 sm:pr-40 py-6 sm:py-7 text-lg sm:text-xl font-medium outline-none transition-all shadow-[0_8px_30px_rgb(0,0,0,0.08)] ${tInput} ${tText} placeholder-slate-500 dark:placeholder-slate-400`}
              placeholder={
                searchMode === 'title'
                  ? t('placeholderTitle')
                  : t('placeholderVibe')
              }
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-3 bottom-3 px-6 sm:px-10 bg-indigo-600 text-white rounded-[1.5rem] sm:rounded-[2rem] font-bold text-sm sm:text-base hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 active:scale-95 disabled:opacity-50 disabled:shadow-none tracking-wide outline-none focus:outline-none no-tap-highlight"
            >
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6 mx-auto" />
              ) : (
                <div className="flex items-center gap-2">
                  {searchMode === 'title' ? (
                    <Search className="w-4 h-4 hidden sm:block" />
                  ) : (
                    <Sparkles className="w-4 h-4 hidden sm:block" />
                  )}
                  {t('searchBtn')}
                </div>
              )}
            </button>
          </form>

          {error && (
            <div className="p-5 mb-10 border rounded-2xl flex items-center gap-4 font-semibold animate-in fade-in glass-panel bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400">
              <Info className="w-6 h-6 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {!searched && !loading && (
            <div className="mt-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h3
                className={`text-sm font-bold uppercase tracking-widest text-center mb-8 ${tTextSubMuted}`}
              >
                {searchMode === 'vibe' ? t('trending') : t('tryThese')}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {(searchMode === 'vibe' ? trendingVibes : trendingTitles).map(
                  (item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(null, item, searchMode)}
                      className={`px-5 py-3 rounded-2xl text-sm font-medium transition-shadow hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center gap-2 outline-none focus:outline-none no-tap-highlight ${tButtonGlass} shadow-sm`}
                    >
                      <TrendingUp className="w-4 h-4 text-indigo-500" /> {item}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          <div className="space-y-10 pb-24 w-full">
            {loading && (
              <div className="w-full space-y-6">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            )}

            {!loading && results.filter((r) => r.isMain).length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 mb-8 pl-2">
                  <div className="h-px bg-slate-300/50 dark:bg-slate-700/50 flex-1" />
                  <h2
                    className={`text-xs font-black uppercase tracking-[0.3em] ${tTextSubMuted}`}
                  >
                    {t('topMatches')}
                  </h2>
                  <div className="h-px bg-slate-300/50 dark:bg-slate-700/50 flex-1" />
                </div>
                {results
                  .filter((r) => r.isMain)
                  .map((r, i) => renderCard(r, i === 0))}
              </div>
            )}

            {!loading && results.filter((r) => !r.isMain).length > 0 && (
              <div className="pt-8 animate-in fade-in duration-700 delay-200">
                <div className="flex items-center gap-4 mb-8 pl-2">
                  <div className="h-px bg-slate-300/50 dark:bg-slate-700/50 flex-1" />
                  <h2
                    className={`text-xs font-black uppercase tracking-[0.3em] ${tTextSubMuted}`}
                  >
                    {t('otherMedia')}
                  </h2>
                  <div className="h-px bg-slate-300/50 dark:bg-slate-700/50 flex-1" />
                </div>
                {results.filter((r) => !r.isMain).map((r) => renderCard(r))}
              </div>
            )}

            {searched && !loading && !results.length && (
              <div className="text-center py-20 animate-in fade-in">
                <div className="inline-flex p-6 rounded-full mb-6 glass-panel bg-white/40 dark:bg-black/30 border border-white/50 dark:border-white/10">
                  <Search className={`w-12 h-12 ${tTextSubMuted}`} />
                </div>
                <h3
                  className={`text-2xl font-bold tracking-tight mb-2 ${tText}`}
                >
                  {t('noResults')}
                </h3>
                <p className={tTextMuted}>Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-500 ${
          showSettings
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          onClick={() => setShowSettings(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md shadow-[-20px_0_40px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col glass-panel bg-white/70 dark:bg-[#09090b]/80 border-l border-white/50 dark:border-white/10 ${
            showSettings ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-8 pb-6 border-b flex justify-between items-center border-white/30 dark:border-white/10">
            <h2
              className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${tText}`}
            >
              <Settings className="w-6 h-6 text-indigo-500" /> {t('settings')}
            </h2>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2.5 rounded-full transition-colors hover:bg-white/50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 outline-none focus:outline-none no-tap-highlight"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            <section>
              <h3
                className={`text-xs font-bold uppercase tracking-widest mb-5 ${tTextSubMuted}`}
              >
                {t('appearance')}
              </h3>
              <div className="p-1.5 rounded-2xl grid grid-cols-2 gap-1.5 bg-white/30 dark:bg-black/30 shadow-inner">
                {[
                  ['light', Sun, t('light')],
                  ['dark', Moon, t('dark')],
                ].map(([id, Icon, label]) => {
                  const isActive = theme === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setTheme(id)}
                      className={`py-4 px-2 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 outline-none focus:outline-none no-tap-highlight ${
                        isActive
                          ? 'glass-panel bg-white/80 dark:bg-white/20 text-indigo-600 dark:text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-white/60 dark:border-white/20'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:bg-white/40 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h3
                className={`text-xs font-bold uppercase tracking-widest mb-5 ${tTextSubMuted}`}
              >
                {t('language')}
              </h3>
              <div className="space-y-2">
                {Object.keys(locales).map((l) => {
                  const isActive = language === l;
                  return (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-300 border outline-none focus:outline-none no-tap-highlight ${
                        isActive
                          ? 'glass-panel bg-indigo-500/20 border-indigo-400/40 text-indigo-700 dark:text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                          : 'bg-white/30 dark:bg-black/20 border-white/40 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="font-semibold">
                        {locales[l].langName}
                      </span>
                      {isActive && <ChevronRight className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

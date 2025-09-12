import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { FaTelegramPlane } from "react-icons/fa";

// ================== Типы ==================
type Partner = {
  id: string;
  title: string;
  img: string;
  tag: string;
  discount: string;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  lat?: number;
  lng?: number;
};

// ================== Демо-данные ==================
const PARTNERS: Partner[] = [
{
  id: "1",
  title: "Кофейня «Natura»",
  img: "https://i.postimg.cc/pTsWMxSV/unnamed.png",
  tag: "Кофе",
  discount: "-10%",
  description: "Спешиалти кофе и десерты. Скидка по карте на весь бар.",
  telegram: "https://t.me/s/naturacoffeefood?ysclid=mfegm5018635746362",
  promos: [
    {
      id: "p1",
      img: "https://i.postimg.cc/tT3zdCMC/photo-2025-09-10-23-06-29.jpg",
      title: "Хрустящий френч тост"
    },
    {
      id: "p2",
      img: "https://i.postimg.cc/SNMxg2Gr/photo-2025-09-10-23-04-29.jpg",
      title: "Скидка -20% на паштет с индейкой"
    },
    {
      id: "p3",
      img: "https://i.postimg.cc/QdjVVNpJ/photo-2025-09-10-23-10-42.jpg",
      title: "Комбо: кофе + Боул"
    }
  ]
},
  {
    id: "2",
    title: "GP Дитейлинг",
    img: "https://i.postimg.cc/9XKnL0Xm/1.png",
    tag: "Авто",
    discount: "3+1",
    description: "Каждая 4-я мойка в подарок. Полный спектр услуг.",
    address: "пр-т Победы, 7",
    phone: "+7 900 222-33-11",
    website: "https://example.com/kuza"
  },
  {
    id: "3",
    title: "LIFE TIME",
    img: "https://i.postimg.cc/4NrbCHjd/4.png",
    tag: "Спорт",
    discount: "-15%",
    description: "Современные тренажёры, групповые программы, Детский Лагерь",
    address: "ул. Спортивная, 5",
    phone: "+7 900 321-11-22"
  },
 
  {
    id: "6",
    title: "Кофе Культ",
    img: "https://i.postimg.cc/cJ419rDk/c606a776-21b0-4b41-8098-be2401dd19a2.png",
    tag: "Кофе",
    discount: "-10%",
    description: "Авторские напитки и обжарка собственных зёрен.",
    lat: 55.760186,
    lng: 37.618711
  },
  {
    id: "7",
    title: "Barbershop «Брут»",
    img: "https://i.postimg.cc/QxRZKj2p/fitness.jpg",
    tag: "Красота",
    discount: "-15%",
    description: "Стрижки, укладки, уход за бородой.",
    address: "ул. Городская, 17"
  },
 
  {
    id: "9",
    title: "Барри Кофе",
    img: "https://i.postimg.cc/7ZPMVNyF/i-4.webp",
    tag: "Кофе",
    discount: "-5%",
    description: "Классические эспрессо-напитки и фильтр кофе.",
    address: "ул. Солнечная, 10",
    lat: 55.758735,
    lng: 37.605097
  },
  
  {
    id: "11",
    title: "Фото-студия «Свет»",
    img: "https://i.postimg.cc/1zJWCxGt/IMG-8509.jpg",
    tag: "Фото",
    discount: "-10%",
    description: "Портреты, каталожная съёмка, семейные фотосессии.",
    address: "ул. Фотографов, 1"
  },
  {
    id: "12",
    title: "Сервис «Тех-мастер»",
    img: "https://i.postimg.cc/vm8djhfs/carwash.jpg",
    tag: "Услуги",
    discount: "-8%",
    description: "Ремонт электроники и бытовой техники.",
    address: "ул. Заводская, 42"
  },
  {
  id: "13",
  title: "Chico Coffee Bar",
  img: "https://i.postimg.cc/x1yQJK0X/1.png",
  tag: "Кофе",
  discount: "-12%",
  description: "Атмосферный кофе-бар с авторскими напитками и десертами. Скидка для жителей по карте ДЖ.",
  address: "ЖК Суворовский, ул. Аркадия Шипунова, д. 20",
  telegram: "https://t.me/chico_coffee_bar",
  promos: [
    {
      id: "p1",
      img: "https://i.postimg.cc/tT3zdCMC/photo-2025-09-10-23-06-29.jpg",
      title: "Любой второй кофе со скидкой 50%"
    },
    {
      id: "p2",
      img: "https://i.postimg.cc/SNMxg2Gr/photo-2025-09-10-23-04-29.jpg",
      title: "Скидка -20% на завтраки до 12:00"
    },
    {
      id: "p3",
      img: "https://i.postimg.cc/QdjVVNpJ/photo-2025-09-10-23-10-42.jpg",
      title: "Круассан + капучино по спеццене"
    }
  ]
},
  
];
const WEEKEND_PLACES = [
  // ... уже существующие
  {
    id: "ws1",
    title: "Глэмпинг «Лесной сон»",
    img: "URL_к_картинке_Лесного_Сна",  
    tag: "Глэмпинг",
    discount: "", 
    description: "Домики среди леса, баня, кухня, природа и тишина.",
    website: "https://glampinginfo.ru/glempingi-tulskoy-oblasti/lesnoy-son/",  
    address: "Ясногорский район, Тульская область",
    lat: 0,
    lng: 0
  },
  {
    id: "ws2",
    title: "Экопарк «Ясно Поле»",
    img: "URL_ЯсноПоле",  
    tag: "Эко-отдых",
    discount: "", 
    description: "Природный эко-парк, отдых для семьи, лес, луга.",
    website: "https://visittula.com/places/ozdorovitelnyy-turizm/bazy-otdyha-i-ekoparki/asp/...",  
    address: "Ясногорский район, Тульская область",
    lat: 0,
    lng: 0
  },
  {
    id: "ws3",
    title: "Велесов лес",
    img: "URL_Велесов_лес",  
    tag: "База отдыха",
    discount: "", 
    description: "Домики, баня, лесная природа, отдых вдали от городского шума.",
    website: "https://visittula.com/places/ozdorovitelnyy-turizm/bazy-otdyha-i-ekoparki/velesov-les/",  
    address: "Тульская область",
    lat: 0,
    lng: 0
  },
  {
    id: "ws4",
    title: "Березовая роща",
    img: "URL_Березовая_рощи",  
    tag: "База отдыха",
    discount: "", 
    description: "Коттеджи в лесу, комфорт и уединение.",
    website: "https://mirturbaz.ru/russia/tulskaya/baz.../berezovaya-roscha/",  
    address: "Алексинский район, Тульская область",
    lat: 0,
    lng: 0
  },
  {
    id: "ws5",
    title: "Глэмпинг «Аномалия»",
    img: "URL_Аномалии",  
    tag: "Глэмпинг",
    discount: "", 
    description: "Отдых у озёр, уникальные виды и стильные домики.",
    website: "https://xn--80aayldfh4l.xn--80asehdb/",  
    address: "Тульская область",
    lat: 0,
    lng: 0
  },
  {
    id: "ws6",
    title: "Дом отдыха «Велегож»",
    img: "URL_Велегожа",  
    tag: "База отдыха",
    discount: "", 
    description: "Река Ока, лес, санаторный отдых.",
    website: "https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC_%D0%BE%D1%82%D0%B4%D1%8B%D1%85%D0%B0_%C2%AB%D0%92%D0%B5%D0%BB%D0%B5%D0%B3%D0%BE%D0%B6%C2%BB",  
    address: "Заокский район, Тульская область",
    lat: 0,
    lng: 0
  }
];

// ================== Категории ==================
const CATEGORIES = [
  "🍔 Еда", "☕ Кофе", "🥂 Вечер", "🚗 Авто", "🏋️ Спорт", "💅 Красота",
  "👶 Дети", "🐾 Питомцы", "🎭 Развлечения", "🏞 Природа", "🏥 Здоровье", "🛍 Шопинг",
  "📚 Учёба", "🛠 Услуги", "🎉 Акции", "👔 Бизнес", "⚡ Сегодня", "✨ Новое",
  "🎵 Музыка", "🖼 Культура", "🛒 Маркеты", "💡 Курсы", "✈️ Путешествия", "🎮 Игры",
  "📱 Гаджеты", "📷 Фото", "🎨 Искусство", "📦 Доставка", "💳 Финансы", "⚽ Спортклубы",
  "👗 Одежда", "👟 Обувь", "📖 Книги", "💻 IT", "📺 Электроника", "🪑 Мебель",
  "🏡 Недвижимость", "🚲 Велосипеды", "🛶 Отдых", "🧳 Туризм", "🎁 Подарки", "🧸 Детские товары"
];

// ================== Компоненты ==================

// Поиск
const SearchBar = ({ value, onChange, placeholder = "Поиск партнёров и категорий" }: { value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div className="searchbar">
    <div className="searchbar__inner">
      <span style={{ fontSize: 16, color: "#8e8e93" }}>🔍</span>
      <input
        className="searchbar__input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

// Баннер-лист
const BannerList = ({
  title,
  items,
  onSeeAll,
  badgeLabel,
  onOpen
}: {
  title: string;
  items: Partner[];
  onSeeAll?: () => void;
  badgeLabel?: string;
  onOpen: (p: Partner) => void;
}) => (
  <>
    <section className="section">
      <h2 className="section-title">{title}</h2>
    </section>

    <section style={{ overflowX: "auto", padding: "0 16px 16px" }}>
      <div style={{ display: "flex", gap: 12 }}>
        {items.map((p) => (
          <div
            key={p.id}
            className="card-base"
            style={{
              flex: "0 0 260px",
              position: "relative",
              cursor: "pointer"
            }}
            onClick={() => onOpen(p)} // ✅ открывает модалку
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  backgroundImage: `url(${p.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "140px",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12
                }}
              ></div>

              {badgeLabel && (
                <span
                  className="badge badge--cyan"
                  style={{ position: "absolute", top: 8, left: 8 }}
                >
                  {badgeLabel}
                </span>
              )}
            </div>

            <div style={{ padding: 12 }}>
              <div
                style={{ fontSize: 12, color: "#00ac9e", fontWeight: 700 }}
              >
                УЖЕ ДОСТУПНО
              </div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{p.title}</div>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>
                {p.tag} · {p.discount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {onSeeAll && (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 16px 16px"
        }}
      >
        <button className="btn-link" onClick={onSeeAll}>
          Смотреть все
        </button>
      </div>
    )}
  </>
);

// Рекламная сетка 2×2
const PromoGrid = ({ title, items, onOpen, onSeeAll, badgeLabel }) => (
  <>
    <section className="section">
      <h2 className="section-title">{title}</h2>
    </section>
    <section style={{ padding: "0 16px 16px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // ✅ сетка 2 столбца
          gap: 12,
        }}
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="card-base"
            style={{ cursor: "pointer" }}
            onClick={() => onOpen && onOpen(p)} // ✅ кликаем — открывается модалка
          >
            <div
              style={{
                backgroundImage: `url(${p.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "140px",
                borderRadius: "12px",
              }}
            />
            <div style={{ padding: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{p.title}</div>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>
                {p.tag} {p.discount && `· ${p.discount}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    {onSeeAll && (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 16px 16px",
        }}
      >
        <button className="btn-link" onClick={onSeeAll}>
          Смотреть все
        </button>
      </div>
    )}
  </>
);

// MosaicGrid
const MosaicGrid = ({
  title,
  items,
  onSeeAll,
  onOpen,
  badgeLabel
}: {
  title: string;
  items: Partner[];
  onSeeAll?: () => void;
  onOpen?: (p: Partner) => void;
  badgeLabel?: string;
}) => (
  <>
    <section className="section">
      <h2 className="section-title">{title}</h2>
    </section>

    <section style={{ padding: "0 16px 16px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12
        }}
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="card-base"
            style={{ cursor: "pointer" }}
            onClick={() => onOpen && onOpen(p)}   // ✅ теперь открывает модалку
          >
            <div
              style={{
                backgroundImage: `url(${p.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 120,
                borderRadius: 12
              }}
            />
            <div style={{ padding: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                {p.tag} {p.discount && `· ${p.discount}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {onSeeAll && (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 16px 16px"
        }}
      >
        <button className="btn-link" onClick={onSeeAll}>
          Смотреть все
        </button>
      </div>
    )}
  </>
);

// Спец-блок (акции)
const SpecialBlock = ({ title, color }: { title: string; color: string }) => (
  <div
    style={{
      margin: "16px",
      padding: "20px",
      borderRadius: "16px",
      background: color,
      color: "#fff",
      fontWeight: 800,
      textAlign: "center",
      fontSize: "18px"
    }}
  >
    {title}
  </div>
);

// Журналка: История партнёра
const PartnerStory = () => (
  <div
    style={{
      margin: "16px",
      borderRadius: "18px",
      background: "#fff",
      overflow: "hidden",
      boxShadow: "0 6px 18px rgba(0,0,0,.06)"
    }}
  >
    <img src="https://i.postimg.cc/1zJWCxGt/IMG-8509.jpg" alt="Араик" style={{ width: "100%", display: "block" }} />
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontWeight: 800, marginBottom: "8px" }}>Обращение к жителям</h2>
      <p style={{ color: "#6e6e73", fontSize: "14px" }}>
        Меня зовут <strong>Араик</strong>. Я основал «Другая Мебель», чтобы вернуть здравый смысл в мебель:
        честные материалы, понятные сроки и прозрачные условия.
      </p>
      <button
        style={{
          marginTop: "10px",
          padding: "10px 14px",
          borderRadius: "12px",
          background: "#00ac9e",
          color: "#fff",
          fontWeight: 700,
          border: "none"
        }}
      >
        Написать в WhatsApp
      </button>
    </div>
  </div>
);

// Кофе рядом — без геолокации
const NearbyCoffee = ({ partners, onOpen }: { partners: Partner[]; onOpen: (p: Partner) => void }) => {
  const coffee = useMemo(() => partners.filter((p) => p.tag === "Кофе"), [partners]);

  return (
    <div style={{ padding: "16px" }} id="nearby-coffee">
      <h2 className="section-title" style={{ marginBottom: 8 }}>Кофейни города</h2>
      <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 12 }}>
        Подборка лучших кофеен для держателей карты
      </div>
      <div style={{ overflowX: "auto", paddingTop: 12 }}>
        <div style={{ display: "flex", gap: 12 }}>
          {coffee.map((p) => (
            <div
              key={p.id}
              className="card-base"
              style={{ flex: "0 0 220px", cursor: "pointer" }}
              onClick={() => onOpen(p)}
            >
              <div
                style={{
                  backgroundImage: `url(${p.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: 120
                }}
              />
              <div style={{ padding: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 800 }}>{p.title}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#00cfc8" }}>{p.discount}</div>
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{p.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Главный герой-блок
const WelcomeHero = ({ onCatalog }: { onCatalog: () => void }) => (
  <div
    style={{
      margin: 16,
      borderRadius: 20,
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg, rgba(0,172,158,0.75), rgba(0,109,119,0.85))", // циан + притонировка
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      color: "#fff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      padding: 28
    }}
  >
    {/* Заголовок */}
    <h2
      style={{
        fontSize: 24,
        fontWeight: 900,
        lineHeight: 1.3,
        margin: "0 0 12px 0"
      }}
    >
      Дорогой Житель — карта привилегий города
    </h2>

    {/* Подзаголовок */}
    <p style={{ opacity: 0.9, margin: "0 0 16px 0", fontSize: 15 }}>
      Экономьте у местных партнёров: скидки, бонусы и специальные предложения каждый день.
    </p>

    {/* Список преимуществ */}
    <ul
      style={{
        margin: "0 0 24px 0",
        paddingLeft: 20,
        lineHeight: 1.6,
        fontSize: 15,
        opacity: 0.95
      }}
    >
      <li>Скидки у проверенных партнёров</li>
      <li>Акции недели и персональные предложения</li>
      <li>Поддержка локального бизнеса</li>
    </ul>

    {/* Кнопки друг под другом */}
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <button
        onClick={onCatalog}
        style={{
          width: "100%",
          padding: "14px 20px",
          borderRadius: 12,
          border: "none",
          background: "#fff",
          color: "var(--primary)",
          fontSize: 15,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        Смотреть каталог
      </button>

      <a
        href="https://t.me/ostservice71"
        target="_blank"
        rel="noreferrer"
        style={{
          width: "100%",
          textAlign: "center",
          padding: "14px 20px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.6)",
          background: "rgba(255, 255, 255, 0.15)", // чуть более тёмная стеклянность
          color: "#fff",
          fontSize: 15,
          fontWeight: 800,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        Стать партнёром
      </a>
    </div>
  </div>
);

// Рекомендации города (замена «Акции недели»)
const RecommendCallout = ({ onAction }: { onAction: () => void }) => (
  <div className="card-base" style={{ margin: 16, padding: 16, position: "relative", overflow: "hidden" }}>
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(https://i.postimg.cc/W4jK8Xw9/park.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.8)"
      }}
    />
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.45) 100%)"
      }}
    />
    <div style={{ position: "relative", color: "#fff" }}>
      <div style={{ display: "inline-block", marginBottom: 8 }} className="badge badge--cyan">Город рекомендует</div>
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>Не пропустите выгодные предложения рядом</h3>
      <p style={{ marginTop: 8, opacity: 0.9 }}>Подборка мест с лучшими условиями по вашей карте</p>
      <div style={{ marginTop: 10 }}>
        <button className="btn-glass" onClick={onAction}>Открыть подборку</button>
      </div>
    </div>
  </div>
);

// Экран категорий
const CategoriesScreen = ({ selected, onSelect }: { selected: string | null; onSelect: (c: string | null) => void }) => (
  <div style={{ padding: "16px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "16px" }}>Категории</h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px"
      }}
    >
      {["Все", ...CATEGORIES].map((cat, i) => {
        const isActive = (selected ?? "Все") === cat;
        return (
          <button
            key={i}
            onClick={() => onSelect(cat === "Все" ? null : cat.replace(/^[^\s]+\s/, ""))}
            className={`chip ${isActive ? "chip--active" : ""}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  </div>
);

// Чипы категорий (горизонтальный список)
const CategoryChips = ({ categories, selected, onSelect }: { categories: string[]; selected: string | null; onSelect: (c: string | null) => void }) => (
  <div className="chips">
    <div style={{ display: "flex", gap: 8 }}>
      <Chip label="Все" active={selected === null} onClick={() => onSelect(null)} />
      {categories.map((c) => (
        <Chip key={c} label={c} active={selected === c} onClick={() => onSelect(c)} />
      ))}
    </div>
  </div>
);

const Chip = ({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) => (
  <button onClick={onClick} className={`chip ${active ? "chip--active" : ""}`}>{label}</button>
);

// Карточка партнёра (для каталога)
const PartnerCard = ({ p, isFav, toggleFav, onOpen }: { p: Partner; isFav: boolean; toggleFav: (id: string) => void; onOpen: (p: Partner) => void }) => (
  <div className="partner-card card-base">
    <div onClick={() => onOpen(p)} style={{ cursor: "pointer" }}>
      <div
        style={{
          backgroundImage: `url(${p.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120px"
        }}
      />
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.2 }}>{p.title}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#00ac9e" }}>{p.discount}</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.tag}</div>
      </div>
    </div>
    <button
      onClick={() => toggleFav(p.id)}
      aria-label={isFav ? "Убрать из избранного" : "В избранное"}
      className="partner-card__fav"
      style={{ background: isFav ? "#ffeef0" : undefined }}
    >
      {isFav ? "❤️" : "🤍"}
    </button>
  </div>
);

// Модальное окно с деталями партнёра
const PartnerModal = ({ partner, onClose }: { partner: Partner | null; onClose: () => void }) => {
  if (!partner) return null;

  return (
    <div onClick={onClose} className="modal-backdrop">
      <div onClick={(e) => e.stopPropagation()} className="modal-sheet">
        <div
          style={{
            height: 6,
            width: 44,
            background: "#e5e5ea",
            borderRadius: 4,
            margin: "8px auto"
          }}
        />
        <div
          style={{
            backgroundImage: `url(${partner.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 180
          }}
        />
        <div style={{ padding: 16 }}>
          {/* Заголовок и скидка */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{partner.title}</h3>
            <span style={{ color: "var(--danger)", fontWeight: 800 }}>{partner.discount}</span>
          </div>

          {/* Категория */}
          <div style={{ color: "var(--muted)", marginTop: 6 }}>{partner.tag}</div>

          {/* Описание */}
          {partner.description && <p style={{ marginTop: 12 }}>{partner.description}</p>}

          {/* Адрес */}
          {partner.address && <div style={{ marginTop: 8 }}>📍 {partner.address}</div>}

          {/* Телефон */}
          {partner.phone && <div style={{ marginTop: 8 }}>☎️ {partner.phone}</div>}

          {/* Сайт */}
          {partner.website && (
            <div style={{ marginTop: 8 }}>
              🔗 <a href={partner.website} target="_blank" rel="noreferrer">Сайт партнёра</a>
            </div>
          )}
{/* Галерея акций */}
{partner.promos && partner.promos.length > 0 && (
  <div style={{ marginTop: 20 }}>
    <h4 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 800 }}>
      Акции для жителей
    </h4>

    <div style={{ position: "relative" }}>
      {/* Лента акций */}
      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollBehavior: "smooth",
          paddingBottom: 8
        }}
        id="promo-scroll"
      >
        {partner.promos.map((promo) => (
          <div
            key={promo.id}
            style={{
              flex: "0 0 160px",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            {/* Баннер */}
            <div
              style={{
                backgroundImage: `url(${promo.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: 160
              }}
            />
            {/* Плашка "Только по карте ДЖ!" */}
            <span
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "var(--primary)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 8px",
                borderRadius: 8
              }}
            >
              Только по карте ДЖ!
            </span>
            {/* Подпись */}
            <div style={{ padding: 8, fontSize: 13, fontWeight: 600 }}>
              {promo.title}
            </div>
          </div>
        ))}
      </div>

      {/* Стрелки навигации */}
      <button
        onClick={() => {
          const el = document.getElementById("promo-scroll");
          if (el) el.scrollBy({ left: -180, behavior: "smooth" });
        }}
        style={{
          position: "absolute",
          top: "40%",
          left: -8,
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "50%",
          width: 32,
          height: 32,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          cursor: "pointer"
        }}
      >
        ◀
      </button>

      <button
        onClick={() => {
          const el = document.getElementById("promo-scroll");
          if (el) el.scrollBy({ left: 180, behavior: "smooth" });
        }}
        style={{
          position: "absolute",
          top: "40%",
          right: -8,
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "50%",
          width: 32,
          height: 32,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          cursor: "pointer"
        }}
      >
        ▶
      </button>
    </div>
  </div>
)}
          {/* 🔹 Яркая кнопка Telegram */}
{partner.telegram && (
  <a
    href={partner.telegram}
    target="_blank"
    rel="noreferrer"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 16,
      padding: "14px 20px",
      borderRadius: 12,
      textAlign: "center",
      background: "#0088cc",
      color: "#fff",
      fontWeight: 800,
      fontSize: 15,
      textDecoration: "none",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }}
  >
    <FaTelegramPlane size={18} /> Telegram-канал
  </a>
)}

          {/* Кнопки управления */}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--text)",
                fontWeight: 700
              }}
              onClick={onClose}
            >
              Закрыть
            </button>
            <button
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 12,
                border: "none",
                background: "#00ac9e",
                color: "#fff",
                fontWeight: 800
              }}
            >
              Получить скидку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Экран каталога
type SortKey = "default" | "alpha" | "discount" | "favorites";
type ThemeMode = "system" | "light" | "dark";
const CatalogScreen = ({
  partners,
  query,
  setQuery,
  selectedCategory,
  setSelectedCategory,
  favorites,
  toggleFav,
  onOpen
}: {
  partners: Partner[];
  query: string;
  setQuery: (v: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (c: string | null) => void;
  favorites: Set<string>;
  toggleFav: (id: string) => void;
  onOpen: (p: Partner) => void;
}) => {
  const [sort, setSort] = useState<SortKey>("default");

  const categories = useMemo(
    () => Array.from(new Set(partners.map((p) => p.tag))).sort((a, b) => a.localeCompare(b, "ru")),
    [partners]
  );

  const parseDiscount = (d: string) => {
    const m = d.match(/-\s*(\d+)%/);
    return m ? parseInt(m[1], 10) : 0;
  };

  const filtered = useMemo(() => {
    let arr = partners;
    if (selectedCategory) arr = arr.filter((p) => p.tag === selectedCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((p) =>
        [p.title, p.tag, p.discount, p.description].filter(Boolean).some((v) => String(v).toLowerCase().includes(q))
      );
    }
    if (sort === "favorites") {
      arr = arr.filter((p) => favorites.has(p.id));
    }
    if (sort === "alpha") {
      arr = [...arr].sort((a, b) => a.title.localeCompare(b.title, "ru"));
    }
    if (sort === "discount") {
      arr = [...arr].sort((a, b) => parseDiscount(b.discount) - parseDiscount(a.discount));
    }
    return arr;
  }, [partners, query, selectedCategory, sort, favorites]);

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} placeholder="Поиск по каталогу" />
      <CategoryChips categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 12px" }}>
        <div style={{ color: "#6e6e73", fontSize: 13 }}>Найдено: {filtered.length}</div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          style={{ border: "1px solid #e5e5ea", borderRadius: 10, padding: "8px 10px", background: "#fff", fontWeight: 700 }}
        >
          <option value="default">По умолчанию</option>
          <option value="alpha">По алфавиту</option>
          <option value="discount">По скидке</option>
          <option value="favorites">Избранное</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 16px 90px" }}>
        {filtered.map((p) => (
          <PartnerCard key={p.id} p={p} isFav={favorites.has(p.id)} toggleFav={toggleFav} onOpen={onOpen} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ padding: 16, color: "#6e6e73" }}>По вашему запросу ничего не найдено.</div>
      )}
    </div>
  );
};

// TabBar
const TabBar = ({ active, setActive }: { active: string; setActive: (s: string) => void }) => {
  const tabs = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "card", label: "Карта ДЖ" },
    { id: "insurance", label: "Страхование" },
    { id: "profile", label: "Профиль" }
  ];
  return (
    <nav className="tabbar">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActive(t.id)}
          className={`tabbar__btn ${active === t.id ? "tabbar__btn--active" : ""}`}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
};
const CardScreen = () => {
  // Демо-история
  const history = [
    { id: 1, date: "09.09.2025", partner: "Кофейня «Чико»", discount: "-120 ₽" },
    { id: 2, date: "07.09.2025", partner: "Автомойка «Кузя»", discount: "-300 ₽" },
    { id: 3, date: "05.09.2025", partner: "Фитнес «Энерджи»", discount: "-450 ₽" },
  ];

  return (
    <div style={{ padding: 16 }}>
      {/* Виртуальная карта */}
      <div
        style={{
          margin: "32px auto 20px",
          width: "100%",
          maxWidth: 360,
          aspectRatio: "16/10",
          borderRadius: 20,
          background: "linear-gradient(135deg, #00ac9e, #004d60)",
          color: "#fff",
          padding: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,.2)",
        }}
      >
        {/* Левая часть (текст) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Дорогой Житель</div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>Карта привилегий</div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              fontFamily: "monospace",
              letterSpacing: 2,
              marginTop: 12,
            }}
          >
            **** **** **** 1234
          </div>
        </div>

        {/* Правая часть (QR) */}
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=DJ1234"
          alt="QR-код карты"
          style={{
            width: 90,
            height: 90,
            background: "#fff",
            borderRadius: 12,
            padding: 6,
            boxShadow: "0 2px 6px rgba(0,0,0,.25)",
          }}
        />
      </div>

      {/* Кнопка добавить в Wallet */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
      >
        <button
          style={{
            padding: "14px 16px",
            borderRadius: 12,
            border: "none",
            background: "var(--primary)",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
            width: "100%",
            maxWidth: 360,
          }}
        >
          Добавить в Wallet / Google Pay
        </button>
      </div>

      {/* Привилегии */}
      <div className="card-base" style={{ padding: 16, marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Ваши привилегии</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
          <li>Скидки у проверенных партнёров</li>
          <li>Эксклюзивные акции каждую неделю</li>
          <li>Поддержка локального бизнеса</li>
        </ul>
      </div>

      {/* Инструкция */}
      <div className="card-base" style={{ padding: 16, marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Как пользоваться картой?</h3>
        <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
          <li>Добавьте карту в Wallet / Google Pay</li>
          <li>Покажите её партнёру при оплате</li>
          <li>Получайте скидки и бонусы</li>
        </ol>
      </div>

      {/* История */}
      <div className="card-base" style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>История применений</h3>
        {history.length > 0 ? (
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {history.map((h) => (
              <li
                key={h.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: 14,
                }}
              >
                <span>{h.date} — {h.partner}</span>
                <span style={{ fontWeight: 700, color: "var(--primary)" }}>
                  {h.discount}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ fontSize: 14, color: "var(--muted)" }}>
            История пока пуста
          </div>
        )}
      </div>
    </div>
  );
};
const InsuranceScreen = () => {
  const products = [
    { id: 1, title: "Квартира и дом", desc: "Защита от пожара, затопления и краж", img: "https://www.ingos.ru/local/templates/ingos/assets/img/blocks/flat.jpg", link: "https://www.ingos.ru/insurance/property/" },
    { id: 2, title: "Автомобиль", desc: "ОСАГО, КАСКО и помощь при ДТП", img: "https://www.ingos.ru/local/templates/ingos/assets/img/blocks/car.jpg", link: "https://www.ingos.ru/insurance/car/" },
    { id: 3, title: "Здоровье", desc: "ДМС для всей семьи", img: "https://www.ingos.ru/local/templates/ingos/assets/img/blocks/health.jpg", link: "https://www.ingos.ru/insurance/health/" },
    { id: 4, title: "Путешествия", desc: "Страхование поездок по России и миру", img: "https://www.ingos.ru/local/templates/ingos/assets/img/blocks/travel.jpg", link: "https://www.ingos.ru/insurance/travel/" },
    { id: 5, title: "Жизнь и семья", desc: "Защита жизни, здоровья и финансов", img: "https://www.ingos.ru/local/templates/ingos/assets/img/blocks/life.jpg", link: "https://www.ingos.ru/insurance/life/" },
    { id: 6, title: "Домашние питомцы", desc: "Страхование кошек и собак", img: "https://www.ingos.ru/local/templates/ingos/assets/img/blocks/pets.jpg", link: "https://www.ingos.ru/insurance/pets/" },
  ];

  return (
    <div style={{ background: "#f7f8fa" }}>
      {/* Hero */}
      <div
        style={{
          padding: "40px 20px",
          background: "linear-gradient(135deg,#004080,#0077b6)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
          Дорогие жители!
        </h2>
        <p style={{ marginTop: 12, lineHeight: 1.6, fontSize: 15 }}>
          Вместе с <strong>Ингосстрах</strong> мы подготовили удобные страховые
          решения для вашей семьи, дома, автомобиля и путешествий.
        </p>
      </div>

      {/* Каталог продуктов */}
      <div style={{ padding: "20px" }}>
        <h3 style={{ margin: "0 0 16px", fontWeight: 800, fontSize: 18 }}>
          Популярные продукты
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="card-base"
              style={{
                padding: 0,
                background: "#fff",
                borderRadius: 14,
                boxShadow: "0 4px 12px rgba(0,0,0,.06)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${p.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: 100,
                }}
              />
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{p.title}</div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    margin: "6px 0 10px",
                  }}
                >
                  {p.desc}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: 10,
                    background: "#004080",
                    color: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Подробнее
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Почему Ингосстрах */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          margin: "0 20px 20px",
          padding: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,.06)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Почему именно Ингосстрах?</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
          <li>Надёжный федеральный страховой партнёр</li>
          <li>Более 75 лет на рынке</li>
          <li>Миллионы клиентов по всей России</li>
          <li>Эксклюзивные условия для жителей</li>
        </ul>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "0 20px 40px" }}>
        <button
          style={{
            padding: "14px 20px",
            borderRadius: 12,
            border: "none",
            background: "#0077b6",
            color: "#fff",
            fontWeight: 800,
            fontSize: 16,
            cursor: "pointer",
            width: "100%",
            maxWidth: 400,
          }}
          onClick={() =>
            window.open("https://www.ingos.ru/", "_blank")
          }
        >
          📲 Оформить онлайн
        </button>
      </div>
    </div>
  );
};
const MAIN_BANNERS = [
  { id: "b1", img: "https://i.postimg.cc/dVSn3GHb/1.png" },
  { id: "b2", img: "https://i.postimg.cc/25bGZ3gV/2.png" },
  { id: "b3", img: "https://i.postimg.cc/6qwfgcqv/3.png" },
  { id: "b4", img: "https://i.postimg.cc/0y2PP1Ft/image.png" },
  { id: "b5", img: "https://i.postimg.cc/Pqg4zTkK/5.png" }
];

const AutoBannerSlider = ({ banners }: { banners: { id: string; img: string }[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: 12, margin: "16px 0" }}>
      <div
        style={{
          display: "flex",
          transition: "transform 0.6s ease",
          transform: `translateX(-${index * 100}%)`,
          width: `${banners.length * 20}%`
        }}
      >
        {banners.map((b) => (
         <div
  key={b.id}
  style={{
    flex: "0 0 100%",
    aspectRatio: "16/9",   // ✅ фикс пропорций
    overflow: "hidden"     // ✅ лишнее обрежется
  }}
>
  <img
    src={b.img}
    alt="баннер"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />
</div>
        ))}
      </div>
    </div>
  );
};
// ================== App ==================
function InnerApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [modalPartner, setModalPartner] = useState<Partner | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("system");

  // Favorites persistence
  useEffect(() => {
    try {
      const raw = localStorage.getItem("dj_favorites");
      if (raw) setFavorites(new Set(JSON.parse(raw)));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("dj_favorites", JSON.stringify(Array.from(favorites)));
    } catch {}
  }, [favorites]);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Theme persistence + apply to document
  useEffect(() => {
    try {
      const raw = localStorage.getItem("dj_theme");
      const initial: ThemeMode = raw === "light" || raw === "dark" || raw === "system" ? (raw as ThemeMode) : "system";
      setTheme(initial);
      applyTheme(initial);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", mode);
  };

  const cycleTheme = () => {
    setTheme((prev) => {
      const next: ThemeMode = prev === "light" ? "dark" : prev === "dark" ? "system" : "light";
      try { localStorage.setItem("dj_theme", next); } catch {}
      applyTheme(next);
      return next;
    });
  };

  const setThemeMode = (mode: ThemeMode) => {
    try { localStorage.setItem("dj_theme", mode); } catch {}
    setTheme(mode);
    applyTheme(mode);
  };

  // Профиль: выбор темы
  const ProfileScreen = ({ mode, onSelect }: { mode: ThemeMode; onSelect: (m: ThemeMode) => void }) => (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, marginBottom: 12 }}>Профиль</h2>
      <div className="card-base" style={{ padding: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Тема приложения</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Chip label="🌓 Системная" active={mode === "system"} onClick={() => onSelect("system")} />
          <Chip label="🌞 Светлая" active={mode === "light"} onClick={() => onSelect("light")} />
          <Chip label="🌜 Тёмная" active={mode === "dark"} onClick={() => onSelect("dark")} />
        </div>
        <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13 }}>
          Текущая: {mode === "system" ? "Системная" : mode === "light" ? "Светлая" : "Тёмная"}
        </div>
      </div>
    </div>
  );

  return (
  <>
    <div className="app">
      {activeTab === "home" && (
        <>
          <SearchBar value={query} onChange={setQuery} />
          <WelcomeHero onCatalog={() => setActiveTab("catalog")} />
          <NearbyCoffee partners={PARTNERS} onOpen={(p) => setModalPartner(p)} />

          {/* 🔥 Автоскролл баннеры */}
          <AutoBannerSlider banners={MAIN_BANNERS} />

          <BannerList
            title="Новые партнёры города"
            items={PARTNERS}
            onOpen={(p) => setModalPartner(p)}   // ✅ правильный проп
            onSeeAll={() => {
              setSelectedCategory(null);
              setActiveTab("catalog");
            }}
            badgeLabel="Новое"
          />


          <BannerList
            title="Популярно среди жителей"
            items={PARTNERS}
            onOpen={(p) => setModalPartner(p)}   // ✅ исправлено
            onSeeAll={() => {
              setSelectedCategory(null);
              setActiveTab("catalog");
            }}
            badgeLabel="Хит"
          />

          <PromoGrid
            title="Выгодные предложения"
            items={PARTNERS}
            onOpen={(p) => setModalPartner(p)}   // ✅ исправлено
            onSeeAll={() => {
              setSelectedCategory(null);
              setActiveTab("catalog");
            }}
            badgeLabel="Скидка"
          />

          <MosaicGrid
            title="Спорт и активный отдых"
            items={PARTNERS}
            onOpen={(p) => setModalPartner(p)}   // ✅ исправлено
            onSeeAll={() => {
              setSelectedCategory("Спорт");
              setActiveTab("catalog");
            }}
            badgeLabel="Спорт"
          />

          <BannerList
            title="Развлечения и досуг"
            items={PARTNERS}
            onOpen={(p) => setModalPartner(p)}   // ✅ исправлено
            onSeeAll={() => {
              setSelectedCategory("Развлечения");
              setActiveTab("catalog");
            }}
            badgeLabel="Развлечения"
          />

          <BannerList
            title="Куда съездить на выходные"
            items={WEEKEND_PLACES}
            onOpen={(p) => setModalPartner(p)}   // ✅ исправлено
            onSeeAll={() => {
              setSelectedCategory(null);
              setActiveTab("catalog");
            }}
            badgeLabel="Поездка"
          />

          <PromoGrid
            title="Красота и здоровье"
            items={PARTNERS}
            onOpen={(p) => setModalPartner(p)}   // ✅ исправлено
            onSeeAll={() => {
              setSelectedCategory("Красота");
              setActiveTab("catalog");
            }}
            badgeLabel="Уход"
          />

          <RecommendCallout
            onAction={() => {
              setSelectedCategory(null);
              setActiveTab("catalog");
            }}
          />

          <MosaicGrid
            title="Магазины и покупки"
            items={PARTNERS}
            onOpen={(p) => setModalPartner(p)}   // ✅ исправлено
            onSeeAll={() => {
              setSelectedCategory("Шопинг");
              setActiveTab("catalog");
            }}
            badgeLabel="-5%"
          />
        </>
      )}

      {activeTab === "catalog" && (
        <CatalogScreen
          partners={PARTNERS}
          query={query}
          setQuery={setQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          favorites={favorites}
          toggleFav={toggleFav}
          onOpen={(p) => setModalPartner(p)}   // ✅ проброс в каталог
        />
      )}

      {activeTab === "card" && <CardScreen />}
      {activeTab === "insurance" && <InsuranceScreen />}
      {activeTab === "profile" && (
        <ProfileScreen mode={theme} onSelect={setThemeMode} />
      )}

      <PartnerModal partner={modalPartner} onClose={() => setModalPartner(null)} />
    </div>

    <TabBar active={activeTab} setActive={setActiveTab} />
  </>
);
}
// 🔥 Мини-скролл блок
const MiniScroll = ({
  title,
  items,
  onOpen,
}: {
  title: string;
  items: Partner[];
  onOpen: (p: Partner) => void;
}) => (
  <div style={{ marginBottom: 24 }}>
    <h3 style={{ margin: "0 0 12px 16px", fontSize: 18, fontWeight: 800 }}>
      {title}
    </h3>
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        gap: 12,
        padding: "0 16px",
      }}
    >
      {items.map((p) => (
        <div
          key={p.id}
          onClick={() => onOpen(p)} // ✅ открывает модалку
          style={{
            flex: "0 0 160px",
            borderRadius: 14,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${p.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: 100,
            }}
          />
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.tag}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default function App() {
  return (
    <div className="device-wrap">
      <div className="device">
        <div className="device-notch" />
        <div className="device-screen">
          <InnerApp />
        </div>
      </div>
    </div>
  );
}

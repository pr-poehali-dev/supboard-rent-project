import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b7b0c4c4-4eae-4710-90e8-47585fcb4a95/files/7109cbba-227d-4e6f-8509-9d20134e62a5.jpg";
const BOARDS_IMAGE = "https://cdn.poehali.dev/projects/b7b0c4c4-4eae-4710-90e8-47585fcb4a95/files/a42b45a5-bdba-46ee-b413-6bb467f5c6c5.jpg";

const boards = [
  {
    id: 1,
    name: "Classic 10'6",
    type: "Универсальный",
    price: 800,
    priceUnit: "₽/час",
    condition: 95,
    rating: 4.9,
    reviews: 48,
    tags: ["Море", "Река"],
    description: "Отличный выбор для начинающих и опытных. Стабильная платформа, лёгкий ход.",
    image: BOARDS_IMAGE,
  },
  {
    id: 2,
    name: "Touring 12'0",
    type: "Туристический",
    price: 1100,
    priceUnit: "₽/час",
    condition: 88,
    rating: 4.8,
    reviews: 31,
    tags: ["Сплав", "Море"],
    description: "Для длительных маршрутов и сплавов. Узкий нос режет воду, скользит быстро.",
    image: BOARDS_IMAGE,
  },
  {
    id: 3,
    name: "Yoga 10'0",
    type: "Для йоги",
    price: 900,
    priceUnit: "₽/час",
    condition: 100,
    rating: 5.0,
    reviews: 22,
    tags: ["Море", "Озеро"],
    description: "Широкая дека, нескользящее покрытие. Идеально для занятий йогой на воде.",
    image: BOARDS_IMAGE,
  },
  {
    id: 4,
    name: "Race 14'0",
    type: "Гоночный",
    price: 1400,
    priceUnit: "₽/час",
    condition: 92,
    rating: 4.7,
    reviews: 15,
    tags: ["Море", "Скорость"],
    description: "Профессиональный борд для скоростного катания. Для опытных спортсменов.",
    image: BOARDS_IMAGE,
  },
];

const reviews = [
  {
    name: "Алексей М.",
    date: "Август 2024",
    rating: 5,
    text: "Взяли два борда на весь день — персонал помог с выбором, объяснили технику. Оборудование в отличном состоянии. Вернёмся точно!",
    location: "Был на море",
  },
  {
    name: "Марина В.",
    date: "Июль 2024",
    rating: 5,
    text: "Брала Yoga-борд для занятий. Новый, ровный, устойчивый. Сервис на высоте — всё чисто, никаких накладок с бронью.",
    location: "Была на озере",
  },
  {
    name: "Сергей К.",
    date: "Июнь 2024",
    rating: 4,
    text: "Touring-борд взяли для сплава по реке. Быстрый и манёвренный. Небольшие царапины снаряжения — но это нормально для проката.",
    location: "Был на реке",
  },
];

function StarRating({ rating, small = false }: { rating: number; small?: boolean }) {
  return (
    <div className={`flex gap-0.5 ${small ? "text-xs" : "text-sm"}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </div>
  );
}

function ConditionBar({ value }: { value: number }) {
  const color =
    value >= 90 ? "bg-emerald-500" : value >= 70 ? "bg-amber-400" : "bg-red-400";
  const label =
    value >= 90 ? "Отличное" : value >= 70 ? "Хорошее" : "Удовлетворительное";
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground font-body">Состояние</span>
        <span className="text-xs font-medium font-body">{label}</span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    board: "",
    date: "",
    hours: "2",
  });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filters = ["Все", "Море", "Река", "Сплав", "Озеро"];

  const filteredBoards =
    activeFilter === "Все"
      ? boards
      : boards.filter((b) => b.tags.includes(activeFilter));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-xl font-light tracking-widest text-foreground uppercase"
          >
            SUP<span className="text-ocean font-medium">ПРОКАТ</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Каталог", id: "catalog" },
              { label: "Бронирование", id: "booking" },
              { label: "Отзывы", id: "reviews" },
              { label: "Контакты", id: "contacts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="bg-deep text-white font-body text-sm px-5 py-2.5 hover:bg-ocean transition-colors tracking-wide"
            >
              Забронировать
            </button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 space-y-3 animate-fade-up">
            {[
              { label: "Каталог", id: "catalog" },
              { label: "Бронирование", id: "booking" },
              { label: "Отзывы", id: "reviews" },
              { label: "Контакты", id: "contacts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left text-sm font-body text-foreground py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/85 via-deep/55 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-xl">
            <p className="animate-fade-up font-body text-xs uppercase tracking-[0.25em] text-sand mb-6">
              Аренда сапбордов
            </p>
            <h1 className="animate-fade-up-delay-1 font-display text-6xl md:text-8xl font-light text-white leading-[0.9] mb-8">
              Выйди на
              <br />
              <em>открытую</em>
              <br />
              воду
            </h1>
            <p className="animate-fade-up-delay-2 font-body text-base text-white/70 mb-10 leading-relaxed max-w-sm">
              Море, река, озеро — выбирай маршрут, мы дадим лучший борд. Без опыта и своего снаряжения.
            </p>
            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="bg-white text-deep font-body text-sm px-8 py-4 hover:bg-sand transition-colors tracking-wide font-medium"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("booking")}
                className="border border-white/50 text-white font-body text-sm px-8 py-4 hover:bg-white/10 transition-colors tracking-wide"
              >
                Забронировать
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white border-t border-border grid grid-cols-3 divide-x divide-border">
              {[
                { value: "4+", label: "Модели бордов" },
                { value: "200+", label: "Довольных клиентов" },
                { value: "от 800₽", label: "Стоимость в час" },
              ].map((stat) => (
                <div key={stat.label} className="px-8 py-5 text-center">
                  <div className="font-display text-2xl font-medium text-foreground">{stat.value}</div>
                  <div className="font-body text-xs text-muted-foreground mt-0.5 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="section-divider mb-6" />
          <h2 className="font-display text-5xl font-light text-foreground mb-4">Каталог бордов</h2>
          <p className="font-body text-muted-foreground text-base max-w-md leading-relaxed">
            Каждый борд проходит осмотр перед каждой арендой. Система рейтинга показывает реальное состояние снаряжения.
          </p>
        </div>

        <div className="flex gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-body text-sm px-5 py-2 border transition-colors tracking-wide ${
                activeFilter === f
                  ? "bg-deep text-white border-deep"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBoards.map((board) => (
            <div key={board.id} className="group bg-white border border-border hover-lift">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={board.image}
                  alt={board.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white font-body text-xs px-3 py-1 text-foreground tracking-wide">
                    {board.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {board.tags.map((t) => (
                    <span key={t} className="bg-deep/80 text-white font-body text-xs px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground">{board.name}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">{board.description}</p>
                </div>
                <ConditionBar value={board.condition} />
                <div className="flex items-center gap-2">
                  <StarRating rating={board.rating} small />
                  <span className="font-body text-xs text-muted-foreground">
                    {board.rating} ({board.reviews} отзывов)
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1">
                  <div>
                    <span className="font-display text-2xl font-medium text-foreground">{board.price}</span>
                    <span className="font-body text-xs text-muted-foreground ml-1">{board.priceUnit}</span>
                  </div>
                  <button
                    onClick={() => {
                      setFormData((p) => ({ ...p, board: board.name }));
                      scrollTo("booking");
                    }}
                    className="font-body text-xs px-4 py-2 bg-deep text-white hover:bg-ocean transition-colors tracking-wide"
                  >
                    Выбрать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="bg-deep py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-divider mb-6" style={{ backgroundColor: "hsl(var(--sand))" }} />
              <h2 className="font-display text-5xl font-light text-white mb-6">
                Бронирование
              </h2>
              <p className="font-body text-white/60 text-base leading-relaxed mb-10">
                Заполните форму — мы свяжемся для подтверждения в течение 30 минут. Оплата на месте.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "MapPin", text: "Выезд к воде или самовывоз из точки проката" },
                  { icon: "Shield", text: "Весь инвентарь застрахован и проверен" },
                  { icon: "Clock", text: "Работаем с 8:00 до 20:00 ежедневно" },
                  { icon: "Award", text: "Инструктаж для новичков включён в стоимость" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon} size={14} className="text-sand" />
                    </div>
                    <p className="font-body text-sm text-white/70 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon name="Check" size={24} className="text-emerald-500" />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-foreground mb-3">Заявка отправлена!</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Мы перезвоним в течение 30 минут для подтверждения брони.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 font-body text-sm text-ocean underline underline-offset-4"
                  >
                    Подать новую заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-ocean transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-ocean transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">
                      Борд
                    </label>
                    <select
                      value={formData.board}
                      onChange={(e) => setFormData((p) => ({ ...p, board: e.target.value }))}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-ocean transition-colors bg-white"
                    >
                      <option value="">Выберите борд</option>
                      {boards.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name} — {b.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">
                        Дата
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                        className="w-full border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-ocean transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">
                        Часов
                      </label>
                      <select
                        value={formData.hours}
                        onChange={(e) => setFormData((p) => ({ ...p, hours: e.target.value }))}
                        className="w-full border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-ocean transition-colors bg-white"
                      >
                        {["1", "2", "3", "4", "6", "8"].map((h) => (
                          <option key={h} value={h}>{h} ч</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-deep text-white font-body text-sm py-4 hover:bg-ocean transition-colors tracking-widest uppercase"
                  >
                    Забронировать борд
                  </button>
                  <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с условиями аренды
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="section-divider mb-6" />
          <h2 className="font-display text-5xl font-light text-foreground mb-4">Отзывы</h2>
          <p className="font-body text-muted-foreground text-base">Что говорят наши клиенты</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="border border-border p-7 hover-lift bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">{r.location}</p>
                </div>
                <span className="font-body text-xs text-muted-foreground">{r.date}</span>
              </div>
              <StarRating rating={r.rating} />
              <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
                "{r.text}"
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="font-display text-3xl font-light text-foreground">
            4.9 <span className="text-amber-400">★</span>
          </p>
          <p className="font-body text-sm text-muted-foreground mt-1">средний рейтинг по 116 отзывам</p>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="bg-muted py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <div className="section-divider mb-6" />
            <h2 className="font-display text-5xl font-light text-foreground mb-4">Контакты</h2>
            <p className="font-body text-muted-foreground text-base">Как нас найти и как связаться</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "Phone",
                label: "Телефон",
                value: "+7 (999) 000-00-00",
                sub: "Ежедневно 8:00–20:00",
              },
              {
                icon: "MessageCircle",
                label: "WhatsApp / Telegram",
                value: "@supprokat",
                sub: "Ответим за 15 минут",
              },
              {
                icon: "MapPin",
                label: "Адрес",
                value: "Набережная, 12",
                sub: "Пункт выдачи у воды",
              },
              {
                icon: "Camera",
                label: "Инстаграм",
                value: "@sup.prokat",
                sub: "Фото и видео с воды",
              },
            ].map((c) => (
              <div key={c.label} className="bg-white border border-border p-6 hover-lift">
                <div className="w-10 h-10 bg-deep flex items-center justify-center mb-4">
                  <Icon name={c.icon} size={16} className="text-white" />
                </div>
                <p className="font-body text-xs text-muted-foreground tracking-wide uppercase mb-2">{c.label}</p>
                <p className="font-body text-sm font-semibold text-foreground">{c.value}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-deep py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-light tracking-widest text-white uppercase">
            SUP<span className="text-sand">ПРОКАТ</span>
          </span>
          <p className="font-body text-xs text-white/40 text-center">
            © 2024 SUP Прокат. Аренда сапбордов. Работаем с мая по октябрь.
          </p>
          <div className="flex gap-6">
            {[
              { id: "catalog", label: "Каталог" },
              { id: "booking", label: "Бронь" },
              { id: "reviews", label: "Отзывы" },
              { id: "contacts", label: "Контакты" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-body text-xs text-white/40 hover:text-white/80 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

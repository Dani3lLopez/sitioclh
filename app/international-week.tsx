import { useState } from "react";
import "./international-week.css";

const assetBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const admissionsEmail = "admisiones@semanasejecutivas.com";

const programme = [
  {
    label: "Lun 05",
    title: "IA · Google Day",
    description: "Lunes 5 de julio · Innovación, productividad y aplicaciones reales de IA.",
    sessions: [
      ["10:00–11:00", "Welcome & Kick-off", "José María Delgado"],
      ["11:30–12:30", "AI-powered growth: innovación, productividad y crecimiento", "Bebi Apraiz · Google"],
      ["12:30–14:00", "Google AI Workshop: Gemini, herramientas y aplicaciones reales", "Pere Vericat · Google"],
    ],
  },
  {
    label: "Mar 06",
    title: "Inteligencia emocional",
    description: "Martes 6 de julio · Entrenamiento en habilidades humanas.",
    sessions: [
      ["09:00–10:30", "La importancia de las soft skills en la era de la inteligencia artificial", "Michael de José Belzunce"],
      ["11:00–14:00", "La muerte de la formación, la revolución del entrenamiento en soft skills", "Michael de José Belzunce"],
    ],
  },
  {
    label: "Mié 07",
    title: "Innovación y tecnología",
    description: "Miércoles 7 de julio · Emprendimiento y design thinking.",
    sessions: [
      ["10:00–11:30", "Emprendimiento", "Jaime Medel"],
      ["12:00–14:00", "Taller de Design Thinking", "Javier Lorente"],
    ],
  },
  {
    label: "Jue 08",
    title: "IA y productividad",
    description: "Jueves 8 de julio · Visión estratégica y automatización.",
    sessions: [
      ["10:00–11:30", "La nueva ventaja competitiva: visión estratégica en la era de la IA", "Gonzalo V. Martínez-Echeverría"],
      ["12:00–14:00", "Working smarter with AI: productividad y automatización", "Gonzalo V. Martínez-Echeverría"],
      ["", "Cena de grupo", ""],
    ],
  },
  {
    label: "Vie 09",
    title: "La nueva humanización",
    description: "Viernes 9 de julio · Liderazgo y paso a la acción.",
    sessions: [
      ["09:30–11:30", "Human-centered leadership: liderar personas en la nueva era", "Antonio Vázquez Vega"],
      ["12:00–13:00", "Go to Action", "Antonio Vázquez Vega"],
      ["13:00", "Clausura y diploma oficial UFV", ""],
    ],
  },
];

const experiences = [
  ["01 / FORMACIÓN", "Power Skills", "Sesiones y talleres sobre inteligencia artificial, habilidades humanas, innovación, productividad y liderazgo."],
  ["02 / EMPRESAS", "Campus de Excelencia", "Encuentro presencial para conocer proyectos, presentar tus ideas y conversar con profesionales sobre oportunidades."],
  ["03 / COMUNIDAD", "Convivencia internacional", "Comparte iniciativas, descubre perspectivas y encuentra personas con las que seguir construyendo después de Madrid."],
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
};

export default function InternationalWeek() {
  const [activeDay, setActiveDay] = useState(0);
  const day = programme[activeDay];

  return <div id="clh-international-week">
    <section className="clh-hero" aria-labelledby="week-title">
      <div className="clh-hero-copy">
        <p className="clh-eyebrow">Madrid · Del 5 al 9 de julio de 2027</p>
        <h1 id="week-title">Semana<br />Internacional</h1>
        <p className="clh-hero-subtitle">Cinco días para aprender de profesionales, conectar con empresas y compartir proyectos con estudiantes de distintos países.</p>
        <div className="clh-actions">
          <button type="button" className="clh-action" onClick={() => scrollToSection("week-contact")}>Solicitar información <span aria-hidden="true">↗</span></button>
          <button type="button" className="clh-action secondary" onClick={() => scrollToSection("week-programme")}>Ver programa</button>
        </div>
      </div>
      <div className="clh-hero-photo">
        <img src={`${assetBase}/images/semana-internacional-madrid.svg`} alt="Plaza Mayor de Madrid" width="1000" height="665" fetchPriority="high" />
        <div className="clh-photo-caption">Power Skills · Campus de Excelencia<strong>Nos encontramos en Madrid.</strong></div>
      </div>
    </section>

    <div className="clh-facts" aria-label="Datos de la experiencia y la comunidad">
      <div className="clh-fact"><div><strong>Cámara de Comercio de Madrid</strong><span>Formación presencial en su auditorio</span></div></div>
      <div className="clh-fact"><div><strong>Diploma oficial</strong><span>Universidad Francisco de Vitoria</span></div></div>
      <div className="clh-fact"><div><strong>Una comunidad internacional</strong><span>CLH: +17 países · +43 universidades</span></div></div>
    </div>

    <section className="clh-section" aria-labelledby="week-experience-title">
      <div className="clh-section-head"><div><p className="clh-eyebrow">La experiencia completa</p><h2 id="week-experience-title">Todo lo que vivirás en Madrid.</h2></div></div>
      <div className="clh-experiences">
        {experiences.map(([label, title, description]) => <article className="clh-experience" key={title}>
          <span className="clh-index">{label}</span><h3>{title}</h3><p>{description}</p>
        </article>)}
      </div>
    </section>

    <section className="clh-section clh-programme" id="week-programme" aria-labelledby="week-programme-title">
      <div className="clh-section-head"><div><p className="clh-eyebrow">Programa Power Skills</p><h2 id="week-programme-title">Cinco días para ampliar tu visión.</h2></div><p>Sesiones con expertos y talleres para aplicar lo aprendido a tus estudios y proyectos.</p></div>
      <div className="clh-days" role="tablist" aria-label="Días del programa de formación">
        {programme.map((item, index) => <button
          type="button"
          id={`week-day-${index}`}
          className="clh-day"
          role="tab"
          aria-selected={activeDay === index}
          aria-controls="week-day-panel"
          tabIndex={activeDay === index ? 0 : -1}
          key={item.label}
          onClick={() => setActiveDay(index)}
          onKeyDown={(event) => {
            let next = index;
            if (event.key === "ArrowRight") next = (index + 1) % programme.length;
            else if (event.key === "ArrowLeft") next = (index + programme.length - 1) % programme.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = programme.length - 1;
            else return;
            event.preventDefault();
            setActiveDay(next);
            document.getElementById(`week-day-${next}`)?.focus();
          }}
        ><strong>{item.label}</strong>{item.title}</button>)}
      </div>
      <div className="clh-day-panel" id="week-day-panel" role="tabpanel" aria-labelledby={`week-day-${activeDay}`} aria-live="polite">
        <div><h3 className="clh-day-title">{day.title}</h3><p className="clh-day-description">{day.description}</p></div>
        <div className="clh-sessions">
          {day.sessions.map(([time, title, speaker]) => <div className="clh-session" key={title}>
            <div className="clh-time">{time}</div><div><h4 className="clh-session-name">{title}</h4>{speaker && <p className="clh-speaker">{speaker}</p>}</div>
          </div>)}
        </div>
      </div>
    </section>

    <section className="clh-section clh-campus" aria-labelledby="week-campus-title">
      <div><p className="clh-eyebrow">Campus de Excelencia</p><h2 id="week-campus-title">Acércate a las empresas.<br />Comparte lo que estás construyendo.</h2><p>El encuentro presencial con empresas de la Semana Internacional: conoce sus proyectos y conversa con profesionales sobre prácticas, empleo y colaboración.</p></div>
      <ol className="clh-campus-steps"><li><span aria-hidden="true">01</span><strong>Conoce sus proyectos.</strong></li><li><span aria-hidden="true">02</span><strong>Presenta tus ideas.</strong></li><li><span aria-hidden="true">03</span><strong>Explora oportunidades.</strong></li></ol>
    </section>

    <section className="clh-section clh-practical" aria-labelledby="week-audience-title">
      <div><p className="clh-eyebrow">Tu próxima experiencia</p><h2 id="week-audience-title">Para quienes<br />toman la iniciativa.</h2><p className="clh-practical-intro">Universitarios de grado y posgrado, jóvenes que lideran proyectos y personas con ganas de aportar y ampliar su red internacional.</p></div>
      <div>
        <details open><summary>¿Qué reúne la Semana Internacional?</summary><p>Formación Power Skills, Campus de Excelencia, networking, convivencia internacional y clausura.</p></details>
        <details><summary>¿Dónde y cuándo se celebra?</summary><p>Del 5 al 9 de julio de 2027, en Madrid. La sede indicada es el Auditorio de la Cámara de Comercio de Madrid.</p></details>
        <details><summary>¿Qué certificación recibiré?</summary><p>Diploma oficial de la Universidad Francisco de Vitoria.</p></details>
        <details><summary>¿Cómo se organizan los gastos de la estancia?</summary><p>El alojamiento, el transporte y la manutención corren por cuenta del participante.</p></details>
      </div>
    </section>

    <section className="clh-bottom" id="week-contact" aria-labelledby="week-contact-title">
      <div><h2 id="week-contact-title">Nos vemos en Madrid.</h2><p>Información e inscripciones · <a href={`mailto:${admissionsEmail}`}>{admissionsEmail}</a></p></div>
      <a className="clh-action" href={`mailto:${admissionsEmail}`}>Solicitar información <span aria-hidden="true">↗</span></a>
    </section>
    <div className="clh-partners" aria-label="Comunidad, formación y colaboradores">
      <div><small>Comunidad</small><strong>CLH</strong></div><div><small>Formación</small><strong>Semanas Ejecutivas</strong></div><div><small>Colaboran</small><strong>BEWAY · UP Consulting</strong></div>
    </div>
  </div>;
}

import { cssVar, loadTokens, semanticTokens } from "../scripts/lib/tokens";
import { Sandbox } from "./sandbox";

const TYPE_SPECIMENS = [
  { cls: "type-display", token: "font.display", sample: "Diseñar con contratos" },
  { cls: "type-title", token: "font.title", sample: "La spec explica, el contrato obliga" },
  { cls: "type-body", token: "font.body", sample: "Texto de lectura en Inter, claro y directo." },
  { cls: "type-subtitle", token: "font.subtitle", sample: "Subtítulo de un aviso" },
  { cls: "type-label", token: "font.label", sample: "Etiqueta de formulario" },
  { cls: "type-eyebrow", token: "font.eyebrow", sample: "Metadato en mono" },
];

const SHAPES = [
  { cls: "shape--control", token: "size.radius.control", label: "Radio · controles" },
  { cls: "shape--surface", token: "size.radius.surface", label: "Radio · superficies" },
];

const SPACES = ["stack-sm", "stack-md", "stack-lg", "surface", "section"];

export default function Home() {
  const tokens = loadTokens();
  const colors = semanticTokens(tokens).filter((t) => t.type === "color");

  return (
    <main>
      <section className="band">
        <div className="container reading">
          <p className="eyebrow">Sandbox · Design Contracts</p>
          <h1 className="display">Los componentes y estilos del sistema</h1>
          <p className="lead">
            Prueba cada componente cambiando sus variantes y textos. Todo lo que ves sale de los contratos y de los
            tokens del repositorio: si no está en el contrato, aquí no aparece.
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="container">
          <Sandbox />
        </div>
      </section>

      <section className="band">
        <div className="container">
          <p className="eyebrow">Estilos · color</p>
          <h2 className="display">{colors.length} colores semánticos</h2>
          <div className="grid">
            {colors.map((t) => (
              <div key={t.path} className="swatch">
                <div className="swatch__color" style={{ background: `var(${cssVar(t.path)})` }} />
                <span>{t.path}</span>
                <span>
                  {t.aliasOf} · {t.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <p className="eyebrow">Estilos · tipografía</p>
          <h2 className="display">Inter para leer, mono para metadatos</h2>
          <div className="specimens">
            {TYPE_SPECIMENS.map((s) => (
              <div key={s.cls} className="specimen">
                <span className="eyebrow">{s.token}</span>
                <p className={s.cls}>{s.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <p className="eyebrow">Estilos · forma y espacio</p>
          <h2 className="display">Radios y espaciado</h2>
          <div className="grid">
            {SHAPES.map((s) => (
              <div key={s.cls} className="swatch">
                <div className={`shape ${s.cls}`} />
                <span>{s.token}</span>
                <span>
                  {s.label} · {tokens.get(s.token)?.value}
                </span>
              </div>
            ))}
          </div>
          <div className="spaces">
            {SPACES.map((s) => (
              <div key={s} className="space">
                <span className="space__bar" style={{ width: `var(--size-space-${s})` }} />
                <span className="eyebrow">
                  size.space.{s} · {tokens.get(`size.space.${s}`)?.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--inverse">
        <div className="container reading">
          <p className="eyebrow">Gobernanza</p>
          <h2 className="display">Si no está en el contrato, el agente no lo inventa.</h2>
        </div>
      </section>

      <footer className="band">
        <div className="container footer">
          <p>
            Xavier Pascual · <a href="https://mokkapp.com">Mokkapp.com</a> ·{" "}
            <a href="https://www.skool.com/mokkapp-1438/about">Comunidad Mokkapp</a>
          </p>
        </div>
      </footer>
    </main>
  );
}

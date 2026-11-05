"use client";

/**
 * Sandbox: prueba los componentes del registro cambiando sus variantes y textos.
 * Las variantes salen de los contratos (registry/json), no están escritas aquí.
 */
import { useState, type ReactNode } from "react";
import { Alert, type AlertVariant } from "../components/alert/alert";
import { Badge, type BadgeVariant } from "../components/badge/badge";
import { Button, type ButtonVariant } from "../components/button/button";
import { Card, type CardVariant } from "../components/card/card";
import { Checkbox } from "../components/checkbox/checkbox";
import { Input } from "../components/input/input";
import AlertContract from "../registry/json/Alert.json";
import BadgeContract from "../registry/json/Badge.json";
import ButtonContract from "../registry/json/Button.json";
import CardContract from "../registry/json/Card.json";
import CheckboxContract from "../registry/json/Checkbox.json";
import InputContract from "../registry/json/Input.json";

type Name = "Button" | "Card" | "Input" | "Checkbox" | "Badge" | "Alert";
type ContractLike = {
  version: string;
  status: string;
  description: string;
  props: Record<string, { type: string; values?: (string | number)[] }>;
  tokens: Record<string, string>;
  rules: { never: string[] };
};

const NAMES: Name[] = ["Button", "Card", "Input", "Checkbox", "Badge", "Alert"];
const CONTRACTS: Record<Name, ContractLike> = {
  Button: ButtonContract,
  Card: CardContract,
  Input: InputContract,
  Checkbox: CheckboxContract,
  Badge: BadgeContract,
  Alert: AlertContract,
};

/** Qué activa el interruptor de cada componente. */
const FLAG: Record<Name, string | null> = {
  Button: "Desactivado",
  Card: "Con eyebrow",
  Input: "Con error",
  Checkbox: "Con error",
  Badge: null,
  Alert: "Con acción",
};

const TEXT_LABEL: Record<Name, string> = {
  Button: "Texto del botón",
  Card: "Título",
  Input: "Etiqueta",
  Checkbox: "Etiqueta",
  Badge: "Texto",
  Alert: "Título",
};

export function Sandbox() {
  const [name, setName] = useState<Name>("Button");
  const [variant, setVariant] = useState<Record<Name, string>>({
    Button: "primary",
    Card: "cream",
    Input: "",
    Checkbox: "",
    Badge: "neutral",
    Alert: "info",
  });
  const [text, setText] = useState<Record<Name, string>>({
    Button: "Guardar cambios",
    Card: "La spec explica",
    Input: "Correo electrónico",
    Checkbox: "Quiero recibir novedades",
    Badge: "nuevo",
    Alert: "El pago no se ha completado",
  });
  const [flag, setFlag] = useState<Record<Name, boolean>>({
    Button: false,
    Card: true,
    Input: false,
    Checkbox: false,
    Badge: false,
    Alert: true,
  });

  const contract = CONTRACTS[name];
  const variants = (contract.props.variant?.values ?? []).map(String);
  const v = variant[name];
  const label = text[name];
  const on = flag[name];

  let preview: ReactNode = null;
  let code = "";
  switch (name) {
    case "Button":
      preview = (
        <Button variant={v as ButtonVariant} disabled={on}>
          {label || "Botón"}
        </Button>
      );
      code = `<Button variant="${v}"${on ? " disabled" : ""}>${label}</Button>`;
      break;
    case "Card":
      preview = (
        <Card variant={v as CardVariant} eyebrow={on ? "registry/md" : undefined} title={label || "Título"}>
          <p>Qué es el componente, para qué sirve y por qué se tomó cada decisión.</p>
        </Card>
      );
      code = `<Card variant="${v}"${on ? ' eyebrow="registry/md"' : ""} title="${label}">\n  <p>…</p>\n</Card>`;
      break;
    case "Input":
      preview = (
        <Input
          label={label || "Etiqueta"}
          type="email"
          placeholder="ada@example.com"
          hint={on ? undefined : "Te enviaremos la confirmación"}
          error={on ? "Escribe un correo con @" : undefined}
        />
      );
      code = on
        ? `<Input label="${label}" type="email" error="Escribe un correo con @" />`
        : `<Input label="${label}" type="email" hint="Te enviaremos la confirmación" />`;
      break;
    case "Checkbox":
      preview = (
        <Checkbox
          label={label || "Etiqueta"}
          error={on ? "Debes aceptar las condiciones para continuar" : undefined}
        />
      );
      code = `<Checkbox label="${label}"${on ? ' error="Debes aceptar las condiciones para continuar"' : ""} />`;
      break;
    case "Badge":
      preview = <Badge variant={v as BadgeVariant}>{label || "badge"}</Badge>;
      code = `<Badge variant="${v}">${label}</Badge>`;
      break;
    case "Alert":
      preview = (
        <Alert variant={v as AlertVariant} title={label || "Título"}>
          <p>Tu banco ha rechazado la operación. Tu carrito se mantiene.</p>
          {on && <Button variant="secondary">Reintentar pago</Button>}
        </Alert>
      );
      code = `<Alert variant="${v}" title="${label}">\n  <p>…</p>${on ? '\n  <Button variant="secondary">Reintentar pago</Button>' : ""}\n</Alert>`;
      break;
  }

  return (
    <div className="sandbox">
      <div className="sandbox__tabs" role="tablist" aria-label="Componentes">
        {NAMES.map((n) => (
          <Button key={n} variant={n === name ? "primary" : "tertiary"} onClick={() => setName(n)} aria-pressed={n === name}>
            {n}
          </Button>
        ))}
      </div>

      <div className="sandbox__panel">
        <div className="sandbox__controls">
          <p className="eyebrow">Controles</p>

          {variants.length > 0 && (
            <div className="sandbox__group">
              <p className="sandbox__label">Variante · del contrato</p>
              <div className="actions">
                {variants.map((x) => (
                  <Button
                    key={x}
                    variant={x === v ? "primary" : "secondary"}
                    onClick={() => setVariant({ ...variant, [name]: x })}
                    aria-pressed={x === v}
                  >
                    {x}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Input
            label={TEXT_LABEL[name]}
            value={label}
            onChange={(e) => setText({ ...text, [name]: e.target.value })}
          />

          {FLAG[name] && (
            <Checkbox
              label={FLAG[name]!}
              checked={on}
              onChange={(e) => setFlag({ ...flag, [name]: e.target.checked })}
            />
          )}
        </div>

        <div className="sandbox__output">
          <div className="sandbox__stage">{preview}</div>
          <pre className="code">
            <code>{code}</code>
          </pre>
          <div className="sandbox__meta">
            <p className="eyebrow">
              registry/json/{name}.json · v{contract.version} · {contract.status}
            </p>
            <p>{contract.description}</p>
            <p className="sandbox__label">
              {Object.keys(contract.tokens).length} tokens permitidos · Nunca: {contract.rules.never.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

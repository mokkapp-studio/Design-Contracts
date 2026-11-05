---
name: figma-contract
description: Crea el contrato de un componente desde Figma (un diseño o una Spec) y lo convierte en código, o lleva un contrato del repositorio a Figma con su Spec. Úsala cuando pidan "crea el contrato de este componente de Figma", "contrato desde esta Spec", "pasa este diseño a código" o "genera en Figma el componente X".
---

# figma-contract · modo demostración

Dos direcciones y nada más. El repositorio es la fuente de verdad: Figma lo refleja.

```
1 · Figma → repo   Diseño o Spec ─▶ leer y reconocer tokens ─▶ contrato ─▶ código ─▶ check
2 · Repo → Figma   Contrato ─▶ componente en Figma con variables ─▶ Spec al lado
```

## Antes de empezar

1. Lee `AGENTS.md`, `tokens/semantic/` y un contrato de ejemplo (`registry/json/Badge.json`).
2. Comprueba que el MCP de Figma está conectado. Antes de usar `use_figma`, carga la skill `figma-use`; para leer o escribir una Spec, carga también `figma-spec`.
3. Un componente por petición.

## Dirección 1 · Figma → contrato → código

**Entrada:** un enlace a un componente (`figma.com/design/…?node-id=…`) o a una Spec (`figma.com/spec/…`).

1. **Lee la fuente** (solo lectura).
   - **Componente:** nombre, propiedades de variante y sus valores, capas y variables usadas (`get_design_context`, `get_variable_defs`).
   - **Spec:** el texto y sus bloques de código:
     - ` ```ts ` con una `interface …Props` → `props`
     - ` ```css ` con `var(--…)` → tokens usados
     - ` ```json ` → fragmento de contrato que se fusiona
     - El texto → `description`, `rules` y `decisions`
2. **Reconoce los tokens.** Una variable de Figma `color/action/primary/bg` es el token `color.action.primary.bg` (las `/` pasan a `.`).
   - Solo vale si existe en `tokens/semantic/`.
   - Si es un primitivo, no existe o es un valor suelto (un hex, un número), **no lo inventes**: anótalo en `openQuestions` como `"(Figma) <capa>: valor sin token semántico: <valor>"`.
3. **Escribe el contrato** en `registry/json/<Nombre>.json` a partir de `template.contract.json`:
   - `version: "0.1.0"` y `status: "draft"`.
   - `anchors.figma` con el enlace de origen.
   - Solo lo que dice la fuente. Lo que decidas tú va a `decisions` con su porqué.
4. **Genera la spec legible:** `npm run generate` (crea `registry/md/<Nombre>.md`).
5. **Crea el código** en `components/<nombre>/`, copiando el patrón de `components/badge/`:
   - `<nombre>.tsx` con las props del contrato.
   - `<nombre>.css` usando **solo** los tokens del contrato (`var(--…)`), sin hex, px ni sombras.
   - `<nombre>.spec.ts` que compruebe el elemento y las variantes del contrato.
6. **Comprueba:** `npm run check`. Corrige hasta que esté en verde.
7. **Resume en 5 líneas:** qué leíste, qué tokens reconociste, qué quedó en `openQuestions`.

## Dirección 2 · Contrato → Figma

**Entrada:** "genera en Figma el componente X" + el enlace del archivo de Figma de destino.

1. Lee `registry/json/<X>.json` y los tokens que cita.
2. Comprueba que el archivo tiene las variables semánticas con el mismo nombre (`color/action/primary/bg`). Si faltan, **pregunta** antes de crearlas a partir de `tokens/`.
3. Crea un component set `<X>` con la propiedad `variant` y los valores del contrato. Cada relleno, borde, radio y padding, **enlazado a su variable**. Nada de valores sueltos.
4. Crea una **Spec** junto al componente con el contenido de `registry/md/<X>.md`.
5. Guarda el enlace del componente en `anchors.figma` del contrato y ejecuta `npm run generate && npm run check`.

## Reglas

- Solo lo que dice la fuente. Lo dudoso, a `openQuestions`.
- Nunca un token que no exista en `tokens/semantic/`.
- No modifiques otros contratos ni el formato del contrato.
- Si un cambio llega desde Figma, se aplica al contrato, nunca solo al código.

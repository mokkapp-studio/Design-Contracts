# Changelog

Cada cambio en tokens o contratos se registra aquí, con su versión y su motivo.

## 1.2.0 · 2026-11-05
- Tipografía: **Inter** sustituye a Georgia en titulares, texto y botones. Los roles `font.display`, `font.title`, `font.body`, `font.button` y `font.subtitle` apuntan ahora a `font.family.sans`.
- Se elimina el primitivo `font.family.serif`: ya no lo usa ningún token.
- Motivo: Inter está disponible en Figma (también para agentes en la nube) y tiene peso 600, así que familia y peso se enlazan a variables sin fuentes sustitutas.
- Inter y JetBrains Mono se sirven desde el proyecto (`@fontsource/inter`, `@fontsource/jetbrains-mono`): se ven igual en cualquier equipo.
- Los contratos no cambian: citan tokens semánticos (`font.button.family`), no nombres de fuente.

## 1.1.0 · 2026-11-01
- Nuevos componentes: `Input`, `Checkbox`, `Badge` y `Alert`, cada uno con contrato, spec, código, estilos y test.
- Nuevo primitivo `color.rust.700` (#a3402a) para errores: cumple contraste AA sobre todas las superficies crema. `clay` sigue sin uso en la interfaz.
- Nuevos tokens semánticos: `color.field.*`, `color.feedback.error.*`, `font.label`, `font.helper`, `font.subtitle`, `size.control.check`, `size.border.accent` y espaciados de campo, badge y aviso.
- Nuevas reglas de contenido en `content/voice.md`: formularios, badges y avisos.

## 1.0.0 · 2026-11-01
- Primera versión del sistema: tokens primitivos y semánticos, contratos de `Button` y `Card`.
- `color.text.secondary` usa `slate.500` en lugar de `cloud.400` por contraste AA.
- Radio de controles fijado en 8px y de superficies en 16px.

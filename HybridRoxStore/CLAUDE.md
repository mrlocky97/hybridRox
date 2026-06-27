# CLAUDE.md

Contexto y reglas para Claude (y cualquier asistente de IA) que trabaje en este
repositorio. La marca exige explícitamente que **toda IA respete esta identidad**.
Lee este archivo antes de generar código, copy o diseño.

---

## Qué es este proyecto

Sitio web y plataforma de la marca **HybridRox**, dirigida a atletas híbridos
(Hyrox, CrossFit, OCR, fuerza). Objetivo del negocio: **equipar, educar y construir
comunidad**. Vende accesorios físicos y productos digitales.

Tagline: *Entrena para dos mundos. Domínalos ambos.*

La fuente de verdad de marca es [`docs/BRAND.md`](docs/BRAND.md). Si algo en el
código contradice ese documento, el documento gana.

---

## Reglas que no se negocian

1. **No romper coherencia de marca.** Mejorar sí; contradecir no.
2. **Validar antes de escalar.** No introducir infraestructura pesada (comercio,
   pagos, CMS) hasta que la fase actual lo pida (ver roadmap en `docs/DEVELOPMENT.md`).
3. **Identidad clara siempre.** Respetar tokens visuales y voz en cada entregable.
4. **Sin humo.** Nada de promesas falsas en copy ni features inventadas en código.

---

## Voz y tono (para todo el copy que generes)

- Cercano pero experto. Habla como compañero de entreno, no como vendedor.
- Directo. Frases cortas. Cero relleno.
- Usa datos solo cuando aporten valor real.
- **Prohibido:** promesas falsas, hype vacío, tono corporativo.

---

## Identidad visual (úsala como tokens, no hardcodees suelto)

```
Colores
  --color-base     #0D0D0D   (negro base / fondo)
  --color-carbon   #1A1A1A   (superficies, cards)
  --color-hueso    #F5F5F5   (texto sobre oscuro / blanco roto)
  --color-acento   #E8FF00   (lima — CTAs y énfasis, usar con moderación)

Tipografía
  Titulares  Bebas Neue
  Texto      Inter

Principios
  Alto contraste · Minimalismo funcional · Imágenes reales (no stock genérico)
```

El acento lima es para acciones y énfasis puntual. No saturar.

---

## Stack y convenciones

> Stack propuesto, pendiente de confirmación del responsable del proyecto.

- **Next.js (App Router) + TypeScript**, **Tailwind CSS**.
- Componentes en `src/components`, rutas en `src/app`, contenido MDX en `src/content`.
- TypeScript estricto. Sin `any` salvo justificación con comentario.
- Nombres en inglés para código (variables, funciones, archivos); copy de cara al
  usuario en español.
- Accesibilidad: contraste AA mínimo, foco visible, alt text en imágenes.
- Sin dependencias nuevas pesadas sin justificar el porqué.

---

## Arquitectura de la web (funnel)

El sitio sigue este orden narrativo. Respétalo al construir páginas:

1. **Impacto** — hero que detiene el scroll.
2. **Confianza** — prueba social / credibilidad.
3. **Educación** — por qué importa el entrenamiento híbrido.
4. **Producto** — qué se ofrece.
5. **Conversión** — CTA claro.

Mezcla de contenido: 50% educación · 30% inspiración · 20% producto.

---

## Lo que SÍ debes hacer

- Proponer cambios pequeños, reversibles y aislados.
- Explicar suposiciones antes de actuar sobre ellas.
- Mantener el funnel y los tokens de marca intactos.
- Preguntar antes de añadir comercio, pagos, CMS o cualquier servicio externo.

## Lo que NO debes hacer

- No introducir pagos, checkout o inventario sin que el roadmap esté en esa fase.
- No commitear secretos, claves API ni `.env`.
- No inventar testimonios, cifras ni datos de rendimiento.
- No cambiar la paleta ni la tipografía sin actualizar `docs/BRAND.md` primero.
- No tomar decisiones irreversibles (infraestructura, dominios, borrados) por tu
  cuenta: propónlas y deja que una persona las ejecute.

---

## Comandos (cuando exista la app)

```bash
pnpm dev      # desarrollo local
pnpm build    # build de producción
pnpm lint     # linting
pnpm test     # tests
```

---

## Al terminar una tarea

- Verifica que el copy respeta la voz.
- Verifica que el diseño respeta los tokens.
- Resume qué cambiaste y qué suposiciones hiciste.
- Señala cualquier decisión que requiera aprobación humana.

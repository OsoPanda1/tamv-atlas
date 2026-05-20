# Consolidado 1

Generado: 2026-05-20T10:55:37.222Z

Fuentes: 20

## Fuente: federation/tamv-digital-nexus/SOUL.md

# SOUL.md — TAMV_DOC_SENTINEL

## Identidad
- **Agent ID:** TAMV_DOC_SENTINEL
- **Rol:** Documental y cartógrafo técnico del ecosistema TAMV/TAMV ONLINE/THE SOF.
- **Misión:** Unificar conocimiento y trazabilidad de múltiples repositorios TAMV dentro de `tamv-digital-nexus` sin alterar el canon.

## Valores operativos
1. **Canon > creatividad.**
2. **Fuente primaria > inferencia.**
3. **Duda o conflicto = STOP + escalamiento humano.**
4. **Documentar antes que modificar.**

## Prohibiciones duras
- No redefinir TAMV ni sus módulos canon.
- No renombrar sistemas canon (MSR, THE SOF, MD-X4, Isabella, guardianías).
- No modificar textos legales sin etiqueta `TODO_REVIEW_LEGAL`.
- No ejecutar despliegues o migraciones no autorizadas.

## Estilo de salida
- Preciso, técnico, verificable y con trazabilidad.
- Cada propuesta debe diferenciar claramente: **estado actual**, **riesgo**, **acción sugerida**.
- Todo cambio en documentación debe incluir referencias al origen cuando exista.

## Memoria estructural mínima
- Núcleo TAMV Core OS
- THE SOF / Shadow Engine
- MSR
- Isabella AI + bóveda
- MD-X4 y pipelines visuales
- Guardianías y radares
- UTAMV / BookPI / TAMV ONLINE

---

## Fuente: federation/tamv-digital-nexus/apps/web/README.md

# apps/web/

## Propósito
Aplicación web principal TAMV, migrada desde `src/` a `apps/web/src/` sin reescritura lógica.

## Responsables
- Equipo Frontend TAMV

## Contratos esperados
- Mantener compatibilidad de alias/import-paths durante transición.
- Toda refactorización de paths ocurre por fases y con validación CI.

---

## Fuente: federation/tamv-digital-nexus/docs/01_filosofia_tamv.md

# 01_filosofia_tamv

Documento en construcción según el Master Canon TAMV.

---

## Fuente: federation/tamv-digital-nexus/docs/12_juridico_tamv.md

# 12_juridico_tamv

Documento en construcción según el Master Canon TAMV.

---

## Fuente: federation/tamv-digital-nexus/docs/13_economico_financiero_tamv.md

# 13_economico_financiero_tamv

Documento en construcción según el Master Canon TAMV.

---

## Fuente: federation/tamv-digital-nexus/docs/20_glosario_tamv.md

# 20_glosario_tamv

Documento en construcción según el Master Canon TAMV.

---

## Fuente: federation/tamv-digital-nexus/docs/21_atlas_tamv.md

# 21_atlas_tamv

Documento en construcción según el Master Canon TAMV.

---

## Fuente: federation/tamv-digital-nexus/docs/BLENDER_DEPENDENCY_INTEGRATION.md

# Blender Dependency Graph Integration

## Overview

This document outlines the integration of Blender's dependency graph into the TAMV ecosystem, specifically for the **M03_XR (Extended Reality)** and **M06_CONTENT** modules.

## Blender Dependency Graph

```
strict graph {
    # Core Dependencies
    external_python -- external_bzip2;
    external_python -- external_ffi;
    external_python -- external_lzma;
    external_python -- external_ssl;
    external_python -- external_sqlite;
    external_python -- external_zlib;
    external_python_site_packages -- external_python;
    
    # Media Processing
    external_ffmpeg -- external_zlib;
    external_ffmpeg -- external_openjpeg;
    external_ffmpeg -- external_x264;
    external_ffmpeg -- external_opus;
    external_ffmpeg -- external_vpx;
    external_ffmpeg -- external_theora;
    external_ffmpeg -- external_vorbis;
    external_ffmpeg -- external_ogg;
    external_ffmpeg -- external_lame;
    external_ffmpeg -- external_aom;
    
    # Image Processing
    external_openimageio -- external_png;
    external_openimageio -- external_zlib;
    external_openimageio -- external_openexr;
    external_openimageio -- external_imath;
    external_openimageio -- external_jpeg;
    external_openimageio -- external_tiff;
    external_openimageio -- external_pugixml;
    external_openimageio -- external_fmt;
    external_openimageio -- external_robinmap;
    external_openimageio -- external_openjpeg;
    external_openimageio -- external_webp;
    
    # 3D & Rendering
    external_osl -- ll;
    external_osl -- external_openexr;
    external_osl -- external_zlib;
    external_osl -- external_openimageio;
    external_osl -- external_pugixml;
    
    external_alembic -- external_openexr;
    external_alembic -- external_imath;
    
    external_embree -- external_tbb;
    external_openimagedenoise -- external_tbb;
    external_openimagedenoise -- external_ispc;
    
    # USD & Interchange
    external_usd -- external_tbb;
    external_usd -- external_opensubdiv;
    
    # Audio
    external_sndfile -- external_ogg;
    external_sndfile -- external_vorbis;
    external_sndfile -- external_flac;
    external_vorbis -- external_ogg;
    external_theora -- external_vorbis;
    external_theora -- external_ogg;
    
    # Compute & GPU
    external_dpcpp -- external_python;
    external_dpcpp -- external_python_site_packages;
    external_dpcpp -- external_vcintrinsics;
    external_dpcpp -- external_openclheaders;
    external_dpcpp -- external_icdloader;
    external_dpcpp -- external_level_zero;
    external_dpcpp -- external_spirvheaders;
    
    external_igc -- external_igc_vcintrinsics;
    external_igc -- external_igc_llvm;
    external_igc -- external_igc_opencl_clang;
    external_igc -- external_igc_spirv_headers;
    external_igc -- external_igc_spirv_tools;
    external_igc -- external_igc_spirv_translator;
    
    # LLVM & Compilers
    ll -- external_xml2;
    ll -- external_python;
    external_ispc -- ll;
    external_ispc -- external_python;
    external_mesa -- ll;
}
```

## Additional External Libraries

### LCMS2 (Color Management)

```cmake
project(lcms2)

cmake_minimum_required(VERSION 3.10)
include_directories(include)

set(HEADERS
    include/lcms2.h
    include/lcms2_plugin.h
)
set(SOURCES
    src/cmscam02.c
    src/cmscgats.c
    src/cmscnvrt.c
    src/cmserr.c
    src/cmsgamma.c
    src/cmsgmt.c
    src/cmsintrp.c
    src/cmsio0.c
    src/cmsio1.c
    src/cmslut.c
    src/cmsmd5.c
    src/cmsmtrx.c
    src/cmsnamed.c
    src/cmsopt.c
    src/cmspack.c
    src/cmspcs.c
    src/cmsplugin.c
    src/cmsps2.c
    src/cmssamp.c
    src/cmssm.c
    src/cmstypes.c
    src/cmsvirt.c
    src/cmswtpnt.c
    src/cmsxform.c
    src/lcms2_internal.h
)

add_library(${PROJECT_NAME} STATIC ${HEADERS} ${SOURCES})
```

### GMPXX (C++ Big Integer)

```cmake
cmake_minimum_required(VERSION 3.10)
project(libgmpxx)

include_directories(. cxx ${GMP_INCLUDE_DIR})
add_definitions(-D__GMP_WITHIN_GMPXX)
add_library(libgmpxx SHARED
  cxx/dummy.cc
  cxx/isfuns.cc
  cxx/ismpf.cc
  cxx/ismpq.cc
  cxx/ismpz.cc
  cxx/ismpznw.cc
  cxx/limits.cc
  cxx/osdoprnti.cc
  cxx/osfuns.cc
  cxx/osmpf.cc
  cxx/osmpq.cc
  cxx/osmpz.cc
)

target_link_libraries(libgmpxx ${GMP_LIBRARY})
```

### Theora (Video Codec)

```cmake
cmake_minimum_required(VERSION 3.10)
project(theora LANGUAGES C)

set(CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}")
FIND_PACKAGE(OGG REQUIRED)

file(GLOB HEADERS
  "include/theora/codec.h"
  "include/theora/theora.h"
  "include/theora/theoradec.h"
  "include/theora/theoraenc.h"
)

include_directories("include")
include_directories(${OGG_INCLUDE_DIR})

set(LIBTHEORA_COMMON
  "lib/apiwrapper.c"
  "lib/bitpack.c"
  "lib/dequant.c"
  "lib/fragment.c"
  "lib/idct.c"
  "lib/info.c"
  "lib/internal.c"
  "lib/state.c"
  "lib/quant.c"
)

set(LIBTHEORA_ENC
  "lib/analyze.c"
  "lib/encapiwrapper.c"
  "lib/encfrag.c"
  "lib/encinfo.c"
  "lib/encode.c"
  "lib/enquant.c"
  "lib/fdct.c"
  "lib/huffenc.c"
  "lib/mathops.c"
  "lib/mcenc.c"
  "lib/rate.c"
  "lib/tokenize.c"
)

set(LIBTHEORA_DEC
  "lib/decapiwrapper.c"
  "lib/decinfo.c"
  "lib/decode.c"
  "lib/huffdec.c"
)

add_library(theora-common OBJECT ${LIBTHEORA_COMMON} ${HEADERS})
add_library(theora-enc OBJECT ${LIBTHEORA_ENC} ${HEADERS})
add_library(theora-dec OBJECT ${LIBTHEORA_DEC} ${HEADERS})

add_library(theora $<TARGET_OBJECTS:theora-common> $<TARGET_OBJECTS:theora-enc> $<TARGET_OBJECTS:theora-dec>)
target_link_libraries(theora ${OGG_LIBRARY})
```

## TAMV Integration Points

### M03_XR Module

The XR module can leverage these dependencies for:

| Blender Library | TAMV Use Case | Integration Layer |
|-----------------|---------------|-------------------|
| `embree` | Real-time ray tracing | RTX/hybrid rendering |
| `osl` | Custom shaders | Procedural materials |
| `openimageio` | Texture I/O | Asset pipeline |
| `openexr` | HDR workflows | HDRI environment maps |
| `usd` | Scene interchange | XR scene export |

### M06_CONTENT Module

For content generation and processing:

| Blender Library | TAMV Use Case |
|-----------------|---------------|
| `ffmpeg` | Video encoding/decoding |
| `openimagedenoise` | AI denoising |
| `alembic` | Animation cache |
| `opensubdiv` | Subdivision surfaces |

## Build Configuration

### Required CMake Components

```cmake
include(cmake/openexr.cmake)
include(cmake/openimageio.cmake)
include(cmake/osl.cmake)
include(cmake/embree.cmake)
include(cmake/usd.cmake)
include(cmake/ffmpeg.cmake)
include(cmake/alembic.cmake)
include(cmake/opensubdiv.cmake)
```

### Environment Variables

```bash
# For Linux/macOS
export BLENDER_DEPS_ROOT="/opt/blenderdeps"
export LD_LIBRARY_PATH="$BLENDER_DEPS_ROOT/lib:$LD_LIBRARY_PATH"

# For Windows
set BLENDER_DEPS_ROOT="C:\blenderdeps"
set PATH="%BLENDER_DEPS_ROOT%\bin;%PATH%"
```

## License Compliance

SPDX: **GPL-2.0-or-later**

All Blender dependencies maintain GPL-2.0+ compatibility. TAMV's M03_XR module using these components must maintain open-source compliance per the [TAMV Constitution](./04_auth_memberships_access_control.md).

## References

- [Blender Build System](https://github.com/blender/blender)
- [M03_XR Performance Guidelines](./02_MODULOS/M03_XR/INTERNO/XR-PERFORMANCE-GUIDELINES.md)
- [Content Sync Specification](./02_MODULOS/M06_CONTENT/INTERNO/CONTENT-SYNC-SPEC.md)

---

## Fuente: federation/tamv-digital-nexus/docs/ceo/edwin_anubis_villasenor_biografia.md

# Edwin Anubis Villaseñor — Biografía (borrador estructural)

## Núcleo biográfico
- Origen en México y trayectoria tecnológica/educativa.
- Fundador de TAMV/TAMV ONLINE.
- Rol de diseño en MSR, THE SOF, Isabella, Sentinel y MD-X4.

## Filosofía y liderazgo
- Enfoque civilizatorio, antifrágil y federado.
- Liderazgo mediante manuales, guardianías y arquitectura por capas.

> TODO: completar con fuentes primarias verificadas y cronología validada.

---

## Fuente: federation/tamv-digital-nexus/docs/modules/ia/ia_public.md

# Isabella AI — Documento Público

> **Estado:** `stable` · **Acceso:** PÚBLICO

## ¿Qué es Isabella?

Isabella es la inteligencia artificial de TAMV Digital Nexus. Es una asistente emocional avanzada con voz propia, capaz de conversar, apoyar y acompañar a cada ciudadano del ecosistema.

## Capacidades

- **Conversación natural** en español e inglés.
- **Voz sintetizada** con tecnología ElevenLabs.
- **Análisis emocional**: Isabella detecta el estado emocional del usuario y adapta su respuesta.
- **Contextual**: Recuerda las últimas 50 interacciones de la sesión.
- **Siempre disponible**: Accesible desde cualquier página del ecosistema.

## Acceso

- Widget flotante en todas las páginas (botón Isabella).
- Página dedicada: `/isabella`.

## Privacidad

Las conversaciones se procesan para generar respuestas en tiempo real. Consulta la política de privacidad de TAMV para información sobre retención de datos.

---

## Fuente: federation/tamv-digital-nexus/docs/modules/radares/radares_internal.md

# Radares — internal

Especificación interna (borrador) para trazabilidad técnica y dependencias.

---

## Fuente: federation/tamv-digital-nexus/docs/modules/radares/radares_public.md

# Radares — public

Versión pública y pedagógica del módulo radares.

---

## Fuente: federation/tamv-digital-nexus/docs/modules/radares/radares_summary.md

# Radares — summary

Documento resumen del dominio radares dentro del canon TAMV.

---

## Fuente: federation/tamv-digital-nexus/docs/modules/render/render_internal.md

# Render XR / MD-X4 — Documento Interno

> **Estado:** `draft` · **Acceso:** INTERNO · **Revisión:** DAO-Experiencia

## Patrón de code-splitting para rutas XR

Las rutas XR son costosas en bundle. Implementar lazy loading:

```tsx
// En App.tsx
const Metaverse = lazy(() => import('./pages/Metaverse'));
const DreamSpaces = lazy(() => import('./pages/DreamSpaces'));
const ThreeDSpace = lazy(() => import('./pages/ThreeDSpace'));

// Wrapper con Suspense
<Suspense fallback={<XRLoadingScreen />}>
  <Route path="/metaverse" element={<Metaverse />} />
</Suspense>
```

**Estado actual:** pendiente de implementar (TASKS-TAMV-MODULAR.md ítem 5).

## Guía LOD (Level of Detail)

Implementar LOD progresivo basado en FPS medido:

```typescript
const LOD_THRESHOLDS = {
  ultra:   { fps: 60, particles: 2000, shadowQuality: 'high' },
  high:    { fps: 45, particles: 1000, shadowQuality: 'medium' },
  medium:  { fps: 30, particles: 500,  shadowQuality: 'low' },
  low:     { fps: 0,  particles: 100,  shadowQuality: 'none' },
};
```

El `xrStore.fps` se actualiza cada segundo desde el loop de render.
Si `fps < 45`, llamar a `xrStore.updateSceneConfig({ quality: 'medium', lodEnabled: true })`.

## Throttle de audio-reactivo

El audio-reactivo debe muestrear FFT máximo a 30fps, no en cada frame de render:

```typescript
const AUDIO_SAMPLE_INTERVAL_MS = 33; // ~30fps
```

## Performance benchmarks objetivo

| Métrica | Target | Medición |
|---------|--------|----------|
| FPS mínimo (equipos medios) | ≥ 45 | `xrStore.fps` |
| Tiempo de carga ruta XR | < 2s percibido | LCP Lighthouse |
| Uso memoria Three.js | < 200MB | Chrome DevTools |
| Leaks de geometría | 0 | Dispose en cleanup |

## Limpieza de recursos Three.js

Todo componente 3D debe hacer dispose en unmount:

```typescript
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture.dispose();
  };
}, []);
```

## KAOS Audio — frecuencias binaural

| Preset | Freq L | Freq R | Estado objetivo |
|--------|--------|--------|-----------------|
| `focus` | 200Hz | 210Hz | Concentración (alpha 10Hz) |
| `relax` | 150Hz | 154Hz | Relajación (theta 4Hz) |
| `meditate` | 100Hz | 104Hz | Meditación profunda (theta 4Hz) |
| `energize` | 300Hz | 314Hz | Energía (beta 14Hz) |
| `sleep` | 80Hz | 84Hz | Sueño (delta 4Hz) |

Frecuencia base del sistema: 432Hz (en lugar del estándar 440Hz).

---

## Fuente: federation/tamv-digital-nexus/docs/modules/render/render_public.md

# Experiencias Inmersivas TAMV — Documento Público

> **Estado:** `stable` · **Acceso:** PÚBLICO

## Motor MD-X4

TAMV Digital Nexus utiliza el motor visual MD-X4, un sistema de renderizado 3D/4D que combina datos en tiempo real con experiencias sensoriales inmersivas.

## DreamSpaces

Los DreamSpaces son entornos virtuales inmersivos disponibles en `/dream-spaces`. Cada espacio tiene:
- Un ambiente visual único en 3D.
- Audio binaural diseñado para potenciar el estado de consciencia.
- Hasta N participantes simultáneos.

**Entornos disponibles:**
- **Quantum**: Campo de partículas cuánticas
- **Forest**: Bosque inmersivo con sonidos naturales
- **Cosmic**: Espacio profundo
- **Crystal**: Caverna de cristales resonantes

## Metaverso

Accede al metaverso TAMV en `/metaverse` para explorar el espacio 3D del ecosistema civilizatorio.

## Espacio 3D

El espacio 3D libre está disponible en `/3d-space` para exploración y creación.

## KAOS Audio

El sistema KAOS opera en 432Hz — la frecuencia armónica base del ecosistema. Los tonos binaurales en `/kaos` están diseñados para potenciar diferentes estados cognitivos.

## Requisitos recomendados

- Navegador Chrome/Firefox moderno
- GPU dedicada para mejores resultados
- Auriculares para experiencia binaural completa

---

## Fuente: federation/tamv-digital-nexus/docs/online/TAMV_ONLINE_ATLAS.md

# TAMV ONLINE ATLAS

Mapa inicial del campus y rutas de aprendizaje para TAMV ONLINE.

## Secciones previstas
- Catálogo de cursos
- Niveles
- Journeys
- Enlaces con UTAMV, MSR y THE SOF

---

## Fuente: federation/tamv-digital-nexus/docs/online/journeys/JOURNEYS_OVERVIEW.md

# Journeys Overview

Resumen documental de journeys de TAMV ONLINE sin datos sensibles.

---

## Fuente: federation/tamv-digital-nexus/docs/sofreports/THESOF_STATE_REPORT.md

# THE SOF State Report

Reporte de estado sistémico (sin PII), tendencias y señales operativas.

---

## Fuente: federation/tamv-digital-nexus/packages/contracts/events/README.md

# Event Contracts

This directory stores versioned event contract definitions and catalogs.

Suggested naming:
- `tamv.events.v1.yaml`
- `tamv.events.v1.1.yaml`

All event payloads should reference shared schema components from `../schemas/base.contracts.v1.yaml`.

---

## Fuente: federation/tamv-digital-nexus/xr-assets/README.md

# xr-assets/

## Propósito
Almacena activos XR (modelos, texturas, escenas y metadatos de optimización).

## Responsables
- Equipo XR
- Equipo Performance Visual

## Contratos esperados
- Cada paquete de activos define versión, formato y presupuesto de peso.
- Mantener trazabilidad de origen/licencia por asset.

---


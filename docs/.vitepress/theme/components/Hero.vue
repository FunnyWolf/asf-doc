<template>
  <section class="hero-section">
    <div class="hero-shell">
      <div class="hero-copy">
        <p v-if="config.eyebrow" class="eyebrow">{{ config.eyebrow }}</p>
        <h1 class="name">
          <template v-for="(part, index) in richTextParts(config.name, config.nameAccent)" :key="`${part.text}-${index}`">
            <span :class="{ 'text-accent': part.accent }">{{ part.text }}</span>
          </template>
        </h1>
        <p class="tagline">{{ config.tagline }}</p>

        <div v-if="config.focus && config.focus.length" class="focus-list">
          <span v-for="item in config.focus" :key="item" class="focus-item">
            <span class="focus-dot"></span>
            {{ item }}
          </span>
        </div>

        <div class="actions">
          <a
            v-for="(action, index) in config.actions"
            :key="action.text"
            :class="['action', action.theme || (index === 0 ? 'brand' : 'alt')]"
            :href="action.link"
          >
            <span>{{ action.text }}</span>
            <span class="action-arrow">→</span>
          </a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="preview">
          <img :src="config.image" :alt="config.imageAlt || config.name" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  config: {
    type: Object,
    required: true
  }
})

function normalizeAccentTerms(terms) {
  if (!terms) return []
  return (Array.isArray(terms) ? terms : [terms])
    .map((term) => String(term || ''))
    .filter(Boolean)
}

function richTextParts(text, terms) {
  const source = String(text || '')
  const accents = normalizeAccentTerms(terms)
  const parts = []
  let cursor = 0

  while (cursor < source.length) {
    let match = null
    for (const term of accents) {
      const index = source.indexOf(term, cursor)
      if (index === -1) continue
      if (!match || index < match.index || (index === match.index && term.length > match.term.length)) {
        match = { index, term }
      }
    }

    if (!match) {
      parts.push({ text: source.slice(cursor), accent: false })
      break
    }
    if (match.index > cursor) {
      parts.push({ text: source.slice(cursor, match.index), accent: false })
    }
    parts.push({ text: match.term, accent: true })
    cursor = match.index + match.term.length
  }

  return parts.length ? parts : [{ text: source, accent: false }]
}
</script>

<style scoped>
.hero-section {
  min-height: calc(100vh - var(--vp-nav-height));
  display: flex;
  align-items: center;
  padding: 5rem 2rem 3.5rem;
}

.hero-shell {
  display: grid;
  grid-template-columns: minmax(360px, 0.88fr) minmax(520px, 1.12fr);
  gap: clamp(2.5rem, 4.5vw, 4rem);
  align-items: center;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
}

.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 580px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1.25rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid rgba(132, 168, 205, 0.12);
  border-radius: 999px;
  background: rgba(14, 22, 44, 0.58);
  color: rgba(199, 218, 235, 0.74);
  font-size: 0.86rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  backdrop-filter: blur(18px);
}

.name {
  font-size: clamp(3rem, 5.5vw, 5.7rem);
  font-weight: 850;
  color: rgba(248, 251, 255, 0.96);
  line-height: 0.98;
  margin: 0;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.text-accent {
  background: linear-gradient(115deg, #2ec4ff 0%, #5d88ff 48%, #2fd8a4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: clamp(1.18rem, 2vw, 1.55rem);
  color: rgba(214, 224, 235, 0.72);
  margin: 1.55rem 0 0;
  max-width: 560px;
  line-height: 1.55;
  text-wrap: balance;
}

.focus-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.35rem;
}

.focus-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.68rem;
  border: 1px solid rgba(132, 168, 205, 0.1);
  border-radius: 999px;
  background: rgba(14, 22, 44, 0.5);
  color: rgba(199, 218, 235, 0.68);
  font-size: 0.9rem;
  white-space: nowrap;
  backdrop-filter: blur(14px);
}

.focus-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2fd8a4;
}

.actions {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-top: 2.25rem;
}

.action {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.82rem 1.25rem;
  border-radius: 12px;
  font-size: 0.98rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;
}

.action.brand {
  background: linear-gradient(135deg, #2ec4ff, #2fd8a4);
  color: #07111f;
  box-shadow: 0 16px 42px rgba(47, 216, 164, 0.14);
}

.action.brand:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 48px rgba(47, 216, 164, 0.18);
}

.action.alt {
  background: rgba(14, 22, 44, 0.58);
  color: rgba(214, 224, 235, 0.76);
  border: 1px solid rgba(132, 168, 205, 0.12);
}

.action.alt:hover {
  background: rgba(22, 32, 58, 0.72);
  border-color: rgba(132, 168, 205, 0.2);
  color: rgba(238, 244, 250, 0.9);
  transform: translateY(-1px);
}

.action-arrow {
  opacity: 0.72;
  transition: transform 0.2s ease;
}

.action:hover .action-arrow {
  transform: translateX(2px);
}

.hero-visual {
  position: relative;
  justify-self: end;
  width: 100%;
  max-width: 760px;
}

.hero-visual::before {
  content: "";
  position: absolute;
  inset: 12% -8% -8% 8%;
  border-radius: 40px;
  background:
    radial-gradient(circle at 24% 20%, rgba(66, 126, 210, 0.12), transparent 38%),
    radial-gradient(circle at 82% 82%, rgba(47, 216, 164, 0.08), transparent 40%);
  filter: blur(22px);
  z-index: -1;
}

.preview {
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(132, 168, 205, 0.12);
  background: rgba(10, 16, 34, 0.56);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.045),
    0 24px 78px rgba(0, 0, 0, 0.44);
  backdrop-filter: blur(18px);
}

.preview img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 960px) {
  .hero-section {
    min-height: auto;
    padding: 4rem 1.2rem 2.5rem;
  }

  .hero-shell {
    grid-template-columns: 1fr;
    gap: 2.75rem;
  }

  .hero-copy {
    max-width: none;
  }

  .hero-visual {
    justify-self: stretch;
    max-width: none;
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding: 3.25rem 1rem 2rem;
  }

  .actions {
    flex-direction: column;
  }

  .action {
    justify-content: center;
  }
}
</style>

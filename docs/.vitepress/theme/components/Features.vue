<template>
  <section class="features-section">
    <div class="section-heading">
      <p v-if="eyebrow" class="section-eyebrow">{{ eyebrow }}</p>
      <h2 v-if="title" class="section-title">
        <template v-for="(part, index) in richTextParts(title, titleAccent)" :key="`${part.text}-${index}`">
          <span :class="{ 'text-accent': part.accent }">{{ part.text }}</span>
        </template>
      </h2>
      <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
      <div v-if="steps && steps.length" class="workflow-map">
        <div v-for="(step, index) in steps" :key="stepTitle(step)" class="workflow-node">
          <span class="node-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ stepTitle(step) }}</strong>
          <small v-if="stepDetails(step)">{{ stepDetails(step) }}</small>
        </div>
      </div>
    </div>

    <div class="features-list">
      <article v-for="(feature, index) in features" :key="index" class="feature-card">
        <div class="card-copy">
          <div class="card-meta">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <span v-if="feature.kicker">{{ feature.kicker }}</span>
          </div>
          <h3 class="card-title">
            <template v-for="(part, titleIndex) in richTextParts(feature.title, feature.titleAccent)" :key="`${part.text}-${titleIndex}`">
              <span :class="{ 'text-accent': part.accent }">{{ part.text }}</span>
            </template>
          </h3>
          <p class="card-details">{{ feature.details }}</p>
          <a v-if="feature.link" class="card-link" :href="feature.link">
            {{ feature.linkText || 'Learn more' }}
            <span>→</span>
          </a>
        </div>
        <div class="card-image">
          <img :src="feature.image" :alt="feature.title" loading="lazy" />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true
  },
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  titleAccent: {
    type: [String, Array],
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  steps: {
    type: Array,
    default: () => []
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

function stepTitle(step) {
  return typeof step === 'string' ? step : step?.title || ''
}

function stepDetails(step) {
  return typeof step === 'string' ? '' : step?.details || ''
}
</script>

<style scoped>
.features-section {
  max-width: 1240px;
  margin: 0 auto;
  padding: 4rem 2rem 7rem;
}

.section-heading {
  margin-bottom: 2rem;
}

.section-eyebrow {
  margin: 0 0 0.9rem;
  color: rgba(118, 198, 210, 0.68);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  max-width: 980px;
  margin: 0;
  color: rgba(248, 251, 255, 0.96);
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.05em;
  text-wrap: balance;
}

.text-accent {
  background: linear-gradient(115deg, #2ec4ff 0%, #5d88ff 48%, #2fd8a4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  max-width: 980px;
  margin: 1.25rem 0 0;
  color: rgba(214, 224, 235, 0.56);
  font-size: 1.08rem;
  line-height: 1.7;
}

.workflow-map {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.6rem;
}

.workflow-node {
  min-height: 112px;
  padding: 0.9rem;
  border-radius: 18px;
  border: 1px solid rgba(132, 168, 205, 0.1);
  background:
    radial-gradient(circle at 16% 12%, rgba(47, 216, 164, 0.08), transparent 38%),
    rgba(14, 22, 44, 0.5);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 16px 42px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(14px);
}

.node-index {
  display: block;
  margin-bottom: 0.7rem;
  color: rgba(111, 247, 255, 0.72);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.workflow-node strong {
  display: block;
  color: rgba(238, 244, 250, 0.86);
  font-size: 0.98rem;
  line-height: 1.3;
}

.workflow-node small {
  display: block;
  margin-top: 0.45rem;
  color: rgba(214, 224, 235, 0.46);
  font-size: 0.82rem;
  line-height: 1.45;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.feature-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(300px, 0.72fr) minmax(420px, 1.28fr);
  gap: clamp(1.75rem, 4vw, 3.5rem);
  align-items: center;
  padding: clamp(1.35rem, 3vw, 2rem);
  border: 1px solid rgba(132, 168, 205, 0.1);
  border-radius: 28px;
  background:
    radial-gradient(circle at 12% 16%, rgba(47, 216, 164, 0.055), transparent 36%),
    rgba(14, 22, 44, 0.46);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 22px 64px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(18px);
  overflow: hidden;
}

.feature-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0.055), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 42%);
  opacity: 0.54;
}

.card-copy {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.1rem;
}

.card-meta span {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.038);
  color: rgba(160, 195, 205, 0.58);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
}

.card-title {
  font-size: clamp(1.75rem, 3vw, 2.8rem);
  font-weight: 780;
  color: rgba(238, 244, 250, 0.92);
  margin: 0 0 1rem;
  line-height: 1.08;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.card-details {
  font-size: 1.03rem;
  color: rgba(214, 224, 235, 0.52);
  line-height: 1.7;
  margin: 0;
  max-width: 100%;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1.4rem;
  color: rgba(98, 215, 190, 0.9);
  font-weight: 700;
  text-decoration: none;
}

.card-link span {
  transition: transform 0.2s ease;
}

.card-link:hover span {
  transform: translateX(2px);
}

.card-image {
  position: relative;
  z-index: 1;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(132, 168, 205, 0.09);
  background: rgba(10, 16, 34, 0.62);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.035),
    0 16px 48px rgba(0, 0, 0, 0.26);
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 960px) {
  .features-section {
    padding: 3rem 1.5rem 4rem;
  }

  .section-heading {
    margin-bottom: 2.25rem;
  }

  .features-list {
    gap: 1.25rem;
  }

  .workflow-map {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .feature-card {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
}

@media (max-width: 640px) {
  .features-section {
    padding: 2rem 1rem 3rem;
  }

  .features-list {
    gap: 1rem;
  }

  .workflow-map {
    grid-template-columns: 1fr;
  }

  .feature-card {
    padding: 1rem;
    border-radius: 20px;
  }

  .card-details {
    font-size: 0.95rem;
  }

  .card-image {
    border-radius: 12px;
  }
}
</style>

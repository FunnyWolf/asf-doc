<template>
  <section class="features-section">
    <div class="features-list">
      <div v-for="(feature, index) in features" :key="index" class="feature-card">
        <div class="card-index">{{ String(index + 1).padStart(2, '0') }}</div>
        <h3 class="card-title">{{ feature.title }}</h3>
        <p class="card-details">{{ feature.details }}</p>
        <div class="card-image">
          <img :src="feature.image" :alt="feature.title" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem 6rem;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.feature-card {
  position: relative;
  padding: 2.5rem 0;
}

.card-index {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  font-variant-numeric: tabular-nums;
}

.card-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
  line-height: 1.2;
}

.card-details {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.7;
  margin: 0 0 2rem;
  max-width: 100%;
}

.card-image {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #111;
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

  .features-list {
    gap: 3rem;
  }

  .card-title {
    font-size: 1.6rem;
  }

  .card-details {
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .features-section {
    padding: 2rem 1rem 3rem;
  }

  .features-list {
    gap: 2.5rem;
  }

  .feature-card {
    padding: 1.5rem 0;
  }

  .card-title {
    font-size: 1.35rem;
  }

  .card-details {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .card-image {
    border-radius: 12px;
  }
}
</style>

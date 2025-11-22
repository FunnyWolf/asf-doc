---
layout: page
---

<script setup>
import { heroConfig } from '../.vitepress/config/hero.zh'
import { featuresConfig } from '../.vitepress/config/features.zh'
import { keyFeaturesConfig } from '../.vitepress/config/keyFeatures.zh'
</script>

<Hero :config="heroConfig" />
<Features :features="featuresConfig" />

[//]: # (<KeyFeatures :config="keyFeaturesConfig" />)

[//]: # (<Testimonials :config="testimonialsConfig" />)

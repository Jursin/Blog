<script setup lang="ts">
import { sanitizeUrl } from '@braintree/sanitize-url'
import { useData, useRoute } from 'vitepress'
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import site from '../config'
import { copyrightLicenseMap } from '../config/types'
import type { CopyrightLicenseKey } from '../config/types'

const { frontmatter } = useData()
const route = useRoute()

const url = ref('')
const copyrightEnabled = computed(() => frontmatter.value.copyright !== false)

const copyrightView = computed(() => {
  const cfg = frontmatter.value.copyright
  const isConfigured = cfg && typeof cfg === 'object'
  const isReprint = isConfigured && (cfg as any).creation === 'reprint'
  const source = isConfigured ? ((cfg as any).source || '') : ''

  const rawAuthor = isConfigured ? (cfg as any).author : undefined
  const author = rawAuthor
    ? (typeof rawAuthor === 'string' ? { name: rawAuthor } : { name: rawAuthor.name ?? '', url: rawAuthor.url })
    : site.copyright.author

  const rawLicense = isConfigured ? (cfg as any).license : undefined
  const licenseKey: CopyrightLicenseKey = (typeof rawLicense === 'string' ? rawLicense : rawLicense?.name) || site.copyright.license
  const licenseInfo = copyrightLicenseMap[licenseKey] || { label: licenseKey, url: '', icons: [] }

  return {
    author,
    authorHref: author.url ? sanitizeUrl(author.url) : '',
    linkLabel: isReprint ? '转载自' : '本文链接',
    linkHref: sanitizeUrl(isReprint && source ? source : url.value),
    linkText: isReprint && source ? source : url.value,
    licenseInfo,
    licenseVisible: !isReprint || ('license' in (cfg || {})),
  }
})

const updateUrl = () => {
  if (typeof window !== 'undefined') {
    url.value = sanitizeUrl(new URL(window.location.href).origin + new URL(window.location.href).pathname)
  }
}

onMounted(updateUrl)
watch(() => route.path, () => nextTick(updateUrl))
</script>

<template>
  <h2 id="版权信息" tabindex="-1">
    <a class="header-anchor" href="#版权信息">
      <Icon name="mdi:copyright" size="1.1em" />
    </a>
    版权信息
  </h2>
  <div v-if="copyrightEnabled" class="copyright-info">
    <div class="copyright-info-item">
      <Icon name="mdi:user-outline" />
      <span class="copyright-info-label">版权归属</span>
      <span class="copyright-info-value">
        <a v-if="copyrightView.authorHref" :href="copyrightView.authorHref" target="_blank" rel="noopener noreferrer" class="copyright-info-link">{{ copyrightView.author.name }}</a>
        <span v-else>{{ copyrightView.author.name }}</span>
      </span>
    </div>
    <div class="copyright-info-item">
      <Icon name="mdi:link-variant" />
      <span class="copyright-info-label">{{ copyrightView.linkLabel }}</span>
      <span class="copyright-info-value">
        <a :href="copyrightView.linkHref" target="_blank" rel="noopener noreferrer" class="copyright-info-link">{{ copyrightView.linkText }}</a>
      </span>
    </div>
    <div v-if="copyrightView.licenseVisible" class="copyright-info-item">
      <Icon name="mdi:license" />
      <span class="copyright-info-label">许可协议</span>
      <span class="copyright-info-value copyright-info-license">
        <a v-if="copyrightView.licenseInfo.url" :href="copyrightView.licenseInfo.url" target="_blank" rel="noopener noreferrer" class="copyright-info-link">
          {{ copyrightView.licenseInfo.label }}
        </a>
        <span v-else>{{ copyrightView.licenseInfo.label }}</span>
        <span class="copyright-info-license-icons">
          <Icon v-for="icon in copyrightView.licenseInfo.icons" :key="icon" :name="icon" />
        </span>
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
h2 {
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
  position: relative;
  font-weight: 600;
  outline: none;
}

.header-anchor {
  position: absolute;
  top: 24px;
  left: 0;
  margin-left: -1.25em;
  font-weight: 500;
  user-select: none;
  text-decoration: none;
  opacity: 0;
  color: var(--vp-c-brand-1);
  transition: color 0.25s, opacity 0.25s;
}

h2:hover .header-anchor,
.header-anchor:focus {
  opacity: 1;
}

.copyright-info {
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  border-radius: 1rem;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.copyright-info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.copyright-info-item :deep(.icon) {
  flex-shrink: 0;
}

.copyright-info-label {
  color: var(--vp-c-text-1);
  font-weight: 400;
  flex-shrink: 0;
  width: 60px;
  /* 对齐标签，如果要自适应则设为 auto */
}

.copyright-info-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
  word-break: break-all;
}

.copyright-info-license {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.copyright-info-license-icons {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.copyright-info-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s;

  &:hover {
    color: var(--vp-c-brand-2);
  }
}

@media (max-width: 768px) {
  .copyright-info {
    font-size: 13px;
  }
}
</style>

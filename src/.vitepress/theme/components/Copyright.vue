<script setup lang="ts">
import { sanitizeUrl } from '@braintree/sanitize-url';
import { useData, useRoute } from 'vitepress';
import { computed, ref, onMounted, watch, nextTick } from 'vue';
import site from '../config';
import { copyrightLicenseMap } from '../config/types';
import type { CopyrightAuthor, CopyrightLicenseKey, CopyrightLicenseObject, CopyrightLicenseInfo, CopyrightFrontmatterConfig } from '../config/types';

const { frontmatter } = useData();
const route = useRoute();

const url = ref('');
const copyrightEnabled = computed(() => frontmatter.value.copyright !== false)

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isCopyrightLicenseObject(value: unknown): value is CopyrightLicenseObject {
  return isObjectRecord(value) && typeof value.name === 'string' && typeof value.url === 'string'
}

function isCopyrightAuthor(value: unknown): value is CopyrightAuthor {
  return isObjectRecord(value) && typeof value.name === 'string'
}

function normalizeCopyrightAuthor(author: unknown): CopyrightAuthor | undefined {
  if (typeof author === 'string' && author.trim()) {
    return {
      name: author.trim(),
    }
  }

  if (isCopyrightAuthor(author)) {
    return {
      name: author.name.trim(),
      url: author.url?.trim(),
    }
  }

  return undefined
}

function isCopyrightFrontmatterConfig(value: unknown): value is CopyrightFrontmatterConfig {
  return isObjectRecord(value) && ('author' in value || 'license' in value || 'creation' in value || 'source' in value)
}

function resolveLicenseInfo(license: unknown): CopyrightLicenseInfo | undefined {
  if (typeof license === 'string') {
    if (license in copyrightLicenseMap) {
      const preset = copyrightLicenseMap[license as CopyrightLicenseKey]
      return preset
    }

    return {
      label: license,
      url: '',
      icons: [],
    }
  }

  if (!isCopyrightLicenseObject(license)) {
    return undefined
  }

  if (license.name in copyrightLicenseMap) {
    const preset = copyrightLicenseMap[license.name as CopyrightLicenseKey]
    return {
      label: preset.label,
      url: license.url,
      icons: preset.icons,
    }
  }

  return {
    label: license.name,
    url: license.url,
    icons: [],
  }
}

const copyrightView = computed(() => {
  const copyright = frontmatter.value.copyright
  const isConfigured = isCopyrightFrontmatterConfig(copyright)
  const isReprint = isConfigured && copyright.creation === 'reprint'
  const source = isConfigured && typeof copyright.source === 'string' && copyright.source.trim() ? copyright.source.trim() : ''
  const author = isConfigured ? normalizeCopyrightAuthor(copyright.author) ?? site.copyright.author : site.copyright.author
  const licenseInfo = isConfigured ? resolveLicenseInfo(copyright.license) ?? copyrightLicenseMap[site.copyright.license] : copyrightLicenseMap[site.copyright.license]
  const authorHref = author.url ? sanitizeUrl(author.url) : ''
  const linkHref = sanitizeUrl(isReprint && source ? source : url.value)

  return {
    author,
    authorHref,
    linkLabel: isReprint ? '转载自' : '本文链接',
    linkHref,
    linkText: isReprint && source ? source : url.value,
    licenseInfo,
    licenseVisible: !isReprint || ('license' in copyright),
  }
})

// 提取公共的更新 URL 函数
const updateUrl = () => {
  if (typeof window !== 'undefined') {
    const urlObj = new URL(window.location.href);
    url.value = sanitizeUrl(urlObj.origin + urlObj.pathname);
  }
};

onMounted(updateUrl); // 初次客户端挂载时执行
watch(
  () => route.path,
  () => nextTick(updateUrl)
); // 路由切换时执行
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

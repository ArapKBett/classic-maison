import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const baseConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: 'scontent.cdninstagram.com' },
    ],
  },
}

// Apply next-intl plugin first
const intlConfig = withNextIntl(baseConfig)

// Then inject our webpack alias AFTER the plugin, so it always runs last
// and applies to both server and client webpack builds
const intlWebpack = intlConfig.webpack

intlConfig.webpack = (config, options) => {
  // Run next-intl's webpack first (if any)
  const result = typeof intlWebpack === 'function'
    ? intlWebpack(config, options)
    : config

  // Force-set the @/ alias using process.cwd() which is always the project root
  result.resolve.alias = {
    ...(typeof result.resolve.alias === 'object' && !Array.isArray(result.resolve.alias)
      ? result.resolve.alias
      : {}),
    '@': path.join(process.cwd(), 'src'),
  }

  return result
}

export default intlConfig

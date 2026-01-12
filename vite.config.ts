
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/faf36569e4635c70465a2d1caaee557307a88b9a.png': path.resolve(__dirname, './src/assets/faf36569e4635c70465a2d1caaee557307a88b9a.png'),
        'figma:asset/ae2c36f02a0aa304e2e63c96daa2843dfc44fca6.png': path.resolve(__dirname, './src/assets/ae2c36f02a0aa304e2e63c96daa2843dfc44fca6.png'),
        'figma:asset/a503af29691ceb2d30dbe753dbf35cc64cbf12e9.png': path.resolve(__dirname, './src/assets/a503af29691ceb2d30dbe753dbf35cc64cbf12e9.png'),
        'figma:asset/a1c55a645beeeb027ee3dc8e232d9f450ce4448b.png': path.resolve(__dirname, './src/assets/a1c55a645beeeb027ee3dc8e232d9f450ce4448b.png'),
        'figma:asset/6f45711041117bd80b7104f70704abeee8a37bec.png': path.resolve(__dirname, './src/assets/6f45711041117bd80b7104f70704abeee8a37bec.png'),
        'figma:asset/6b3a320fbb4b78ab95533d99802d51d1997cc097.png': path.resolve(__dirname, './src/assets/6b3a320fbb4b78ab95533d99802d51d1997cc097.png'),
        'figma:asset/67b386e7091d031fec91768ef7e33daf4069cbb2.png': path.resolve(__dirname, './src/assets/67b386e7091d031fec91768ef7e33daf4069cbb2.png'),
        'figma:asset/4be2d13ca5f371d52c3d3e5be3ce46eeaad8c076.png': path.resolve(__dirname, './src/assets/4be2d13ca5f371d52c3d3e5be3ce46eeaad8c076.png'),
        'figma:asset/3fbe448b5fd97200c438e1696f4a1c28b79c056b.png': path.resolve(__dirname, './src/assets/3fbe448b5fd97200c438e1696f4a1c28b79c056b.png'),
        'figma:asset/1d8565e86f34b7ad47135400e3709be41f018414.png': path.resolve(__dirname, './src/assets/1d8565e86f34b7ad47135400e3709be41f018414.png'),
        'figma:asset/0f384be59e0a88a5b2af706c42c7e9855e646b2b.png': path.resolve(__dirname, './src/assets/0f384be59e0a88a5b2af706c42c7e9855e646b2b.png'),
        'figma:asset/046983a5f1a2d8d859a7f1f355a5ee9854ca82d4.png': path.resolve(__dirname, './src/assets/046983a5f1a2d8d859a7f1f355a5ee9854ca82d4.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api/weather': {
          target: 'http://apis.data.go.kr',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/weather/, '/1360000/VilageFcstInfoService_2.0'),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('프록시 에러', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('프록시 요청:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('프록시 응답:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },
  });
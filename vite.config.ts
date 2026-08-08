import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// lucide-react intentionally focuses on UI icons and does not ship brand logos.
// The app uses Instagram/Facebook/YouTube as decorative social icons, so map
// those three imports to the existing Search icon during the Vite transform.
// This keeps the existing UI code build-safe without adding another icon package.
function socialIconCompatibility() {
  return {
    name: 'social-icon-compatibility',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.endsWith('/src/main.tsx')) return null;
      const withoutBrandImports = code.replace(',Instagram,Facebook,Youtube', '');
      const aliases = '\nconst Instagram = Search;\nconst Facebook = Search;\nconst Youtube = Search;\n';
      return withoutBrandImports.replace("import './styles.css';", "import './styles.css';" + aliases);
    },
  };
}

export default defineConfig({
  plugins: [socialIconCompatibility(), react()],
  base: './',
});

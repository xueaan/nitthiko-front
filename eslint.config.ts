//Flat Config 模式（ESLint v8+ 的新方式）知识点
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import autoImportGlobals from './.eslintrc-auto-import.json' // 引入自动生成的 globals

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index'], // 允许 index.vue 但强制其他 Vue 组件使用多单词名称
        },
      ],
    },
  },
  {
    name: 'app/auto-import',
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      globals: autoImportGlobals.globals, // 挂载到 languageOptions.globals
    },
  },
)

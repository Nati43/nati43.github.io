<template>
  <div class="theme-switcher" v-click-outside="close">
    <!-- Trigger icon -->
    <button class="palette-btn" @click="toggleOpen" :title="'Current: ' + currentThemeName" :class="{ open: isOpen }">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="palette-icon">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.53-.19-1.01-.5-1.38-.3-.36-.49-.85-.49-1.37 0-1.1.9-2 2-2h2.34c3.12 0 5.65-2.53 5.65-5.65C22 6.12 17.52 2 12 2z" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/>
        <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor"/>
        <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor"/>
        <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/>
      </svg>
    </button>

    <!-- Dropdown panel -->
    <transition name="fade-drop">
      <div class="theme-dropdown" v-if="isOpen">
        <p class="dropdown-label">Theme</p>
        <button
          v-for="theme in themes"
          :key="theme.id"
          @click="selectTheme(theme.id)"
          :class="['theme-option', { active: currentTheme === theme.id }]"
        >
          <span class="swatch" :style="{ backgroundColor: theme.color }"></span>
          <span class="theme-name">{{ theme.label }}</span>
          <span class="check" v-if="currentTheme === theme.id">✓</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  directives: {
    'click-outside': {
      bind(el, binding) {
        el._outsideClickHandler = (e) => {
          if (!el.contains(e.target)) binding.value();
        };
        document.addEventListener('click', el._outsideClickHandler);
      },
      unbind(el) {
        document.removeEventListener('click', el._outsideClickHandler);
      }
    }
  },
  data() {
    return {
      isOpen: false,
      currentTheme: 'tokyo-night',
      themes: [
        { id: 'original',    label: 'Original',    color: '#FF7F50' },
        { id: 'dracula',     label: 'Dracula',     color: '#BD93F9' },
        { id: 'tokyo-night', label: 'Tokyo Night', color: '#7AA2F7' }
      ]
    };
  },
  computed: {
    currentThemeName() {
      const t = this.themes.find(t => t.id === this.currentTheme);
      return t ? t.label : '';
    }
  },
  mounted() {
    const saved = localStorage.getItem('user-theme') || 'tokyo-night';
    this.selectTheme(saved);
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
    selectTheme(themeId) {
      this.currentTheme = themeId;
      document.documentElement.setAttribute('data-theme', themeId);
      localStorage.setItem('user-theme', themeId);
      this.isOpen = false;
      this.$emit('theme-changed', themeId);
    }
  }
};
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 1.25rem;
  right: 1.5rem;
  z-index: 9999;
}

.palette-btn {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  border: none;
  background: rgba(20, 20, 30, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}
.palette-btn:hover,
.palette-btn.open {
  color: #fff;
  background: rgba(30, 30, 45, 0.9);
  transform: scale(1.08);
}
.palette-icon {
  width: 1.2rem;
  height: 1.2rem;
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  background: rgba(20, 20, 30, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 0.5rem 0.4rem;
  min-width: 160px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.45);
  overflow: hidden;
}

.dropdown-label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin: 0.3rem 0.6rem 0.4rem;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 0.45rem 0.6rem;
  cursor: pointer;
  color: rgba(255,255,255,0.7);
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.18s ease, color 0.18s ease;
}
.theme-option:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}
.theme-option.active {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.swatch {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.theme-name {
  flex: 1;
  text-align: left;
}

.check {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
}

.fade-drop-enter-active,
.fade-drop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.fade-drop-enter,
.fade-drop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

@media (max-width: 576px) {
  .theme-switcher {
    top: 0.75rem;
    right: 0.75rem;
  }
}
</style>

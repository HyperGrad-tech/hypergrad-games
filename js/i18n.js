/**
 * HyperGrad Games - i18n 国际化框架
 * 轻量级，零依赖，支持 localStorage 记忆偏好
 * 用法：HTML 中给元素加 data-i18n="key"，JS 中调 i18n.apply() 应用翻译
 */
(function (window) {
  'use strict';

  const I18N = {
    lang: 'en',
    dicts: {
      en: {
        // 首页
        'site.name': 'HyperGrad',
        'site.nameSuffix': 'Games',
        'nav.puzzle': 'Puzzle',
        'nav.arcade': 'Arcade',
        'nav.strategy': 'Strategy',
        'nav.skill': 'Skill',
        'nav.card': 'Card',

        'hero.title': 'Play 42+ Free Browser Games',
        'hero.desc': 'No download. No installation. No registration. Just click and play instantly on any device.',

        'cat.puzzle': 'Puzzle Games',
        'cat.arcade': 'Arcade Games',
        'cat.strategy': 'Strategy Games',
        'cat.skill': 'Skill Games',
        'cat.card': 'Card & Board Games',

        // 功能区
        'feat.instant.title': 'Instant Play',
        'feat.instant.desc': 'No downloads or installs needed',
        'feat.device.title': 'Any Device',
        'feat.device.desc': 'Works on desktop, tablet, and mobile',
        'feat.notrack.title': 'No Tracking',
        'feat.notrack.desc': '100% client-side, no accounts needed',
        'feat.free.title': '100% Free',
        'feat.free.desc': 'Play unlimited, no hidden costs',

        // 通用游戏页
        'game.back': '← All Games',
        'game.newgame': 'New Game',
        'game.score': 'Score',
        'game.best': 'Best',
        'game.level': 'Level',
        'game.moves': 'Moves',
        'game.time': 'Time',
        'game.gameover': 'Game Over!',
        'game.win': 'You Win!',
        'game.tryagain': 'Press New Game to try again',
        'game.howto': 'How to Play',

        'footer.copy': 'Games run locally in your browser.',

        'lang.switch': '中文'
      },
      zh: {
        'site.name': 'HyperGrad',
        'site.nameSuffix': '游戏',
        'nav.puzzle': '益智',
        'nav.arcade': '街机',
        'nav.strategy': '策略',
        'nav.skill': '技巧',
        'nav.card': '棋牌',

        'hero.title': '畅玩 42+ 免费网页小游戏',
        'hero.desc': '无需下载，无需安装，无需注册。点击即玩，支持手机和电脑。',

        'cat.puzzle': '益智游戏',
        'cat.arcade': '街机游戏',
        'cat.strategy': '策略游戏',
        'cat.skill': '技巧游戏',
        'cat.card': '棋牌游戏',

        'feat.instant.title': '即开即玩',
        'feat.instant.desc': '无需下载安装',
        'feat.device.title': '全平台',
        'feat.device.desc': '电脑、平板、手机都能玩',
        'feat.notrack.title': '无追踪',
        'feat.notrack.desc': '100% 本地运行，无需注册',
        'feat.free.title': '完全免费',
        'feat.free.desc': '无限畅玩，无隐藏费用',

        'game.back': '← 全部游戏',
        'game.newgame': '新游戏',
        'game.score': '得分',
        'game.best': '最高',
        'game.level': '关卡',
        'game.moves': '步数',
        'game.time': '时间',
        'game.gameover': '游戏结束！',
        'game.win': '胜利！',
        'game.tryagain': '点击新游戏重新开始',
        'game.howto': '怎么玩',

        'footer.copy': '所有游戏均在浏览器本地运行。',

        'lang.switch': 'EN'
      }
    },

    init: function () {
      // 从 URL 或 localStorage 检测语言
      const saved = localStorage.getItem('hg-lang');
      if (saved && this.dicts[saved]) {
        this.lang = saved;
      }
      // URL hash #zh 强制中文
      if (location.hash === '#zh' || location.pathname.indexOf('/zh/') !== -1) {
        this.lang = 'zh';
      }
      this.apply();
    },

    t: function (key) {
      const dict = this.dicts[this.lang] || this.dicts.en;
      return dict[key] || this.dicts.en[key] || key;
    },

    apply: function () {
      document.documentElement.lang = this.lang;
      const els = document.querySelectorAll('[data-i18n]');
      els.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = this.t(key);
        el.textContent = val;
      });
      // 更新 hreflang link tags
      this.updateHreflang();
      // 更新切换按钮文字
      const btn = document.getElementById('lang-switch');
      if (btn) btn.textContent = this.lang === 'en' ? '中文' : 'EN';
    },

    updateHreflang: function () {
      // 移除旧的
      document.querySelectorAll('link[rel="alternate"]').forEach(l => l.remove());
      const cn = 'https://games.hypergrad.cn/';
      const en = 'https://games.hypergrad.cn/';
      const addLink = (hreflang, href) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        document.head.appendChild(link);
      };
      addLink('en', en);
      addLink('zh', cn + '#zh');
      addLink('x-default', en);
    },

    toggle: function () {
      this.lang = this.lang === 'en' ? 'zh' : 'en';
      localStorage.setItem('hg-lang', this.lang);
      this.apply();
    }
  };

  window.I18N = I18N;
  document.addEventListener('DOMContentLoaded', function () {
    I18N.init();
  });
})(window);

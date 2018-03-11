Vue.component('purple-header', {
  props: ['title', 'translation'],
  template: `
    <div class="header">
      <div class="header-title">
        {{title}}
      </div>
      <div class="header-translation">
        {{translation}}
      </div>
    </div>
  `
});

Vue.component('purple-category', {
  props: ['icon', 'name', 'translation'],
  template: `
    <div class="category">
      <div class="category-icon">
        <img class="category-image" :src="'images/' + icon + '.png'">
      </div>
      <div class="category-name">
        {{name}}
      </div>
      <div class="category-translation">
        {{translation}}
      </div>
    </div>
  `
});

Vue.component('purple-language', {
  props: ['language', 'flag'],
  template: `
    <div class="language">
      <div class="language-name">
        {{language}}
      </div>
      <img class="language-flag" :src="flag">
    </div>
  `
});

Vue.component('purple-tutorial', {
  props: ['background', 'logo', 'introduction'],
  template: `
    <div class="tutorial">
      <img class="tutorial-background" :src="background">
      <div class="tutorial-gradient"></div>
      <img class="tutorial-logo" :src="logo" alt="">
      <div class="tutorial-introduction">
        {{introduction}}
      </div>
    </div>
  `
})

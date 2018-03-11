const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Purple',
    languages: [],
    tutorials: [],

    step: 0,

    language: false,
    category: false,
    tutorial: false
  },
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic cHVycGxlOnB1cnBsZTIwMTg='
    }
  },
  methods: {
    setLanguage(language) {
      this.language = language || false;
    },
    setCategory(category) {
      this.category = category || false;
    },
    setTutorial(tutorial) {
      this.tutorial = tutorial || false;
    },
    stepForward: function(){
      this.step = this.step + 1
    },
    stepBack: function(){
      this.step = this.step - 1
    },
    menu: function(){
      this.category = null
      this.tutorial = null
    }
    // postMessage() {
    //   function makeid() {
    //     var text = "";
    //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //
    //     for (var i = 0; i < 5; i++)
    //       text += possible.charAt(Math.floor(Math.random() * possible.length));
    //
    //     return text;
    //   }
    //
    //   this.$http.post(`http://weird.se/wp-json/wp/v2/messages?title=0_cookie_${makeid()}&content=${this.message}&status=publish`).then(() => {
    //     this.message = '';
    //   });
    // }
  },
  mounted() {
    this.$http.get('http://weird.se/wp-json/wp/v2/tutorials').then(({body}) => {
      const tutorials = body.map((post) => {
        return {
          id: post.id,
          title: post.title.rendered,
          fields: post.acf
        }
      });

      this.tutorials = tutorials;
    });

    this.$http.get('http://weird.se/wp-json/wp/v2/languages').then(({body}) => {
      const languages = body.map((post) => {
        return {
          id: post.id,
          name: post.title.rendered,
          flag: post.acf.flagga
        }
      });

      this.languages = languages;
    });
  }
});

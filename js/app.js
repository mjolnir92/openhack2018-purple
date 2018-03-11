const app = new Vue({
  el: '#app',
  data: {
    message: '',
    translatedMessage: '',
    languages: [],
    tutorials: [],

    step: 0,

    language: false,
    category: false,
    tutorial: false,

    im: false,
  },
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic cHVycGxlOnB1cnBsZTIwMTg='
    }
  },
  methods: {
    // VOICE RE
    record() {
      let recognizing;
      let translateinfo = '';
      function reset() {
        recognizing = false;
        this.message = '';
        speech.start();
      }
      let speech = new webkitSpeechRecognition();
      speech.continuous = false;
      speech.interimResults = true;
      speech.lang = 'en-US';
      speech.start();
      speech.onstart = () => {
          recognizing = true;
      };
      speech.onresult = (event) => {
        let interim_transcript = '';
        let final_transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          }
        }
        this.message = final_transcript;
      };
      speech.onerror = function(event) {
          console.error(event.error);
      };
      speech.onend = () => {
        axios.get('https://translation.googleapis.com/language/translate/v2', {
          params: {
            target: 'sv',
            key: 'AIzaSyD6pBMi8PN__i7PHjWk8-ql-q7WudLRptQ',
            q: this.message
          }
        })
        .then(res => {
          res.data.data.translations.forEach(trans => {
            if (trans.detectedSourceLanguage === 'en') {
              this.translatedMessage = trans.translatedText;
            }
          });
        });
      };
    },

    setLanguage(language) {
      this.language = language || false;
    },
    setCategory(category) {
      this.category = category || false;
    },
    setTutorial(tutorial) {
      this.tutorial = tutorial || false;
    },
    stepForward(){
      this.step = this.step + 1
    },
    stepBack(){
      this.step = this.step - 1
    },
    menu(){
      this.category = null;
      this.tutorial = null;
      this.step = 0;
    },
    postMessage() {
      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }

      this.$http.post(`http://weird.se/wp-json/wp/v2/messages?title=0_cookie_${makeid()}&content=${this.translatedMessage}&status=publish`).then(() => {
        this.message = '';
        this.translatedMessage = '';
      });
    }
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

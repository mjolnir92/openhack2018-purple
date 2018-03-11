function upgrade() {
  alert('Please use Google Chrome for best experience');
}
window.onload = function() {
  if (!(window.webkitSpeechRecognition) && !(window.speechRecognition)) {
    upgrade();
  } else {
    var recognizing,
    transcription = document.getElementById('speech'),
    interim_span = document.getElementById('interim');
    interim_span.style.opacity = '0.5';
    function reset() {
      recognizing = false;
      interim_span.innerHTML = '';
      transcription.innerHTML = '';
      speech.start();
    }
    var speech = new webkitSpeechRecognition();
    speech.continuous = true;
    speech.interimResults = true;
    speech.lang = 'sv-SE';
    speech.start(); 
    speech.onstart = function() {
        recognizing = true;
    };
    speech.onresult = function(event) {
      var interim_transcript = '';
      var final_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          final_transcript += event.results[i][0].transcript;
          axios.get('https://translation.googleapis.com/language/translate/v2', {
            params: {
              target: 'en',
              key: 'AIzaSyD6pBMi8PN__i7PHjWk8-ql-q7WudLRptQ',
              q: final_transcript
            }
          })
          .then(res => {
            res.data.data.translations.forEach(trans => {
              if (trans.detectedSourceLanguage === 'sv') {
                document.querySelector('.swedish').innerHTML = trans.translatedText;
              } else {
                console.log(trans);
              }
            });
          });
        }
      }
      transcription.innerHTML = final_transcript;
      interim_span.innerHTML = interim_transcript;
    };
    speech.onerror = function(event) {
        // Either 'No-speech' or 'Network connection error'
        console.error(event.error);
    };
    speech.onend = function() {
        // When recognition ends
        reset();
    };
  }
};

// function upgrade() {
//   alert('Please use Google Chrome for best experience');
// }
// document.querySelector('button').addEventListener('click', function() {
//   if (!(window.webkitSpeechRecognition) && !(window.speechRecognition)) {
//     upgrade();
//   } else {
//     var recognizing,
//     transcription = document.getElementById('speech'),
//     interim_span = document.getElementById('interim');
//     interim_span.style.opacity = '0.5';
//     var translateinfo = '';
//     function reset() {
//       recognizing = false;
//       interim_span.innerHTML = '';
//       transcription.innerHTML = '';
//       speech.start();
//     }
//     var speech = new webkitSpeechRecognition();
//     speech.continuous = false;
//     speech.interimResults = true;
//     speech.lang = 'sv-SE';
//     speech.start();
//     speech.onstart = function() {
//         recognizing = true;
//     };
//     speech.onresult = function(event) {
//       var interim_transcript = '';
//       var final_transcript = '';
//       for (var i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           final_transcript += event.results[i][0].transcript;
//           translateinfo = final_transcript;
//         } else {
//           interim_span += event.results[i][0].transcript;
//         }
//       }
//       transcription.innerHTML = final_transcript;
//       interim_span.innerHTML = interim_transcript;
//     };
//     speech.onerror = function(event) {
//         console.error(event.error);
//     };
//     speech.onend = function() {
//       axios.get('https://translation.googleapis.com/language/translate/v2', {
//           params: {
//             target: 'sv',
//             key: 'AIzaSyD6pBMi8PN__i7PHjWk8-ql-q7WudLRptQ',
//             q: translateinfo
//           }
//         })
//         .then(res => {
//           res.data.data.translations.forEach(trans => {
//             if (trans.detectedSourceLanguage === 'en') {
//               document.querySelector('.swedish').innerHTML = trans.translatedText;
//             } else {
//               console.log(trans);
//             }
//           });
//         });
//         axios.get('https://translation.googleapis.com/language/translate/v2', {
//           params: {
//             target: 'es',
//             key: 'AIzaSyD6pBMi8PN__i7PHjWk8-ql-q7WudLRptQ',
//             q: translateinfo
//           }
//         })
//         .then(res => {
//           res.data.data.translations.forEach(trans => {
//             if (trans.detectedSourceLanguage === 'en') {
//               document.querySelector('.spanish').innerHTML = trans.translatedText;
//             } else {
//               console.log(trans);
//             }
//           });
//         });
//         axios.get('https://translation.googleapis.com/language/translate/v2', {
//           params: {
//             target: 'fa',
//             key: 'AIzaSyD6pBMi8PN__i7PHjWk8-ql-q7WudLRptQ',
//             q: translateinfo
//           }
//         })
//         .then(res => {
//           res.data.data.translations.forEach(trans => {
//             if (trans.detectedSourceLanguage === 'en') {
//               document.querySelector('.persian').innerHTML = trans.translatedText;
//             } else {
//               console.log(trans);
//             }
//           });
//         });
//     };
//   }
// });
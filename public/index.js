const r = document.getElementById('result');
const startConverting = () => {
  if ('webkitSpeechRecognition' in window) {
    let speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'en-US';
    speechRecognizer.start();

    let finalTranscripts = '';

    speechRecognizer.onresult = function(event) {
      let interimTranscripts = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        if (event.results[i].isFinal) {
          finalTranscripts += transcript;
        } else {
          interimTranscripts += transcript;
        }
      }
      r.innerHTML = `${finalTranscripts}<span>${interimTranscripts}</span>`;
    };
    speechRecognizer.onerror = function(event) {

    };
  } else {
    r.innerHTML = "Your broswer is not supported. If google chrome, please upgrade";
  }
}

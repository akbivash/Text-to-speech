const voiceSelect = document.querySelector('.voice-select')
const inputText = document.querySelector('.input-text')
const sendButton = document.querySelector('.send-button')
const synth = window.speechSynthesis



let voices = []

function populateVoiceList() {
    voices = synth.getVoices();
  
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}


sendButton.addEventListener('click', () => {
    let text = inputText.textContent
    let utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance);
})
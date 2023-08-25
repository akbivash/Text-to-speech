const voiceSelect = document.querySelector('.voice-select')
const inputText = document.querySelector('.input-text')
const sendButton = document.querySelector('.send-button')
const settingButton = document.querySelector('.setting')
const modal = document.querySelector('.modal')
const speed = document.querySelector('.speed')
const pitch = document.querySelector('.pitch')
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
    if (text === '') return
    let utterance = new SpeechSynthesisUtterance(text)
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name')
   
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterance.voice = voices[i];
        }
    }

    utterance.pitch= pitch.value
    utterance.rate = speed.value
    if (sendButton.textContent === 'Send') {
     
        synth.speak(utterance);
        sendButton.textContent = 'Cancel'
    } else {
        sendButton.textContent = 'Send'
        speechSynthesis.cancel()
        inputText.textContent = ''
    }

    utterance.onend = function (event) {
        console.log("Speech has finished.");
        sendButton.textContent = 'Send'
    };

    utterance.onerror = function(e){
        sendButton.textContent = 'Send'
    }
})

settingButton.addEventListener('click', () => {
    modal.classList.toggle('open')
})



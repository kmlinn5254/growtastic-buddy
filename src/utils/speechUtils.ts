
// Utility functions for speech synthesis

export const setupSpeechSynthesis = (): SpeechSynthesisUtterance | null => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance();
    
    // Configure voice settings for natural sound
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Try to get a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = voices.filter(voice => 
      voice.lang.includes('en') && 
      (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Female'))
    );
    
    if (preferredVoices.length > 0) {
      utterance.voice = preferredVoices[0];
    }
    
    return utterance;
  }
  
  return null;
};

export const speakText = (
  text: string, 
  isVoiceEnabled: boolean, 
  utterance: SpeechSynthesisUtterance | null
): void => {
  if (isVoiceEnabled && utterance && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Set the text to speak
    utterance.text = text;
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  }
};

export interface DictionaryApiError {
  title: string;
  message: string;
  resolution: string;
}

export interface DictionaryDefinition {
  word: string;
  phonetic?: string;
  phonetics: phonetic[];
  meanings: meaning[];
  license: license;
  sourceUrls: string[];
}

interface phonetic {
  text: string;
  audio: string;
  sourceUrl?: string;
  license?: license;
}

interface license {
  name: string;
  url: string;
}

interface meaning {
  partOfSpeech: string;
  definitions: definition[];
  synonyms?: string[];
  antonyms?: string[];
}

interface definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

import axios from "axios";
import type {
  DictionaryDefinition,
  DictionaryApiError,
} from "./dictionaryApi.types";

const API_BASE_URL = "https://api.dictionaryapi.dev/api";
const API_VERSION = "v2";
const API_ENDPOINT = `${API_BASE_URL}/${API_VERSION}/entries/en`;

export const fetchDefinition = async (
  word: string
): Promise<DictionaryDefinition[]> => {
  const response = await axios.get<DictionaryDefinition[]>(
    `${API_ENDPOINT}/${word.toLowerCase()}`
  );

  // If response is NOT an array, it's an error response
  if (!Array.isArray(response.data)) {
    const errData = response.data as DictionaryApiError;
    throw new Error(errData.message || "No definitions found.");
  }

  return response.data as DictionaryDefinition[];
};

export default fetchDefinition;

/** Feature: import a batch of vocabulary entries. Ignore case and surrounding spaces when
    detecting duplicates, skip invalid entries, preserve the original inputs, and report what 
    happened.
**/
const normalized = function normalizedWord(word) {
 return word.trim().toLowerCase();
}

const merged = function mergedVocabulary(existing, incoming) {
  if ((!(Array.isArray(existing))) || (!(Array.isArray(incoming)))) {
    throw new TypeError(" Two array expected");
  }

  const normalizedEntryWords = existing.map(function (entry) {
  return normalized(entry.word)
  })
  
  const seen = new Set(normalizedEntryWords);
  
  let duplicateskip = 0;
  let invalidskip = 0;
  const newEnteries = [];

  incoming.forEach(function (entry) {
    if (!entry || typeof entry !== "object") {
      invalidskip++;
      return;
    }
    if (entry.word === null || entry.word === undefined || typeof entry.word !== "string"|| entry.word.trim() === "") {
      invalidskip++;
      return;
    }
    if (seen.has(normalized(entry.word))) {
      duplicateskip++;
      return;
    }
    newEnteries.push(entry);
    seen.add(normalized(entry.word));
    
  })
  
  const finalVocablury = existing.concat(newEnteries)
  
  return {                //you can only add variable in return statement , not a property name,
    duplicateskip,
    invalidskip,
    finalVocabluryLength: finalVocablury.length,
    finalVocablury,
  }
}         //requirement → your design → your code → your tests → I review bugs.

const rukahai = [{ word: "apple", meaning: "fruit" },
  {word:"vegetables",meaning:"food used for eating"},{word:"salad",meaning:"pieces of various vegetables"},{word:"sad",meaning:"feeling"},{word:"capacity",meaning:"limit to a point where one can reach or fulfill"}]
  

const aara = [{ word: 123, meaning: "number" }, { word: "aPPle     ", meaning: "fruit" }, { word: "@#", meaning: "special characters" }, { word: "shekharsuman", meaning: "NAMEOFCELEBRITY" }, { word: "delhhisekarachi12312", meaning: "instagram Handle" }, { word:null, meaning: "number" }, {word:"capACITy",meaning:"limit to a point where one can reach or fulFILL"}]

const result = merged(rukahai, aara);
console.log(result);
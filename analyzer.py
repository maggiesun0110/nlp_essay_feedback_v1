#TODO
#next step = morphlogy based detection (word form)
import spacy
from collections import defaultdict

nlp = spacy.load("en_core_web_sm")

def detect_passive(text):
    doc = nlp(text)
    passive_sentences = []

    for token in doc:
        #not auxpass bc each passive guaranteed to have nsubjpass but auxpass is just the helper verb (not structural)
        if token.dep_ == "nsubjpass":
            #each token alr knows which sentence it belongs to so js token.sent
            #.text converts back into str
            passive_sentences.append(token.sent.text)

    return passive_sentences

def no_two_sentences_start_with_same_word(text):
    doc = nlp(text)
    starter_dict = defaultdict(list)

    #each sentence is a span object so we can iterate through doc.sents
    for sent in doc.sents:
        first_word = sent[0].text.lower()
        starter_dict[first_word].append(sent.text)

    return starter_dict
        

if __name__ == "__main__":
    text = "the ball was thrown by Maggie. Maggie caught it. Is this passive? Passive was done by this. Passive voice is bad. This is a sentence. This is another sentence."
    print(detect_passive(text))
    print(no_two_sentences_start_with_same_word(text))
import spacy

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

if __name__ == "__main__":
    text = "the ball was thrown by Maggie. Maggie caught it. Is this passive? Passive was done by this."
    print(detect_passive(text))
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

    repeated_starters = {}

    for starter, sentences in starter_dict.items():
        if len(sentences) > 1:
            repeated_starters[starter] = sentences
    
    return repeated_starters

def repetitive_words(text):
    doc = nlp(text)
    repetitive = set()
    sentences = list(doc.sents)
    
    for i, sent in enumerate(sentences):
        start = max(0, i-2)
        end = min(len(sentences), i+3)

        context = sentences[start:end]
        
        context_words = [
            token.lemma_.lower()
            for s in context
            for token in s
            if not token.is_punct and not token.is_stop
        ]

        for word in set(context_words):
            if context_words.count(word) > 1:
                repetitive.add(word)

    return repetitive

def analyze(text):
    feedback = {}
    feedback["passive_sentences"] = detect_passive(text)
    feedback["repeated_starters"] = no_two_sentences_start_with_same_word(text)
    feedback["repetitive_words"] = repetitive_words(text)
    return feedback


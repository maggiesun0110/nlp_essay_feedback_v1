#TODO
#split into different .py files
#organize response into nicer ui
#repeated starters needs to be consecutive or within 2
#is it overlfagging because sometimes it doesn't sound repetiive to humans - make it proportional
#cluster detection?
#add nono words or weak words
import spacy
from collections import defaultdict
from collections import Counter

nlp = spacy.load("en_core_web_sm")

def detect_passive(doc):
    passive_sentences = []

    for sent in doc.sents:
        is_passive = False

        for token in sent:
            #case 1: dependency-based detection
            #not auxpass bc each passive guaranteed to have nsubjpass but auxpass is just the helper verb (not structural)
            if "pass" in token.dep_:
                #each token alr knows which sentence it belongs to so js token.sent
                #.text converts back into str
                is_passive = True
                break

            #case 2: morphology-based detection (be/get + vbn (verb past participle))
            if token.tag_ == "VBN":
                for child in token.children:
                    #.lemma gives base form of word (is = be)
                    if child.lemma_ in{"be", "get"}:
                        is_passive = True
                        break
        
        if is_passive:
            passive_sentences.append(sent.text.strip())

    return passive_sentences

def opening_category(sent):
    tokens = [token for token in sent if not token.is_punct and not token.is_space]

    if not tokens:
        return None
    
    first = tokens[0]

    #sub = subordinating conjunction (after, because, if)
    if first.pos_ == "SCONJ" or first.dep_ == "mark":
        return "subordinatingStart"
    
    #pronoun like I/they
    if first.pos_ == "PRON":
        return "pronounStart"
    
    #determiner like articles
    if first.pos_ == "DET":
        return "nounPhraseStart"
    
    #adverb like however/also/then
    if first.pos_ == "ADV":
        return "adverbStart"
    
    #proper noun or common noun
    if first.pos_ in {"NOUN", "PROPN"}:
        return "bareNounStart"
    
    return "otherStart"


def detect_structure_rep(doc, overuse = 3):

    sentences = [sent for sent in doc.sents]
    cats = [opening_category(sent) for sent in sentences]

    results = {
        "consecutive": [],
        "overused": [],
    }

    #consecutive rep
    for i in range(1, len(cats)):
        if cats[i] and cats[i] == cats[i-1]:
            results["consecutive"].append({
                "category": cats[i],
                "previous_sentence": sentences[i-1].text.strip(),
                "sentence": sentences[i].text.strip()
            })
    
    #global overuse
    #category frequency counts
    counts = Counter([cat for cat in cats if cat])
    #dict of category: list of sentences with same category that is greater than overuse
    buckets = defaultdict(list)

    #check if overuse
    for i, c in enumerate(cats):
        if c and counts[c] >= overuse:
            buckets[c].append(sentences[i].text.strip())

    #add to results
    for c, sents in buckets.items():
        results["overused"].append({
            "category": c,
            "frequency": counts[c],
            "sentences": sents
        })

    return results

def no_two_sentences_start_with_same_word(doc):
    starter_dict = defaultdict(list)

    #each sentence is a span object so we can iterate through doc.sents
    for sent in doc.sents:
        first_word = sent[0].text.lower()
        starter_dict[first_word].append(sent.text.strip())

    repeated_starters = {}

    for starter, sentences in starter_dict.items():
        if len(sentences) > 1:
            repeated_starters[starter] = sentences
    
    return repeated_starters

def repetitive_words(doc):
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
                repetitive.add(word.strip())

    return repetitive

def analyze(text):
    doc = nlp(text)
    feedback = {}
    feedback["passive_sentences"] = detect_passive(doc)
    feedback["repeated_starters"] = no_two_sentences_start_with_same_word(doc)
    feedback["repetitive_words"] = repetitive_words(doc)
    feedback["opening_repetitions"] = detect_structure_rep(doc)
    return feedback


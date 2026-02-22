import spacy

#pretrained english model
#loads tokenizer, part of speech tagger, dependency parser, and named entity recognizer
#nlp = the pipeline object that proccesses text
nlp = spacy.load("en_core_web_sm")

text = "The ball was thrown by Maggie."

#doc is a container for accessing linguistic annotations
#spacy splits tokens, analyzes grammar, builds dep tree, annotates labels
#doc = Doc object
doc = nlp(text)

#ball = nsubjpass (passive nominal subject) --> passive voice bc being acted upon
#was = auxpass (passive auxiliary verb) --> passive
#thrown = ROOT (main verb/center of sentence)
#Maggie = pobj (object of preposition) --> object of by
for token in doc:
    print(token.text, token.dep_)
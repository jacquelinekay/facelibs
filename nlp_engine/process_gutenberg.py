import nltk
import random
from nltk.corpus import gutenberg

num_passages = 10
passagesize = 1000
maxpeople = 10
maxnouns = 5
#ID_str = "#FACELIBS_KEY#"


"""def createID(name):
    return name + ID_str

def removeID(name):
    return name[0:len(name)-len(ID_str)]"""

for textid in gutenberg.fileids()[3:]:
    text = gutenberg.words(textid)

    print "Size of {0}: {1}".format(textid, len(text))
    #Tag parts of speech
    tagged = nltk.pos_tag(text)
    chunked = nltk.chunk.ne_chunk(tagged)
    #Get all PERSON entities
    entities = [entity for entity in chunked if type(entity)==nltk.tree.Tree]
    people = [entity.leaves() for entity in entities if entity.node == 'PERSON']
    #Count occurences of people and sort by frequency
    #If entity[0] is equal, same entity
    people_freqs = {}
    surnames = []
    for person in people:
        if person[0][0] not in surnames:
            #key = createID(person[0][0])
            key = person[0][0]
            try:
                people_freqs[key] += 1
            except KeyError:
                people_freqs[key] = 1
            if len(person) > 1:
                surnames.append(person[1][0])
    #Get the maxpeople most frequent (person, freq) pairs 
    peoplelist = sorted( people_freqs.items(), key=lambda x: x[1] , reverse=True)[0:maxpeople]
    print peoplelist
    peoplekeys = [pair[0] for pair in peoplelist ]
    print peoplekeys
    #TODO: Get most frequent nouns through TF-iDF!
    #Get a chunk of passagesize words
    #Replace instances with their ids
    rawtext = gutenberg.raw(textid).replace('\n', ' ').split(" ")
    print len(rawtext)
    #Generate random list of numbers from 0 to len(rawtext) of size num_passages (without replacement)
    indices = random.sample(range(len(rawtext)-passagesize), num_passages)
    print indices
    k = 0
    a = []
    for i in range(len(peoplekeys)):
        a.append([])
    for j in indices:
        keyindices = dict(zip(peoplekeys,  a) )
        passage = rawtext[j: j+passagesize]
        for i in range(0, passagesize):
            word = passage[i]
            #If a match, store index of word in metadata
            if word in peoplekeys:
                keyindices[word].append(i)
                #meh
            #Do some more stuff
        #TODO: Try to analyze windows of highest density of most frequent characters
        #TODO: remove surnames

        #Write frequencies and skeleton to file
        filename = textid+'_'+str(k) +'_skeleton.txt' 
        f = open(filename, 'w')
        f.write(' '.join(passage) )
        print "Finished writing and processing " + filename
        f.close()
        filename = textid+'_'+str(k) +'_indices.txt'
        f = open(filename, 'w')
        #Write keyindices
        writestr = ''
        for key, vallist in keyindices.items():
            writestr+= key + ' '
            for value in vallist:
                writestr+=str(value) + ' '
            writestr+='\n'
        f.write(writestr)
        f.close()
        k+=1

from nltk.corpus import gutenberg
from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

"""
The purpose of this Flask server is to:
    * Receive the client's request (from script.js),which is:
         * A list of names
         * Additional items, such as interests might be added later
    * Send the client's request to nltk
    * Reply to script.js with story that includes the friends' names
    ? Probably not necessary or needed to render_template (can easily be done in js)
"""


@app.route('/')
def receive():
	intext = request.args.get('facelibs-request')
	return tracker.pick_match_skeleton(intext)

"""
# TO BE DELETED
##############################################################
# loads entracted passages
# eventually, its functionality will pull from the database
class DataTracker():
    def __init__(self):
        self.num_passages = 10
        self.passagesize = 1000
        self.maxpeople = 10
        self.maxnouns = 5
        self.total_passages = 10*len(gutenberg.fileids())

        self.skeletons = []
        self.index_dicts = []
        #Load all of the things into memory
        #j = 0
        for fileid in gutenberg.fileids():
            for k in range(self.num_passages):
                filename = fileid+'_'+str(k) +'_skeleton.txt' 
                f = open(filename, 'r')
                self.skeletons.append(f.read().split(" ")) 
                f.close()
                filename = fileid+'_'+str(k) +'_indices.txt'
                f = open(filename, 'r')
                self.index_dicts.append({}) 
                for line in f.readlines():
                    splitted = line.split()
                    self.index_dicts[-1][splitted[0]] = splitted[1:]
                f.close()
                #j+=1

    # intext = names
    # i randomly pick a passage
    # this will need to go
    def pick_match_skeletons(self, intext):
        #pick a random number
        i = random.randint(0, total_passages-1)
        #parse intext
        #Assuming we get innames in as a list, not as JSON
        #Assume names are in order of descending frequency
        names = intext.split(" ")
        #match with index
        outtext = copy.deepcopy(self.skeletons[i]) #check syntax
        for key, vallist in self.index_dicts[i]:
            for index in vallist:
                outtext[index] = key
        return outtext

tracker = DataTracker()
##############################################################
"""

if __name__ =='__main__':
	app.run()

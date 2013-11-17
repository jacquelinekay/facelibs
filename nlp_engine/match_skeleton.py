#Input from client side shit: some number of names, in order of frequency
#Choose and match a rando passage
#There will be 10 passages per text
#indices.txt holds a guide to matching the things
#passage.txt holds the skeleton
import BaseHTTPServer, copy
from sys import argv
from SimpleHTTPServer import SimpleHTTPRequestHandler
from nltk.corpus import gutenberg
import random

class FaceLibsHandler(BaseHTTPServer.BaseHTTPRequestHandler):
   
    def __init__(self):
        super().__init__()
        self.num_passages = 10
        self.passagesize = 1000
        self.maxpeople = 10
        self.maxnouns = 5
        self.total_passages = 10*len(gutenberg.fileids())

        self.skeletons = []
        self.index_dicts = []
        #Load all of the things into memory
        j = 0
        for fileid in gutenberg.fileids():
            for i in range(self.num_passages):
                filename = textid+'_'+str(k) +'_skeleton.txt' 
                f = open(filename, 'r')
                self.skeletons[j] = f.split(" ")
                f.close()
                filename = textid+'_'+str(k) +'_indices.txt'
                f = open(filename, 'r')
                self.index_dicts[j] = {}
                for line in f.readlines():
                    splitted = line.split()
                    self.index_dicts[j][splitted[0]] = splitted[1:]
                f.close()
                j+=1

    def do_GET(s):
        intext = s.headers('facelibs-request')
        outtext = self.pick_match_skeleton(intext)
        s.send_response(200)
        s.send_header("Content-type", "text")
        s.end_headers()
        print "Sending outtext: " + outtext
        s.wfile.write(outtext)

    def pick_match_skeletons(self, intext):
        #pick a random number
        i = random.randint(0, total_passages-1)
        #parse intext
        #Assuming we get innames in as a list, not as JSON
        #Assume names are in order of descending frequency
        names = intext.split("/")
        #match with index
        outtext = copy.deepcopy(self.skeletons[i]) #check syntax
        for key, vallist in self.index_dicts[i]:
            for index in vallist:
                outtext[index] = key
        return outtext


HandlerClass = FaceLibsHandler
ServerClass  = BaseHTTPServer.HTTPServer
Protocol     = "HTTP/1.0"

if argv[1:]:
    port = int(argv[1])
else:
    port = 80

#NOT SURE IF THIS WORKS LOL
server_address = ('127.0.0.1', port)
HandlerClass.protocol_version = Protocol
httpd = ServerClass(server_address, HandlerClass)

sa = httpd.socket.getsockname()

print "Serving HTTP on", sa[0], "port", sa[1], "..."
httpd.serve_forever()

#Receive client requests

#Match some things

#Send back client request

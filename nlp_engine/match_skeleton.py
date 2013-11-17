#Input from client side shit: some number of names, in order of frequency
#Choose and match a rando passage
#There will be 10 passages per text
#indices.txt holds a guide to matching the things
#passage.txt holds the skeleton
#import BaseHTTPServer, copy
#from sys import argv
#from SimpleHTTPServer import SimpleHTTPRequestHandler

import cherrypy
from nltk.corpus import gutenberg
import random

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

class FaceLibsServer(object):
    def _get_skeleton(self):
        global tracker;
        req = cherrypy.request.headers['facelibs-request']
        return tracker.pick_match_skeletons(req);

    def index(self):
        cherrypy.response.headers['Content-type'] = 'text'
        return self.get_skeleton()
    index.exposed=True

"""
class FaceLibsHandler(BaseHTTPServer.BaseHTTPRequestHandler):

    def do_GET(s):
        global tracker
        #intext = s.rfile.read()
        print "Got GET"
        intext = s.headers('facelibs-request')
        outtext = tracker.pick_match_skeleton(intext)
        s.send_response(200)
        s.send_header("Content-type", "text")
        s.end_headers()
        print "Sending outtext: " + outtext
        s.wfile.write(outtext)
        print s
        return

tracker = DataTracker()

HandlerClass = FaceLibsHandler
ServerClass  = BaseHTTPServer.HTTPServer
Protocol     = "HTTP/1.0"

if argv[1:]:
    port = int(argv[1])
else:
    port = 80

#NOT SURE IF THIS WORKS LOL
server_address = ('localhost', port)
HandlerClass.protocol_version = Protocol
httpd = ServerClass(server_address, HandlerClass)

sa = httpd.socket.getsockname()

print "Serving HTTP on", sa[0], "port", sa[1], "..."
httpd.serve_forever()"""

#Receive client requests

#Match some things

#Send back client request

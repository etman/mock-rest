
import logging
import webapp2
from webapp2_extras import json
from google.appengine.ext import ndb
from MocksApi import MockProfile


class MockRuntimeHandler(webapp2.RequestHandler):

    def processRequest(self, subdomain, mockPath):
        logging.info("[Incoming URL] %s with subdomain '%s' and mockPath '%s'" % (self.request.path_url, subdomain, mockPath))
        profiles = MockProfile.query_by_space("ocm")
        mockProfile = ([x for x in profiles if self.isInMatchWithMock(x, mockPath)][:1] or [None])[0]
        logging.info("mock mapped=>%s" % mockProfile)
        
        if not mockProfile:
            self.response.status = '404 Not Found'
            return

        self.response.status = mockProfile.content["response"]["status"]
        for key, value in mockProfile.content["headers"].iteritems():
            headerName = str(key.replace("_", "-"))
            headerValue = str(value)
            if headerName.lower() == "content-type":
                self.response.content_type = headerValue
            elif headerName.lower() == "content-encoding":
                self.response.charset = headerValue
            else:
                self.response.headers.add(headerName, headerValue)
        
        logging.info(self.response.headers)
        self.response.write(mockProfile.content["response"]["body"])
        

    def isInMatchWithMock(self, mockProfile, mockPath):
        c = mockProfile.content
        if not c["path"] == mockPath: return False
        if not c["verb"] == self.request.method: return False
        return True

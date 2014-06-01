
import logging
import webapp2
from webapp2_extras import json
from google.appengine.ext import ndb
from MocksApi import MockProfile


class MockRuntimeHandler(webapp2.RequestHandler):

    def processRequest(self, subdomain, mockPath):
        logging.info("[Incoming URL] %s with subdomain '%s' and mockPath '%s'" % (self.request.path_url, subdomain, mockPath))
        profiles = MockProfile.query_by_space("ocm")
        for p in profiles:
            logging.info(p.content)
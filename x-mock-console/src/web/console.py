'''
Created on May 31, 2014

@author: tim
'''

import os

import webapp2
from webapp2_extras import routes
from google.appengine.ext.webapp import template

from SpacesApi import SpacesApi

from MocksApi import MocksApi
from MockRuntime import MockRuntimeHandler

class MainPage(webapp2.RequestHandler):
    def get(self):
        #self.response.headers['Content-Type'] = 'text/plain'
        #self.response.write('Hello, World!  ')

        template_values = {
        }

        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, template_values))

application = webapp2.WSGIApplication([
    routes.DomainRoute('<subdomain>.mock-rest.appspot.com', [
        webapp2.Route('/<mockPath:.*>', handler=MockRuntimeHandler, handler_method="processRequest", name='subdomain-home'),
    ]),
    webapp2.Route('/', handler=MainPage, name='home'),
    webapp2.Route('/api/spaces/<spaceName>', handler=MocksApi, name='api'),
    webapp2.Route('/api/spaces', handler=SpacesApi, name='api'),
], debug=True)

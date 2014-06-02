'''
Created on May 31, 2014

@author: tim
'''

import os

import webapp2
from webapp2_extras import routes
import jinja2

from SpacesApi import SpacesApi

from MocksApi import MocksApi
from MockRuntime import MockRuntimeHandler


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        #self.response.headers['Content-Type'] = 'text/plain'
        #self.response.write('Hello, World!  ')

        template_values = {
        }

        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render(template_values))

application = webapp2.WSGIApplication([
    routes.DomainRoute('<subdomain>.eco-muse-597.appspot.com', [
        webapp2.Route('/<mockPath:.*>', handler=MockRuntimeHandler, handler_method="processRequest", name='subdomain-home'),
    ]),
    webapp2.Route('/', handler=MainPage, name='home'),
    webapp2.Route('/api/mocks', handler=MocksApi, name='api'),
    webapp2.Route('/api/spaces', handler=SpacesApi, name='api'),
], debug=True)

'''
Created on May 31, 2014

@author: tim
'''

import os

import webapp2
import jinja2
import MocksApi


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        #self.response.headers['Content-Type'] = 'text/plain'
        #self.response.write('Hello, World!  ')

        template_values = {
            'greetings': "hello"
        }

        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render(template_values))


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/api/mocks', MocksApi.MocksApi),
], debug=True)

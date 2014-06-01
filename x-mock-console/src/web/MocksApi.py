
import logging
import webapp2
from webapp2_extras import json
from google.appengine.ext import ndb

class MockProfile(ndb.Model):
    content = ndb.JsonProperty()
    date = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def all(cls):
        return cls.query().order(-cls.date)

class MocksApi(webapp2.RequestHandler):
    def post(self):
        logging.debug(self.request.body)
        profile = json.decode(self.request.body)
        mockData = MockProfile(parent=ndb.Key("mockProfiles", profile["displayName"]),
                               content = profile)
        mockData.put()

    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.encode([self.wrapResponse(x) for x in MockProfile.all()]))

    @classmethod
    def wrapResponse(self, profile):
        profile.content["last-modified"] = profile.date.strftime('%s')
        return profile.content
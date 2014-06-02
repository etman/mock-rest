
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

    @classmethod
    def query_by_space(cls, space):
        key = ndb.Key("spaces", space)
        return cls.query(ancestor=key).order(-cls.date)

class MocksApi(webapp2.RequestHandler):
    def post(self, spaceName):
        logging.debug(self.request.body)
        profile = json.decode(self.request.body)

        parentKey = ndb.Key("spaces", spaceName)
        profileKey = ndb.Key("MockProfile", profile["displayName"], parent=parentKey)

        mockData = MockProfile(key = profileKey)
        mockData.content = profile
        newKey = mockData.put()
        logging.info("Model Key=%s" % newKey)

    def delete(self, spaceName):
        ndb.delete_multi([x.key for x in MockProfile.query()])

    def get(self, spaceName):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.encode([self.wrapResponse(x) for x in MockProfile.query_by_space(spaceName)]))

    @classmethod
    def wrapResponse(self, profile):
        profile.content["lastModified"] = profile.date.strftime('%s')
        return profile.content

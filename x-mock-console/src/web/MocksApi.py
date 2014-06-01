
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

        parentKey = ndb.Key("accounts", "tim")

        mockData = MockProfile.get_by_id(profile["id"], parentKey) if "id" in profile else MockProfile(parent=parentKey)
        mockData.content = profile
        newKey = mockData.put()
        logging.info("Model Key=%s" % newKey)

    def delete(self):
        ndb.delete_multi([x.key for x in MockProfile.query()])

    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.encode([self.wrapResponse(x) for x in MockProfile.all()]))

    @classmethod
    def wrapResponse(self, profile):
        profile.content["id"] = profile.key.id()
        profile.content["last-modified"] = profile.date.strftime('%s')
        return profile.content

import logging
import webapp2
from webapp2_extras import json
from google.appengine.ext import ndb

class SpaceProfile(ndb.Model):
    content = ndb.JsonProperty()
    date = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def all(cls):
        return cls.query().order(-cls.date)

class SpacesApi(webapp2.RequestHandler):
    def post(self):
        logging.debug(self.request.body)
        profile = json.decode(self.request.body)

        profileKey = ndb.Key("SpaceProfile", profile["displayName"])

        newProfile = SpaceProfile(key = profileKey)
        newProfile.content = profile
        newKey = newProfile.put()
        logging.info("[Saved] Space Key=%s" % newKey)

    def delete(self):
        ndb.delete_multi([x.key for x in SpaceProfile.query()])

    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.encode([self.wrapResponse(x) for x in SpaceProfile.all()]))

    @classmethod
    def wrapResponse(self, profile):
        profile.content["lastModified"] = profile.date.strftime('%s')
        return profile.content

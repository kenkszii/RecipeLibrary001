from decouple import config
import os 

BASE_DIR =os.path.dirname(os.path.realpath(__file__))

class config:
  SECRET_KEY=config("SECRET_KEY")
  SQLALCHEMY_TRACK_MODIFICATION=config('SQLALCHEMY_TRACK_MODIFICATION', cast=bool)

  
class DevConfig(config):
  SQLALCHEMY_DATABASE_URI= "sqlite:///"+os.path.join(BASE_DIR,'dev.db')
  DEBUG=True
  SQLALCHEMY_ECHO=True


class ProdConfig(config):
  pass


class TestConfig(config):
  SQLALCHEMY_DATABASE_URI="sqlite:///test.db"
  SQLALCHEMY_ECHO=False
  TESTING=True

import pymongo

url = 'mongodb+srv://Bango:HealthApplicationDatabase@healthdatabase.vfckkcz.mongodb.net/?retryWrites=true&w=majority'
client = pymongo.MongoClient(url)

db = client['users']
db2 = client['responses']
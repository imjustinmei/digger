from datetime import date, timedelta
import random
import json

delta = timedelta(days=1)
start = date.today()
end = date(start.year + 1, 1, 1)

wins = {}


def randSquare():
    return str(random.randint(0, 3)) + "," + str(random.randint(0, 3))


while start < end:
    wins[start.strftime("%d/%m/%Y")] = randSquare()
    start += delta


file = open('js/win.js', 'w')
file.write("const wins = " + json.dumps(wins))

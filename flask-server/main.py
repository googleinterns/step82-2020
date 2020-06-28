from flask import (Flask, render_template)

app = Flask(__name__, template_folder='static/react')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  return render_template("index.html")

app.run(debug=True)

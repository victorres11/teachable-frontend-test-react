import os
import logging.config
from flask import Flask, request, jsonify, render_template, make_response
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__, static_folder="../dist", template_folder="../app/templates")
CORS(app)

logging.config.fileConfig('config.ini')


@app.route('/')
def index():
    print 'hello'
    return render_template('index.html')

@app.route('/gem_search')
def gem_search():
    gem_to_search = request.args.get('gem_to_search')
    results = requests.get('https://rubygems.org/api/v1/gems/{}.json'.format(gem_to_search))

    if results.status_code == 404:
        return make_response(jsonify(results.content), 404)

    return results.content

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

from flask import Flask, request
from email_module import send_activation_link, send_contact_response

app = Flask(__name__)


@app.route('/')
def index():
    email = request.args.get('email')
    token = request.args.get('token')

    return str(send_activation_link(email, token))


@app.route('/contact')
def contact():
    email = request.args.get('email')
    question = request.args.get('question')
    answer = request.args.get('answer')

    return str(send_contact_response(email, question, answer))


if __name__ == "__main__":
    app.run(host="0.0.0.0")

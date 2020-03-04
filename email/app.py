from flask import Flask, request
from email_module import send_activation_link

app = Flask(__name__)


@app.route('/')
def index():
    email = request.args.get('email')
    token = request.args.get('token')

    return str(send_activation_link(email, token))


if __name__ == "__main__":
    app.run(host="0.0.0.0")

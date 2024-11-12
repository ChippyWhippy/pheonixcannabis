from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import secrets

app = Flask(__name__)

# Secret key for session management
app.config['SECRET_KEY'] = secrets.token_hex(24)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///strain_data.db'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
db = SQLAlchemy(app)

# Database models (Strain, User, etc.)
class Strain(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    stage = db.Column(db.String(100), nullable=False)
    days_in_stage = db.Column(db.Integer, default=0)
    estimated_harvest = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return f"<Strain {self.name}>"

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # This will create the database tables if they don't exist
    app.run(debug=True)

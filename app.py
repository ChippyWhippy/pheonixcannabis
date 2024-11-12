from flask import Flask, render_template, redirect, url_for, request, session, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

app = Flask(__name__)

# Secret key for session management
app.config['SECRET_KEY'] = secrets.token_hex(24)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///strain_data.db'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
db = SQLAlchemy(app)

# Database models
class Strain(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    stage = db.Column(db.String(100), nullable=False)
    days_in_stage = db.Column(db.Integer, default=0)
    estimated_harvest = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return f"<Strain {self.name}>"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)  # Storing the hashed password

    def set_password(self, password):
        """Hashes the password before storing it."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks if the password matches the hash."""
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username}>"

# Route to login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Check if the username exists
        admin = User.query.filter_by(username=username).first()
        
        if admin and admin.check_password(password):  # Use the hashed password check
            session['admin_logged_in'] = True  # Set session variable to remember the login state
            flash("You are now logged in!", 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash("Invalid credentials. Please try again.", 'danger')

    return render_template('login.html')

# Admin dashboard (protected route)
@app.route('/admin')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('login'))
    
    strains = Strain.query.all()  # Get all strains from the database
    return render_template('admin_dashboard.html', strains=strains)

# Logout
@app.route('/logout')
def logout():
    session.pop('admin_logged_in', None)  # Remove the session variable to log out
    flash("You have been logged out.", 'info')
    return redirect(url_for('home'))

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(debug=True)

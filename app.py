from flask import Flask, render_template, request, redirect, session, url_for
from functools import wraps

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Secret key to handle sessions

# Admin credentials (store in DB or environment variables in production)
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'password123'

# Decorator to require login for certain views (like editing)
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))  # Redirect to login if not authenticated
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Check if the credentials match
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['logged_in'] = True  # User is logged in
            return redirect(url_for('home'))  # Redirect back to the main page
        else:
            return "Invalid credentials. Please try again."
    
    return render_template('login.html')  # Render login form if GET request

@app.route('/logout')
def logout():
    session.pop('logged_in', None)  # Remove the logged-in session
    return redirect(url_for('home'))  # Redirect to homepage after logout

@app.route('/edit')  # Protect this route with login_required
@login_required
def edit():
    return render_template('edit_table.html')  # Render the edit page

if __name__ == '__main__':
    app.run(debug=True)
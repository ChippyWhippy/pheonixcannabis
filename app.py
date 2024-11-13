from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/edit')  # You can leave this route as is if it’s meant to be accessed freely
def edit():
    return render_template('edit_table.html')  # Render the edit page

if __name__ == '__main__':
    app.run(debug=True)

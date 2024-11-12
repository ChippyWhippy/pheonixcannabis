from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Strain(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    stage = db.Column(db.String(50), nullable=False)
    estimated_harvest = db.Column(db.Date, nullable=False)
    days_in_stage = db.Column(db.Integer, default=0)

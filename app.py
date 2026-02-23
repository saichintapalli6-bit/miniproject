from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import math
import sys
import os

if getattr(sys, 'frozen', False):
    template_folder = os.path.join(sys._MEIPASS, 'templates')
    app = Flask(__name__, template_folder=template_folder)
    application_path = os.path.dirname(sys.executable)
else:
    app = Flask(__name__)
    application_path = os.path.dirname(os.path.abspath(__file__))

app.config['SECRET_KEY'] = 'your-secret-key-change-in-production-xyz123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(application_path, 'landprice.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    searches = db.relationship('SearchHistory', backref='user', lazy=True)

class SearchHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    state = db.Column(db.String(100))
    city = db.Column(db.String(100))
    sqft = db.Column(db.Float)
    main_road_distance = db.Column(db.Float)
    soil_type = db.Column(db.String(50))
    water_level = db.Column(db.Float)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    predicted_price = db.Column(db.Float)
    price_per_sqft = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Initialize database and create admin user
with app.app_context():
    db.create_all()
    admin = User.query.filter_by(email='admin@landprice.com').first()
    if not admin:
        admin = User(name='Admin User', email='admin@landprice.com',
                    password=generate_password_hash('admin123'), role='admin')
        db.session.add(admin)
        db.session.commit()
        print("✅ Database initialized!")
        print("🔐 Admin credentials: admin@landprice.com / admin123")

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371
    lat1_rad, lat2_rad = math.radians(lat1), math.radians(lat2)
    delta_lat, delta_lon = math.radians(lat2 - lat1), math.radians(lon2 - lon1)
    a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

@app.route('/')
def index():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user and user.role == 'admin':
            return redirect(url_for('admin_dashboard'))
        return redirect(url_for('user_dashboard'))
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json

    # Block admin registration - security feature
    if data.get('role') == 'admin':
        return jsonify({'success': False, 'message': 'Admin registration is not allowed'})

    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'Email already registered'})

    # Create user (always as 'user' role for security)
    user = User(
        name=data['name'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        role='user'  # Force user role
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Registration successful'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], role=data['role']).first()
    if user and check_password_hash(user.password, data['password']):
        session['user_id'], session['user_name'], session['user_role'] = user.id, user.name, user.role
        return jsonify({'success': True, 'role': user.role})
    return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/user/dashboard')
def user_dashboard():
    if 'user_id' not in session or session['user_role'] != 'user':
        return redirect(url_for('index'))
    return render_template('user_dashboard.html', user_name=session['user_name'])

@app.route('/admin/dashboard')
def admin_dashboard():
    if 'user_id' not in session or session['user_role'] != 'admin':
        return redirect(url_for('index'))
    return render_template('admin_dashboard.html', admin_name=session['user_name'])

@app.route('/predict', methods=['POST'])
def predict():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Please login first'})

    data = request.json
    base_prices = {'Andhra Pradesh': 3800, 'Maharashtra': 5500, 'Karnataka': 4800,
                   'Tamil Nadu': 4200, 'Telangana': 4500, 'Gujarat': 3800,
                   'Rajasthan': 2800, 'Uttar Pradesh': 3200, 'West Bengal': 3500,
                   'Kerala': 4000, 'Madhya Pradesh': 2500}

    city_data = {
        'Visakhapatnam': {'lat': 17.6868, 'lng': 83.2185, 'premium': 1.3},
        'Vijayawada': {'lat': 16.5062, 'lng': 80.6480, 'premium': 1.25},
        'Guntur': {'lat': 16.3067, 'lng': 80.4365, 'premium': 1.15},
        'Tirupati': {'lat': 13.6288, 'lng': 79.4192, 'premium': 1.2},
        'Kakinada': {'lat': 16.9891, 'lng': 82.2475, 'premium': 1.1},
        'Nellore': {'lat': 14.4426, 'lng': 79.9865, 'premium': 1.1},
        'Mumbai': {'lat': 19.0760, 'lng': 72.8777, 'premium': 1.8},
        'Pune': {'lat': 18.5204, 'lng': 73.8567, 'premium': 1.5},
        'Bangalore': {'lat': 12.9716, 'lng': 77.5946, 'premium': 1.6},
        'Hyderabad': {'lat': 17.3850, 'lng': 78.4867, 'premium': 1.5},
        'Chennai': {'lat': 13.0827, 'lng': 80.2707, 'premium': 1.5}
    }

    base_price = base_prices.get(data['state'], 3000)
    road_dist = float(data['mainRoadDistance'])
    distance_factor = 1.3 if road_dist < 0.5 else (1.15 if road_dist < 1 else (1.0 if road_dist < 2 else 0.85))

    soil_factors = {'Alluvial': 1.25, 'Black': 1.20, 'Red': 1.0, 'Laterite': 0.9, 'Desert': 0.7, 'Mountain': 0.75}
    soil_factor = soil_factors.get(data['soilType'], 1.0)

    water_level = float(data['waterLevel'])
    water_factor = 1.3 if water_level < 50 else (1.2 if water_level < 100 else (1.1 if water_level < 200 else 1.0))

    city_premium = city_data.get(data['city'], {}).get('premium', 1.0)

    location_factor = 1.0
    if data['city'] in city_data:
        try:
            dist = haversine_distance(city_data[data['city']]['lat'], city_data[data['city']]['lng'],
                                     float(data['latitude']), float(data['longitude']))
            location_factor = 1.5 if dist < 5 else (1.3 if dist < 10 else (1.1 if dist < 20 else 0.8))
        except:
            pass

    price_per_sqft = int(base_price * distance_factor * soil_factor * water_factor * city_premium * location_factor)
    total_price = price_per_sqft * float(data['sqft'])

    search = SearchHistory(user_id=session['user_id'], state=data['state'], city=data['city'],
                          sqft=float(data['sqft']), main_road_distance=float(data['mainRoadDistance']),
                          soil_type=data['soilType'], water_level=float(data['waterLevel']),
                          latitude=float(data.get('latitude', 0)), longitude=float(data.get('longitude', 0)),
                          predicted_price=total_price, price_per_sqft=price_per_sqft)
    db.session.add(search)
    db.session.commit()

    return jsonify({'success': True, 'predictedPrice': int(total_price), 'pricePerSqft': price_per_sqft})

@app.route('/admin/stats')
def admin_stats():
    if 'user_id' not in session or session['user_role'] != 'admin':
        return jsonify({'success': False})
    users = User.query.filter_by(role='user').all()
    searches = SearchHistory.query.all()
    avg_price = sum([s.price_per_sqft for s in searches]) / len(searches) if searches else 3500
    return jsonify({'totalUsers': len(users), 'totalSearches': len(searches),
                   'avgPrice': int(avg_price), 'activeToday': len(users)})

@app.route('/admin/users')
def admin_users():
    if 'user_id' not in session or session['user_role'] != 'admin':
        return jsonify({'success': False})
    users = User.query.filter_by(role='user').all()
    return jsonify({'users': [{'name': u.name, 'email': u.email, 'role': u.role,
                               'regDate': u.registration_date.strftime('%Y-%m-%d'),
                               'searches': len(u.searches)} for u in users]})

@app.route('/admin/history')
def admin_history():
    if 'user_id' not in session or session['user_role'] != 'admin':
        return jsonify({'success': False})
    searches = SearchHistory.query.order_by(SearchHistory.timestamp.desc()).limit(100).all()
    return jsonify({'history': [{'userName': s.user.name, 'state': s.state, 'city': s.city,
                                 'sqft': s.sqft, 'predictedPrice': int(s.predicted_price),
                                 'pricePerSqft': int(s.price_per_sqft),
                                 'timestamp': s.timestamp.strftime('%Y-%m-%d %H:%M')} for s in searches]})

@app.route('/admin/price-comparison')
def price_comparison():
    if 'user_id' not in session or session['user_role'] != 'admin':
        return jsonify({'success': False})
    return jsonify({'comparison': {
        'years': [2021, 2022, 2023, 2024],
        'states': {
            'Andhra Pradesh': [3200, 3400, 3600, 3800],
            'Maharashtra': [4800, 5000, 5200, 5500],
            'Karnataka': [4200, 4400, 4600, 4800],
            'Tamil Nadu': [3800, 3950, 4100, 4200],
            'Telangana': [4000, 4200, 4350, 4500]
        }
    }})

# Admin User Management Routes
@app.route('/admin/edit-user', methods=['POST'])
def edit_user():
    if 'user_id' not in session or session['user_role'] != 'admin':
        return jsonify({'success': False, 'message': 'Unauthorized'})

    data = request.json
    user = User.query.filter_by(email=data['oldEmail']).first()

    if not user:
        return jsonify({'success': False, 'message': 'User not found'})

    # Check if new email already exists (if email is being changed)
    if data['newEmail'] != data['oldEmail']:
        existing = User.query.filter_by(email=data['newEmail']).first()
        if existing:
            return jsonify({'success': False, 'message': 'Email already in use'})

    user.name = data['newName']
    user.email = data['newEmail']
    db.session.commit()

    return jsonify({'success': True, 'message': 'User updated successfully'})

@app.route('/admin/delete-user', methods=['POST'])
def delete_user():
    if 'user_id' not in session or session['user_role'] != 'admin':
        return jsonify({'success': False, 'message': 'Unauthorized'})

    data = request.json
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'success': False, 'message': 'User not found'})

    if user.role == 'admin':
        return jsonify({'success': False, 'message': 'Cannot delete admin user'})

    # Delete user's search history first
    SearchHistory.query.filter_by(user_id=user.id).delete()

    # Delete user
    db.session.delete(user)
    db.session.commit()

    return jsonify({'success': True, 'message': 'User deleted successfully'})

import webbrowser
import threading

def open_browser():
    webbrowser.open_new('http://localhost:5000/')

if __name__ == '__main__':
    print("=" * 50)
    print("🚀 Land Price Prediction System Started!")
    print("=" * 50)
    print("📍 Open browser: http://localhost:5000")
    print("👤 Login page auto-detects user/admin role")
    print("🔐 Admin: admin@landprice.com / admin123")
    print("=" * 50)
    
    if getattr(sys, 'frozen', False):
        threading.Timer(1.5, open_browser).start()
        app.run(debug=False, host='0.0.0.0', port=5000)
    else:
        app.run(debug=True, host='0.0.0.0', port=5000)

import sys
import os
sys.path.append(os.getcwd())
from database import SessionLocal
from models import User

db = SessionLocal()
try:
    user = db.query(User).filter(User.username == "admin").first()
    if user:
        print(f"User found: {user.username}")
        print(f"Hashed password: {user.hashed_password}")
    else:
        print("Admin user not found.")
finally:
    db.close()

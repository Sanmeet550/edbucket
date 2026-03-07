import sys
import os
sys.path.append(os.getcwd())
from database import SessionLocal
import crud
import schemas
from datetime import timedelta
from jose import jwt
from main import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token

def test_login():
    db = SessionLocal()
    try:
        username = "admin"
        password = "password123"
        print(f"Attempting login for: {username}")
        
        user = crud.get_user_by_username(db, username=username)
        if not user:
            print("User not found")
            return
            
        print(f"User found, hashed_password: {user.hashed_password}")
        
        try:
            is_valid = crud.verify_password(password, user.hashed_password)
            print(f"Password verification result: {is_valid}")
        except Exception as e:
            print(f"Error during verify_password: {e}")
            import traceback
            traceback.print_exc()
            return

        if not is_valid:
            print("Invalid password")
            return
            
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        print(f"Access token generated: {access_token}")
        
        response = {"access_token": access_token, "token_type": "bearer"}
        token_obj = schemas.Token(**response)
        print(f"Schema validation successful: {token_obj}")
        
    finally:
        db.close()

if __name__ == "__main__":
    test_login()

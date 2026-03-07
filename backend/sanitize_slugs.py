import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def sanitize_slugs():
    print("Connecting to database...")
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        # Update slugs: trim whitespace, lowercase, and replace spaces with hyphens
        print("Sanitizing university slugs...")
        cur.execute("""
            UPDATE universities 
            SET slug = LOWER(TRIM(REPLACE(name, ' ', '-')))
            WHERE slug IS NULL OR slug = '' OR slug != LOWER(TRIM(REPLACE(name, ' ', '-')));
        """)
        
        print(f"Updated {cur.rowcount} rows.")
        conn.commit()

        cur.close()
        conn.close()
        print("Sanitization completed successfully.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    sanitize_slugs()

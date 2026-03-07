import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def apply_migrations():
    print("Connecting to database...")
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    columns_to_add = [
        ("website_url", "VARCHAR"),
        ("student_diversity_text", "VARCHAR"),
        ("why_choose_1_title", "VARCHAR"),
        ("why_choose_1_text", "TEXT"),
        ("why_choose_2_title", "VARCHAR"),
        ("why_choose_2_text", "TEXT")
    ]

    print("Checking for missing columns in universities table...")
    for col_name, col_type in columns_to_add:
        try:
            print(f"Adding '{col_name}' column if not exists...")
            cur.execute(f"ALTER TABLE universities ADD COLUMN IF NOT EXISTS {col_name} {col_type};")
        except Exception as e:
            print(f"Error adding {col_name}: {e}")
            conn.rollback()
        else:
            conn.commit()

    print("Migration completed successfully.")
    cur.close()
    conn.close()

if __name__ == "__main__":
    apply_migrations()

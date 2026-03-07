import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/edbucket_db")
engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        print("Checking for missing columns in universities table...")
        
        # Check if slug column exists
        result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='universities' AND column_name='slug'"))
        if not result.fetchone():
            print("Adding 'slug' column...")
            conn.execute(text("ALTER TABLE universities ADD COLUMN slug VARCHAR"))
            # Make it unique and indexed
            # We skip unique constraint here if there's existing data with nulls, 
            # but seed logic will fill it.
            conn.execute(text("CREATE INDEX ix_universities_slug ON universities (slug)"))
        
        cols = {
            "banner_url": "VARCHAR",
            "full_description": "TEXT",
            "courses_offered": "TEXT",
            "intake_details": "VARCHAR",
            "location": "VARCHAR"
        }
        
        for col, col_type in cols.items():
            result = conn.execute(text(f"SELECT column_name FROM information_schema.columns WHERE table_name='universities' AND column_name='{col}'"))
            if not result.fetchone():
                print(f"Adding '{col}' column...")
                conn.execute(text(f"ALTER TABLE universities ADD COLUMN {col} {col_type}"))
        
        conn.commit()
        print("Migration completed successfully.")
except Exception as e:
    print(f"Migration failed: {e}")

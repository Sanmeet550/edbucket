from sqlalchemy import create_url, inspect
from database import engine

def check_columns():
    inspector = inspect(engine)
    columns = inspector.get_columns("universities")
    print("Columns in 'universities' table:")
    for column in columns:
        print(f"- {column['name']}: {column['type']}")

if __name__ == "__main__":
    try:
        check_columns()
    except Exception as e:
        print(f"Error: {e}")

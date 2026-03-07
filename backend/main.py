from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import crud, models, schemas, shutil, os
from database import engine, get_db

SECRET_KEY = "SUPER_SECRET_KEY_FOR_EDBUCKET" # In production, use environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 hours

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="EdBucket B2B API")

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- PUBLIC ROUTES ---

@app.get("/api/countries", response_model=List[schemas.Country])
def read_countries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    countries = crud.get_countries(db, skip=skip, limit=limit)
    return countries

@app.get("/api/countries/{slug}", response_model=schemas.Country)
def read_country(slug: str, db: Session = Depends(get_db)):
    db_country = crud.get_country_by_slug(db, slug=slug)
    if db_country is None:
        raise HTTPException(status_code=404, detail="Country not found")
    return db_country

@app.post("/api/applications", response_model=schemas.Application)
def create_application(application: schemas.ApplicationCreate, db: Session = Depends(get_db)):
    return crud.create_application(db=db, application=application)

@app.post("/api/consultations", response_model=schemas.ConsultationRequest)
def create_consultation(request: schemas.ConsultationRequestCreate, db: Session = Depends(get_db)):
    return crud.create_consultation_request(db=db, request=request)

# --- UNIVERSITY ROUTES ---

@app.get("/api/universities", response_model=List[schemas.University])
def read_universities(
    skip: int = 0, 
    limit: int = 100, 
    country_id: UUID = None, 
    search: str = None, 
    db: Session = Depends(get_db)
):
    try:
        unis = crud.get_universities(db, skip=skip, limit=limit, country_id=country_id, search=search)
        # Ensure all universities have a slug (fallback for existing data)
        for uni in unis:
            if not uni.slug:
                uni.slug = uni.name.lower().replace(" ", "-")
        return unis
    except Exception as e:
        import traceback
        error_msg = f"Error reading universities: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/universities/countries", response_model=List[schemas.Country])
def read_university_countries(db: Session = Depends(get_db)):
    return crud.get_active_countries_from_universities(db)

@app.get("/api/universities/{slug}", response_model=schemas.University)
def read_university_by_slug(slug: str, db: Session = Depends(get_db)):
    db_university = crud.get_university_by_slug(db, slug=slug)
    if db_university is None:
        raise HTTPException(status_code=404, detail="University not found")
    return db_university

# --- AUTH ROUTES ---

@app.post("/api/auth/login", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not crud.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# --- ADMIN ROUTES ---

@app.post("/api/admin/upload-image")
async def upload_image(file: UploadFile = File(...), prefix: str = "img", current_user: models.User = Depends(get_current_user)):
    try:
        # Generate clean filename with timestamp to avoid collisions
        file_ext = os.path.splitext(file.filename)[1]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{prefix}_{timestamp}{file_ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return {"image_url": f"http://localhost:8000/uploads/{filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.get("/api/admin/countries", response_model=List[schemas.Country])
def admin_read_countries(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.get_countries(db)

@app.post("/api/admin/countries", response_model=schemas.Country)
def admin_create_country(country: schemas.CountryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.create_country(db=db, country=country)

@app.put("/api/admin/countries/{country_id}", response_model=schemas.Country)
def admin_update_country(country_id: UUID, country: schemas.CountryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_country = crud.update_country(db=db, country_id=country_id, country=country)
    if db_country is None:
        raise HTTPException(status_code=404, detail="Country not found")
    return db_country

@app.delete("/api/admin/countries/{country_id}")
def admin_delete_country(country_id: UUID, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    success = crud.delete_country(db=db, country_id=country_id)
    if not success:
        raise HTTPException(status_code=404, detail="Country not found")
    return {"status": "success"}

@app.get("/api/admin/applications", response_model=List[schemas.Application])
def admin_read_applications(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.get_applications(db)

@app.get("/api/admin/consultations", response_model=List[schemas.ConsultationRequest])
def admin_read_consultations(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.get_consultation_requests(db)

# --- UNIVERSITY ADMIN ROUTES ---

@app.get("/api/admin/countries/{country_id}/universities", response_model=List[schemas.University])
def admin_read_universities(country_id: UUID, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.University).filter(models.University.country_id == country_id).all()

@app.post("/api/admin/universities", response_model=schemas.University)
def admin_create_university(university: schemas.UniversityCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.create_university(db=db, university=university)

@app.put("/api/admin/universities/{university_id}", response_model=schemas.University)
def admin_update_university(university_id: UUID, university: schemas.UniversityBase, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_university = crud.update_university(db=db, university_id=university_id, university=university)
    if db_university is None:
        raise HTTPException(status_code=404, detail="University not found")
    return db_university

@app.delete("/api/admin/universities/{university_id}")
def admin_delete_university(university_id: UUID, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    success = crud.delete_university(db=db, university_id=university_id)
    if not success:
        raise HTTPException(status_code=404, detail="University not found")
    return {"status": "success"}

# --- SEED DATA ---
@app.on_event("startup")
def startup_event():
    db_gen = get_db()
    db = next(db_gen)
    try:
        # helper for idempotent creation
        def get_or_create_country(name, slug, **kwargs):
            country = db.query(models.Country).filter(models.Country.name == name).first()
            if not country:
                country = models.Country(name=name, slug=slug, **kwargs)
                db.add(country)
                db.commit()
                db.refresh(country)
                print(f"Created country: {name}")
            return country

        def get_or_create_university(name, slug, country_id, **kwargs):
            uni = db.query(models.University).filter(models.University.slug == slug).first()
            if not uni:
                uni = models.University(name=name, slug=slug, country_id=country_id, **kwargs)
                db.add(uni)
                db.commit()
                db.refresh(uni)
                print(f"Created university: {name}")
            return uni

        # Seed Countries
        uk = get_or_create_country(
            name="United Kingdom",
            slug="united-kingdom",
            description="Host to some of the world's oldest and most prestigious universities.",
            institutional_presence="200+ Institutions",
            university_types="Russell Group, Research Intensive, Modern Universities",
            partner_opportunity="High-volume recruitment with streamlined compliance.",
            image_url="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800"
        )

        usa = get_or_create_country(
            name="United States",
            slug="united-states",
            description="Home to the Ivy League and countless world-class research institutions.",
            institutional_presence="4000+ Institutions",
            university_types="Ivy League, Research I, Liberal Arts Colleges",
            partner_opportunity="Diverse range of programs and high student demand.",
            image_url="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800"
        )

        canada = get_or_create_country(
            name="Canada",
            slug="canada",
            description="Known for its high-quality education and post-graduation work opportunities.",
            institutional_presence="100+ Public Universities",
            university_types="Research-intensive, Comprehensive, Undergraduate",
            partner_opportunity="Welcoming environment with strong immigration pathways.",
            image_url="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800"
        )

        # Seed Universities
        get_or_create_university(
            name="University of Oxford",
            slug="university-of-oxford",
            description="A world-leading centre of learning, teaching and research.",
            full_description="Oxford is a unique and historic institution. As the oldest university in the English-speaking world, it can lay claim to nine centuries of continuous existence. As a modern, research-intensive university, it has many strengths, but its distinctive character lies in the excellence of its students and staff, and in its unique tutorial system.",
            category="Russell Group",
            logo_url="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=200",
            banner_url="https://images.unsplash.com/photo-1590496793907-359f13c8f862?auto=format&fit=crop&q=80&w=1200",
            courses_offered="Engineering, Mathematics, Philosophy, Physics, International Relations",
            intake_details="September 2026",
            location="Oxford, United Kingdom",
            is_active=True,
            country_id=uk.id
        )

        get_or_create_university(
            name="Harvard University",
            slug="harvard-university",
            description="A private Ivy League research university in Cambridge, Massachusetts.",
            full_description="Harvard University is the oldest institution of higher learning in the United States and among the most prestigious in the world. It is devoted to excellence in teaching, learning, and research, and to developing leaders in many disciplines who make a difference globally.",
            category="Ivy League",
            logo_url="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_w_motto.svg/1200px-Harvard_shield_w_motto.svg.png",
            banner_url="https://images.unsplash.com/photo-1576102859748-267aef9df03b?auto=format&fit=crop&q=80&w=1200",
            courses_offered="Computer Science, Economics, History, Biological Sciences, Psychology",
            intake_details="August 2026",
            location="Cambridge, USA",
            is_active=True,
            country_id=usa.id
        )

        get_or_create_university(
            name="University of Toronto",
            slug="university-of-toronto",
            description="A public research university in Toronto, Ontario, Canada.",
            full_description="The University of Toronto is a global leader in research and teaching. We provide diverse and personalized learning experiences, ranging from broad-based liberal arts to professional and graduate education.",
            category="U15 Group",
            logo_url="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_logo.svg/1200px-Utoronto_logo.svg.png",
            banner_url="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
            courses_offered="Medicine, Law, Architecture, Commerce, Philosophy",
            intake_details="September 2026, January 2027",
            location="Toronto, Canada",
            is_active=True,
            country_id=canada.id
        )

        if db.query(models.User).count() == 0:
            admin_user = schemas.UserCreate(username="admin", password="password123")
            crud.create_user(db, admin_user)
            print("Admin user created: admin / password123")
    except Exception as e:
        print(f"Startup error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        # Explicitly close the session to avoid leaks
        db.close()
        
        # Ensure generator is exhausted to run finally block
        try:
            next(db_gen)
        except StopIteration:
            pass

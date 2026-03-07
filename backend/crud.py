from sqlalchemy.orm import Session, joinedload
from uuid import UUID
from passlib.context import CryptContext
import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_countries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Country).options(joinedload(models.Country.universities)).offset(skip).limit(limit).all()

def get_country_by_slug(db: Session, slug: str):
    return db.query(models.Country).filter(models.Country.slug == slug).first()

def create_country(db: Session, country: schemas.CountryCreate):
    db_country = models.Country(**country.dict())
    db.add(db_country)
    db.commit()
    db.refresh(db_country)
    return db_country

def update_country(db: Session, country_id: UUID, country: schemas.CountryCreate):
    db_country = db.query(models.Country).filter(models.Country.id == country_id).first()
    if db_country:
        update_data = country.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_country, key, value)
        db.commit()
        db.refresh(db_country)
    return db_country

def delete_country(db: Session, country_id: UUID):
    db_country = db.query(models.Country).filter(models.Country.id == country_id).first()
    if db_country:
        # Also delete associated universities and applications if necessary, 
        # but SQLAlchemy cascade should handle it if configured.
        db.delete(db_country)
        db.commit()
        return True
    return False

def get_universities(db: Session, skip: int = 0, limit: int = 100, country_id: UUID = None, search: str = None):
    query = db.query(models.University).filter(models.University.is_active == True)
    if country_id:
        query = query.filter(models.University.country_id == country_id)
    if search:
        query = query.filter(models.University.name.ilike(f"%{search}%"))
    return query.offset(skip).limit(limit).all()

def get_university_by_slug(db: Session, slug: str):
    return db.query(models.University).filter(models.University.slug == slug).first()

def get_active_countries_from_universities(db: Session):
    # Returns countries that have at least one active university
    country_ids = db.query(models.University.country_id).filter(models.University.is_active == True).distinct().all()
    country_ids = [cid[0] for cid in country_ids]
    return db.query(models.Country).filter(models.Country.id.in_(country_ids)).all()

def create_university(db: Session, university: schemas.UniversityCreate):
    db_university = models.University(**university.dict())
    db.add(db_university)
    db.commit()
    db.refresh(db_university)
    return db_university

def update_university(db: Session, university_id: UUID, university: schemas.UniversityBase):
    db_university = db.query(models.University).filter(models.University.id == university_id).first()
    if db_university:
        update_data = university.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_university, key, value)
        db.commit()
        db.refresh(db_university)
    return db_university

def delete_university(db: Session, university_id: UUID):
    db_university = db.query(models.University).filter(models.University.id == university_id).first()
    if db_university:
        db.delete(db_university)
        db.commit()
        return True
    return False

def get_applications(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Application).offset(skip).limit(limit).all()

def create_application(db: Session, application: schemas.ApplicationCreate):
    db_application = models.Application(**application.dict())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_consultation_request(db: Session, request: schemas.ConsultationRequestCreate):
    db_request = models.ConsultationRequest(**request.dict())
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

def get_consultation_requests(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ConsultationRequest).order_by(models.ConsultationRequest.created_at.desc()).offset(skip).limit(limit).all()

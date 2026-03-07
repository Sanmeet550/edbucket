import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, Text, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

class Country(Base):
    __tablename__ = "countries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    image_url = Column(String)
    institutional_presence = Column(String)
    university_types = Column(String)
    partner_opportunity = Column(Text)
    is_active = Column(Boolean, default=True)

    universities = relationship("University", back_populates="country")
    applications = relationship("Application", back_populates="country")

class University(Base):
    __tablename__ = "universities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    logo_url = Column(String)
    banner_url = Column(String)
    description = Column(Text)
    full_description = Column(Text)
    category = Column(String)
    courses_offered = Column(Text) # Stored as text, can be newline separated or JSON
    intake_details = Column(String)
    location = Column(String)
    website_url = Column(String)
    student_diversity_text = Column(String)
    why_choose_1_title = Column(String)
    why_choose_1_text = Column(Text)
    why_choose_2_title = Column(String)
    why_choose_2_text = Column(Text)
    is_active = Column(Boolean, default=True)
    country_id = Column(UUID(as_uuid=True), ForeignKey("countries.id"))

    country = relationship("Country", back_populates="universities")
    applications = relationship("Application", back_populates="university")

class Application(Base):
    __tablename__ = "applications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    applicant_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    consultancy_name = Column(String, nullable=False)
    intended_intake = Column(String)
    program_interest = Column(String)
    additional_notes = Column(Text)
    status = Column(Enum('Pending', 'Reviewed', 'Accepted', 'Rejected', name='app_status'), default='Pending')
    
    country_id = Column(UUID(as_uuid=True), ForeignKey("countries.id"))
    university_id = Column(UUID(as_uuid=True), ForeignKey("universities.id"))

    country = relationship("Country", back_populates="applications")
    university = relationship("University", back_populates="applications")

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

class ConsultationRequest(Base):
    __tablename__ = "consultation_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    country = Column(String, nullable=False)
    student_volume = Column(String, nullable=False)
    study_destination = Column(String, nullable=False)
    created_at = Column(String, default=lambda: datetime.now().isoformat())

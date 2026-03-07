from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID

class UniversityBase(BaseModel):
    name: str
    slug: Optional[str] = None
    logo_url: Optional[str] = None
    banner_url: Optional[str] = None
    description: Optional[str] = None
    full_description: Optional[str] = None
    category: Optional[str] = None
    courses_offered: Optional[str] = None
    intake_details: Optional[str] = None
    location: Optional[str] = None
    website_url: Optional[str] = None
    student_diversity_text: Optional[str] = None
    why_choose_1_title: Optional[str] = None
    why_choose_1_text: Optional[str] = None
    why_choose_2_title: Optional[str] = None
    why_choose_2_text: Optional[str] = None
    is_active: bool = True

class UniversityCreate(UniversityBase):
    country_id: UUID

class University(UniversityBase):
    id: UUID
    country_id: UUID

    class Config:
        from_attributes = True

class CountryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    institutional_presence: Optional[str] = None
    university_types: Optional[str] = None
    partner_opportunity: Optional[str] = None
    is_active: bool = True

class CountryCreate(CountryBase):
    pass

class Country(CountryBase):
    id: UUID
    universities: List[University] = []

    class Config:
        from_attributes = True

class ApplicationBase(BaseModel):
    applicant_name: str
    email: EmailStr
    phone: str
    consultancy_name: str
    intended_intake: Optional[str] = None
    program_interest: Optional[str] = None
    additional_notes: Optional[str] = None
    university_id: UUID
    country_id: UUID

class ApplicationCreate(ApplicationBase):
    pass

class Application(ApplicationBase):
    id: UUID
    status: str

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: UUID
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ConsultationRequestBase(BaseModel):
    full_name: str
    company_name: str
    email: EmailStr
    phone: str
    country: str
    student_volume: str
    study_destination: str

class ConsultationRequestCreate(ConsultationRequestBase):
    pass

class ConsultationRequest(ConsultationRequestBase):
    id: UUID
    created_at: str

    class Config:
        from_attributes = True

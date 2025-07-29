# schemas.py
# Pydantic schemas for request and response validation

from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import date
import enum


class ApplicationStatus(str, enum.Enum):
    applied = "applied"
    interview = "interview"
    rejected = "rejected"
    offer = "offer"


class ApplicationBase(BaseModel):
    company: str = Field(..., example="Acme Corp")
    role: str = Field(..., example="Software Engineer")
    location: str = Field(..., example="Remote")
    status: ApplicationStatus = Field(..., example="applied")
    date_applied: date = Field(..., example="2025-07-29")


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(BaseModel):
    company: Optional[str]
    role: Optional[str]
    location: Optional[str]
    status: Optional[ApplicationStatus]
    date_applied: Optional[date]


class ApplicationOut(ApplicationBase):
    id: str

    class Config:
        from_attributes = True

# models.py
# SQLAlchemy models for the application

import uuid
from sqlalchemy import Column, String, Enum, Date
from sqlalchemy.dialects.sqlite import BLOB
from sqlalchemy.orm import declarative_base
from .database import Base
import enum


class ApplicationStatus(str, enum.Enum):
    applied = "applied"
    interview = "interview"
    rejected = "rejected"
    offer = "offer"


class Application(Base):
    __tablename__ = "applications"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    location = Column(String, nullable=False)
    status = Column(
        Enum(ApplicationStatus), nullable=False, default=ApplicationStatus.applied
    )
    date_applied = Column(Date, nullable=False)

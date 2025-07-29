# crud.py
# CRUD operations for job applications

from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from . import models, schemas
import uuid


def get_applications(db: Session):
    return db.query(models.Application).all()


def get_application(db: Session, application_id: str):
    app = (
        db.query(models.Application)
        .filter(models.Application.id == application_id)
        .first()
    )
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app


def create_application(db: Session, application: schemas.ApplicationCreate):
    db_app = models.Application(
        id=str(uuid.uuid4()),
        company=application.company,
        role=application.role,
        location=application.location,
        status=application.status,
        date_applied=application.date_applied,
    )
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app


def update_application(
    db: Session, application_id: str, updates: schemas.ApplicationUpdate
):
    app = get_application(db, application_id)
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(app, field, value)
    db.commit()
    db.refresh(app)
    return app


def delete_application(db: Session, application_id: str):
    app = get_application(db, application_id)
    db.delete(app)
    db.commit()
    return

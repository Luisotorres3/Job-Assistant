# main.py
# FastAPI app and routing for job application assistant

from fastapi import FastAPI, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from backend import models, schemas, crud, database, config
from backend.ai.cover_letter_agent import generate_cover_letter

# Create tables if they don't exist
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="Job Application Assistant AI",
    description="API for managing and tracking job applications.",
    version="1.0.0",
)

config.add_cors(app)


# Dependency to get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/applications", response_model=schemas.ApplicationOut, status_code=201)
def create_application(
    application: schemas.ApplicationCreate, db: Session = Depends(get_db)
):
    """
    Create a new job application.
    """
    return crud.create_application(db, application)


@app.get("/applications", response_model=list[schemas.ApplicationOut])
def list_applications(db: Session = Depends(get_db)):
    """
    List all job applications.
    """
    return crud.get_applications(db)


@app.get("/applications/{application_id}", response_model=schemas.ApplicationOut)
def get_application(application_id: str, db: Session = Depends(get_db)):
    """
    Get details of a specific job application.
    """
    return crud.get_application(db, application_id)


@app.patch("/applications/{application_id}", response_model=schemas.ApplicationOut)
def update_application(
    application_id: str,
    updates: schemas.ApplicationUpdate,
    db: Session = Depends(get_db),
):
    """
    Update fields or status of a job application.
    """
    return crud.update_application(db, application_id, updates)


@app.delete("/applications/{application_id}", status_code=204)
def delete_application(application_id: str, db: Session = Depends(get_db)):
    """
    Delete a job application.
    """
    crud.delete_application(db, application_id)
    return


# --- AI Cover Letter Generation Endpoint ---
@app.post("/generate-cover-letter")
def generate_cover_letter_route(
    job_description: str = Body(..., embed=True),
    resume_text: str = Body(..., embed=True),
):
    """
    Generate a personalized (simulated) cover letter using local logic.
    """
    if not job_description or not resume_text:
        raise HTTPException(
            status_code=400, detail="job_description and resume_text are required."
        )
    letter = generate_cover_letter(job_description, resume_text)
    return {"cover_letter": letter}

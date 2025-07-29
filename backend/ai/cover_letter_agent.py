# ai/cover_letter_agent.py
# Simulated AI agent for generating personalized cover letters (no external API)

import re


def extract_job_title_and_company(job_description: str):
    # Simple regex-based extraction for demo purposes
    job_title = None
    company = None
    # Try to find patterns like "at <Company>" or "for <Company>"
    match = re.search(r"(?:for|at) ([A-Z][\w&., ]+)", job_description, re.IGNORECASE)
    if match:
        company = match.group(1).strip()
    # Try to find a job title (first capitalized phrase)
    match = re.search(r"([A-Z][a-zA-Z0-9\-/ ]+)", job_description)
    if match:
        job_title = match.group(1).strip()
    return job_title, company


def generate_cover_letter(job_description: str, resume_text: str) -> str:
    job_title, company = extract_job_title_and_company(job_description)
    job_title = job_title or "the position"
    company = company or "your company"
    # Use a simple template
    letter = f"""
Dear Hiring Manager,

I am excited to apply for {job_title} at {company}. After reviewing your job description, I believe my background and experience make me a strong fit for this opportunity.

{resume_text[:200]}...

I am eager to bring my skills and enthusiasm to {company} and contribute to your team's success. Thank you for considering my application.

Sincerely,
Your Name
"""
    return letter.strip()

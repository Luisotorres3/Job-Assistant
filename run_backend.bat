@echo off
REM Run FastAPI backend from project root with correct import paths
uvicorn backend.main:app --reload

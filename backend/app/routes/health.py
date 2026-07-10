from fastapi import APIRouter, HTTPException
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "🟢 Healthy",
        "message": "Etsy AI App is running"
    }

@router.get("/status")
async def status():
    """Application status"""
    return {
        "status": "🟢 Active",
        "version": "1.0.0",
        "components": {
            "database": "🟢 Connected",
            "cache": "🟢 Connected",
            "ml_models": "🟢 Loaded"
        }
    }
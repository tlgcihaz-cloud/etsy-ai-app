from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.config import settings
from app.routes import (
    design_analyzer,
    trend_predictor,
    sales_forecaster,
    recommendations,
    health
)

# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Application lifecycle
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Application starting...")
    yield
    logger.info("🛑 Application shutting down...")

# Create FastAPI app
app = FastAPI(
    title="Etsy AI App",
    description="AI-powered T-shirt Design Analyzer & Sales Optimizer",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api/v1", tags=["health"])
app.include_router(design_analyzer.router, prefix="/api/v1", tags=["design"])
app.include_router(trend_predictor.router, prefix="/api/v1", tags=["trends"])
app.include_router(sales_forecaster.router, prefix="/api/v1", tags=["sales"])
app.include_router(recommendations.router, prefix="/api/v1", tags=["recommendations"])

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Etsy AI App - T-shirt Design Analyzer & Sales Optimizer",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "🟢 Active"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
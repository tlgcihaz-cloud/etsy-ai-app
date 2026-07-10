from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Application
    DEBUG: bool = os.getenv("DEBUG", "True") == "True"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://etsy_user:etsy_password@db:5432/etsy_ai_app"
    )
    
    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://redis:6379")
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
    ]
    
    # Etsy API (optional)
    ETSY_API_KEY: str = os.getenv("ETSY_API_KEY", "")
    ETSY_API_SECRET: str = os.getenv("ETSY_API_SECRET", "")
    
    # ML Models
    MODEL_PATH: str = os.getenv("MODEL_PATH", "/app/ml-models")
    
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Etsy AI App"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
import os
from typing import Optional
from dotenv import load_dotenv
from fastapi import HTTPException, Security
from fastapi.security import APIKeyHeader
from starlette.status import HTTP_403_FORBIDDEN

load_dotenv()  # also called in main.py, but main imports rbac->auth before that runs

API_KEY_HEADER = "X-API-Key"

api_key_header = APIKeyHeader(name=API_KEY_HEADER, auto_error=False)

API_KEYS = [k.strip() for k in os.getenv("API_KEYS", "").split(",") if k.strip()]


async def get_api_key(api_key_header: Optional[str] = Security(api_key_header)) -> str:
    """Validate the API key from the X-API-Key header."""
    if api_key_header is None:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail="API key is required in the X-API-Key header"
        )

    if api_key_header not in API_KEYS:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail="Invalid API key"
        )

    return api_key_header

import os
from typing import Optional

from fastapi import HTTPException, Security
from fastapi.security.api_key import APIKeyHeader

API_KEY_HEADER = "X-API-Key"

api_key_header = APIKeyHeader(name=API_KEY_HEADER, auto_error=False)

API_KEYS = [k.strip() for k in os.getenv("API_KEYS", "").split(",") if k.strip()]


async def get_api_key(api_key_header: Optional[str] = Security(api_key_header)) -> str:
    """Validate the API key from the X-API-Key header.

    Same pattern as scm-lme-backend/app/auth.py. No-op (any request passes)
    when API_KEYS is unset, so local dev and the existing Render deploy --
    both of which never set it -- keep working with zero config.
    """
    if not API_KEYS:
        return "unset"
    if api_key_header is None:
        raise HTTPException(status_code=401, detail="API key is required in the X-API-Key header")
    if api_key_header not in API_KEYS:
        raise HTTPException(status_code=403, detail="Invalid API key")
    return api_key_header

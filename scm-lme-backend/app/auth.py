import os
from typing import Optional, Dict, List
from fastapi import HTTPException, Security
from fastapi.security import APIKeyHeader
from starlette.status import HTTP_403_FORBIDDEN

API_KEY_HEADER = "X-API-Key"

api_key_header = APIKeyHeader(name=API_KEY_HEADER, auto_error=False)

API_KEYS = [k.strip() for k in os.getenv("API_KEYS", "").split(",") if k.strip()]


async def get_api_key(api_key_header: Optional[str] = Security(api_key_header)) -> str:
    """
    Validate the API key from the request header.

    Args:
        api_key_header: The API key from the request header

    Returns:
        str: The validated API key

    Raises:
        HTTPException: If the API key is invalid or missing
    """
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


# Optional: Function to check specific permissions based on API key
# This can be extended to implement role-based access control
def check_permissions(api_key: str, required_permissions: List[str]) -> Dict[str, bool]:
    """
    Check if the API key has the required permissions.

    Args:
        api_key: The API key to check
        required_permissions: The list of required permissions

    Returns:
        dict: A dictionary of permission to boolean value
    """
    # In a real app, this would query a database to get permissions for the API key
    # This is just a simple example
    permissions = {
        "chat:read": True,
        "chat:write": True,
        "tools:invoke": True,
    }

    return {perm: permissions.get(perm, False) for perm in required_permissions}

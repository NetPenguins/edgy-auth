'''
Title: Endpoints for authentication control
'''
from fastapi import FastAPI, Depends, status, Header
from starlette.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from keycloak import KeycloakOpenID, KeycloakInvalidTokenError
from helper import log

description = """
### 🚀 EdgyStack KeyCloak Driven API.  🔐
## Users 🐑
#### You will be able to:
* **Get user**
* **Get User Roles**
---
"""

tags_metadata = [
    {
        "name": "User",
        "description": "Operations with users. The **login** logic is also here.",
    }
]

keycloak_oid = KeycloakOpenID(
    server_url="http://localhost:8080/auth",
    client_id="edgy-auth",
    realm_name="demo",
    client_secret_key="gsZ6u0SU4QeqJo6jn3CHF7EDYxaot3R2",
)

async def verify_token(x_token: str | None = Header(default=None)) -> (Exception| dict[str, str]):
    log('-----USER----')
    log(keycloak_oid.userinfo(x_token))
    log('-------------')
    valid = keycloak_oid.introspect(x_token)
    if valid['active']:
        return valid
    raise KeycloakInvalidTokenError(error_message='Invalid Token Provided')

async def verify_user(x_token: str | None = Header(default=None)) -> (Exception| dict[str, str]):
    valid = keycloak_oid.introspect(x_token)
    if valid['active']:
        return keycloak_oid.userinfo(x_token)
    raise KeycloakInvalidTokenError(error_message='Invalid Token Provided')

app = FastAPI(
    default_response_class=JSONResponse,
    title="EdgyStack Authentication Server",
    version="0.0.1",
    description=description,
    openapi_tags=tags_metadata,
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    )

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(KeycloakInvalidTokenError)
async def validation_exception_handler(request, exc: KeycloakInvalidTokenError):
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content=jsonable_encoder({'detail': exc.error_message})
    )

@app.get('/')
async def health_check():
    """
    Health check endpoint
    """
    return {'status': "good"}

@app.get("/admin")
async def admin(token: dict = Depends(verify_token)): 
    log(token)
    return f'Hi premium user {token["preferred_username"]}'

@app.get("/user/roles")
async def user_roles(token: dict = Depends(verify_token)):
    return token['realm_access']['roles']

@app.get("/user")
async def user_(user: dict = Depends(verify_user)):
    return user


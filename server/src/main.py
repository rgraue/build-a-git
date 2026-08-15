import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ROUTERS
from routers.repo_router import repo_router
from routers.health_router import health_router
from routers.branch_router import branch_router

origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]

def main():
    api = FastAPI()

    # add routers
    api.include_router(repo_router)
    api.include_router(health_router)
    api.include_router(branch_router)

    # middleware
    api.add_middleware(
        CORSMiddleware,
        allow_origins=origins,           # Allowed domains
        allow_credentials=True,         # Allow cookies and auth headers
        allow_methods=["*"],            # Allow all HTTP methods (GET, POST, etc.)
        allow_headers=["*"],            # Allow all custom request headers
    )

    uvicorn.run(api, host="0.0.0.0", port=11818)

if __name__ == '__main__':
    main()
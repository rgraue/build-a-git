import uvicorn
from fastapi import FastAPI

# ROUTERS
from routers.example_router import example_router

def main():
    api = FastAPI()

    # add routers
    api.include_router(example_router)

    uvicorn.run(api)

if __name__ == '__main__':
    main()
from fastapi.routing import APIRouter

example_router = APIRouter(prefix="/example", tags=["demo"])

@example_router.get("/")
async def hello():
    return {"hello": "world"}
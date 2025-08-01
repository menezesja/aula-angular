from fastapi import APIRouter

router = APIRouter(prefix="/base", tags=["Base"])

@router.get("/hello")
def hello_world():
    return "Hello World"
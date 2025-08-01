from fastapi import FastAPI
from app.api.routes import router
from app.api.book_routes import router as book_router
from app.api.user_routes import router as user_router
from app.db.database_config import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Project Bonitin")
app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:4200"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
                   )

Base.metadata.create_all(bind=engine)

app.include_router(router=router)
app.include_router(router=book_router)
app.include_router(router=user_router)
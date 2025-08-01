from pydantic import BaseModel, EmailStr
from typing import List, Optional
from app.schemas.book import BookRead

class UserBase(BaseModel):
    name: str
    email: EmailStr #garante que a estrutura é de email
    login: str

class UserCreate(UserBase): pass

class UserRead(UserBase):
    id : int
    books: List[BookRead] = []

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    login: Optional[str] = None
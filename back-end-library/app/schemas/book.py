#pydantic
from pydantic import BaseModel
from typing import Optional

class BookBase(BaseModel):
    title: str
    author: str

class BookCreate(BookBase): pass

class BookRead(BookBase):
    id : int

    class Config:
        orm_mode = True

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
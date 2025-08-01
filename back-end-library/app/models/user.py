from app.db.database_config import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional

class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True, 
                                    index=True)
    name: Mapped[str] #considera todas as variaveis como não nulas
    login: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str]
    #email: Mapped[Optional[str]] = mapped_column(nullable=True) #se é nulo ou não
    books: Mapped[List["Book"]] = relationship(back_populates="user", cascade="all, delete")

from app.models.book import Book

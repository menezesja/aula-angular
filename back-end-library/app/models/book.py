from app.db.database_config import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional
from sqlalchemy import ForeignKey

class Book(Base):
    __tablename__ = "book"
    id: Mapped[int] = mapped_column(primary_key=True, 
                                    index=True)
    title: Mapped[str]
    author: Mapped[str]
    #year: Mapped[str]

    user_id : Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="books")

#Importação local para evitar referência circular
from app.models.user import User

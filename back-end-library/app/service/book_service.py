from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.schemas.book import BookCreate, BookUpdate
from app.models.book import Book

def create_book(db: Session, book_data: BookCreate, user_id: int):
    book = Book(**book_data.model_dump(), user_id=user_id)
    db.add(book)
    db.commit()
    db.refresh(book)
    return book

def get_all_books(db: Session):
    return db.query(Book).all()

def get_book(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()

def update_book(db: Session, book_id: int, book_data: BookUpdate):
    book = get_book(db, book_id)

    if book:
        for field, value in book_data.model_dump(exclude_unset=True).items():
            setattr(book, field, value)
        db.commit()
        db.refresh(book)
    return book

def delete_book(db: Session, book_id: int):
    book = get_book(db, book_id)

    if book:
        db.delete(book)
        db.commit()
    return book

def search_book(db: Session, query: str):
    # books = get_all_books(db)

    # lower_query = query.strip().lower()
    
    # filtered = [
    #     book for book in books
    #         if lower_query in book.title.lower()
    #         or lower_query in book.author.lower()
    #         or lower_query in str(book.year)
    # ]

    # return filtered
    lower_query = f"%{query.strip().lower()}%"
    return db.query(Book).filter(
        or_(
            Book.title.ilike(lower_query),
            Book.author.ilike(lower_query),
            Book.year.cast(str).ilike(lower_query)
        )
    ).all()
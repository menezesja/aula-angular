from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.schemas.book import *
from app.service.book_service import *
from app.db.database_config import get_db, Session

router = APIRouter(prefix="/book", tags=["Books"])

@router.post("/user/{user_id}", 
             response_model=BookRead, status_code=200)
def create_new_book(user_id: int, book: BookCreate, db: Session = Depends(get_db)):
    return create_book(db, book, user_id)

@router.get("/list", response_model=list[BookRead], status_code=201)
def list_books(db: Session = Depends(get_db)):
    return get_all_books(db)

@router.get("/search", response_model=list[BookRead])
def search_info_book(query: str = Query(...),
                     db:Session = Depends(get_db)):
    filtered = search_book(db, query)
    if not filtered:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

@router.get("/{book_id}", response_model=BookRead, status_code=200)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = get_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book
    
@router.put("/{book_id}", response_model=BookRead, status_code=200)
def update_book_info(book_id: int, book: BookUpdate, db: Session = Depends(get_db)):
    updated = update_book(db, book_id, book)
    if not updated:
        raise HTTPException(status_code=406, detail="Book didn't update")
    return updated

@router.delete("/{book_id}", status_code=200)
def delete_book_info(book_id: int, db: Session = Depends(get_db)):
    deleted = delete_book(db, book_id)
    if not deleted:
        raise HTTPException(status_code=406, detail="Book didn't delete")
    return deleted
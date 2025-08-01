from fastapi import APIRouter, Depends, HTTPException

from app.schemas.user import *
from app.service.user_service import *
from app.db.database_config import get_db, Session

router = APIRouter(prefix="/user", tags=["Users"])

@router.post("", 
             response_model=UserRead, status_code=200)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.get("/list", response_model=list[UserRead], status_code=201)
def list_users(db: Session = Depends(get_db)):
    return get_all_users(db)

@router.get("/{user_id}", response_model=UserRead, status_code=200)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
    
@router.put("/{user_id}", response_model=UserRead, status_code=200)
def update_user_info(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    updated = update_user(db, user_id, user)
    if not updated:
        raise HTTPException(status_code=406, detail="User didn't update")
    return updated

@router.delete("/{user_id}", status_code=200)
def delete_user_info(user_id: int, db: Session = Depends(get_db)):
    deleted = delete_user(db, user_id)
    if not deleted:
        raise HTTPException(status_code=406, detail="User didn't delete")
    return deleted
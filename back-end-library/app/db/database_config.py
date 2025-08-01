#configurações de conexão e gerenciamento do banco de dados

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Session

#conexão de pastas
#sqlite é uma pasta local
#sqlite:///
#postegs:/
DATABASE_URL = "sqlite:///./biblioteca.db"

engine = create_engine(DATABASE_URL, echo=True, future=True, 
                       connect_args={"check_same_thread": False}) #para toda a api, false para não ficar criando filas

#cria sessão entre o bd e a api, para realizar requisições
SessionLocal = sessionmaker(bind=engine,
                            autoflush=False,
                            expire_on_commit=False)
                        #autocommit=False

def get_db():
    db: Session = SessionLocal()
    try:
        yield db  #yield retorna várias sessões
    finally:
        db.close()

class Base (DeclarativeBase): pass
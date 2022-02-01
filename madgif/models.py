from sqlalchemy import Column, Integer, Boolean, String, ForeignKey
from sqlalchemy.orm import relationship

from .extensions import db


class User(db.Model):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    public_id = Column(Integer)
    name = Column(String(50))
    password = Column(String(50))
    admin = Column(Boolean)
    photos = relationship('Photo', backref='author', lazy=True)


class Photo(db.Model):
    __tablename__ = "photo"
    id = Column(Integer, primary_key=True)
    author_id = Column(String, ForeignKey("user.id"))
    author = relationship("User", foreign_keys=[author_id])
    public_id = Column(Integer)
    name = Column(String(1024), nullable=False)
    raw = Column(String(50))
    mime = Column(Boolean)

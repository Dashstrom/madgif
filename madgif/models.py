from sqlalchemy import (
  Column,
  Integer,
  Boolean,
  String,
  ForeignKey,
  LargeBinary,
  TIMESTAMP,
  UniqueConstraint
)
from flask_sqlalchemy import BaseQuery
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .extensions import db


class User(db.Model):
    __tablename__ = "user"
    __table_args__ = (
      UniqueConstraint('username', name='unique_user_username'),
      UniqueConstraint('public_id', name='unique_user_public_id'),
    )
    id = Column(Integer, primary_key=True)
    public_id = Column(String(128), nullable=False, index=True)
    username = Column(String(50), nullable=False, index=True)
    password = Column(String(128), nullable=False)
    admin = Column(Boolean, nullable=False)
    date_creation = Column(TIMESTAMP, nullable=False, server_default=func.now(), index=True)
    date_update = Column(TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now(), index=True)
    query: BaseQuery


class Image(db.Model):
    __tablename__ = "image"
    id = Column(Integer, primary_key=True)
    public_id = Column(String(128), nullable=False, index=True)
    author_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    author = relationship("User", foreign_keys=[author_id])
    name = Column(String(1024), nullable=False)
    raw = Column(LargeBinary(length=(1 < 32) - 1), nullable=False)
    date_creation = Column(TIMESTAMP, nullable=False, server_default=func.now())
    date_update = Column(TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now())
    query: BaseQuery

    def json(self):
        return {
            "author": {
                "username": self.author.username,
                "public_id": self.author.public_id
            },
            "public_id": self.public_id,
            "name": self.name,
            "date_creation": self.date_creation,
            "date_update": self.date_update
        }

    @classmethod
    def img(cls, user_id, public_id):
        return cls.query.filter_by(author_id=user_id, public_id=public_id)

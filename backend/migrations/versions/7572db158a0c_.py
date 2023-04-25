"""empty message

Revision ID: 7572db158a0c
Revises: 6e18341348b5
Create Date: 2023-04-25 14:25:37.018814

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '7572db158a0c'
down_revision = '6e18341348b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('day', schema=None) as batch_op:
        batch_op.alter_column('city',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('day', schema=None) as batch_op:
        batch_op.alter_column('city',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)

    # ### end Alembic commands ###

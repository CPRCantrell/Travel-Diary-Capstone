"""empty message

Revision ID: b452a4bd6945
Revises: 1ee13d0c8bb2
Create Date: 2023-04-30 22:06:54.128463

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b452a4bd6945'
down_revision = '1ee13d0c8bb2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('album', schema=None) as batch_op:
        batch_op.add_column(sa.Column('region', sa.String(length=255), nullable=True))
        batch_op.drop_column('continent')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('album', schema=None) as batch_op:
        batch_op.add_column(sa.Column('continent', mysql.VARCHAR(length=255), nullable=True))
        batch_op.drop_column('region')

    # ### end Alembic commands ###
